<template>
	<view class="container">
		
		<view class="form-card">
			<uv-form labelPosition="left" :model="addModel" :rules="rules" ref="addRef">
				
				<uv-form-item label="问题:" prop="title" borderBottom>
					<uv-input placeholder="请输入您的问题或标题" v-model="addModel.title" border="none">
					</uv-input>
				</uv-form-item>
				
				<uv-form-item label="详细:" prop="content" :customStyle="{marginTop: '10px'}">
					<view class="textarea-wrapper">
						<uv-textarea 
							placeholder="请详细描述您的问题或建议..." 
							v-model="addModel.content" 
							border="none"
							count 
							maxlength="200"
							:customStyle="{backgroundColor: 'transparent'}"
						>
						</uv-textarea>
					</view>
				</uv-form-item>

			</uv-form>
		</view>

		<view class="action-area">
			<uv-button 
				type="primary" 
				text="确定提交" 
				:customStyle="{
					background: 'linear-gradient(135deg, #5EB9FF 0%, #409EFF 100%)',
					border: 'none',
					boxShadow: '0 8rpx 20rpx rgba(64, 158, 255, 0.3)'
				}"
				shape="circle" 
				@click="commit"
			></uv-button>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		addSuggestApi
	} from '../../api/index.js'
	const addRef = ref();
	//表单绑定对象
	const addModel = reactive({
		title: '',
		content: '',
		userId: uni.getStorageSync("userId")
	})
	//表单验证规则
	const rules = reactive({
		'title': {
			type: 'string',
			required: true,
			message: '请输入标题',
			trigger: ['blur', 'change']
		},
		'content': {
			type: 'string',
			required: true,
			message: '请输入详细内容',
			trigger: ['blur', 'change']
		}
	})
	const commit = async () => {
		addRef.value.validate().then(async (res) => {
			console.log(res)
			let result = await addSuggestApi(addModel)
			if (result && result.code == 200) {
				// 提交成功后提示
				uni.showToast({
					title: '提交成功',
					icon: 'success'
				});
				// 1.5秒后返回
				setTimeout(() => {
					uni.navigateBack();
				}, 1500);
			}
		})
	}
</script>

<style lang="scss">
	/* 1. 设置页面背景色 */
	page {
		background-color: #F5F6FA;
	}

	.container {
		padding: 30rpx;
	}

	/* 2. 表单卡片样式 */
	.form-card {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 10rpx 30rpx 30rpx 30rpx;
		box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.05);
	}

	/* 3. 多行输入框的自定义容器 */
	.textarea-wrapper {
		width: 100%;
		background-color: #F8F9FA; /* 浅灰色背景 */
		border-radius: 10rpx;
		padding: 20rpx;
		margin-top: 10rpx;
		box-sizing: border-box; /* 确保 padding 不会撑开宽度 */
	}

	/* 4. 底部按钮区域 */
	.action-area {
		margin-top: 60rpx;
	}

	/* --- :deep 样式穿透，修改组件内部 --- */

	/* 5. 确保 textarea-wrapper 能100%宽度 */
	:deep(.uv-form-item__body__right__content__slot) {
		width: 100%;
	}

	/* 6. 修改表单标签 */
	:deep(.uv-form-item__body__left__content__label) {
		color: #303133 !important; /* 标准黑色 */
		font-weight: bold;
		font-size: 30rpx;
	}

	/* 7. 修改输入框内文字颜色 */
	:deep(.uv-input__content__field-wrapper__field),
	:deep(.uv-textarea__field) {
		color: #303133 !important;
		font-size: 28rpx;
	}

	/* 8. 修改占位符文字颜色 */
	:deep(input::placeholder),
	:deep(textarea::placeholder) {
		color: #C0C4CC !important; /* 标准灰色 */
	}
</style>