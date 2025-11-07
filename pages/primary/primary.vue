<template>
	<view class="profile-container">
		<view class="profile-header">
			<template v-if="isLoading">
				<view class="skeleton-avatar"></view>
				<view class="skeleton-info">
					<view class="skeleton-line skeleton-nickname"></view>
					<view class="skeleton-line skeleton-motto"></view>
				</view>
			</template>

			<template v-else-if="isError">
				<view class="user-avatar">
					<uv-image shape="circle" src="/static/user.jpg" width="150rpx" height="150rpx"></uv-image>
				</view>
				<view class="user-info" @click="retryLoad">
					<text class="nickname error-text">加载失败，点击重试</text>
				</view>
			</template>

			<template v-else>
				<view class="user-avatar">
					<uv-image v-if="userInfo.image" shape="circle" :src="http.baseUrl + userInfo.image" width="150rpx"
						height="150rpx"></uv-image>
					<uv-image v-else shape="circle" src="/static/user.jpg" width="150rpx" height="150rpx"></uv-image>
				</view>
				<view class="user-info">
					<text class="nickname">{{ userInfo.nickName || '请登录' }}</text>
					<text class="motto">今天也要元气满满！</text>
				</view>
			</template>
		</view>

		<view class="menu-card">
			<view class="menu-item" @click="toNews">
				<view class="item-left">
					<uv-icon name="list-dot" color="#409EFF" size="22"></uv-icon>
					<text class="item-title">我的新闻</text>
				</view>
				<view class="item-right">
					<uv-icon name="arrow-right" color="#909399" size="16"></uv-icon>
				</view>
			</view>

			<view class="menu-item" @click="evaluate">
				<view class="item-left">
					<uv-icon name="list-dot" color="#F9AE3D" size="22"></uv-icon>
					<text class="item-title">评价</text>
				</view>
				<view class="item-right">
					<uv-icon name="arrow-right" color="#909399" size="16"></uv-icon>
				</view>
			</view>
			
			<view class="menu-item" @click="record">
				<view class="item-left">
					<uv-icon name="list-dot" color="#F9AE3D" size="22"></uv-icon>
					<text class="item-title">挂号档案</text>
				</view>
				<view class="item-right">
					<uv-icon name="arrow-right" color="#909399" size="16"></uv-icon>
				</view>
			</view>
			
			<view class="menu-item" @click="see">
				<view class="item-left">
					<uv-icon name="list-dot" color="#F9AE3D" size="22"></uv-icon>
					<text class="item-title">就诊档案</text>
				</view>
				<view class="item-right">
					<uv-icon name="arrow-right" color="#909399" size="16"></uv-icon>
				</view>
			</view>
		</view>
		
		<view class="logout-section" v-if="isLoggedIn">
			<button class="logout-btn" @click="toLogin">退出登录</button>
		</view>

	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		computed // 引入 computed
	} from 'vue';
	import http from '../../common/http.js'
	import {
		onShow,
		onPullDownRefresh // 引入下拉刷新
	} from '@dcloudio/uni-app'
	import {
		getWxUserByIdApi
	} from '../../api/index.js'

	// --- 新增状态变量 ---
	const isLoading = ref(true); // 控制首次加载的骨架屏
	const isError = ref(false); // 控制是否显示错误页面

	// 用户信息
	const userInfo = reactive({
		image: '',
		nickName: ''
	});

	// 计算属性，判断用户是否登录
	const isLoggedIn = computed(() => !!uni.getStorageSync("userId"));

	// 查询个人信息
	const getWxUserById = async () => {
		const userId = uni.getStorageSync("userId");
		if (!userId) {
			// 如果未登录，则清除用户信息并停止加载
			Object.assign(userInfo, {
				image: '',
				nickName: ''
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
			// 模拟慢网速
			// await new Promise(resolve => setTimeout(resolve, 2000));

			if (res && res.code == 200) {
				Object.assign(userInfo, res.data);
			} else {
				throw new Error('Failed to fetch user info');
			}
		} catch (error) {
			console.error("获取用户信息失败:", error);
			isError.value = true; // 关键：设置错误状态
		} finally {
			isLoading.value = false; // 结束加载状态
			uni.stopPullDownRefresh(); // 停止下拉刷新动画
		}
	}

	// --- 新增：重试加载函数 ---
	const retryLoad = () => {
		// 直接调用 getWxUserById 即可，它会处理加载和错误状态
		getWxUserById();
	};

	// --- 生命周期函数 ---
	onShow(() => {
		getWxUserById();
	});

	// --- 新增：下拉刷新 ---
	onPullDownRefresh(() => {
		getWxUserById();
	});

	const see = ()=>{
			uni.navigateTo({
				url: "/pages/see/see"
			})
		}

	const evaluate = () => {
		uni.navigateTo({
			url: "/pages/evaluate/evaluate"
		})
	}
	
	const record = () => {
		uni.navigateTo({
			url: "/pages/record/record"
		})
	}

	// --- 页面跳转逻辑 (保持不变) ---
	const toNews = () => {
		uni.navigateTo({
			url: "/pages/journal/journal" // 修正了路径，与上个页面一致
		});
	};

	const toLogin = () => {
		uni.showModal({
			title: '提示',
			content: '确定要退出登录吗？',
			success: function(res) {
				if (res.confirm) {
					uni.removeStorageSync('userId');
					// 退出后，重新加载页面数据，界面会更新为“请登录”状态
					getWxUserById();
				}
			}
		});
	};
</script>


<style lang="scss" scoped>
	/* 设置页面背景色 */
	page {
		background-color: #F5F6FA;
	}

	.profile-container {
		padding-bottom: 40rpx;
	}

	/* 头部区域 */
	.profile-header {
		display: flex;
		align-items: center;
		padding: 60rpx 40rpx;
		background: linear-gradient(135deg, #5EB9FF 0%, #409EFF 100%);
		color: white;
		height: 200rpx;
		/* 新增过渡效果，让状态切换更平滑 */
		transition: background-color 0.3s;
	}

	.user-avatar {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		border: 4rpx solid #fff;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
		margin-right: 30rpx;
		flex-shrink: 0; // 防止被压缩
	}

	.user-info {
		display: flex;
		flex-direction: column;

		.nickname {
			font-size: 40rpx;
			font-weight: bold;
			margin-bottom: 10rpx;
		}

		.motto {
			font-size: 26rpx;
			opacity: 0.8;
		}

		.error-text {
			font-size: 32rpx;
			font-weight: normal;
			cursor: pointer;
		}
	}

	/* --- 新增骨架屏样式 --- */
	@keyframes skeleton-blink {
		0% {
			background-color: rgba(255, 255, 255, 0.2);
		}

		50% {
			background-color: rgba(255, 255, 255, 0.4);
		}

		100% {
			background-color: rgba(255, 255, 255, 0.2);
		}
	}

	.skeleton-avatar {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		margin-right: 30rpx;
		background-color: rgba(255, 255, 255, 0.2);
		animation: skeleton-blink 1.5s infinite ease-in-out;
	}

	.skeleton-info {
		flex: 1;
	}

	.skeleton-line {
		height: 36rpx;
		border-radius: 8rpx;
		background-color: rgba(255, 255, 255, 0.2);
		animation: skeleton-blink 1.5s infinite ease-in-out;
	}

	.skeleton-nickname {
		width: 50%;
		margin-bottom: 20rpx;
	}

	.skeleton-motto {
		width: 70%;
		height: 28rpx;
	}

	/* 菜单卡片 (样式保持不变)
	  模板的调整会自动让这里的样式生效，将两个item包裹在同一个卡片中
	*/
	.menu-card {
		background-color: #ffffff;
		border-radius: 20rpx;
		margin: -60rpx 30rpx 0;
		position: relative;
		z-index: 10;
		box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.08);
		padding: 10rpx 30rpx;
	}

	.menu-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0;
		/* border-bottom 会自动应用到第一个item上 */
		border-bottom: 1px solid #f0f0f0;

		/* :last-child 会自动应用到第二个item上，移除边框 */
		&:last-child {
			border-bottom: none;
		}
	}

	.item-left {
		display: flex;
		align-items: center;

		.item-title {
			font-size: 30rpx;
			color: #303133;
			margin-left: 20rpx;
		}
	}

	/* 退出登录区域 (样式保持不变)
	  模板的调整会自动让这个区域与上方的 *单个* menu-card 保持 20rpx 间距
	*/
	.logout-section {
		padding: 40rpx 30rpx;
		margin-top: 20rpx; 
	}

	.logout-btn {
		background-color: #ffffff;
		color: #fa3534;
		border-radius: 20rpx;
		font-size: 32rpx;
		font-weight: 500;
		box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.05);
		border: none;

		&::after {
			border: none;
		}
	}
</style>