<template>
	<!-- 1. 页面容器，使用新的背景色 -->
	<view class="page-container">

		<!-- 2. 顶部渐变色装饰头 -->
		<view class="form-header">
			<text class="header-title">修改就诊人</text>
			<!-- 动态显示正在编辑的人名，更友好 -->
			<text class="header-subtitle">正在修改 {{userInfo.visitname || ''}} 的信息</text>
		</view>

		<!-- 3. 表单卡片容器 -->
		<view class="form-card">
			<uv-form :model="userInfo" :rules="rules" ref="upRef" labelPosition="left" labelWidth="90">

				<!-- 4. 采用 "框式" 布局和图标引导 -->
				<view class="form-field-wrapper">
					<uv-form-item prop="visitname" :borderBottom="false">
						<!-- 使用 label 插槽来放图标和文字 -->
						<template #label>
							<view class="form-label">
								<uv-icon name="account-fill" size="20" :color="themeColor"></uv-icon>
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
								<uv-icon name="tags-fill" size="20" :color="themeColor"></uv-icon>
								<text>性别</text>
							</view>
						</template>
						<!-- 将 radio 放在右侧, 并使用主题色 -->
						<uv-radio-group v-model="userInfo.sex" placement="row" :activeColor="themeColor">
							<uv-radio :customStyle="{marginRight: '25px'}" name="0" label="男"></uv-radio>
							<uv-radio name="1" label="女"></uv-radio>
						</uv-radio-group>
					</uv-form-item>
				</view>

				<!-- 点击事件改到父级 view 上，并添加右箭头图标 -->
				<view class="form-field-wrapper" @click="open">
					<uv-form-item prop="birthday" :borderBottom="false">
						<template #label>
							<view class="form-label">
								<uv-icon name="account-fill" size="20" :color="themeColor"></uv-icon>
								<text>出生日期</text>
							</view>
						</template>
						<uv-input v-model="userInfo.birthday" border="none" placeholder="请选择出生日期"
							placeholderClass="input-placeholder" bgColor="transparent" readonly>
						</uv-input>
						<!-- 添加向右的箭头 -->
					</uv-form-item>
				</view>

				<view class="form-field-wrapper">
					<uv-form-item prop="phone" :borderBottom="false">
						<template #label>
							<view class="form-label">
								<uv-icon name="phone-fill" size="20" :color="themeColor"></uv-icon>
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
								<uv-icon name="file-text-fill" size="20" :color="themeColor"></uv-icon>
								<text>身份证号</text>
							</view>
						</template>
						<uv-input v-model="userInfo.idCard" type="idcard" border="none" placeholder="请输入身份证号码"
							placeholderClass="input-placeholder" bgColor="transparent">
						</uv-input>
					</uv-form-item>
				</view>

				<!-- 5. 升级的 "高光" 提交按钮 -->
				<view class="submit-button-wrapper">
					<!-- 按钮文案改为 "保存修改" 更贴切 -->
					<uv-button text="保存修改" @click="submit" size="large" :customStyle="submitBtnStyle">
					</uv-button>
				</view>

			</uv-form>
		</view>

		<!-- 时间选择器 (使用主题色) -->
		<uv-datetime-picker ref="datetimePicker" v-model="times" mode="date" @confirm="confirm" :confirmColor="themeColor">
		</uv-datetime-picker>
	</view>
</template>

<script setup>
	import dayjs from 'dayjs'
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
		visitEditApi
	} from '../../api/index.js'

	// ======================================
	// *** 脚本修改点：美化与校验 ***
	// ======================================
	
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
	
	// 1. 定义主题色
	const themeColor = ref('#f39c12') // 温暖的橙色

	// 2. 动态计算按钮样式
	const submitBtnStyle = computed(() => ({
		'margin-top': '30px',
		'border': 'none',
		'border-radius': '50px',
		'font-size': '16px',
		'font-weight': '500',
		'background': themeColor.value, // 使用主题色
		'color': '#ffffff',
		// 使用主题色作为阴影
		'box-shadow': `0 4px 12px ${hexToRgba(themeColor.value, 0.3)}` 
	}))

	// 辅助函数：将HEX转为RGBA，用于阴影
	function hexToRgba(hex, opacity) {
		let rgba = "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," +
			parseInt("0x" + hex.slice(3, 5)) + "," +
			parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
		return rgba;
	}

	const open = () => {
		datetimePicker.value.open()
	}
	
	const confirm = (e) => {
		let timeValue = dayjs(e.value).format('YYYY-MM-DD');
		userInfo.birthday = timeValue
		// 选择后，手动触发校验
		upRef.value.validateField('birthday');
	}

	// 3. 自定义校验函数 - 校验出生日期
	const validateBirthday = (rule, value, callback) => {
		if (!value) {
			return callback(new Error('请选择出生日期'));
		}
		if (dayjs(value).isAfter(dayjs(), 'day')) {
			return callback(new Error('出生日期不能晚于今天'));
		}
		return callback(); // 校验通过
	};

	// 4. 强化表单验证规则
	const rules = reactive({
		'visitname': [
			{ required: true, message: '请输入真实姓名', trigger: ['blur', 'change'] },
			{ pattern: /^[\u4e00-\u9fa5a-zA-Z\s]{2,20}$/, message: '请输入2-20位的有效姓名', trigger: ['blur', 'change']}
		],
		'sex': [
			{ required: true, message: '请选择性别', trigger: ['blur', 'change'] }
		],
		'phone': [
			{ required: true, message: '请输入联系方式', trigger: ['blur', 'change'] },
			{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的11位手机号码', trigger: ['blur', 'change'] }
		],
		'birthday': [
			{ required: true, message: '请选择出生日期', trigger: ['change'] },
			{ validator: validateBirthday, trigger: 'change' } // 使用自定义校验
		],
		'idCard': [
			{ required: true, message: '请输入身份证号码', trigger: ['blur', 'change'] },
			{ pattern: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的18位身份证号码', trigger: ['blur', 'change'] }
		],
	})

	//表单确定
	const submit = () => {
		upRef.value.validate().then(async (vali) => {
			if(vali){
				//当前登录小程序的用户id
				console.log(uni.getStorageSync("userId"))
				userInfo.userId = uni.getStorageSync("userId")
				let res = await visitEditApi(userInfo)
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
	
	onLoad((option) => {
		try{
			const item = JSON.parse(decodeURIComponent(option.item))
			console.log(item)
			Object.assign(userInfo, item)
			// 设置日期选择器的默认时间
			if(item.birthday){
				times.value = dayjs(item.birthday).valueOf()
			}
		}catch(e){
			console.error("加载用户信息失败", e)
			uni.showToast({ title: '加载信息失败', icon: 'error' })
		}
	})
	
	onReady(() => {
		upRef.value.setRules(rules)
	})
</script>

<style lang="scss">
	/* 1. 页面整体背景 */
	page {
		background-color: #f8f8f8;
	}

	.page-container {
		padding-bottom: 40px;
	}

	/* 2. 顶部渐变色装饰头 */
	.form-header {
		height: 150px; // 降低一点高度
		// 使用更柔和的橙色渐变
		background: linear-gradient(135deg, #f39c12, #f1c40f); 
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
			color: rgba(255, 255, 255, 0.9);
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
		border: 1px solid transparent; // 默认透明边框
		transition: border-color 0.2s;
		
		// 模拟 :focus-within 效果，H5中有效
		&:focus-within {
			border-color: #f39c12; // 聚焦时显示主题色边框
		}

		// 解决 uv-form-item 默认的一些样式问题
		::v-deep .uv-form-item__body {
			padding: 10px 0 !important;
		}
		
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