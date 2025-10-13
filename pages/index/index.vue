<template>
	<view>
		<swiper class="swipper-container" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
			:interval="interval" :duration="duration">
			<swiper-item class="item" v-for="(item,index) in swipperList">
				<image class="imgs" :src='http.baseUrl+item.image'></image>
			</swiper-item>
		</swiper>
	</view>
	<view class="boxList-con">
		<view v-for='(item,index) in baseList' @click="toDoctorList(item)" class="boxList-item">
			<image :src="item.img" style="width: 50rpx;height: 50rpx;"></image>
			<view class="" style="color: #546E7A;font-size: 14px;">
				{{item.title}}
			</view>
		</view>
	</view>
	<uv-divider text="专家" textColor="#546E7A"></uv-divider>
	<uv-list>
		<uv-list-item v-for="item in doctorList" border="true">
			<view @click="toDoctor(item)" class="items">
				<view>
					<image class="itemimgs" :src="http.baseUrl+item.image"></image>
				</view>
				<view class="info">
					<view class="title">
						{{item.nickName}}
					</view>
					<view class="other">
						{{item.deptName}}
					</view>
					<view class="other">
						{{item.jobTitle}}
					</view>
					<uv-text :lines="1" :text="item.goodAt" color="#546E7A"></uv-text>
				</view>
			</view>
		</uv-list-item>
	</uv-list>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import http from '../../common/http.js'
	import {
		getIndexNewsApi,
		getIndexDeptApi,
		getIndexDoctorApi
	} from '../../api/index.js'
	const indicatorDots = ref(true)
	const indicatorColor = ref("#FFF")
	const autoplay = ref(true)
	//自动切换时间间隔
	const interval = ref(2000)
	//滑动动画时长
	const duration = ref(500)
	//轮播图数据
	const swipperList = ref([])
	//查询轮播图数据
	const getIndexNews = async () => {
		let res = await getIndexNewsApi()
		if (res && res.code == 200) {
			swipperList.value = res.data;
		}
	}
	//科室列表
	const baseList = ref([])
	//查询科室数据
	const getIndexDept = async () => {
		let res = await getIndexDeptApi()
		if (res && res.code == 200) {
			if (res.data.length > 0) {
				//组装科室数据类型
				for (let i = 0; i < res.data.length; i++) {
					let obj = {
						img: '',
						title: '',
						deptId: ''
					}
					obj.title = res.data[i].deptName
					obj.deptId = res.data[i].deptId
					obj.img = `/static/d${i+1}.png`
					baseList.value.push(obj)
				}
			}
		}
	}
	//查询专家数据
	const doctorList = ref([])
	const getIndexDoctor = async () => {
		let res = await getIndexDoctorApi()
		if (res && res.code == 200) {
			doctorList.value = res.data;
			console.log(doctorList.value)
		}
	}
	//跳转医生详情页
	const toDoctor = (item) => {
		uni.navigateTo({
			url: "../doctor/doctor?item=" + encodeURIComponent(JSON.stringify(item))
		})
	}
	//跳转科室医生列表
	const toDoctorList = (item) => {
		uni.navigateTo({
			url: "../doctor_list/doctor_list?item=" + encodeURIComponent(JSON.stringify(item))
		})
	}
	onLoad(() => {
		getIndexNews()
		getIndexDept()
		getIndexDoctor()
	})
</script>

<style lang="scss">
	.swipper-container {
		height: 180px;

		.item {
			height: 180px !important;

			.imgs {
				height: 180px;
				width: 100%;
			}
		}
	}

	.boxList-con {
		display: flex;
		/* flex布局 */
		justify-content: center;
		/* 左对齐 */
		flex-wrap: wrap;
		/* 换行 */
		padding: 15px 0px;
	}

	.boxList-item {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 25%;
		padding: 5px 0px;
	}

	.items {
		display: flex;
		padding: 20px;

		.info {
			padding: 0px 10px;

			.title {
				/* 修改：标题字体颜色 */
				color: #00796B;
				font-size: 16px;
			}

			.other {
				/* 修改：次要信息字体颜色 */
				color: #546E7A;
				font-size: 14px;
			}

		}

		.itemimgs {
			width: 70px !important;
			height: 90px !important;
			// border-radius: 50%;
		}
	}
</style>