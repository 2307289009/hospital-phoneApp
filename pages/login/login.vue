<template>
	<view class="logincontainner">
		<view class="userImg">
			<uv-image src="/static/user.jpg" shape="circle" width="80px" height="80px"></uv-image>
		</view>
		<uv-form labelWidth="80" labelPosition="left" :model="addModel" :rules="rules" ref="addRef">
			<uv-form-item label="账号:" prop="userName" borderBottom>
				<uv-input placeholder="账号" v-model="addModel.userName" border="none">
				</uv-input>
			</uv-form-item>
			<uv-form-item label="密码:" prop="password" borderBottom>
				<uv-input password placeholder="密码" v-model="addModel.password" border="none">
				</uv-input>
			</uv-form-item>
			<view class="loginBtn">
				<uv-button type="primary" text="登录" customStyle="margin-top: 10px;background:#19be6b;"
					@click="commit"></uv-button>
				<uv-button type="primary" text="注册" customStyle="margin-top: 30px;background:#ff9900;"
					@click="toRegister"></uv-button>
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
		loginApi
	} from '../../api/index.js'
	const addRef = ref();
	//表单绑定对象
	const addModel = reactive({
		userName: '',
		password: ''
	})
	//表单验证规则
	const rules = reactive({
		'userName': {
			type: 'string',
			required: true,
			message: '账号',
			trigger: ['blur', 'change']
		},
		'password': {
			type: 'string',
			required: true,
			message: '密码',
			trigger: ['blur', 'change']
		}
	})
	//去注册
	const toRegister = () => {
		uni.navigateTo({
			url: '/pages/register/register'
		})
	}
	const commit = async () => {
		addRef.value.validate().then(async (vali) => {
			console.log(vali)
			console.log(addModel)
			let res = await loginApi(addModel)
			if(res && res.code == 200){
				console.log(res.data)
				//存储用户的信息
				uni.setStorageSync("userId",res.data.userId)
				uni.switchTab({
					url: '../index/index'
				})
			}
		})

	}
</script>

<style lang="scss">
	page {
		background-color: #FFF;
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