<template>
	<view class="page-container">

		<view class="form-header">
			<text class="header-title">添加就诊人</text>
			<text class="header-subtitle">请填写真实的就诊信息</text>
		</view>

		<view class="form-card">
			<uv-form :model="userInfo" :rules="rules" ref="upRef" labelPosition="left" labelWidth="80">

				<view class="form-field-wrapper">
					<uv-form-item prop="visitname" :borderBottom="false">
						<template #label>
							<view class="form-label">
								<uv-icon name="account-fill" size="20" color="#007AFF"></uv-icon>
								<text>姓名</text>
							</view>
						</template>
						<uv-input v-model="userInfo.visitname" border="none" placeholder="请输入真实姓名"
							placeholderClass="input-placeholder" bgColor="transparent">
						</uv-input>
					</uv-form-item>
				</view>

				<view class="form-field-wrapper sex-field">
					<uv-form-item prop="sex" :borderBottom="false">
						<template #label>
							<view class="form-label">
								<uv-icon name="tags-fill" size="20" color="#007AFF"></uv-icon>
								<text>性别</text>
							</view>
						</template>
						<uv-radio-group v-model="userInfo.sex" placement="row" class="radio-group">
							<uv-radio :customStyle="{marginRight: '25px'}" name="0" label="男"></uv-radio>
							<uv-radio name="1" label="女"></uv-radio>
						</uv-radio-group>
					</uv-form-item>
				</view>

				<view class="form-field-wrapper" @click="open">
					<uv-form-item prop="birthday" :borderBottom="false">
						<template #label>
							<view class="form-label">
								<uv-icon name="tags-fill" size="20" color="#007AFF"></uv-icon>
								<text>出生日期</text>
							</view>
						</template>
						<uv-input v-model="userInfo.birthday" border="none" placeholder=""
							placeholderClass="input-placeholder" bgColor="transparent" readonly>
						</uv-input>
					</uv-form-item>
				</view>

				<view class="form-field-wrapper">
					<uv-form-item prop="phone" :borderBottom="false">
						<template #label>
							<view class="form-label">
								<uv-icon name="phone-fill" size="20" color="#007AFF"></uv-icon>
								<text>联系方式</text>
							</view>
						</template>
						<uv-input v-model="userInfo.phone" type="number" border="none" placeholder="请输入手机号码"
							placeholderClass="input-placeholder" bgColor="transparent">
						</uv-input>
					</uv-form-item>
				</view>

				<view class="form-field-wrapper">
					<uv-form-item prop="idCard" :borderBottom="false">
						<template #label>
							<view class="form-label">
								<uv-icon name="file-text-fill" size="20" color="#007AFF"></uv-icon>
								<text>身份证</text>
							</view>
						</template>
						<uv-input v-model="userInfo.idCard" type="idcard" border="none" placeholder="请输入身份证号码"
							placeholderClass="input-placeholder" bgColor="transparent">
						</uv-input>
					</uv-form-item>
				</view>

				<view class="submit-button-wrapper">
					<uv-button text="立即添加" @click="submit" size="large" customStyle="
						margin-top: 30px;
						border: none;
						border-radius: 50px;
						font-size: 16px;
						font-weight: 500;
						background: linear-gradient(to right, #007aff, #0056b3);
						color: #ffffff;
						box-shadow: 0 4px 12px rgba(0, 100, 255, 0.3);
					"></uv-button>
				</view>

			</uv-form>
		</view>

		<uv-datetime-picker ref="datetimePicker" v-model="times" mode="date" @confirm="confirm">
		</uv-datetime-picker>
	</view>
</template>

<script setup>
	import dayjs from 'dayjs'
	import {
		reactive,
		ref
	} from 'vue';
	import {
		onReady
	} from '@dcloudio/uni-app'
	import {
		visitAddApi
	} from '../../api/index.js'
	const upRef = ref()
	const times = ref(Number(new Date()))
	const datetimePicker = ref()
	const userInfo = reactive({
		visitId: '',
		userId: '',
		visitname: '',
		sex: '',
		phone: '',
		birthday: '',
		idCard: ''
	})
	const open = () => {
		datetimePicker.value.open()
	}
	const confirm = (e) => {
		let timeValue = dayjs(e.value).format('YYYY-MM-DD');
		userInfo.birthday = timeValue
		
		// 选择日期后，手动触发该字段的校验
		upRef.value.validateField('birthday');
	}
	
	// ======================================
	// *** 脚本修改点：强化校验规则 ***
	// ======================================

	/**
	 * 新增：自定义校验函数，用于校验出生日期
	 * @param {Object} rule - 规则
	 * @param {string} value - 值
	 * @param {Function} callback - 回调
	 */
	const validateBirthday = (rule, value, callback) => {
		if (!value) {
			// 'required: true' 会处理空值，这里是双重保险
			return callback(new Error('请选择出生日期'));
		}
		// 使用 dayjs 比较日期
		if (dayjs(value).isAfter(dayjs(), 'day')) {
			// 如果选择的日期在今天之后
			return callback(new Error('出生日期不能晚于今天'));
		}
		return callback(); // 校验通过
	};


	//表单验证规则 (已强化)
	const rules = reactive({
		'visitname': [
			{
				required: true,
				message: '请输入真实姓名',
				trigger: ['blur', 'change']
			},
			{
				// 2-20位字符，可以是中文、英文、空格
				pattern: /^[\u4e00-\u9fa5a-zA-Z\s]{2,20}$/,
				message: '请输入2-20位的有效姓名',
				trigger: ['blur', 'change']
			}
		],
		'sex': [
			{
				required: true,
				message: '请选择性别',
				trigger: ['blur', 'change']
			}
		],
		'phone': [
			{
				required: true,
				message: '请输入联系方式',
				trigger: ['blur', 'change']
			},
			{
				// 中国大陆11位手机号
				pattern: /^1[3-9]\d{9}$/,
				message: '请输入正确的11位手机号码',
				trigger: ['blur', 'change']
			}
		],
		'birthday': [
			{
				required: true,
				message: '请选择出生日期',
				trigger: ['change'] // 仅在 'change' 时触发
			},
			{
				// 新增：自定义校验函数
				validator: validateBirthday,
				trigger: 'change'
			}
		],
		'idCard': [
			{
				required: true,
				message: '请输入身份证号码',
				trigger: ['blur', 'change']
			},
			{
				// 18位身份证号码 (最后一位可以是 X)
				pattern: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
				message: '请输入正确的18位身份证号码',
				trigger: ['blur', 'change']
			}
		],
	})

	//表单确定
	const submit = () => {
		upRef.value.validate().then(async (vali) => {
			if(vali){
				//当前登录小程序的用户id
				console.log(uni.getStorageSync("userId"))
				userInfo.userId = uni.getStorageSync("userId")
				let res = await visitAddApi(userInfo)
				if (res && res.code == 200) {
					//关闭当前页面
					uni.navigateBack({
						delta: 1,
					});
				}
			}
		}).catch(err => {
			console.log('表单校验失败', err)
		})
	}

	onReady(() => {
		upRef.value.setRules(rules)
	})
</script>

<style lang="scss">
	/* 1. 页面整体背景 */
	page {
		background-color: #f4f7fa;
	}

	.page-container {
		padding-bottom: 40px;
	}

	/* 2. 顶部渐变色装饰头 */
	.form-header {
		height: 160px;
		background: linear-gradient(135deg, #007aff, #00c6ff);
		border-bottom-left-radius: 30px;
		border-bottom-right-radius: 30px;
		padding: 30px;
		color: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		.header-title {
			font-size: 24px;
			font-weight: bold;
		}

		.header-subtitle {
			font-size: 14px;
			color: rgba(255, 255, 255, 0.8);
			margin-top: 5px;
		}
	}

	/* 3. 表单卡片容器 */
	.form-card {
		background-color: #ffffff;
		// 使用负 margin 使其上浮到 header 上
		margin: -30px 15px 0 15px;
		padding: 25px;
		border-radius: 12px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
	}

	/* 4. "框式" 表单项容器 */
	.form-field-wrapper {
		background-color: #f7f9fc; // 浅灰色底
		border-radius: 10px;
		margin-bottom: 18px; // 增加项间距
		padding: 0 12px; // 左右内边距

		// 解决 uv-form-item 默认的一些样式问题
		// uni-app H5 端可能需要
		::v-deep .uv-form-item__body {
			padding: 10px 0 !important;
		}

		// 小程序端可能需要
		::v-deep .u-form-item__body {
			padding: 10px 0 !important;
		}
	}

	/* 特殊处理性别字段，使其内部对齐 */
	.sex-field {
		::v-deep .uv-form-item__body__right {
			justify-content: flex-end;
		}

		::v-deep .u-form-item__body__right {
			justify-content: flex-end;
		}
	}

	/* 表单项的 Label 样式 (图标 + 文字) */
	.form-label {
		display: flex;
		align-items: center;
		gap: 8px; // 图标和文字的间距
		font-size: 15px;
		color: #333; // 标签文字颜色
	}

	/* 输入框的 placeholder 样式 */
	.input-placeholder {
		color: #aaaaaa;
		font-size: 15px;
	}

	/* 5. 提交按钮容器 */
	.submit-button-wrapper {
		padding: 0 10px; // 让按钮稍微窄一点，留出呼吸空间
	}
</style>