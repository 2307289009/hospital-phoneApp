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

		<view v-if="latestOrder" class="latest-card" @click="toRecord">
			<view class="card-header">
				<view class="title-area">
					<uv-icon name="bell" size="20" color="#3F51B5"></uv-icon>
					<text class="title-text">当前挂号提醒</text>
				</view>
				
				<view class="header-right">
					<uv-button 
						text="导航" 
						size="mini" 
						:plain="true" 
						shape="circle" 
						icon="map"
						:customStyle="{ marginRight: '8px', height: '24px', padding: '0 8px', fontSize: '12px' }"
						@click.stop="toNav"
					></uv-button>

					<view class="status-area">
						<uv-text v-if="latestOrder.signInStatus == '1'" size="12" color="#67C23A" text="已签到"></uv-text>
						<uv-text v-else-if="isMissed(latestOrder)" size="12" color="#909399" text="已过号"></uv-text>
						<uv-text v-else-if="latestOrder.hasCall == '1'" size="12" color="#F56C6C" :text="countdown(latestOrder)"></uv-text>
						<uv-text v-else size="12" color="#3F51B5" text="等待叫号"></uv-text>
					</view>
				</view>
			</view>
			
			<uv-line color="#eeeeee"></uv-line>

			<view class="card-body">
				<view class="info-main">
					<image class="doctor-avatar-small" :src="latestOrder.image ? http.baseUrl + latestOrder.image : '/static/logo.png'" mode="aspectFill"></image>
					<view class="info-text">
						<view class="row-1">
							<text class="dept">{{latestOrder.deptName}}</text>
							<text class="doc">{{latestOrder.nickName}}</text>
						</view>
						<view class="row-2">
							<uv-icon name="clock" size="14" color="#606266"></uv-icon>
							<text class="time">{{latestOrder.times}} ({{latestOrder.week}}) {{ latestOrder.timesArea == '0' ? '上午' : '下午' }}</text>
						</view>
					</view>
				</view>
				
				<view class="action-btn" @click.stop>
					<uv-button v-if="latestOrder.hasCall == '1' && !isMissed(latestOrder) && latestOrder.signInStatus != '1'" 
						@click="checkIn(latestOrder)" size="small" :plain="true" text="签到" 
						shape="circle" :customStyle="{ color: '#67C23A', borderColor: '#67C23A', height: '28px', padding: '0 15px' }">
					</uv-button>
					
					<uv-button v-if="isMissed(latestOrder) && latestOrder.status != '2' && latestOrder.signInStatus != '1'" 
						@click="reapply(latestOrder)" size="small" :plain="true" text="重新排号" 
						shape="circle" :customStyle="{ color: '#409EFF', borderColor: '#409EFF', height: '28px', padding: '0 10px' }">
					</uv-button>
				</view>
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
					<view class="doctor-department">{{item.deptName}}</view>
					<view class="doctor-good-at">
						<uv-text :lines="1" :text="'擅长：' + item.goodAt" color="#888" size="13"></uv-text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad, onShow, onUnload } from '@dcloudio/uni-app'
	import http from '../../common/http.js'
	import {
		getIndexNewsApi,
		getIndexDeptApi,
		getIndexDoctorApi,
		getOrderListApi,
		checkInApi,
		reapplyApi
	} from '../../api/index.js'
	
	const indicatorDots = ref(true)
	const autoplay = ref(true)
	const interval = ref(3000)
	const duration = ref(500)
	const swipperList = ref([])
	const baseList = ref([])
	const doctorList = ref([])
	
	const latestOrder = ref(null)
	const nowTs = ref(Date.now())
	let timer = null
	
	const getIndexNews = async () => {
		let res = await getIndexNewsApi()
		if (res && res.code == 200) swipperList.value = res.data;
	}
	
	const getIndexDept = async () => {
		let res = await getIndexDeptApi()
		if (res && res.code == 200 && res.data.length > 0) {
			baseList.value = res.data.map((dept, index) => ({
				title: dept.deptName,
				deptId: dept.deptId,
				img: `/static/d${index + 1}.png`
			}));
		}
	}
	
	const getIndexDoctor = async () => {
		let res = await getIndexDoctorApi()
		if (res && res.code == 200) doctorList.value = res.data;
	}
	
	const getLatestOrder = async () => {
		// latestOrder.value = null 
		
		let res = await getOrderListApi({
			currentPage: 1,
			pageSize: 10,
			userId: uni.getStorageSync("userId")
		})
		
		if (res && res.code == 200 && res.data.records) {
			const validOrders = res.data.records.filter(item => item.status != '2' && item.hasVisit != '1');
			
			if (validOrders.length > 0) {
				const target = validOrders[0];
				const ts = smartTs(target.calledTime)
				const baseTs = ts > 0 ? ts : (target.hasCall === '1' ? Date.now() : 0)
				latestOrder.value = Object.assign({}, target, { _baseTs: baseTs })
			} else {
				latestOrder.value = null;
			}
		}
	}
	
	const toRecord = () => {
		uni.switchTab({ url: '/pages/record/record' })
	}
	
	const checkIn = async (item) => {
		const res = await checkInApi({ makeId: item.makeId })
		if (res && res.code === 200) {
			uni.showToast({ title: '签到成功', icon: 'success' })
			getLatestOrder()
		}
	}
	
	const reapply = async (item) => {
		const res = await reapplyApi({ makeId: item.makeId })
		if (res && res.code === 200) {
			uni.showToast({ title: '已重新排号', icon: 'none' })
			getLatestOrder()
		}
	}
	
	const parseDateTimeTs = (t) => {
		if (!t) return 0
		if (typeof t === 'number') return t
		if (t instanceof Date) return t.getTime()
		const s = String(t).trim()
		const d = new Date(s)
		if (!isNaN(d.getTime())) return d.getTime()
		// IOS兼容
		const r = s.match(/^([0-9]{4})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})[ T]([0-9]{1,2}):([0-9]{1,2})(?::([0-9]{1,2}))?/)
		if (!r) return 0
		return new Date(parseInt(r[1],10), parseInt(r[2],10)-1, parseInt(r[3],10), parseInt(r[4],10), parseInt(r[5],10), r[6]?parseInt(r[6],10):0).getTime()
	}

	const smartTs = (t) => {
		const tl = parseDateTimeTs(t)
		let tu = 0
		if (typeof t === 'string') {
			const s = t.trim()
			const r = s.match(/^([0-9]{4})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})[ T]([0-9]{1,2}):([0-9]{1,2})(?::([0-9]{1,2}))?/)
			if (r) {
				tu = Date.UTC(parseInt(r[1],10), parseInt(r[2],10)-1, parseInt(r[3],10), parseInt(r[4],10), parseInt(r[5],10), r[6]?parseInt(r[6],10):0)
			}
		}
		if (tl === 0 && tu !== 0) return tu
		if (tu === 0 && tl !== 0) return tl
		if (tl !== 0 && tu !== 0) {
			const now = nowTs.value
			return Math.abs(now - tl) <= Math.abs(now - tu) ? tl : tu
		}
		return 0
	}

	const isMissed = (item) => {
		if (!item.calledTime || item.signInStatus === '1') return false
		let base = (typeof item._baseTs === 'number' && item._baseTs > 0) ? item._baseTs : smartTs(item.calledTime)
		if (base === 0 && item.hasCall === '1') {
			base = item._baseTs = (item._baseTs && item._baseTs > 0) ? item._baseTs : Date.now()
		}
		const remain = 180 - Math.floor((nowTs.value - base) / 1000)
		return remain <= 0
	}

	const countdown = (item) => {
		if (!item.calledTime || item.signInStatus === '1') return ''
		let base = (typeof item._baseTs === 'number' && item._baseTs > 0) ? item._baseTs : smartTs(item.calledTime)
		if (base === 0 && item.hasCall === '1') {
			base = item._baseTs = (item._baseTs && item._baseTs > 0) ? item._baseTs : Date.now()
		}
		const remain = 180 - Math.floor((nowTs.value - base) / 1000)
		return remain > 0 ? `剩余 ${remain}s` : '已过号'
	}

	const toDoctor = (item) => {
		uni.navigateTo({ url: "../doctorIdentity/doctorIdentity?item=" + encodeURIComponent(JSON.stringify(item)) })
	}
	
	const toDoctorList = (item) => {
		uni.navigateTo({ url: "../doctorDepartment/doctorDepartment?item=" + encodeURIComponent(JSON.stringify(item)) })
	}

	const toNav = () => {
    // 方式一：如果是 H5 (浏览器) 运行，直接跳
    // #ifdef H5
    window.location.href = 'http://localhost:1234';
    // #endif

    // 方式二：如果是小程序，必须跳转到一个 web-view 页面
    // #ifdef MP-WEIXIN
    uni.navigateTo({
        // 注意：你需要创建一个 pages/webview/webview 页面才能真正生效
        // 这里的 encodeURIComponent 是为了防止链接中的特殊字符影响参数解析
        url: `/pages/webview/webview?url=${encodeURIComponent('http://localhost:1234')}`
    })
    // #endif
}
	
	onLoad(() => {
		getIndexNews()
		getIndexDept()
		getIndexDoctor()
		getLatestOrder()
		
		timer = setInterval(() => { nowTs.value = Date.now() }, 1000)
	})
	
	onShow(() => {
		getLatestOrder()
	})
	
	onUnload(() => {
		if(timer) clearInterval(timer)
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
		.item { height: 180px; }
		.imgs { width: 100%; height: 100%; }
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
	.nav-icon { width: 45px; height: 45px; margin-bottom: 8px; }
	.nav-title { color: #333; font-size: 14px; }

	/* === 新增：最近挂号卡片样式 === */
	.latest-card {
		background-color: #ffffff;
		border-radius: 12px;
		margin: 15px 15px 0 15px; /* 上边距15px，左右15px */
		padding: 12px 15px;
		box-shadow: 0 4px 12px rgba(63, 81, 181, 0.12); /* 蓝色阴影 */
		border-left: 5px solid #3F51B5; /* 左侧装饰 */
		
		&:active { background-color: #fafafa; }
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 10px;
		.title-area {
			display: flex;
			align-items: center;
			.title-text { font-size: 15px; font-weight: bold; color: #333; margin-left: 6px; }
		}
	}
	.header-right {
		display: flex;
		align-items: center;
	}

	.title-area {
		display: flex;
		align-items: center;
		.title-text {
			font-size: 15px;
			font-weight: bold;
			color: #333;
			margin-left: 6px;
		}
	}

	.card-body {
		padding-top: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.info-main {
			display: flex;
			align-items: center;
			.doctor-avatar-small {
				width: 45px; height: 45px; border-radius: 50%; margin-right: 12px; background-color: #eee;
			}
			.info-text {
				display: flex; flex-direction: column;
				.row-1 {
					margin-bottom: 4px;
					.dept { font-size: 14px; font-weight: bold; color: #333; margin-right: 8px; }
					.doc { font-size: 13px; color: #666; }
				}
				.row-2 {
					display: flex; align-items: center;
					.time { font-size: 12px; color: #888; margin-left: 4px; }
				}
			}
		}
	}
	/* ============================ */

	/* 板块标题 */
	.section-title-container { padding: 15px; }
	.section-title {
		font-size: 18px; font-weight: bold; color: #333;
		padding-left: 8px; border-left: 4px solid #00796B;
	}

	/* 专家列表 */
	.doctor-list-container { padding: 0 15px 15px; }
	.doctor-card {
		display: flex; align-items: flex-start;
		padding: 15px; margin-bottom: 12px;
		background-color: #ffffff; border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		
		&:active { transform: scale(0.98); }
	}

	.doctor-avatar { width: 75px; height: 75px; border-radius: 50%; margin-right: 15px; flex-shrink: 0; }
	.doctor-info { display: flex; flex-direction: column; flex: 1; min-width: 0; }
	.info-line-one { display: flex; align-items: baseline; margin-bottom: 8px; }
	.doctor-name { color: #00796B; font-size: 17px; font-weight: bold; margin-right: 8px; }
	.doctor-job-title { color: #546E7A; font-size: 14px; }
	.doctor-department { color: #546E7A; font-size: 14px; margin-bottom: 8px; }
</style>