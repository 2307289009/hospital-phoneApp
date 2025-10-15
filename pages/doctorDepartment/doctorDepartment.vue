<template>
	<view class="page-container">
		<view class="doctor-grid">
			<view class="doctor-card" v-for="item in indexList" :key="item.userId" @click="toDoctor(item)">
				<image class="avatar" :src="http.baseUrl + item.image" mode="aspectFill"></image>
				
				<view class="info">
					<view class="name">{{ item.nickName }}</view>
					
					<view class="tags">
						<view class="tag dept-tag">{{ item.deptName }}</view>
						<view class="tag title-tag">{{ item.jobTitle }}</view>
					</view>
					
					<view class="good-at">
						<uv-text :lines="2" :text="'擅长：' + item.goodAt" color="#828c9a" size="13"></uv-text>
					</view>
				</view>
			</view>
		</view>
		
		<uv-load-more @loadmore='loadmore' :status="loadStatus" color="#828c9a"></uv-load-more>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {onLoad,onReachBottom} from '@dcloudio/uni-app'
	import http from '../../common/http.js'
	import {
		getDoctorByDeptIdApi
	} from '../../api/index.js'
	const indexList = ref([])
	const deptId = ref('')
	const currentPage = ref(1)
	const pageSize = ref(6)
	const pages = ref(0)
	const loadStatus = ref('loadmore')
	const getDoctorByDeptId = async () => {
		let res = await getDoctorByDeptIdApi({
			deptId: deptId.value,
			currentPage: currentPage.value,
			pageSize: pageSize.value
		})
		if (res && res.code == 200) {
			pages.value = res.data.pages;
			indexList.value = indexList.value.concat(res.data.records)
			console.log(indexList.value)
			if (currentPage.value >= pages.value) {
				loadStatus.value = 'nomore'
			} else {
				loadStatus.value = 'loadmore'
			}
			console.log(indexList.value)
		}
	}
	//加载更多
	const loadmore = () => {
		if (currentPage.value >= pages.value) {
			loadStatus.value = 'nomore'
			return;
		}
		loadStatus.value = 'loading'
		//页数加1
		currentPage.value = ++currentPage.value;
		getDoctorByDeptId()
	}
	onReachBottom(() => {
		console.log('触底加载')
		if (currentPage.value >= pages.value) {
			loadStatus.value = 'nomore'
			return;
		}
		loadStatus.value = 'loading'
		//页数加1
		currentPage.value = ++currentPage.value;
		getDoctorByDeptId()
	})
	//跳转医生详情页
	const toDoctor = (item) => {
		uni.navigateTo({
			url: "../doctorIdentity/doctorIdentity?item=" + encodeURIComponent(JSON.stringify(item))
		})
	}
	onLoad((options) => {
		const item = JSON.parse(decodeURIComponent(options.item))
		deptId.value = item.deptId
		console.log(item)
		getDoctorByDeptId()
	})
</script>

<style lang="scss">
	// Page background
	.page-container {
		background-color: #f5f7fa;
		padding: 12px;
		min-height: 100vh;
	}

	// Grid layout container
	.doctor-grid {
		display: grid;
		// Create two columns, each taking up equal space
		grid-template-columns: repeat(2, 1fr);
		// Define the gap between columns and rows
		gap: 12px;
	}

	// Doctor card style
	.doctor-card {
		background-color: #ffffff;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
		overflow: hidden; // Ensures image corner radius is applied
		display: flex;
		flex-direction: column;
		transition: transform 0.2s ease-in-out;

		// Adds a slight scale effect on click for better interaction
		&:active {
			transform: scale(0.98);
		}

		.avatar {
			width: 100%;
			height: 120px; // Fixed image height
		}

		.info {
			padding: 12px;
			display: flex;
			flex-direction: column;
			gap: 8px; // Spacing between internal elements

			.name {
				font-size: 16px;
				font-weight: bold;
				color: #303133;
			}
			
			.tags {
				display: flex;
				flex-wrap: wrap;
				gap: 6px;
				
				.tag {
					font-size: 12px;
					padding: 2px 8px;
					border-radius: 4px;
				}
				
				// Department tag style
				.dept-tag {
					background-color: #ecf5ff;
					color: #409eff;
				}
				
				// Title tag style
				.title-tag {
					background-color: #f0f9eb;
					color: #67c23a;
				}
			}
		}
	}
</style>