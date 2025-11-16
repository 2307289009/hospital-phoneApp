<template>
	<view class="page-container">
		<view v-for="(item, index) in indexList" :key="index" class="card-item">
			<view class="card-header">
				<view class="header-date">
					<uv-icon name="calendar" size="20" color="#3F51B5"></uv-icon>
					<text class="date-text">{{item.times}} ({{item.week}})</text>
				</view>
				<view class="status-tag" :class="getStatusClass(item.status)">
					<uv-text v-if="item.status == '1'" size="12" color="#3F51B5" text="挂号成功"></uv-text>
					<uv-text v-if="item.status == '2'" size="12" color="#FFA000" text="已取消"></uv-text>
				</view>
			</view>

			<uv-line color="#eeeeee"></uv-line>

			<view class="card-body">
				<view class="info-row doctor-info">
					<uv-icon name="home" size="22" color="#2c3e50"></uv-icon>
					<view class="info-content">
						<text class="dept-name">{{item.deptName}}</text>
						<text class="doctor-name">{{item.nickName}}</text>
					</view>
				</view>
				<view class="info-row">
					<uv-icon name="account" size="18" color="#606266"></uv-icon>
					<text>就诊人：{{item.visitname}}</text>
				</view>
				<view class="info-row">
					<uv-icon name="clock" size="18" color="#606266"></uv-icon>
					<text>就诊时段：{{ item.timesArea == '0' ? '上午' : '下午' }}</text>
				</view>
				<view class="info-row">
					<uv-icon name="map" size="18" color="#606266"></uv-icon>
					<text>就诊地址：{{item.address}}</text>
				</view>
				<view class="info-row">
					<uv-icon name="coupon" size="18" color="#606266"></uv-icon>
					<text>挂号费：{{item.price}} 元</text>
				</view>
			</view>

			<uv-line color="#eeeeee"></uv-line>

			<view class="card-footer">
				<view class="order-time">
					<text>订单时间：{{item.createTime}}</text>
				</view>
				<view class="btns" v-if="item.status == '1'">
					<uv-button v-if="item.hasVisit == '0'" @click="changeBtn(item)" size="small" :plain="true"
						text="挂号改签" shape="circle" :customStyle="{ color: '#0fff93', borderColor: '#0fff93' }">
					</uv-button>
					<uv-button v-if="item.hasVisit == '0'" @click="cancelBtn(item)" size="small" :plain="true"
						text="取消挂号" shape="circle" :customStyle="{ color: '#FFA000', borderColor: '#FFA000' }">
					</uv-button>
					<uv-button v-if="item.hasVisit == '1'" size="small" :plain="true"
						text="已就诊" shape="circle" :disabled="true" :customStyle="{ color: '#3F51B5', borderColor: '#3F51B5' }"></uv-button>
				</view>
			</view>
		</view>

		<uv-load-more @loadmore='loadmore' :status="loadStatus" color="#7f8c8d"></uv-load-more>
		<uv-notify ref="uvToast"></uv-notify>
		<uv-modal showCancelButton :asyncClose="true" ref="cancelModal" title="系统提示" content='确定取消挂号吗?'
			@cancel="cancelCancel" @confirm="cancelConfirm" confirmColor="#3F51B5" cancelColor="#7f8c8d"></uv-modal>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue';
	import {
		onLoad,
		onReachBottom
	} from '@dcloudio/uni-app'
	import {
		getOrderListApi,
		cancelOrderApi
	} from '../../api/index.js'

	const loadStatus = ref('loadmore')
	const indexList = ref([])
	const currentPage = ref(1)
	const pageSize = ref(6)
	const pages = ref(0)
	
	// 根据状态返回不同的CSS class
	const getStatusClass = (status) => {
		return status == '1' ? 'status-success' : 'status-cancelled';
	};

	const getList = async () => {
		let res = await getOrderListApi({
			currentPage: currentPage.value,
			pageSize: pageSize.value,
			userId: uni.getStorageSync("userId")
		})
		if (res && res.code == 200) {
			pages.value = res.data.pages;
			indexList.value = indexList.value.concat(res.data.records)
			if (currentPage.value >= pages.value) {
				loadStatus.value = 'nomore'
			} else {
				loadStatus.value = 'loadmore'
			}
		}
	}
	
	const changeBtn = (item) => {
		uni.navigateTo({
			url: `/pages/change/change?item=${encodeURIComponent(JSON.stringify(item))}`
		})
	}

	const loadmore = () => {
		if (currentPage.value >= pages.value) {
			loadStatus.value = 'nomore'
			return;
		}
		loadStatus.value = 'loading'
		currentPage.value = ++currentPage.value;
		getList()
	}

	onReachBottom(() => {
		if (currentPage.value >= pages.value) {
			loadStatus.value = 'nomore'
			return;
		}
		loadStatus.value = 'loading'
		currentPage.value = ++currentPage.value;
		getList()
	})

	const uvToast = ref();
	const cancelModal = ref();
	const parms = {
		makeId: ''
	}
	const cancelBtn = (item) => {
		parms.makeId = item.makeId
		cancelModal.value.open()
	}

	const cancelCancel = () => {
		cancelModal.value.close()
	}

	const cancelConfirm = async () => {
		let res = await cancelOrderApi(parms)
		if (res && res.code == 200) {
			indexList.value = []
			currentPage.value = 1;
			getList()
			uvToast.value.show({
				type: 'success',
				message: res.msg,
				bgColor: '#3F51B5',
			})
			cancelModal.value.close()
		}
	}

	onLoad(() => {
		getList()
		const end = Date.now();
		const start = uni.getStorageSync("start2")
		console.log(`挂号所需时间${end-start}ms`)
	})
