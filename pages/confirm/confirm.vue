<template>
	<view class="container">
		<uv-form :model="userInfo" :rules="rules" ref="upRef">
			<uv-form-item labelWidth="90" label="挂号科室:" borderBottom>
				{{userInfo.deptName}}
			</uv-form-item>
			<uv-form-item labelWidth="90" label="挂号医生:" borderBottom>
				{{userInfo.doctorName}}
			</uv-form-item>
			<uv-form-item labelWidth="90" label="医生职称:" borderBottom>
				{{userInfo.jobTitle}}
			</uv-form-item>
			<uv-form-item @click="open" labelWidth="90" label="挂号日期:" borderBottom>
				{{userInfo.times}}({{userInfo.week}})
			</uv-form-item>
			<uv-form-item labelWidth="90" label="挂号时段:" prop="timesArea" borderBottom>
				<uv-radio-group v-model="userInfo.timesArea" placement="row">
					<uv-radio :customStyle="{marginLeft: '16px',marginRight: '25px'}" name="0" label="上午"></uv-radio>
					<uv-radio :customStyle="{marginRight: '16px'}" name="1" label="下午"></uv-radio>
				</uv-radio-group>
			</uv-form-item>
			<uv-form-item @click="open" labelWidth="90" label="就诊地址:" borderBottom>
				{{userInfo.address}}
			</uv-form-item>
			<uv-form-item labelWidth="90" label="就诊人:" prop="visitorName" borderBottom @click="showSexSelect">
				<uv-input v-model="userInfo.visitorName" disabled disabledColor="#ffffff" placeholder="请选择就诊人"
					border="none">
				</uv-input>
				<template v-slot:right>
					<uv-icon name="arrow-right"></uv-icon>
				</template>
			</uv-form-item>
			<uv-form-item @click="open" labelWidth="90" label="挂号费用:" prop="price" borderBottom>
				￥{{userInfo.price}}
			</uv-form-item>
			<uv-action-sheet ref="sexSelect" :actions="actions" title="请选择就诊人" @select="selectBtn">
			</uv-action-sheet>
			<uv-button type="primary" text="确定挂号" customStyle="margin-top: 50px;background:#1695F1;border:none;"
				@click="commit"></uv-button>

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
	//表单验证规则
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
						url: "/pages/order/order"
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
	page {
		background-color: #FFF;
	}

	.container {
		padding: 0rpx 30rpx;
	}
</style>