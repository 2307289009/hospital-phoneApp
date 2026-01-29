<template>
  <view class="profile-container">
    
    <view class="profile-header">
      <template v-if="isLoading">
        <view class="header-content">
          <view class="skeleton-avatar"></view>
          <view class="skeleton-info">
            <view class="skeleton-line skeleton-nickname"></view>
            <view class="skeleton-line skeleton-motto"></view>
          </view>
        </view>
      </template>

      <template v-else-if="isError">
        <view class="header-content" @click="retryLoad">
          <view class="user-avatar-box">
            <uv-image shape="circle" src="/static/user.jpg" width="140rpx" height="140rpx"></uv-image>
          </view>
          <view class="user-info">
            <text class="nickname error-text">加载失败，点击重试</text>
          </view>
        </view>
      </template>

      <template v-else>
        <view class="header-content">
          <view class="user-avatar-box">
            <uv-image 
              v-if="userInfo.image" 
              shape="circle" 
              :src="http.baseUrl + userInfo.image" 
              width="140rpx"
              height="140rpx"
            ></uv-image>
            <uv-image 
              v-else 
              shape="circle" 
              src="/static/user.jpg" 
              width="140rpx" 
              height="140rpx"
            ></uv-image>
          </view>
          
          <view class="user-info">
            <view class="name-row">
              <text class="nickname">{{ userInfo.nickName || '请点击登录' }}</text>
              <view class="tag-wrap" v-if="isLoggedIn && !isLoading && !isError">
                <uv-tag :text="identityLabel" :type="identityTagType" size="mini" shape="circle" plain></uv-tag>
              </view>
            </view>
            <text class="motto" v-if="isLoggedIn">今天也要元气满满！</text>
            <text class="motto" v-else @click="toLogin">登录后享受更多服务</text>
          </view>
        </view>
      </template>
      
      <view class="header-curve"></view>
    </view>

    <view class="content-wrapper">
      
      <view class="menu-card">
        <view class="card-header">医疗服务</view>
        
        <view class="menu-item" hover-class="item-hover" @click="record">
          <view class="item-left">
            <view class="icon-box blue-bg">
              <uv-icon name="file-text" color="#3C9CFF" size="20"></uv-icon>
            </view>
            <text class="item-title">挂号档案</text>
          </view>
          <uv-icon name="arrow-right" color="#C0C4CC" size="14"></uv-icon>
        </view>

        <view class="menu-item" hover-class="item-hover" @click="see">
          <view class="item-left">
            <view class="icon-box green-bg">
              <uv-icon name="order" color="#19BE6B" size="20"></uv-icon>
            </view>
            <text class="item-title">就诊档案</text>
          </view>
          <uv-icon name="arrow-right" color="#C0C4CC" size="14"></uv-icon>
        </view>

        <view class="menu-item" hover-class="item-hover" @click="treatment">
          <view class="item-left">
             <view class="icon-box cyan-bg">
              <uv-icon name="file-text" color="#4e09b5" size="20"></uv-icon>
            </view>
            <text class="item-title">就诊人管理</text>
          </view>
          <uv-icon name="arrow-right" color="#C0C4CC" size="14"></uv-icon>
        </view>

        <view class="menu-item" hover-class="item-hover" @click="candidate">
          <view class="item-left">
            <view class="icon-box purple-bg">
              <uv-icon name="file-text" color="#63e30e" size="20"></uv-icon>
            </view>
            <text class="item-title">候补档案</text>
          </view>
          <uv-icon name="arrow-right" color="#C0C4CC" size="14"></uv-icon>
        </view>
      </view>

      <view class="menu-card">
        <view class="card-header">常用功能</view>
        
		<view class="menu-item" hover-class="item-hover" @click="archive">
		  <view class="item-left">
		    <view class="icon-box orange-bg">
		      <uv-icon name="volume" color="#0fffbb" size="20"></uv-icon>
		    </view>
		    <text class="item-title">档案信息</text>
		  </view>
		  <uv-icon name="arrow-right" color="#C0C4CC" size="14"></uv-icon>
		</view>
		
        <view class="menu-item" hover-class="item-hover" @click="toNews">
          <view class="item-left">
            <view class="icon-box orange-bg">
              <uv-icon name="volume" color="#FF9900" size="20"></uv-icon>
            </view>
            <text class="item-title">新闻资讯</text>
          </view>
          <uv-icon name="arrow-right" color="#C0C4CC" size="14"></uv-icon>
        </view>


        <view class="menu-item" hover-class="item-hover" @click="toAuthIdentity">
          <view class="item-left">
             <view class="icon-box blue-bg">
              <uv-icon name="account-fill" color="#3C9CFF" size="20"></uv-icon>
            </view>
            <text class="item-title">身份认证</text>
          </view>
          <view class="item-right">
            <text class="status-text" v-if="isLoggedIn">{{ identityLabel }}</text>
            <uv-icon name="arrow-right" color="#C0C4CC" size="14"></uv-icon>
          </view>
        </view>

	  <view class="menu-item" hover-class="item-hover" @click="modify">
	      <view class="item-left">
	        <view class="icon-box yellow-bg">
	          <uv-icon name="star-fill" color="#0fff6f" size="20"></uv-icon>
	        </view>
	        <text class="item-title">修改信息</text>
	      </view>
	      <uv-icon name="arrow-right" color="#C0C4CC" size="14"></uv-icon>
	    </view>
	  </view>

        <view class="menu-item" hover-class="item-hover" @click="evaluate">
          <view class="item-left">
            <view class="icon-box yellow-bg">
              <uv-icon name="star-fill" color="#FFB800" size="20"></uv-icon>
            </view>
            <text class="item-title">服务评价</text>
          </view>
          <uv-icon name="arrow-right" color="#C0C4CC" size="14"></uv-icon>
        </view>
		
		<view class="menu-item" hover-class="item-hover" @click="showRule">
		  <view class="item-left">
		    <view class="icon-box yellow-bg">
		      <uv-icon name="file-text" color="#FFB800" size="20"></uv-icon>
		    </view>
		    <text class="item-title">放号规则</text>
		  </view>
		</view>
		
      </view>
	  


      <view class="logout-section" v-if="isLoggedIn">
        <button class="logout-btn" hover-class="logout-hover" @click="toLogin">退出登录</button>
      </view>

    </view>
