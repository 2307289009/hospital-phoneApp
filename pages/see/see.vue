<template>
	<view class="page-wrapper">
		
		<template v-if="indexList.length > 0">
			<view class="order-card" v-for="(item, index) in indexList" :key="index">
				
				<view class="card-header">
					<view class="header-left">
						<uv-icon name="calendar" color="#455A64" size="20" top="2"></uv-icon>
						<text class="header-date">{{item.times}} ({{item.week}})</text>
					</view>
					<view class="header-right">
						<view v-if="item.status == '1'" class="status-tag status-success">
							<text>挂号成功</text>
						</view>
						<view v-if="item.status == '2'" class="status-tag status-cancelled">
							<text>已取消</text>
						</view>
					</view>
				</view>
				
				<uv-line color="#EEEEEE" margin="20rpx 0"></uv-line>

				<view class="card-body">
					<view class="body-main">
						<text>{{item.deptName}}</text>
						<text class="body-doctor">{{item.nickName}}</text>
					</view>
					<view class="body-sub">
						<text>就诊人：{{item.visitname}}</text>
					</view>
				</view>

				<view class="card-details">
					<view class="info-item">
						<view class="label">就诊时段：</view>
						<view class="value" v-if="item.timesArea == '0'">上午</view>
						<view class="value" v-if="item.timesArea == '1'">下午</view>
					</view>
					<view class="info-item">
						<view class="label">就诊地址：</view>
						<view class="value">{{item.address}}</view>
					</view>
					<view class="info-item">
						<view class="label">挂号费：</view>
						<view class="value">{{item.price}}元</view>
					</view>
					<view class="info-item">
						<view class="label">订单时间：</view>
						<view class="value">{{item.createTime}}</view>
					</view>
				</view>

				<view class="advice-container">
					<view class="advice-content" :class="{'collapsed': item.collapsed}">
						<uv-parse :content="item.advice || '暂无医嘱'"></uv-parse>
					</view>
				</view>
				
				<uv-line color="#EEEEEE" margin="20rpx 0"></uv-line>

				<view class="card-footer">
					<uv-button 
						v-if="item.status == '1'" 
						@click="cancelBtn(item)" 
						text="取消挂号" 
						plain 
						color="#FFCA28"
						:customStyle="{width: '180rpx', height: '64rpx'}"
						shape="circle"
					></uv-button>
					
					<uv-button 
						@click="toggle(item)" 
						:text="item.collapsed ? '查看医嘱' : '收起医嘱'"
						color="#26A69A"
						:customStyle="{width: '180rpx', height: '64rpx', marginLeft: '20rpx'}"
						shape="circle"
					></uv-button>
				</view>
			</view>
		</template>
		
		<view v-else-if="loadStatus != 'loading'">
			<uv-empty mode="order" text="暂无挂号记录"></uv-empty>
		</view>

		<uv-load-more @loadmore='loadmore' :status="loadStatus" color="#B0BEC5" v-if="indexList.length > 0"></uv-load-more>
		
		<uv-notify ref="uvToast"></uv-notify>
		<uv-modal showCancelButton :asyncClose="true" ref="cancelModal" title="系统提示" content='确定取消挂号吗?'
			@cancel="cancelCancel" @confirm="cancelConfirm" confirmColor="#26A69A" cancelColor="#B0BEC5"></uv-modal>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad,
		onReachBottom
	} from '@dcloudio/uni-app'
	import {
		getVisitOrderListApi,
		cancelOrderApi // 【注意】您的原代码中使用了 cancelOrderApi 但未导入，我在这里补充了
	} from '../../api/index.js'

	// 【修改】原代码的 toggle 无法操作新加载的数据
	// const collapsed = ref(false) // 移除
	
	const toggle = (item) => {
		// 直接操作 item 上的响应式属性
		item.collapsed = !item.collapsed
	}

	const loadStatus = ref('loading') // 默认为 loading
	const indexList = ref([])
	const currentPage = ref(1)
	const pageSize = ref(6)
	const pages = ref(0)

	const getList = async () => {
		// 确保在请求前将状态设为 loading
		loadStatus.value = 'loading';
		
		let res = await getVisitOrderListApi({
			currentPage: currentPage.value,
			pageSize: pageSize.value,
			userId: uni.getStorageSync("userId")
		})
		
		if (res && res.code == 200) {
			pages.value = res.data.pages;
			
			// 【修复BUG】
			// 必须为新获取的 records 
			// 每一项都添加 'collapsed' 属性，否则 toggle 会失效
			const newRecords = res.data.records.map(r => ({
				...r,
				collapsed: true // 默认折叠
			}));
			
			indexList.value = indexList.value.concat(newRecords);

			if (currentPage.value >= pages.value) {
				loadStatus.value = 'nomore'
			} else {
				loadStatus.value = 'loadmore'
			}
		}
	}
	
	const loadmore = () => {
		if (currentPage.value >= pages.value) {
			loadStatus.value = 'nomore'
			return;
		}
		// 状态在 getList() 内部设置
		currentPage.value = ++currentPage.value;
		getList()
	}

	onReachBottom(() => {
		console.log('触底加载')
		if (loadStatus.value === 'loadmore') {
			loadmore();
		}
	})

	const uvToast = ref();
	const cancelModal = ref();
	const parms = {
		makeId: ''
	}

	// 【新增】在模板中调用的函数
	const cancelBtn = (item) => {
		console.log(item)
		parms.makeId = item.makeId
		cancelModal.value.open()
	}

	const cancelCancel = () => {
		cancelModal.value.close()
	}

	const cancelConfirm = async () => {
		let res = await cancelOrderApi(parms)
		if (res && res.code == 200) {
			indexList.value = [] // 列表清空
			currentPage.value = 1; // 从第一页开始查询
			getList() // 查列表
			
			uvToast.value.show({
				type: 'success',
				message: res.msg,
				bgColor: '#26A69A', // 保持绿色提示
			})
			cancelModal.value.close() // 关闭弹框
		}
	}
	
	onLoad(() => {
		getList()
	})
