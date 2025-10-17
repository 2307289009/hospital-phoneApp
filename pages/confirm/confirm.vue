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
						<uv-radio :customStyle="{marginLeft: '16px', marginRight: '25px'}" name="0" label="上午"></uv-radio>
						<uv-radio :customStyle="{marginRight: '16px'}" name="1" label="下午"></uv-radio>
					</uv-radio-group>
				</uv-form-item>
				
				<uv-form-item label="就诊人" prop="visitorName" :borderBottom="false" labelWidth="90" @click="showSexSelect">
					<view class="visitor-selector" :class="{'selected': userInfo.visitorName}">
						{{ userInfo.visitorName || '请选择就诊人' }}
					</view>
					<template v-slot:right>
						<uv-icon name="arrow-right"></uv-icon>
					</template>
				</uv-form-item>
			</view>

			<view class="cost-summary">
				<text class="cost-label">挂号费用</text>
				<text class="cost-value">￥{{ userInfo.price }}</text>
			</view>
			
			<uv-action-sheet ref="sexSelect" :actions="actions" title="请选择就诊人" @select="selectBtn">
			</uv-action-sheet>

			<view class="footer-actions">
				<uv-button type="primary" text="确定挂号" @click="commit" size="large" shape="circle"></uv-button>
			</view>
		</uv-form>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		onReady,
		onLoad
	} from '@dcloudio/uni-app'
	import {
		getSelectVisitListApi,
		makeOrderAddApi
	} from '../../api/index.js'
	const upRef = ref()
	const sexSelect = ref()
	const actions = ref([])
	const userInfo = reactive({
		scheduleId:'',
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
		price: ''
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
	const selectBtn = (e) => {
		console.log(e)
		userInfo.visitUserId = e.visitId
		userInfo.visitorName = e.name
	}
	const commit = async () => {
		console.log('进来了')
		upRef.value.validate().then(async(res) => {
			if (res) {
				let result = await makeOrderAddApi(userInfo)
				if (result && result.code == 200) {
					uni.redirectTo({
						url: "/pages/record/record"
					})
				}
			}
		})
	}
	const getSelectVisitList = async () => {
		let res = await getSelectVisitListApi({
			"userId": uni.getStorageSync("userId")
		})
		if (res && res.code == 200) {
			actions.value = res.data
		}
	}
	onLoad((option) => {
		const item = JSON.parse(decodeURIComponent(option.item))
		console.log(item)
		Object.assign(userInfo, item)
	})
	onReady(() => {
		upRef.value.setRules(rules)
		getSelectVisitList()
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
		justify-content: space-between;
		align-items: center;
		padding: 20px 10px;
		font-size: 16px;
		
		.cost-label {
			color: #606266;
		}
		
		.cost-value {
			color: #fa3534;
			font-size: 20px;
			font-weight: bold;
		}
	}

	// Footer button container
	.footer-actions {
		padding-top: 20px;
	}
</style>