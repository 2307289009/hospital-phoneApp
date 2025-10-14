<template>
	<view>
		<uv-list>
			<uv-list-item v-for="item in indexList" border="true">
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
						<uv-text :lines="1" :text="item.goodAt" color="#828c9a"></uv-text>
					</view>
				</view>
			</uv-list-item>
			<uv-load-more @loadmore='loadmore' :status="loadStatus" color="#828c9a"></uv-load-more>
		</uv-list>
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
			url: "../doctor/doctor?item=" + encodeURIComponent(JSON.stringify(item))
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
	.items {
		display: flex;
		padding: 20px;

		.info {
			padding: 0px 10px;

			.title {
				/* 修改：标题颜色 */
				color: #2c3e50;
				font-size: 16px;
			}

			.other {
				/* 修改：次要信息颜色 */
				color: #828c9a;
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