</script>

<style lang="scss" scoped>
	/* 1. 页面背景 */
	page {
		background-color: #F5F6FA;
	}

	.page-wrapper {
		padding: 20rpx;
	}

	/* 2. 挂号卡片 */
	.order-card {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 25rpx;
		box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.05);
	}

	/* 3. 卡片头部 */
	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.header-left {
			display: flex;
			align-items: center;
			.header-date {
				font-size: 32rpx;
				font-weight: bold;
				color: #303133;
				margin-left: 10rpx;
			}
		}

		.header-right {
			.status-tag {
				padding: 8rpx 20rpx;
				border-radius: 30rpx;
				font-size: 26rpx;
				font-weight: 500;
			}
			/* 状态：成功 */
			.status-success {
				background-color: #E0F2F1; // 浅青色
				color: #00796B; // 深青色
			}
			/* 状态：取消 */
			.status-cancelled {
				background-color: #FFF8E1; // 浅黄色
				color: #FFA000; // 琥珀色
			}
		}
	}

	/* 4. 卡片核心内容 */
	.card-body {
		padding: 20rpx 0;
		.body-main {
			font-size: 36rpx;
			font-weight: bold;
			color: #303133;
			.body-doctor {
				margin-left: 15rpx;
			}
		}
		.body-sub {
			font-size: 28rpx;
			color: #606266;
			margin-top: 10rpx;
		}
	}

	/* 5. 卡片详情 (原info-item) */
	.card-details {
		.info-item {
			display: flex;
			padding-top: 10rpx;
			font-size: 26rpx;
			.label {
				color: #909399;
				width: 160rpx;
				flex-shrink: 0;
			}
			.value {
				color: #606266;
			}
		}
	}
	
	/* 6. 医嘱容器 */
	.advice-container {
		margin-top: 20rpx;
		.advice-content {
			background-color: #F8F9FA;
			padding: 20rpx;
			border-radius: 10rpx;
			font-size: 26rpx;
			color: #555555;
			
			/* 用于控制折叠的动画 */
			transition: all 0.3s ease-in-out;
			max-height: 500rpx; /* 展开时最大高度 */
			overflow: hidden;
		}
		
		/* 折叠状态 */
		.collapsed {
			max-height: 0;
			padding-top: 0;
			padding-bottom: 0;
			overflow: hidden;
		}
	}
	
	/* 7. 卡片底部操作栏 */
	.card-footer {
		display: flex;
		justify-content: flex-end;
		padding-top: 20rpx;
	}
</style>