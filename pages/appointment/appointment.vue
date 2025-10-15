<template>
	<view class="content">
		<uv-vtabs :chain="chain" :list="list" :height="height" @change="change">
			<template v-for="(item, index) in list" :key="index">
				<uv-vtabs-item :index="index">
					<view class="scroll-content-container">
						<view class="sub-category" v-for="(item2, index2) in item.childrens" :key="index2">
							<view class="sub-category-title">
								<text class="text">{{item2.name}}</text>
							</view>
							
							<view class="doctor-grid">
								<view v-for="(item3, index3) in item2.desc" class="doctor-card" @click="toDoctor(item3)" :key="index3">
									<image class="doctor-avatar" :src='http.baseUrl+item3.image'></image>
									<view class="doctor-name">
										{{item3.nickName}}
									</view>
									<view class="doctor-title">
										{{item3.jobTitle}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</uv-vtabs-item>
			</template>
		</uv-vtabs>
	</view>
</template>

<script setup>
	import {
		computed,
		ref
	} from 'vue'
	import http from '../../common/http.js'
	import {
		onReady
	} from '@dcloudio/uni-app';
	import {
		getCategoryListApi
	} from '../../api/index.js'
	
	const list = ref([])
	const chain = ref(true)

	const height = computed(() => {
		// 减去1px是为了避免某些设备上可能出现的滚动条问题
		return uni.getSystemInfoSync().windowHeight - uni.upx2px(1);
	})
	
	const change = (index) => {
		console.log('当前激活的索引：', index)
	}

	const toDoctor = (item) => {
		uni.navigateTo({
			url: "../doctorIdentity/doctorIdentity?item=" + encodeURIComponent(JSON.stringify(item))
		})
	}

	const getCategoryList = async () => {
		let res = await getCategoryListApi()
		if (res && res.code == 200) {
			list.value = res.data
		}
	}
	
	onReady(() => {
		uni.showLoading({
			title: '加载中...'
		})
		
		// 模拟加载延迟，优化用户体验
		setTimeout(() => {
			getCategoryList()
			uni.hideLoading();
		}, 500)
	})
</script>

<style scoped lang="scss">
	// 确保内容区域铺满
	.content {
		height: 100vh;
		background-color: #f5f5f5;
	}

	// 右侧可滚动内容区域的整体样式
	.scroll-content-container {
		background-color: #f7f8fa; // 浅灰色背景，突出卡片
		padding: 12px;
		min-height: 100%;
		box-sizing: border-box;
	}
	
	// 二级科室分组
	.sub-category {
		margin-bottom: 16px;
	}

	// 二级科室标题美化
	.sub-category-title {
		margin-bottom: 12px;
		.text {
			font-size: 16px;
			font-weight: bold;
			color: #303133;
			padding-left: 10px;
			border-left: 4px solid #409EFF; // 使用蓝色作为强调色
		}
	}

	// 医生网格布局
	.doctor-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr); // 优雅的响应式三列布局
		gap: 10px; // 网格间距
	}

	// 医生卡片样式
	.doctor-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 15px 5px;
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
		text-align: center;
		transition: all 0.2s ease-in-out;

		// 点击时的交互效果
		&:active {
			transform: scale(0.96);
			box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		}
	}

	// 医生头像
	.doctor-avatar {
		width: 60px;
		height: 60px;
		border-radius: 50%; // 圆形头像
		margin-bottom: 10px;
		background-color: #f0f0f0; // 图片加载前的占位背景色
	}

	// 医生姓名
	.doctor-name {
		color: #303133;
		font-size: 15px;
		font-weight: 500;
		margin-bottom: 4px;
		
		// 防止姓名过长换行
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
	}

	// 医生职称
	.doctor-title {
		color: #909399; // 使用灰色系区分
		font-size: 13px;
	}
</style>