</template>

<script setup>
  import {
    reactive,
    ref,
    computed
  } from 'vue';
  import http from '../../common/http.js'
  import {
    onShow,
    onPullDownRefresh
  } from '@dcloudio/uni-app'
  import {
    getWxUserByIdApi,
	getConfigTime,
	getConfigDayNum
  } from '../../api/index.js'

  // --- 状态变量 ---
  const isLoading = ref(true);
  const isError = ref(false);

  const userInfo = reactive({
    image: '',
    nickName: '',
    identityStatus: ''
  });

  // 计算属性
  const isLoggedIn = computed(() => !!uni.getStorageSync("userId"));

  const identityLabel = computed(() => {
    const s = (userInfo.identityStatus || '').trim();
    return s ? s : '未认证';
  });
  
  const identityTagType = computed(() => {
    const s = (userInfo.identityStatus || '').trim();
    if (s === '教师') return 'success';
    if (s === '学生') return 'primary';
    return 'warning';
  });
  
	async function showRule() {
		const dayRes = await getConfigDayNum();
		const days = dayRes?.data ?? null;
		try{
			const timeRes = await getConfigTime();
		}catch(err) {
			const hour = err.code;
			const minute = err.data;
		
			// 3. 组装规则文本
			const rulesText = `
				1. 您可以从今天起预约未来 ${days} 天内的所有号源。
				2. 每天 ${hour} 点 ${minute} 分 开始放号。
				3. 若未到放号时间，将出现“无法预约”的等提示。
			`;
		
			// 4. 显示弹窗
			uni.showModal({
			    title: "挂号规则说明",
			    content: rulesText,
			    showCancel: true,
				cancelText: "不再显示",
			    confirmText: "了解",
				success: (res) => {
					if (res.cancel) {
					    uni.setStorageSync('hideScheduleRules', true);
					}
					if (res.confirm) {}
				},
			});
		}
	}


  // API 调用
  const getWxUserById = async () => {
    const userId = uni.getStorageSync("userId");
    if (!userId) {
      Object.assign(userInfo, {
        image: '',
        nickName: '',
        identityStatus: ''
      });
      isLoading.value = false;
      isError.value = false;
      return;
    }

    isLoading.value = true;
    isError.value = false;

    try {
      let res = await getWxUserByIdApi({
        userId: userId
      });
      if (res && res.code == 200) {
        Object.assign(userInfo, res.data);
      } else {
        throw new Error('Failed to fetch user info');
      }
    } catch (error) {
      console.error("获取用户信息失败:", error);
      isError.value = true;
    } finally {
      isLoading.value = false;
      uni.stopPullDownRefresh();
    }
  }

  const retryLoad = () => {
    getWxUserById();
  };

  onShow(() => {
    getWxUserById();
  });

  onPullDownRefresh(() => {
    getWxUserById();
  });

  // --- 路由跳转 ---
  const archive = () => uni.navigateTo({ url: "/pages/archive/archive" });
  const see = () => uni.navigateTo({ url: "/pages/see/see" });
  const evaluate = () => uni.navigateTo({ url: "/pages/evaluate/evaluate" });
  const record = () => uni.navigateTo({ url: "/pages/record/record" });
  const toNews = () => uni.navigateTo({ url: "/pages/journal/journal" });
  const toAuthIdentity = () => uni.navigateTo({ url: "/pages/identity/identity" });
  const treatment = () => uni.navigateTo({ url: "/pages/treatment/treatment" });
  const candidate = () => uni.navigateTo({ url: "/pages/candidate/candidate" });
  const modify = () => uni.navigateTo({ url: "/pages/modify/modify" });
  
  // 如果是退出，通常建议使用 relaunch 或清除缓存
  const toLogin = () => {
    // uni.clearStorageSync(); // 根据需求决定是否清理
    uni.navigateTo({ url: "/pages/login/login" });
  };
