<template>
	<view class="page-container">
		<uv-form :model="userInfo" :rules="rules" ref="upRef">

			<view class="info-card">
				<view class="card-title">预约详情</view>
				<view class="info-row">
					<uv-icon name="map-fill" color="#2979ff" size="20"></uv-icon>
					<text class="label">挂号科室</text>
					<text class="value">{{ userInfo.deptName }}</text>
				</view>
				<view class="info-row">
					<uv-icon name="account-fill" color="#2979ff" size="20"></uv-icon>
					<text class="label">挂号医生</text>
					<text class="value">{{ userInfo.doctorName }} ({{ userInfo.jobTitle }})</text>
				</view>
				<view class="info-row">
					<uv-icon name="account-fill" color="#2979ff" size="20"></uv-icon>
					<text class="label">挂号日期</text>
					<text class="value">{{ userInfo.times }} ({{ userInfo.week }})</text>
				</view>
				<view class="info-row">
					<uv-icon name="home-fill" color="#2979ff" size="20"></uv-icon>
					<text class="label">就诊地址</text>
					<text class="value address">{{ userInfo.address }}</text>
				</view>
			</view>

			<view class="info-card">
				<view class="card-title">挂号信息</view>
				<uv-form-item label="就诊时段" prop="timesArea" :borderBottom="true" labelWidth="90">
					<uv-radio-group v-model="userInfo.timesArea" placement="row">
						<uv-radio :customStyle="{marginLeft: '16px', marginRight: '25px'}" name="0"
							label="上午" disabled></uv-radio>
						<uv-radio :customStyle="{marginRight: '16px'}" name="1" label="下午" disabled></uv-radio>
					</uv-radio-group>
				</uv-form-item>

				<uv-form-item label="就诊人" prop="visitorName" :borderBottom="false" labelWidth="90"
					@click="showSexSelect">
					<view class="visitor-selector" :class="{'selected': userInfo.visitorName}">
						{{ userInfo.visitorName || '请选择就诊人' }}
					</view>
					<template v-slot:right>
						<uv-icon name="arrow-right"></uv-icon>
					</template>
				</uv-form-item>
			</view>

            <view class="cost-summary">
                <view class="cost-row">
                  <text class="cost-label">原价</text>
                  <text class="cost-value">￥{{ originPrice }}</text>
                </view>
                <view class="cost-row">
                  <text class="cost-label">实际支付</text>
                  <text class="cost-value">￥{{ actualPrice }}</text>
                </view>
                <view v-if="identityStatusHint" class="discount-hint">{{ identityStatusHint }}</view>
            </view>

			<uv-action-sheet ref="sexSelect" :actions="actions" title="请选择就诊人" @select="selectBtn">
			</uv-action-sheet>

			<view class="footer-actions">
				<uv-button type="primary" :text="userInfo.mode === 'waitlist' ? '加入候补' : '确定挂号'" @click="commit" size="large" shape="circle" :loading="isSubmitting"></uv-button>
			</view>
			
		</uv-form>
		<Verify
			ref="verifyRef"
			:mode="'pop'"
			:captchaType="'blockPuzzle'"
			:imgSize="{ width: '330px', height: '155px' }"
			@success="onVerifySuccess"
		></Verify>
	</view>
</template>

