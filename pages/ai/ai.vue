<template>
  <view class="ai-wrapper">
    <view class="info-card">
      <text class="info-title" style="display: flex;">智能问诊/挂号助手</text>
      <text class="info-desc">直接咨询您的问题，我将为您推荐科室、指导就诊。</text>
    </view>

    <view class="chat-container">
      <scroll-view class="messages" scroll-y :scroll-into-view="messages.length ? `msg-${messages.length - 1}` : ''" scroll-with-animation>
        <view
          v-for="(msg, index) in messages"
          :key="index"
          :id="`msg-${index}`"
          :class="['msg-item', msg.role]"
        >
          <view class="msg-content">
            <text>{{ msg.text }}</text>
          </view>
          
        </view>
      </scroll-view>

      <view class="quick-panel">
        <view class="quick-item" v-for="q in quickList" :key="q" @click="quickAsk(q)">
          <text>{{ q }}</text>
        </view>
      </view>

      <view class="input-area">
        <input
          class="input"
          v-model="inputText"
          placeholder="例如：头疼、发烧、怎么挂科室…"
          confirm-type="send"
          @confirm="sendMessage"
        />
        <button class="send-btn" @click="sendMessage" :disabled="!inputText.trim()">发送</button>
      </view>
    </view>
  </view>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getAiMessages, getCorpus } from '../../api'

const inputText = ref('')

let quickList = ref([]);

const messages = ref([
  { role: 'ai', text: '你好，我是您的智能问诊/挂号助手。请描述您的症状或直接提问。' }
])

const getCorpusMessages = async () => {
	const corpusList = await getCorpus();
	quickList.value = corpusList;
}

// 发送消息
const sendMessage = async () => {
  const text = inputText.value.trim()
  if (!text) return

  messages.value.push({ 
	  role: 'user', 
	  text 
	})
  await reply(text);
  inputText.value = ''
  return text;
}

const reply = async (text) => {
	const replyText = await getAiMessages({text});
	messages.value.push({
		role: 'ai',
		text: replyText
	})
	return;
}

const quickAsk = async (text) => {
	if(!text) return;
	messages.value.push({
		role: 'user',
		text
	})
	
	const replyText = await getAiMessages({text});
	messages.value.push({
		role: 'ai',
		text: replyText
	});
	return;
	
}

onMounted(() => {
	getCorpusMessages();
});

</script>
<style scoped>
/* 全局容器 */
.ai-wrapper {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  background-color: #f5f6f7; /* 轻微背景色 */
  min-height: 100vh;
}

/* 顶部简介卡片 - 增加蓝白主色调 */
.info-card {
  background: linear-gradient(135deg, #4a90e2, #2d6cd8);
  color: #ffffff;
  padding: 35rpx 28rpx;
  border-radius: 24rpx; /* 更圆润 */
  box-shadow: 0 8rpx 25rpx rgba(45, 108, 216, 0.3);
  margin-bottom: 20rpx;
}

.info-title {
  font-size: 38rpx;
  font-weight: 700;
  margin-bottom: 8rpx;
}

.info-desc {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
}

/* 主聊天容器 */
.chat-container {
  background: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 18rpx rgba(0, 0, 0, 0.05);
  flex: 1; /* 占据剩余空间 */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 防止子元素溢出 */
  min-height: 50vh; /* 确保最小高度 */
}

/* 消息区 */
.messages {
  flex: 1;
  padding: 20rpx;
  overflow-y: auto;
}

/* 消息项 */
.msg-item {
  display: flex;
  flex-direction: column; /* 允许操作按钮在消息下方 */
  margin: 20rpx 0;
  max-width: 80%;
}

.msg-content {
  padding: 16rpx 24rpx;
  border-radius: 20rpx; /* 更圆润 */
  line-height: 1.6;
  font-size: 28rpx;
  word-break: break-word; /* 避免长文本溢出 */
}

.msg-item.user {
  align-self: flex-end;
}

.msg-item.user .msg-content {
  background-color: #4a90e2; /* 用户消息用主色调 */
  color: #ffffff;
  border-bottom-right-radius: 6rpx;
}

.msg-item.ai {
  align-self: flex-start;
}

.msg-item.ai .msg-content {
  background-color: #f0f4f7;
  color: #333;
  border-bottom-left-radius: 6rpx;
}

/* AI回复中的操作按钮区 */
.msg-actions {
  margin-top: 10rpx;
  display: flex;
  gap: 12rpx;
  flex-wrap: wrap;
}

.msg-item.ai .action-btn {
  background-color: #e6f0ff;
  color: #2d6cd8;
  font-size: 26rpx;
  padding: 10rpx 20rpx;
  border-radius: 16rpx;
  line-height: 1.2;
  border: 1px solid #cce0ff;
}

/* 快捷咨询面板 - 位于输入区上方，方便点击 */
.quick-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  padding: 20rpx 20rpx 10rpx 20rpx;
  border-top: 1px solid #eee;
}

.quick-item {
  background: #ffffff;
  padding: 12rpx 20rpx;
  font-size: 26rpx;
  border-radius: 16rpx;
  color: #666;
  border: 1px solid #e0e0e0;
}

/* 输入区 */
.input-area {
  display: flex;
  gap: 10rpx;
  padding: 20rpx;
  background-color: #ffffff;
  border-top: 1px solid #eee;
}

.input {
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 18rpx; /* 更圆润 */
  padding: 16rpx;
  font-size: 28rpx;
}

.send-btn {
  background: #4a90e2;
  color: #fff;
  padding: 0 30rpx;
  border-radius: 18rpx;
  font-size: 28rpx;
  height: auto; /* 自动高度 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-btn[disabled] {
    background-color: #a4c4e8;
}
</style>