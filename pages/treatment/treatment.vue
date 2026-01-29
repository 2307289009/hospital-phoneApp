<template>
	<view class="page-container">
		
		<view class="patient-list">
			<view v-for="item in visitUser" :key="item.visitId" class="patient-card">
				<view class="card-info">
					<view class="info-header">
						<view class="name">{{item.visitname}}</view>
						<view class="tag">就诊人</view>
					</view>
					<view class="card-id">
						{{item.idCard}}
					</view>
				</view>
				
				<view class="card-actions">
					<uv-icon @click="editBtn(item)" name="edit-pen" color="#007AFF" size="22"></uv-icon>
					<uv-icon @click="deleteBtn(item)" name="trash" color="#F44336" size="22"></uv-icon>
				</view>
			</view>
		</view>

		<view @click="addBtn" class="fab-add">
			<uv-icon name="plus" color="#ffffff" :size="28"></uv-icon>
		</view>

		<uv-modal ref="modal" :asyncClose="true" showCancelButton="true" cancelText="取消" title="提示" content='确定删除该就诊人吗?'
			@confirm="confirm"></uv-modal>
	</view>
</template>

<script setup>
	// 脚本 setup 部分与您原来的一致，逻辑非常棒，无需改动
	import {
		ref
	} from 'vue'
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		getVisitListApi,
		visitDeleteApi
	} from '../../api/index.js'
	const modal = ref()
	//新增
	const addBtn = () => {
		uni.navigateTo({
			url: '/pages/treatmentAdd/treatmentAdd'
		})
	}
	//编辑
	const editBtn = (item) => {
		uni.navigateTo({
			url: '/pages/treatmentModify/treatmentModify?item=' + encodeURIComponent(JSON.stringify(item))
		})
	}
	//删除按钮
	const visitId = ref('')
	const deleteBtn = (item) => {
		visitId.value = item.visitId
		modal.value.open()
	}

	//获取列表数据
	const visitUser = ref([])
	const getVisitList = async () => {
		let res = await getVisitListApi({
			userId: uni.getStorageSync("userId")
		})
		if (res && res.code == 200) {
			visitUser.value = res.data;
			console.log(visitUser.value)
		}
	}
	//确定删除
	const confirm = async () => {
		console.log('确定')
		let res = await visitDeleteApi({
			visitId: visitId.value
		})
		if (res && res.code == 200) {
			//刷新列表
			getVisitList()
			modal.value.close()
		}

	}
	onShow(() => {
		getVisitList()
	})
</script>

<style lang="scss" scoped>
	// 1. 页面整体背景
	.page-container {
		background-color: #f4f7fa; // 换一个更柔和的浅灰背景
		min-height: 100vh;
		padding-bottom: 100px; // 留出空间，防止悬浮按钮遮挡最后一条
	}

	// 2. 卡片列表容器
	.patient-list {
		padding: 15px;
		padding-top: 10px;
	}

	// 3. 全新的 "就诊卡" 样式
	.patient-card {
		background-color: #ffffff; // 纯白卡片
		border-radius: 12px; // 更大的圆角
		margin-bottom: 15px;
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		// 添加精致的阴影
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); 
		transition: all 0.2s ease;

		&:active {
			transform: scale(0.98); // 点击轻微缩小
			box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
		}
	}

	.card-info {
		flex: 1;
		
		.info-header {
			display: flex;
			align-items: baseline; // 名字和标签基线对齐
			
			.name {
				font-size: 18px;
				font-weight: bold;
				color: #333;
			}
			
			.tag {
				margin-left: 10px;
				background-color: #e6f7ff; // 浅蓝色底
				color: #007AFF; // 主题蓝
				padding: 2px 8px;
				border-radius: 4px;
				font-size: 12px;
				font-weight: 500;
			}
		}

		.card-id {
			padding-top: 8px;
			color: #888888; // 次要信息用灰色
			font-size: 14px;
		}
	}
	
	.card-actions {
		display: flex;
		align-items: center;
		gap: 15px; // 使用 gap 增加图标间距 (若不支持，请用 margin)
		padding-left: 15px;
	}

	// 4. 悬浮操作按钮 (FAB)
	.fab-add {
		position: fixed; // 固定定位
		z-index: 10;
		bottom: 40px; // 距离底部
		right: 20px;  // 距离右侧
		
		width: 56px;  // 标准FAB尺寸
		height: 56px;
		border-radius: 50%; // 设为圆形
		
		// 使用渐变蓝，更醒目
		background: linear-gradient(135deg, #007aff, #0056b3); 
		
		// 阴影
		box-shadow: 0 4px 12px rgba(0, 122, 255, 0.4); 
		
		// 内部图标居中
		display: flex;
		justify-content: center;
		align-items: center;
		
		color: #ffffff;
		transition: transform 0.2s ease;
		
		&:active {
			transform: scale(0.95) rotate(90deg); // 点击时缩小并旋转
		}
	}

	// (删除原有的 .item 和 .addSite 样式)
</style>