</script>

<style lang="scss" scoped>
	// 页面整体背景色
	.page-container {
		background-color: #f7f8fa;
		padding: 10px 0;
		min-height: 100vh;
	}

	// 卡片项样式
	.card-item {
		background-color: #ffffff;
		border-radius: 12px;
		margin: 0 15px 15px 15px;
		padding: 15px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		color: #2c3e50;
		transition: all 0.2s ease-in-out;

		&:active {
			transform: scale(0.98);
			box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		}
	}

	// 卡片头部
	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 12px;

		.header-date {
			display: flex;
			align-items: center;
			font-size: 16px;
			font-weight: bold;

			.date-text {
				margin-left: 8px;
			}
		}

		.status-tag {
			padding: 4px 10px;
			border-radius: 15px;
			font-size: 12px;
			font-weight: 500;
		}
		
		// 成功状态的背景和颜色
		.status-success {
			background-color: #e8f0fe;
			color: #3F51B5;
		}
		
		// 取消状态的背景和颜色
		.status-cancelled {
			background-color: #fff8e1;
			color: #FFA000;
		}
	}

	// 卡片主体
	.card-body {
		padding: 12px 0;

		.info-row {
			display: flex;
			align-items: center;
			font-size: 14px;
			margin-bottom: 10px;
			color: #606266;

			&:last-child {
				margin-bottom: 0;
			}
			
			// 使用 ::v-deep 或 deep() 选择器来修改组件内部样式
			::v-deep .uv-icon {
				margin-right: 10px;
			}
		}
		
		// 医生和科室信息行，样式突出
		.doctor-info {
			font-size: 16px;
			color: #2c3e50;
			margin-bottom: 15px;
			font-weight: 500;
			
			.info-content {
				display: flex;
				flex-direction: column;
			}
			.dept-name {
				font-weight: bold;
			}
			.doctor-name {
				font-size: 14px;
				color: #909399;
				margin-top: 2px;
			}
		}
	}

	// 卡片底部
	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 12px;

		.order-time {
			font-size: 12px;
			color: #909399;
		}

		.btns {
			display: flex;
			gap: 10px;
		}
	}
</style>