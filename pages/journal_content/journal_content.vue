<template>
	<view class="page-container">
		<view class="article-header" v-if="news.image">
			<image class="article-image" :src="http.baseUrl + news.image" mode="aspectFill"></image>
		</view>

		<view class="article-body">
			<view class="article-title">{{ news.title }}</view>

			<view class="meta-info">
				<text class="meta-text">发布于 {{ news.createTime }}</text>
			</view>
			
			<view v-if="news.textDesc" class="article-preamble">
				{{ news.textDesc }}
			</view>

			<view class="content-parser">
				<uv-parse :content="news.textContent"></uv-parse>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import http from '../../common/http.js'
	
	// script 逻辑完全正确，无需修改
	const news = reactive({})
	onLoad((option) => {
		// 页面数据是通过路由传递的，不存在本页面内的网络请求超时问题
		const item = JSON.parse(decodeURIComponent(option.item))
		console.log(item)
		Object.assign(news, item)
		
		// 动态设置导航栏标题
		uni.setNavigationBarTitle({
			title: item.title || '新闻详情'
		});
	})
</script>

<style lang="scss" scoped>
	/* 页面整体背景 */
	.page-container {
		background-color: #ffffff;
		min-height: 100vh;
	}

	/* 1. 头部图片 */
	.article-header {
		width: 100%;
		height: 400rpx;
	}
	.article-image {
		width: 100%;
		height: 100%;
		// 图片加载前的占位背景色，避免空白
		background-color: #f0f0f0;
	}

	/* 2. 文章内容主体 */
	.article-body {
		padding: 40rpx;
	}

	/* 标题样式 */
	.article-title {
		font-size: 44rpx;
		font-weight: bold;
		color: #303133;
		line-height: 1.5; /* 增加行高，多行标题更美观 */
	}

	/* 元信息样式 */
	.meta-info {
		margin-top: 24rpx;
		margin-bottom: 40rpx;
		font-size: 26rpx;
		color: #909399;
	}
	
	/* 文章摘要/引言 样式 */
	.article-preamble {
		font-size: 30rpx;
		color: #606266;
		line-height: 1.7;
		margin-bottom: 40rpx;
		background-color: #f5f5f7;
		padding: 24rpx;
		border-radius: 12rpx;
		border-left: 6rpx solid #409EFF;
	}

	/* 关键：为 uv-parse 解析出的内容设置样式 
	  使用 :deep() 可以穿透到子组件内部
	*/
	.content-parser {
		color: #333333; // 统一设置基础文字颜色
		
		// 为段落设置样式
		:deep(p) {
			font-size: 30rpx;
			line-height: 1.8; /* 较大的行高提升阅读舒适度 */
			margin-bottom: 30rpx; /* 段落间距 */
		}
		
		// 为图片设置样式
		:deep(img) {
			max-width: 100%;
			border-radius: 12rpx;
			margin: 20rpx 0;
		}

		// 为标题设置样式 (如果内容里有 h 标签)
		:deep(h3) {
			font-size: 36rpx;
			font-weight: bold;
			margin-top: 40rpx;
			margin-bottom: 20rpx;
		}
	}
</style>