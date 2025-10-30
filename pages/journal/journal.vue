<template>
	<view class="page-container">
		<template v-if="isLoading">
			<view class="skeleton" v-for="i in 3" :key="i">
				<view class="skeleton-image"></view>
				<view class="skeleton-content">
					<view class="skeleton-title"></view>
					<view class="skeleton-title skeleton-title-short"></view>
					<view class="skeleton-meta"></view>
				</view>
			</view>
		</template>

		<template v-else-if="isError">
			<view class="error-view">
				<uv-empty mode="network" text="网络请求超时"></uv-empty>
				<button class="retry-btn" @click="retryLoad">点击重试</button>
			</view>
		</template>

		<template v-else>
			<uv-empty v-if="indexList.length === 0" mode="list" text="暂无新闻内容" marginTop="100"></uv-empty>
			
			<template v-else>
				<view class="card" v-for="(item, index) in indexList" :key="index" @click="toDetail(item)">
					<image class="card-image" :src="http.baseUrl + item.image" mode="aspectFill" @error="onImageError(index)"></image>
					<view class="card-content">
						<view class="card-title">
							<uv-text :size="16" :lines="2" :text="item.title" bold color="#303133"></uv-text>
						</view>
						<view class="card-meta">
							<text>{{ item.createTime }}</text>
						</view>
					</view>
				</view>
				<uv-load-more @loadmore='loadmore' :status="loadStatus" color="#95a5a6"></uv-load-more>
			</template>
		</template>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad,
		onReachBottom,
		onPullDownRefresh // 引入下拉刷新
	} from '@dcloudio/uni-app';
	import http from '../../common/http.js';
	import {
		getNewsListApi
	} from '../../api/index.js';

	// --- 新增的状态变量 ---
	const isLoading = ref(true); // 控制首次加载的骨架屏
	const isError = ref(false); // 控制是否显示错误页面

	// --- 原有状态变量 ---
	const indexList = ref([]);
	const currentPage = ref(1);
	const pageSize = ref(6);
	const pages = ref(0);
	const loadStatus = ref('loadmore');

	// --- 核心改造：查询列表函数 ---
	const getNewsList = async () => {
		// 如果是上拉加载，直接设置状态
		if (currentPage.value > 1) {
			loadStatus.value = 'loading';
		}
		
		try {
			let res = await getNewsListApi({
				currentPage: currentPage.value,
				pageSize: pageSize.value
			});

			// 模拟慢网速，方便测试
			// await new Promise(resolve => setTimeout(resolve, 2000));
			// if(Math.random() > 0.5) throw new Error("Simulated network error");

			if (res && res.code == 200) {
				pages.value = res.data.pages;
				// 如果是第一页，直接赋值；否则拼接
				if (currentPage.value === 1) {
					indexList.value = res.data.records;
				} else {
					indexList.value = indexList.value.concat(res.data.records);
				}

				// 更新加载更多状态
				if (currentPage.value >= pages.value) {
					loadStatus.value = 'nomore';
				} else {
					loadStatus.value = 'loadmore';
				}
				isError.value = false; // 请求成功，重置错误状态
			} else {
				// 处理业务逻辑错误，例如 token 失效等
				throw new Error(res.message || '服务器返回错误');
			}
		} catch (error) {
			console.error("获取新闻列表失败:", error);
			isError.value = true; // 关键：设置错误状态为 true
			if (currentPage.value > 1) {
				loadStatus.value = 'loadmore'; // 恢复上拉加载状态，以便用户可以再次尝试
				currentPage.value--; // 加载失败，页码恢复
			}
		} finally {
			// 无论成功或失败，都结束首次加载状态和下拉刷新状态
			isLoading.value = false;
			uni.stopPullDownRefresh();
		}
	};

	// --- 新增：重试加载函数 ---
	const retryLoad = () => {
		isLoading.value = true; // 显示骨架屏
		isError.value = false;
		currentPage.value = 1; // 从第一页开始
		indexList.value = []; // 清空旧数据
		getNewsList();
	};
	
	// --- 新增：图片加载失败处理 ---
	const onImageError = (index) => {
		// 当图片加载失败时，替换为默认图片
		indexList.value[index].image = '/static/default-image.png'; // 请在static目录准备一张默认图片
	}

	// 加载更多（触底）
	const loadmore = () => {
		if (loadStatus.value === 'nomore' || loadStatus.value === 'loading') {
			return;
		}
		currentPage.value++;
		getNewsList();
	};

	// --- 生命周期函数优化 ---
	onLoad(() => {
		getNewsList();
	});

	onReachBottom(() => {
		loadmore();
	});
	
	// 新增：下拉刷新
	onPullDownRefresh(() => {
		currentPage.value = 1;
		getNewsList();
	});

	// 跳转资讯详情 (保持不变)
	const toDetail = (item) => {
		uni.navigateTo({
			url: "../journal_content/journal_content?item=" + encodeURIComponent(JSON.stringify(item))
		});
	};
</script>

<style lang="scss" scoped>
	/* 页面整体容器 */
	.page-container {
		background-color: #f5f5f7;
		padding: 24rpx;
		min-height: 100vh;
		box-sizing: border-box;
	}

	/* 卡片样式 (保持不变) */
	.card {
		background-color: #ffffff;
		border-radius: 16rpx;
		margin-bottom: 24rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
		transition: all 0.2s ease-in-out;

		&:active {
			transform: scale(0.98);
			box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
		}
	}
	.card-image {
		width: 100%;
		height: 320rpx;
		vertical-align: middle;
		background-color: #eee; // 图片加载前的占位背景色
	}
	.card-content {
		padding: 24rpx;
	}
	.card-title {
		margin-bottom: 16rpx;
	}
	.card-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		color: #909399;
	}

	/* --- 新增样式 --- */

	/* 骨架屏样式 */
	.skeleton {
		display: flex;
		background-color: #ffffff;
		border-radius: 16rpx;
		padding: 24rpx;
		margin-bottom: 24rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
	}
	.skeleton-image {
		width: 240rpx;
		height: 140rpx;
		background-color: #f0f0f0;
		border-radius: 8rpx;
		margin-right: 24rpx;
		flex-shrink: 0;
	}
	.skeleton-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.skeleton-title {
		width: 100%;
		height: 32rpx;
		background-color: #f0f0f0;
		border-radius: 4rpx;
	}
	.skeleton-title-short {
		width: 60%;
	}
	.skeleton-meta {
		width: 40%;
		height: 24rpx;
		background-color: #f0f0f0;
		border-radius: 4rpx;
	}

	/* 错误视图样式 */
	.error-view {
		padding-top: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.retry-btn {
		margin-top: 40rpx;
		width: 300rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		color: #fff;
		background-color: #409EFF;
		border-radius: 40rpx;
	}
</style>