</script>

<style lang="scss" scoped>
  /* 页面整体背景 */
  page {
    background-color: #F5F7FA;
  }

  .profile-container {
    min-height: 100vh;
  }

  /* --- 头部设计 --- */
  .profile-header {
    position: relative;
    background: linear-gradient(135deg, #3A8DFF 0%, #2065E6 100%);
    padding: 40rpx 40rpx 120rpx 40rpx; /* 底部留白给内容上浮 */
    color: #fff;
    overflow: hidden;
  }
  
  /* 装饰性圆弧 */
  .header-curve {
    position: absolute;
    bottom: -50rpx;
    left: -10%;
    width: 120%;
    height: 100rpx;
    background-color: #F5F7FA;
    border-radius: 50% 50% 0 0;
    z-index: 1;
  }

  .header-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    margin-top: 40rpx;
  }

  .user-avatar-box {
    border: 4rpx solid rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    margin-right: 30rpx;
    box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.15);
  }

  .user-info {
    flex: 1;
    display: flex;
    flex-direction: column;

    .name-row {
      display: flex;
      align-items: center;
      margin-bottom: 12rpx;
      
      .nickname {
        font-size: 40rpx;
        font-weight: 600;
        margin-right: 20rpx;
        text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.1);
      }
      
      .tag-wrap {
        /* 让 uv-tag 稍微垂直居中 */
        display: flex; 
      }
    }

    .motto {
      font-size: 26rpx;
      opacity: 0.9;
      font-weight: 300;
    }

    .error-text {
      font-size: 32rpx;
      opacity: 1;
    }
  }

  /* --- 内容区域上浮 --- */
  .content-wrapper {
    position: relative;
    z-index: 10;
    padding: 0 30rpx;
    margin-top: -60rpx; /* 卡片上浮效果 */
  }

  /* --- 卡片通用样式 --- */
  .menu-card {
    background-color: #ffffff;
    border-radius: 24rpx;
    padding: 10rpx 0;
    margin-bottom: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }
  
  .card-header {
    padding: 24rpx 30rpx 10rpx;
    font-size: 28rpx;
    color: #909399;
    font-weight: 500;
  }

  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28rpx 30rpx;
    background-color: #fff;
    transition: background-color 0.2s;
    
    &:active {
      background-color: #f9f9f9;
    }
  }
  
  .item-hover {
    background-color: #f9f9f9 !important;
  }

  .item-left {
    display: flex;
    align-items: center;

    .item-title {
      font-size: 30rpx;
      color: #333;
      margin-left: 24rpx;
      font-weight: 400;
    }
  }
  
  .item-right {
    display: flex;
    align-items: center;
    .status-text {
      font-size: 26rpx;
      color: #909399;
      margin-right: 10rpx;
    }
  }

  /* --- 图标背景装饰 --- */
  .icon-box {
    width: 70rpx;
    height: 70rpx;
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* 预设背景色类 */
    &.blue-bg { background-color: rgba(60, 156, 255, 0.1); }
    &.green-bg { background-color: rgba(25, 190, 107, 0.1); }
    &.orange-bg { background-color: rgba(255, 153, 0, 0.1); }
    &.yellow-bg { background-color: rgba(255, 184, 0, 0.1); }
    &.purple-bg { background-color: rgba(144, 147, 153, 0.1); }
    &.cyan-bg { background-color: rgba(24, 181, 102, 0.1); }
  }

  /* --- 退出登录按钮 --- */
  .logout-section {
    margin: 40rpx 0 60rpx;
  }

  .logout-btn {
    background-color: #ffffff;
    color: #FF4D4F;
    font-size: 32rpx;
    height: 96rpx;
    line-height: 96rpx;
    border-radius: 48rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    border: none;
    font-weight: 500;
    
    &::after { border: none; }
  }
  
  .logout-hover {
    background-color: #FFF0F0;
  }

  /* --- 骨架屏动画 --- */
  @keyframes skeleton-blink {
    0% { opacity: 0.6; background-color: rgba(255, 255, 255, 0.3); }
    50% { opacity: 1; background-color: rgba(255, 255, 255, 0.5); }
    100% { opacity: 0.6; background-color: rgba(255, 255, 255, 0.3); }
  }

  .skeleton-avatar {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
    margin-right: 30rpx;
    animation: skeleton-blink 1.5s infinite;
  }

  .skeleton-info {
    flex: 1;
  }

  .skeleton-line {
    height: 32rpx;
    border-radius: 8rpx;
    animation: skeleton-blink 1.5s infinite;
    margin-bottom: 16rpx;
  }

  .skeleton-nickname { width: 40%; height: 40rpx; }
  .skeleton-motto { width: 70%; }

</style>