<script setup>
  import {
    reactive,
    ref,
    computed
  } from 'vue';
	import {
		onReady,
		onLoad
	} from '@dcloudio/uni-app'
  import {
    getSelectVisitListApi,
    makeOrderAddApi,
    joinWaitlistApi,
    getWxUserByIdApi
  } from '../../api/index.js'
  import Verify from '@/pages/verify/verify.vue';
	const upRef = ref()
	const sexSelect = ref()
	const actions = ref([])
	const isSubmitting = ref(false)
	const verifyRef = ref(null)
	
	
  const userInfo = reactive({
		scheduleId: '',
		userId: uni.getStorageSync("userId"),
		deptName: '',
		doctorId: "",
		doctorName: '',
		times: '',
		week: '',
		address: '',
		timesArea: '0',
		visitUserId: '',
		visitorName: '',
		jobTitle: '',
        price: '',
        identityStatus: '',
        mode: 'order'
  })
	const rules = reactive({
		'timesArea': {
			type: 'string',
			required: true,
			message: '就诊时段',
			trigger: ['blur', 'change']
		},
		'visitorName': {
			type: 'string',
			required: true,
			message: '就诊人',
			trigger: ['blur', 'change']
		}
	})
	const showSexSelect = () => {
		sexSelect.value.open();
	}
	
	const calcAge = (birthStr) => {
		const parts = birthStr.split("-");
		if (parts.length !== 3) {
			return NaN;
		}

		const [y, m, d] = parts.map(Number);
		const birth = new Date(y, m - 1, d);

		if (isNaN(birth.getTime())) {
			return NaN;
		} 
		const now = new Date();
		let age = now.getFullYear() - birth.getFullYear();

		const hasBirthdayPassed = now.getMonth() > birth.getMonth() ||
			(now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());

		if (!hasBirthdayPassed) {
			age --
		}

		return age;
	}
	
	const selectBtn = (e) => {
		const birthStr = e.birthday;
		const age = calcAge(birthStr);
		if(age >= 18 && userInfo.deptName === "儿科") {
			uni.showModal({
			  title: '提示',
			  content: '患者已成年，无法在儿科就诊，请选择其他科室进行挂号', 
			  showCancel: false
			})
			return;
		}
		
		const sex = e.sex;
		if(sex == '0' && userInfo.deptName === "妇产科") {
			uni.showModal({
			  title: '提示',
			  content: '男性患者不应在妇产科就诊，请确认您要挂的科室', 
			  showCancel: false
			})
			return;
		}
		userInfo.visitUserId = e.visitId
		userInfo.visitorName = e.name
	}
	const getIdentity = async () => {
		const uid = uni.getStorageSync("userId");
		if (!uid) return;
		try {
			const res = await getWxUserByIdApi({ userId: uid });
				if (res && res.code === 200 && res.data) {
				userInfo.identityStatus = res.data.identityStatus || '';
			}
		} catch (e) {}
	}
  const actualPrice = computed(() => {
    const p = Number(userInfo.price || 0);
    const s = (userInfo.identityStatus || '').trim();
    if (s === '学生') return (p * 0.05).toFixed(2);
    if (s === '教师') return (p * 0.10).toFixed(2);
    return p.toFixed(2);
  })
  const originPrice = computed(() => {
    const p = Number(userInfo.price || 0);
    return p.toFixed(2);
  })
  const identityStatusHint = computed(() => {
    const s = (userInfo.identityStatus || '').trim();
    if (s === '学生') return '已按学生95%报销';
    if (s === '教师') return '已按教师90%报销';
    return '';
  })
	
	const commit = async () => {
			if (isSubmitting.value) return;
			
			upRef.value.validate().then((res) => {
				if (res) {
					// 唤起 AJ-Captcha 验证码
					if (verifyRef.value) {
						verifyRef.value.show();
					}
				}
			}).catch(err => {
				console.log(err);
				uni.showToast({ title: '请检查表单', icon: 'none' });
			})
		}

	
		const onVerifySuccess = (params) => {
			console.log('AJ-Captcha 验证成功', params);
			// 验证成功后，关闭验证弹窗并提交挂号
			if (verifyRef.value) {
				verifyRef.value.clickShow = false;
			}
			submitToServer();
		}

	const submitToServer = async () => {
		isSubmitting.value = true;
		try {
			// 1. 处理候补模式 (保留自 Origin)
			if (userInfo.mode === 'waitlist') {
				const params = {
					scheduleId: userInfo.scheduleId,
					userId: userInfo.userId,
					visitUserId: userInfo.visitUserId,
					doctorId: userInfo.doctorId
				};
				let res = await joinWaitlistApi(params);
				if (res && res.code == 200) {
					uni.showToast({
						title: '已加入候补队列',
						icon: 'success'
					});
					uni.navigateBack();
				} else {
					uni.showToast({
						title: res.msg || '候补失败',
						icon: 'none'
					});
				}
			} 
			// 2. 处理普通挂号模式 (保留自 HEAD 的日志逻辑 + Origin 的结构)
			else {
				const params = {
					userId: userInfo.userId,
					scheduleId: userInfo.scheduleId,
					visitUserId: userInfo.visitUserId,
					doctorId: userInfo.doctorId,
					times: userInfo.times,
					timesArea: userInfo.timesArea,
					week: userInfo.week,
					address: userInfo.address
				};

				console.log(params); // 保留 HEAD 的调试输出

				let res = await makeOrderAddApi(params);

				if (res && res.code == 200) {
					uni.redirectTo({
						url: "/pages/record/record"
					});
				} else {
					// 保留 HEAD 的耗时计算逻辑
					const end = Date.now();
					const start = uni.getStorageSync("start2")
					console.log(`挂号所需时间${end-start}ms`)
					uni.showToast({
						title: res.msg || '挂号失败',
						icon: 'none'
					});
				}
			}
		} catch (error) {
			console.error('提交异常', error);
		} finally {
			isSubmitting.value = false;
		}
	}

	const getSelectVisitList = async () => {
		let res = await getSelectVisitListApi({
			"userId": uni.getStorageSync("userId")
		})
		if (res && res.code == 200) {
			console.log("visiter datas: ", res.data);
			actions.value = res.data
		}
	}
	onLoad((option) => {
		const item = JSON.parse(decodeURIComponent(option.item))
		console.log("item:",item)
		Object.assign(userInfo, item)
	})
  onReady(() => {
    upRef.value.setRules(rules)
    getSelectVisitList()
    getIdentity()
  })
