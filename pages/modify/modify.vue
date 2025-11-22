<template>
  <view class="page-container">
    
    <view class="header-section">
      <view class="header-content">
        <text class="main-title">修改密码</text>
        <text class="sub-title">为了保障您的账户安全，建议定期更换密码</text>
      </view>
    </view>

    <view class="form-card">
      <uv-form :model="addModel" :rules="rules" ref="addRef" errorType="message">
        
        <view class="input-group">
          <text class="input-label">原密码</text>
          <uv-form-item prop="oldPassword" :borderBottom="false">
            <view class="input-wrapper">
              <uv-icon name="lock" color="#909399" size="20"></uv-icon>
              <uv-input 
                v-model="addModel.oldPassword" 
                border="none" 
                password 
                placeholder="请输入当前使用的密码"
                placeholderStyle="color: #C0C4CC; font-size: 28rpx;"
              ></uv-input>
            </view>
          </uv-form-item>
        </view>

        <view class="input-group">
          <text class="input-label">新密码</text>
          <uv-form-item prop="password" :borderBottom="false">
            <view class="input-wrapper">
              <uv-icon name="lock-fill" color="#909399" size="20"></uv-icon>
              <uv-input 
                v-model="addModel.password" 
                border="none" 
                password 
                placeholder="设置新密码（6-16位）"
                placeholderStyle="color: #C0C4CC; font-size: 28rpx;"
              ></uv-input>
            </view>
          </uv-form-item>
        </view>

        <view class="input-group">
          <text class="input-label">确认新密码</text>
          <uv-form-item prop="confirmPassword" :borderBottom="false">
            <view class="input-wrapper">
              <uv-icon name="checkbox-mark" color="#909399" size="20"></uv-icon>
              <uv-input 
                v-model="addModel.confirmPassword" 
                border="none" 
                password 
                placeholder="请再次输入新密码"
                placeholderStyle="color: #C0C4CC; font-size: 28rpx;"
              ></uv-input>
            </view>
          </uv-form-item>
        </view>

        <view class="btn-container">
          <button class="submit-btn" hover-class="btn-hover" @click="commit">确认修改</button>
        </view>

      </uv-form>
    </view>
  </view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { updatePasswordApi } from '../../api/index.js'

const addRef = ref();

// 表单绑定对象
const addModel = reactive({
  oldPassword: '',
  password: '',
  confirmPassword: '',
  userId: ''
})

// 表单验证规则
const rules = reactive({
  'oldPassword': {
    type: 'string',
    required: true,
    message: '请输入原密码',
    trigger: ['blur', 'change']
  },
  'password': {
    type: 'string',
    required: true,
    message: '请输入新密码',
    trigger: ['blur', 'change']
  },
  'confirmPassword': [
    {
      type: 'string',
      required: true,
      message: '请确认新密码',
      trigger: ['blur', 'change']
    },
    {
      // 自定义验证：判断两次密码是否一致
      validator: (rule, value, callback) => {
        return value === addModel.password;
      },
      message: '两次输入的密码不一致',
      trigger: ['blur', 'change']
    }
  ]
})

const commit = () => {
  addRef.value.validate().then(async (res) => {
    addModel.userId = uni.getStorageSync("userId")
    
    // 增加加载动画，提升体验
    uni.showLoading({ title: '提交中...' });
    
    try {
      let result = await updatePasswordApi(addModel)
      uni.hideLoading();
      if (result && result.code == 200) {
        uni.showToast({
          title: '密码修改成功',
          icon: 'success'
        });
        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      }
    } catch (e) {
      uni.hideLoading();
    }
  }).catch(errors => {
    // 校验失败逻辑
  })
}
</script>

<style lang="scss">
/* 全局背景 */
page {
  background-color: #F4F6F9;
}

.page-container {
  min-height: 100vh;
  position: relative;
  /* 顶部蓝色背景块 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 400rpx;
    background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
    z-index: 0;
    border-bottom-left-radius: 40rpx;
    border-bottom-right-radius: 40rpx;
  }
}

/* 头部文字 */
.header-section {
  position: relative;
  z-index: 1;
  padding: 60rpx 40rpx 40rpx;
  
  .header-content {
    color: #fff;
    
    .main-title {
      display: block;
      font-size: 48rpx;
      font-weight: bold;
      margin-bottom: 16rpx;
      letter-spacing: 2rpx;
    }
    
    .sub-title {
      font-size: 26rpx;
      opacity: 0.8;
    }
  }
}

/* 卡片容器 */
.form-card {
  position: relative;
  z-index: 2;
  background: #FFFFFF;
  margin: 0 30rpx;
  padding: 50rpx 40rpx;
  border-radius: 24rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.08);
}

/* 输入框组样式 */
.input-group {
  margin-bottom: 30rpx;
  
  .input-label {
    display: block;
    font-size: 28rpx;
    color: #333;
    font-weight: 600;
    margin-bottom: 16rpx;
    padding-left: 4rpx;
  }
}

/* 自定义输入框外观 */
.input-wrapper {
  display: flex;
  align-items: center;
  background-color: #F7F8FA; /* 浅灰背景 */
  border-radius: 12rpx;
  padding: 4rpx 20rpx;
  height: 90rpx;
  border: 2rpx solid transparent;
  transition: all 0.3s;
  
  /* 选中时的效果 */
  &:focus-within {
    background-color: #fff;
    border-color: #3498db;
    box-shadow: 0 0 10rpx rgba(52, 152, 219, 0.1);
  }
  
  /* 图标间距 */
  :deep(.uv-icon) {
    margin-right: 16rpx;
  }
  
  /* 输入框充满 */
  :deep(.uv-input) {
    flex: 1;
    background-color: transparent !important;
  }
}

/* 按钮容器 */
.btn-container {
  margin-top: 60rpx;
}

/* 自定义按钮 */
.submit-btn {
  background: linear-gradient(90deg, #2980b9 0%, #3498db 100%);
  color: #fff;
  font-size: 32rpx;
  font-weight: 500;
  border-radius: 50rpx;
  height: 88rpx;
  line-height: 88rpx;
  border: none;
  box-shadow: 0 8rpx 20rpx rgba(41, 128, 185, 0.3);
  
  &::after {
    border: none;
  }
}

.btn-hover {
  opacity: 0.9;
  transform: scale(0.99);
}
</style>