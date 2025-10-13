<template>
	<view class="logincontainner">
		<view class="userImg">
			<uv-image src="/static/user.jpg" shape="circle" width="80px" height="80px"></uv-image>
		</view>
		<uv-form labelWidth="70" labelPosition="left" :model="userInfo" :rules="rules" ref="formRef">
			<uv-form-item label="姓名:" prop="name" borderBottom>
				<uv-input placeholder="请输入姓名" v-model="userInfo.name" border="none">
				</uv-input>
			</uv-form-item>
			<uv-form-item label="联系方式:" prop="phone" borderBottom>
				<uv-input type='number' placeholder="请输入联系方式" v-model="userInfo.phone" border="none">
				</uv-input>
			</uv-form-item>
			<uv-form-item label="账号:" prop="userName" borderBottom>
				<uv-input placeholder="请输入账号" v-model="userInfo.userName" border="none">
				</uv-input>
			</uv-form-item>
			<uv-form-item label="密码:" prop="password" borderBottom>
				<uv-input type='password' placeholder="请输入密码" v-model="userInfo.password" border="none">
				</uv-input>
			</uv-form-item>
			<uv-form-item label="确定密码:" prop="confirm" borderBottom>
				<uv-input type='password' placeholder="请输入密码" v-model="userInfo.confirm" border="none">
				</uv-input>
			</uv-form-item>
		</uv-form>
		<view class="loginBtn">
			<uv-button color="#7C4DFF" type="primary" text="注册" customStyle="margin-top: 10px;background:#7C4DFF;"
				@click="commit">
			</uv-button>
			<uv-button color="#7C4DFF" type="primary" text="登录" customStyle="margin-top: 30px;background:#7C4DFF;"
				@click="toLogin">
			</uv-button>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		registerApi
	} from '../../api/index.js'
	const addRef = ref();
	//表单ref属性
	const formRef = ref()

	//表单绑定的对象
	const userInfo = reactive({
		userName: '',
		password: '',
		confirm: '',
		phone: '',
		name: ''
	})
	//表单验证规则
	const rules = reactive({
		'name': {
			type: 'string',
			required: true,
			message: '请填写姓名',
			trigger: ['blur', 'change']
		},
		'phone': {
			type: 'string',
			required: true,
			message: '请填写联系方式',
			trigger: ['blur', 'change']
		},
		'userName': {
			type: 'string',
			required: true,
			message: '请输入账号',
			trigger: ['blur', 'change']
		},
		'password': {
			type: 'string',
			required: true,
			message: '请输入密码',
			trigger: ['blur', 'change']
		},
		confirm: [{
			required: true,
			message: '请输入确定密码',
			// blur和change事件触发检验
			trigger: ['blur', 'change']
		}, {
			// 自定义验证函数，见上说明，注意这里面的逻辑不能出现语法报错，否则可能导致不验证
			validator: (rule, value, callback) => {
				console.log(value)
				if (value != userInfo.password) {
					return false;
				}
				// 此处业务逻辑省略
				// 返回true表校验通过，返回false表示不通过
				return true;
			},
			message: '密码和确定密码不一致',
			trigger: ['blur']
		}]
	})
	//登录
	const toLogin = () => {
		uni.navigateTo({
			url: '/pages/login/login'
		})
	}
	const commit = async () => {
		formRef.value.validate().then(async (vali) => {
			console.log(vali)
			let res = await registerApi(userInfo)
			console.log(res)
			if (res && res.code == 200) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		})
	}
</script>

<style scoped lang="scss">
	/* 新增了字体颜色修改 */
	:deep(.uv-form-item__body__left__content__label) {
		color: #4A4A4A !important;
	}

	:deep(.uv-input__content__field-wrapper__field) {
		color: #333333 !important;
	}

	:deep(input::placeholder) {
		color: #BDBDBD !important;
	}


	.logincontainner {
		padding: 30px 50rpx;

		.userImg {
			padding: 30px 20px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.loginBtn {
			margin-top: 50px;
		}
	}
</style>