</script>

<style lang="scss">
	// Global page style
	page {
		background-color: #f5f7fa;
	}

	.page-container {
		padding: 15px;
	}

	// Card style
	.info-card {
		background-color: #ffffff;
		border-radius: 12px;
		padding: 15px;
		margin-bottom: 15px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

		.card-title {
			font-size: 18px;
			font-weight: bold;
			color: #303133;
			margin-bottom: 15px;
			padding-bottom: 10px;
			border-bottom: 1px solid #f0f0f0;
		}
	}

	// Style for rows within the details card
	.info-row {
		display: flex;
		align-items: center;
		padding: 10px 0;
		font-size: 15px;

		.label {
			color: #606266;
			margin-left: 10px;
			width: 80px; // Fixed width for alignment
		}

		.value {
			color: #303133;
			font-weight: 500;
			flex: 1;
			text-align: right;
		}

		.address {
			white-space: normal; // Allow address to wrap
		}
	}

	// Style for the patient selector text
	.visitor-selector {
		color: #c0c4cc; // Placeholder color
		text-align: right;
		width: 100%;

		&.selected {
			color: #303133; // Selected text color
		}
	}

	// Override default form item padding for better look
	.uv-form-item {
		padding: 5px 0 !important;
	}

	// Cost summary section
.cost-summary {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px 10px;
    font-size: 16px;

    .cost-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .cost-label {
        color: #606266;
    }

    .cost-value {
        color: #fa3534;
        font-size: 20px;
        font-weight: bold;
    }

    .discount-hint {
        color: #909399;
        font-size: 14px;
        text-align: right;
    }
}

	// Footer button container
	.footer-actions {
		padding-top: 20px;
	}

	.mock-verify-content {
		width: 100%;
		
		// 统一的容器样式
		.mock-state-view {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			// 增加高度和内边距，让模态框不那么小
			padding-top: 20px;
			padding-bottom: 30px;
			min-height: 100px;
		}
		
		.success-text {
			font-size: 16px;
			color: #303133;
			margin-top: 15px;
		}
		
		// 覆盖 uv-loading-icon 的默认样式
		.uv-loading-icon {
			flex-direction: column;
			.uv-loading-icon__text {
				margin-top: 15px;
				margin-left: 0 !important;
			}
		}
	}
</style>