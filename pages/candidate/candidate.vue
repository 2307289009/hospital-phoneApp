<template>
  <view class="page-container">
    <view v-if="isLoading" class="skeleton-list">
      <view class="skeleton-card" v-for="i in 3" :key="i">
        <view class="skeleton-bar skeleton-gradient"></view>
        <view class="skeleton-content">
          <view class="skeleton-line skeleton-gradient w60"></view>
          <view class="skeleton-line skeleton-gradient w80"></view>
          <view class="skeleton-line skeleton-gradient w70"></view>
        </view>
      </view>
    </view>

    <view v-else-if="isError" class="error-view">
      <uv-empty mode="network" text="加载失败，请检查网络"></uv-empty>
      <uv-button
        type="primary"
        text="点击重试"
        @click="loadData"
        customStyle="width: 180px; margin-top: 20px;"
      ></uv-button>
    </view>

    <view v-else class="patient-list">
      <view
        v-for="item in waitlist"
        :key="item.id"
        :class="['patient-card', getStatusClass(item.status)]"
      >
        <view class="card-main">
          <view class="title-row">
            <text class="name">{{ item.visitname }}</text>
            <text :class="['status-text', getStatusClass(item.status)]">
              {{ getStatusText(item.status) }}
            </text>
          </view>
          <view class="sub-row">
            <text class="sub">{{ item.doctorName }} · {{ item.deptName }}</text>
          </view>
          <view class="info-row">
            <uv-icon name="calendar" color="#909399" size="16"></uv-icon>
            <text class="info"
              >{{ item.times }} {{ item.timesAreaLabel }} ·
              {{ item.week }}</text
            >
          </view>
        </view>
      </view>

      <view v-if="waitlist.length === 0" class="empty-view">
        <uv-empty mode="data" text="暂无候补记录"></uv-empty>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getMyWaitlistApi } from '../../api/index.js'

const isLoading = ref(true)
const isError = ref(false)
const waitlist = ref([])

// 【新】根据状态获取 CSS 类名
const getStatusClass = (status) => {
  if (status === 'pending') return 'status-pending'
  if (status === 'allocated') return 'status-allocated'
  return 'status-cancelled'
}

// 【新】根据状态获取文本
const getStatusText = (status) => {
  if (status === 'pending') return '候补中'
  if (status === 'allocated') return '已分配'
  return '已取消'
}

const loadData = async () => {
  const userId = uni.getStorageSync('userId')
  if (!userId) {
    isLoading.value = false
    waitlist.value = []
    return
  }
  isLoading.value = true
  isError.value = false
  try {
    // 模拟加载
    // await new Promise(resolve => setTimeout(resolve, 1500));
    const res = await getMyWaitlistApi({ userId })
    if (res && res.code === 200) {
      waitlist.value = res.data || []
    } else {
      isError.value = true
    }
  } catch (e) {
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

onLoad(() => {
  loadData()
})
</script>

<style scoped lang="scss">
// 动画：骨架屏渐变 (不变)
@keyframes skeleton-gradient {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
.skeleton-gradient {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-gradient 1.5s infinite linear;
}

// --- 页面背景 ---
.page-container {
  // 【新】使用一个非常淡的渐变背景，比纯灰更现代
  background: linear-gradient(180deg, #f8faff 0%, #f5f7fa 100%);
  min-height: 100vh;
  padding: 12px;
}

// --- 数据卡片列表 ---
.patient-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.patient-card {
  position: relative; // 为了左侧色条定位
  background-color: #fff;
  border-radius: 8px; // 轻微减小圆角，更干练
  // 【新】使用更柔和、更现代的阴影
  box-shadow: 0 4px 16px rgba(0, 40, 100, 0.06);
  padding: 16px 16px 16px 20px; // 左侧留出更多空间
  border: 1px solid #f0f0f0;
  overflow: hidden; // 确保伪元素不溢出
  // 【新】增加过渡动画
  transition: all 0.3s ease;

  // 【新】鼠标悬停或点击时的浮起效果
  // #ifdef H5
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 40, 100, 0.1);
  }
  // #endif
  
  // 【核心】左侧状态色条 (使用 ::before 伪元素)
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background-color: #909399; // 默认颜色
    // 动态颜色
  }
}

// --- 动态状态样式 ---
.patient-card.status-pending::before {
  background-color: #e6a23c; // 警告 (候补中)
}
.patient-card.status-allocated::before {
  background-color: #67c23a; // 成功 (已分配)
}
.patient-card.status-cancelled::before {
  background-color: #c0c4cc; // 灰色 (已取消)
}

.card-main {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.name {
  font-size: 17px;
  font-weight: 600;
  color: #2c3e50; // 【新】使用更深的颜色
}

// 【新】状态文字样式
.status-text {
  font-size: 14px;
  font-weight: 500;
  flex-shrink: 0; // 防止被挤压
}
.status-text.status-pending {
  color: #e6a23c;
}
.status-text.status-allocated {
  color: #67c23a;
}
.status-text.status-cancelled {
  color: #c0c4cc;
}

.sub-row {
  color: #555; // 【新】加深一点，提高可读性
  font-size: 14px;
}
.info-row {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #7f8c8d; // 【新】使用更柔和的灰色
  font-size: 13px;
  padding-top: 4px;
}

// --- 骨架屏 (更新) ---
.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.skeleton-card {
  display: flex; // 【新】改为 flex 布局
  gap: 14px; // 【新】色条和内容的间距
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(0, 40, 100, 0.06);
  border: 1px solid #f0f0f0;
  overflow: hidden;
}

// 【新】模拟左侧色条
.skeleton-bar {
  width: 6px;
  height: 60px; // 给一个大致高度
  border-radius: 4px;
}
// 【新】内容区
.skeleton-content {
  flex: 1;
}

.skeleton-line {
  height: 16px; // 增大高度
  border-radius: 4px;
  margin-bottom: 12px;
}
.skeleton-line:last-child {
  margin-bottom: 0;
}
// 【新】更新了宽度模拟
.w60 { width: 60%; }
.w70 { width: 70%; }
.w80 { width: 80%; }

// --- 错误和空状态 (不变) ---
.error-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20vh;
}
.empty-view {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20vh;
}
</style>