<template>
	<view class="identity-container">
		<u--form :model="form" ref="formRef" labelPosition="top">
			<u-form-item label="用户类型" prop="userType" required>
				<u-radio-group v-model="form.userType">
					<u-radio name="student" label="学生"></u-radio>
					<u-radio name="teacher" label="老师"></u-radio>
				</u-radio-group>
			</u-form-item>

			<u-form-item :label="form.userType === 'student' ? '学号' : '教工号'" prop="cardNo" required>
				<u-input
					v-model="form.cardNo"
					placeholder="请输入学号或教工号"
					clearable
				></u-input>
			</u-form-item>

			<u-form-item label="证件照片（正反面）" required>
				<view class="upload-section">
					<u-upload
						:fileList="frontList"
						name="front"
						maxCount="1"
						@afterRead="afterRead"
						@delete="deleteFile"
					>
						<view class="upload-slot">
							<u-icon name="camera" size="36" color="#409EFF"></u-icon>
							<text>上传正面</text>
						</view>
					</u-upload>
					<u-upload
						:fileList="backList"
						name="back"
						maxCount="1"
						@afterRead="afterRead"
						@delete="deleteFile"
					>
						<view class="upload-slot">
							<text>上传反面</text>
						</view>
					</u-upload>
				</view>
			</u-form-item>
		</u--form>

		<view class="submit-section">
			<u-button
				type="primary"
				:loading="loading"
				text="提交认证"
				@click="submitForm"
			></u-button>
		</view>
	</view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { submitAuthApi, uploadPhoto } from '../../api/index.js';
import { onShow } from '@dcloudio/uni-app';
import { getWxUserByIdApi } from '../../api/index.js';

const form = reactive({
	userType: '', // 'student' or 'teacher'
	cardNo: '',
	cardFront: '',
	cardBack: ''
});

const loading = ref(false);
const frontList = ref([]);
const backList = ref([]);
const formRef = ref(null);

// 上传文件回调
const afterRead = async (event) => {
	const { file, name } = event;
	const uploadRes = await uploadPhoto(file.url);
	if (name === 'front') {
		form.cardFront = uploadRes.data;
		frontList.value = [{ url: uploadRes.data }];
	} else if (name === 'back') {
		form.cardBack = uploadRes.data;
		backList.value = [{ url: uploadRes.data }];
	}
};

// 删除文件
const deleteFile = (event) => {
	const { name } = event;
	if (name === 'front') {
		form.cardFront = '';
		frontList.value = [];
	} else if (name === 'back') {
		form.cardBack = '';
		backList.value = [];
	}
};

// 表单校验与提交
const submitForm = async () => {
	if (!form.userType) return uni.showToast({title: '请选择用户类型', icon: 'none'});
	if (!form.cardNo) return uni.showToast({title: '请输入卡号', icon: 'none'});
	if (!form.cardFront || !form.cardBack) return uni.showToast({title: '请上传身份验证照片', icon: 'none'});
	
	const userId = uni.getStorageSync("userId");
	const UserRes = await getWxUserByIdApi({userId});
	
	loading.value = true;
	try {
		const userName = UserRes.data.nickName;
		
		const res = await submitAuthApi({
			userType: form.userType,
			cardNo: form.cardNo,
			cardFront: form.cardFront,
			cardBack: form.cardBack,
			userId: Number(userId),
			username: userName
		});
		
		if (res && res.code === 200) {
			uni.showToast({ title: '提交成功', icon: 'success' });
			resetForm();
		} else {
			uni.showToast({ title: res.message || '提交失败', icon: 'none'});
		}
		uni.switchTab({
			url: "/pages/primary/primary"
		});
	} catch (err) {
		
		uni.showToast({title: '网络错误，请稍后再试', icon: 'none'});
	} finally {
		loading.value = false;
	}
};

// 重置表单
const resetForm = () => {
	Object.assign(form, { userType: '', cardNo: '', cardFront: '', cardBack: '' });
	frontList.value = [];
	backList.value = [];
};
</script>

<style lang="scss" scoped>
.identity-container {
	padding: 40rpx;
	background-color: #f7f8fa;
	min-height: 100vh;
}

.upload-section {
	display: flex;
	justify-content: space-between;
}

.upload-slot {
	width: 300rpx;
	height: 200rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 2rpx dashed #dcdfe6;
	border-radius: 16rpx;
	color: #909399;
	background-color: #ffffff;
}

.submit-section {
	margin-top: 60rpx;
}
</style>
