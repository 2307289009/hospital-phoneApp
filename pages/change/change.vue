<template>
	<view class="doctor-profile-container">
		<view class="doctor-card">
			<image class="avatar" :src="http.baseUrl + doctor.image"></image>
			<view class="details">
				<view class="name-title">
					<text class="name">{{ doctor.nickName }}</text>
					<text class="title">{{ doctor.jobTitle }}</text>
				</view>
				<view class="department">
					{{ doctor.deptName }}
				</view>
				<view class="good-at">
					<text class="tag">擅长:</text>
					<text>{{ doctor.goodAt }}</text>
				</view>
			</view>
		</view>

		<view class="section">
			<view class="section-header">
				<text class="section-title">医生简介</text>
			</view>
			<view class="section-body">
				<text class="introduction-text">{{ doctor.introduction || '暂无简介' }}</text>
			</view>
		</view>

		<view class="section">
			<view class="section-header">
				<text class="section-title">在线改签</text>
			</view>
			<view class="section-body">
				<view v-if="scheduleList.length > 0" class="schedule-list">
					<view class="schedule-card" v-for="(item, index) in scheduleList" :key="index">
						<view class="schedule-info">
							<view class="date-info">
								<view class="date">{{ item.times }}</view>
								<view class="week">{{ item.week }}</view>
							</view>
							<view class="meta-info">
								<text>余号: <text class="highlight">{{ item.lastAmount }}</text></text>
								<text>挂号费: <text class="highlight">¥{{ doctor.price }}</text></text>
							</view>
						</view>
						<view class="schedule-action">
							<uv-button
								size="small"
								@click="toConfirm(item)"
								type="primary"
								shape="circle"
								text="改签">
							</uv-button>
						</view>
					</view>
				</view>
				<view v-else class="empty-state">
					<text>近期暂无排班</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import http from '../../common/http.js'
	import { getDoctorApi, rescheduleOrderApi } from '../../api/index.js'
	
	// --- 已删除 activeTab 和 changeTab 相关逻辑 ---

	const deptName = ref('');
	const visitAddress = ref('')
	const jobTitle = ref('')
	const price = ref(0)
	const makeId = ref(0)

	const parm = {
		userId: '',
		doctorId: ''
	}
	const scheduleList = ref([])
	const doctor = ref({});

	const getDoctorSchedule = async () => {
		let res = await getDoctorApi(parm)
		if (res && res.code == 200) {
			scheduleList.value = res.data;
		}
	}

	// 改为改签的函数
	const toConfirm = async (item) => {
		const scheduleId = item.scheduleId;
		const currentMakeId = makeId.value;
		console.log(typeof scheduleId)
		console.log(typeof currentMakeId)
		try {
			const rescheduleRes = await rescheduleOrderApi({
				makeId: currentMakeId,
				scheduleId
			});
			if(rescheduleRes.code == 200) {
				uni.showToast({
					title:"改签完成"
				})
			}else {
				uni.showToast({
					title: "改签失败"
				})
			}			
		}catch(error) {
			uni.showToast({
				title: "未知错误"
			})
		}
	}

	onLoad((option) => {
		const item = JSON.parse(decodeURIComponent(option.item))
		console.log(item)
		parm.doctorId = item.doctorId
		deptName.value = item.deptName
		visitAddress.value = item.visitAddress
		jobTitle.value = item.jobTitle
		price.value = item.price
		makeId.value = item.makeId

		parm.userId = uni.getStorageSync("userId")
		Object.assign(doctor.value, item)

		getDoctorSchedule()
	})
</script>

<style scoped lang="scss">
	// 全局容器
	.doctor-profile-container {
		background-color: #f5f7fa;
		min-height: 100vh;
		padding: 15px;
		box-sizing: border-box;
	}

	// 医生信息卡片 (无变动)
	.doctor-card {
		background: linear-gradient(135deg, #4c83ff 0%, #2a5fe1 100%);
		display: flex;
		align-items: center;
		padding: 20px;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		color: #ffffff;
		margin-bottom: 20px;

		.avatar {
			width: 75px;
			height: 75px;
			border-radius: 50%;
			border: 2px solid #fff;
			margin-right: 15px;
			flex-shrink: 0;
		}

		.details {
			display: flex;
			flex-direction: column;
			gap: 6px;

			.name-title {
				display: flex;
				align-items: baseline;
				gap: 10px;

				.name {
					font-size: 20px;
					font-weight: bold;
				}

				.title {
					font-size: 14px;
					background-color: rgba(255, 255, 255, 0.2);
					padding: 2px 6px;
					border-radius: 4px;
				}
			}

			.department {
				font-size: 15px;
			}

			.good-at {
				font-size: 13px;
				opacity: 0.9;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
				text-overflow: ellipsis;
				.tag {
					font-weight: bold;
					margin-right: 5px;
				}
			}
		}
	}
	
	/* --- 新增 Section 样式 --- */
	.section {
		background-color: #ffffff;
		border-radius: 8px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
		margin-bottom: 15px;
		overflow: hidden;
		
		.section-header {
			padding: 12px 15px;
			border-bottom: 1px solid #f0f0f0;
			
			.section-title {
				font-size: 16px;
				font-weight: bold;
				color: #303133;
				position: relative;
				padding-left: 10px;
				
				// 标题前的装饰竖线
				&::before {
					content: '';
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 4px;
					height: 16px;
					background-color: #409EFF;
					border-radius: 2px;
				}
			}
		}
		
		.section-body {
			padding: 15px;
		}
	}

	.introduction-text {
		font-size: 14px;
		line-height: 1.8;
		color: #606266;
	}

	// 挂号列表
	.schedule-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	// 挂号信息卡片 (无变动)
	.schedule-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px;
		border: 1px solid #e4e7ed;
		border-radius: 8px;
		transition: border-color 0.3s;

		&:hover {
			border-color: #409EFF;
		}

		.schedule-info {
			display: flex;
			align-items: center;
			gap: 20px;
			
			.date-info {
				text-align: center;
				.date {
					font-size: 15px;
					font-weight: bold;
					color: #303133;
				}
				.week {
					font-size: 13px;
					color: #909399;
				}
			}

			.meta-info {
				display: flex;
				flex-direction: column;
				gap: 5px;
				font-size: 14px;
				color: #606266;

				.highlight {
					color: #ff5722;
					font-weight: bold;
				}
			}
		}
	}
	
	// 空状态 (无变动)
	.empty-state {
		text-align: center;
		padding: 40px 0;
		color: #909399;
		font-size: 14px;
	}
</style>