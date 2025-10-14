<template>
	<view class="content">
		<uv-vtabs :chain="chain" :list="list" :height="height" @change="change">
			<!-- #ifdef VUE2 -->
			<template v-for="(item,index) in list">
				<uv-vtabs-item :index="index" :key="index">
				<!-- #endif -->
					<!-- #ifdef VUE3 -->
					<template v-for="(item,index) in list" :key="index">
						<uv-vtabs-item :index="index">
						<!-- #endif -->
							<view class="item" v-for="(item2,index2) in item.childrens" :key="index2">
								<view class="item-title">
									<text class="text">{{item2.name}}</text>
								</view>
								<view class="item-content">
									<!-- //医生列表 -->
									<view class="boxList-con">
										<view v-for="(item3,index3) in item2.desc" class="boxList-item" @click="toDoctor(item3)" :key="index3">
											<view class="">
												<image class="itemimgs" :src='http.baseUrl+item3.image'></image>
											</view>
											<view class="title">
												{{item3.nickName}}
											</view>
											<!-- <view class="other">
												{{item3.sex}}
											</view> -->
											<view class="other">
												{{item3.jobTitle}}
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="gap" v-if="index<list.length-1">
								<uv-gap bg-color="#f1f1f1" height="4"></uv-gap>
							</view>
						</uv-vtabs-item>
					</template>
					<uv-gap bg-color="#fff" height="600"></uv-gap>
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
	import {getCategoryListApi} from '../../api/index.js'
	const list = ref([])
	const chain = ref(true)
	

	const height = computed(() => {
		return uni.getSystemInfoSync().windowHeight- uni.upx2px(1);
	})
	const change = (index) => {
		console.log('选项改变：', index)
	}
	
	const toDoctor = (item) => {
		uni.navigateTo({
			url: "../doctor/doctor?item=" + encodeURIComponent(JSON.stringify(item))
		})
	}
	
	const getCategoryList = async()=>{
		let res = await getCategoryListApi()
		if(res && res.code == 200){
			console.log(res)
			list.value = res.data
		}
	}
	onReady(() => {
		
		uni.showLoading({
			title: '加载中'
		})
		setTimeout(() => {
			getCategoryList()
			uni.hideLoading();
		}, 500)
	})
</script>

<style scoped lang="scss">

	.item {
		padding: 10rpx 20rpx;

		&-title {
			.text {
				font-weight: 700;
				font-size: 32rpx;
				color: #111;
			}
		}

		&-content {
			

			.text {
				line-height: 48rpx;
				font-size: 30rpx;
				color: #111;
				/* #ifndef APP-NVUE */
				word-break: break-all;
				/* #endif */
			}
		}
	}

	.gap {
		padding: 0 30rpx;
	}

	.boxList-con {
		display: flex;
		
		// justify-content: center;
		
		flex-wrap: wrap;
		
		padding: 15px 0px;
	}

	.boxList-item {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 33.3%;
		padding: 5px 0px;
	}

	.itemimgs {
		width: 70px !important;
		height: 90px !important;
	}

	.title {
		color: #000000;
		font-size: 16px;
	}

	.other {
		color: #333;
		font-size: 14px;
	}
</style>