<template>
	<view class="page-container">
		<swiper class="swiper-container" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
			:interval="interval" :duration="duration">
			<swiper-item class="item" v-for="(item, index) in swipperList" :key="index">
				<image class="imgs" :src='http.baseUrl+item.image'></image>
			</swiper-item>
		</swiper>

		<view class="quick-nav-container">
			<view v-for='(item, index) in baseList' :key="index" @click="toDoctorList(item)" class="nav-item">
				<image :src="item.img" class="nav-icon"></image>
				<text class="nav-title">{{item.title}}</text>
			</view>
		</view>

		<view class="section-title-container">
			<text class="section-title">专家</text>
		</view>

		<view class="doctor-list-container">
			<view v-for="item in doctorList" :key="item.id" @click="toDoctor(item)" class="doctor-card">
				<image class="doctor-avatar" :src="http.baseUrl + item.image"></image>
				<view class="doctor-info">
					<view class="info-line-one">
						<text class="doctor-name">{{item.nickName}}</text>
						<text class="doctor-job-title">{{item.jobTitle}}</text>
					</view>
					<view class="doctor-department">
						{{item.deptName}}
					</view>
					<view class="doctor-good-at">
						<uv-text :lines="1" :text="'擅长：' + item.goodAt" color="#888" size="13"></uv-text>
					</view>
				</view>
			</view>
		</view>
	</view>
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
	
	// Swiper 配置
	const indicatorDots = ref(true)
	const autoplay = ref(true)
	const interval = ref(3000)
	const duration = ref(500)
	
	// 轮播图数据
	const swipperList = ref([])
	const getIndexNews = async () => {
		let res = await getIndexNewsApi()
		if (res && res.code == 200) {
			swipperList.value = res.data;
		}
	}
	
	// 科室分类数据
	const baseList = ref([])
	const getIndexDept = async () => {
		let res = await getIndexDeptApi()
		if (res && res.code == 200) {
			if (res.data.length > 0) {
				const processedData = res.data.map((dept, index) => ({
					title: dept.deptName,
					deptId: dept.deptId,
					img: `/static/d${index + 1}.png`
				}));
				baseList.value = processedData;
			}
		}
	}
	
	// 医生列表数据
	const doctorList = ref([])
	const getIndexDoctor = async () => {
		let res = await getIndexDoctorApi()
		if (res && res.code == 200) {
			doctorList.value = res.data;
		}
	}
	
	// 跳转到医生详情
	const toDoctor = (item) => {
		uni.navigateTo({
			url: "../doctorIdentity/doctorIdentity?item=" + encodeURIComponent(JSON.stringify(item))
		})
	}
	
	// 跳转到科室医生列表
	const toDoctorList = (item) => {
		uni.navigateTo({
			url: "../doctorDepartment/doctorDepartment?item=" + encodeURIComponent(JSON.stringify(item))
		})
	}
	
	onLoad(() => {
		getIndexNews()
		getIndexDept()
		getIndexDoctor()
		const start = Number(uni.getStorageSync("start"));
		console.log(start)
		const end = Date.now();
		console.log(`登录到首页渲染完成耗时 ${(end - start).toFixed(3)} ms`);
	})

</script>

<style lang="scss" scoped>
	/* 页面整体背景 */
	.page-container {
		background-color: #f7f8fa;
		min-height: 100vh;
	}

	/* 轮播图 */
	.swiper-container {
		height: 180px;

		.item {
			height: 180px;
		}

		.imgs {
			width: 100%;
			height: 100%;
		}
	}

	/* 功能分类入口 */
	.quick-nav-container {
		display: flex;
		flex-wrap: wrap;
		padding: 15px 10px;
		background-color: #fff;
		margin: -10px 10px 10px 10px;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		position: relative;
		z-index: 10;
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 25%;
		padding: 10px 0;
	}

	.nav-icon {
		width: 45px;
		height: 45px;
		margin-bottom: 8px;
	}

	.nav-title {
		color: #333;
		font-size: 14px;
	}

	/* 板块标题 */
	.section-title-container {
		padding: 15px;
	}

	.section-title {
		font-size: 18px;
		font-weight: bold;
		color: #333;
		padding-left: 8px;
		border-left: 4px solid #00796B; // 主题色强调
	}

	/* 专家列表 */
	.doctor-list-container {
		padding: 0 15px 15px;
	}
	
	.doctor-card {
		display: flex;
		align-items: flex-start; // 垂直方向顶部对齐
		padding: 15px;
		margin-bottom: 12px;
		background-color: #ffffff;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		transition: all 0.2s ease-in-out;

		&:active {
			transform: scale(0.98);
			box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		}
	}

	.doctor-avatar {
		width: 75px;
		height: 75px;
		border-radius: 50%; // 圆形头像
		margin-right: 15px;
		flex-shrink: 0; // 防止头像被压缩
	}

	.doctor-info {
		display: flex;
		flex-direction: column;
		flex: 1; // 占据剩余空间
		min-width: 0; // 防止 flex 布局溢出
	}

	.info-line-one {
		display: flex;
		align-items: baseline; // 名字和职称基线对齐
		margin-bottom: 8px;
	}

	.doctor-name {
		color: #00796B; // 主题色
		font-size: 17px;
		font-weight: bold;
		margin-right: 8px;
	}

	.doctor-job-title {
		color: #546E7A;
		font-size: 14px;
	}

	.doctor-department {
		color: #546E7A;
		font-size: 14px;
		margin-bottom: 8px;
	}

	.doctor-good-at {
		// uv-text 会处理文本溢出，无需额外样式
	}
</style>