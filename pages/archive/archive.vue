<template>
  <view class="page-bg">
    <view class="container">
      <view class="header-title">编辑个人资料</view>

      <view class="form-card">
        <uv-form labelPosition="left" :model="userInfo" :rules="rules" ref="upRef" labelWidth="80">
          
          <uv-form-item label="姓名" prop="name" borderBottom class="form-item">
            <uv-input 
              v-model="userInfo.name" 
              border="none" 
              inputAlign="right" 
              placeholder="请输入真实姓名"
              placeholderStyle="color: #c0c4cc; font-size: 28rpx;"
            ></uv-input>
          </uv-form-item>

          <uv-form-item label="性别" prop="sex" borderBottom class="form-item">
            <view class="radio-box">
              <uv-radio-group v-model="userInfo.sex" placement="row" activeColor="#8e44ad">
                <uv-radio :customStyle="{marginLeft: '20rpx'}" name="0" label="男"></uv-radio>
                <uv-radio :customStyle="{marginLeft: '40rpx'}" name="1" label="女"></uv-radio>
              </uv-radio-group>
            </view>
          </uv-form-item>

          <uv-form-item label="手机号" prop="phone" borderBottom class="form-item">
            <uv-input 
              v-model="userInfo.phone" 
              border="none" 
              inputAlign="right" 
              placeholder="请输入联系方式"
              placeholderStyle="color: #c0c4cc; font-size: 28rpx;"
            ></uv-input>
          </uv-form-item>

          <uv-form-item label="微信昵称" prop="nickName" borderBottom class="form-item">
            <uv-input 
              v-model="userInfo.nickName" 
              border="none" 
              inputAlign="right" 
              placeholder="请输入微信昵称"
              placeholderStyle="color: #c0c4cc; font-size: 28rpx;"
            ></uv-input>
          </uv-form-item>

          <uv-form-item label="头像" prop="image" class="form-item avatar-item">
            <view class="upload-box">
               <uv-upload 
                :fileList="fileList" 
                multiple 
                :maxCount="1" 
                width="60" 
                height="60"
                @afterRead="afterRead"
                @delete="deletePic"
              ></uv-upload>
            </view>
          </uv-form-item>

        </uv-form>
      </view>

      <view class="btn-area">
        <button class="submit-btn" hover-class="btn-hover" @click="submit">保存修改</button>
      </view>

    </view>
  </view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { onReady, onLoad } from '@dcloudio/uni-app'
import http from '../../common/http.js'
import { updateUserInfoApi, getWxUserByIdApi } from '../../api/index.js'

// 表单ref属性
const upRef = ref()

// 表单绑定的对象
const userInfo = reactive({
  userId: uni.getStorageSync("userId"),
  sex: '',
  phone: '',
  nickName: '',
  image: '',
  name: ''
})

// 表单验证规则
const rules = reactive({
  'name': {
    type: 'string',
    required: true,
    message: '请输入姓名',
    trigger: ['blur', 'change']
  },
  'sex': {
    type: 'string',
    required: true,
    message: '请选择性别',
    trigger: ['blur', 'change']
  },
  'phone': {
    type: 'string',
    required: true,
    message: '请输入联系方式',
    trigger: ['blur', 'change']
  },
  'nickName': {
    type: 'string',
    required: true,
    message: '请输入微信昵称',
    trigger: ['blur', 'change']
  },
  'image': {
    type: 'string',
    required: true,
    message: '请上传头像',
    trigger: ['blur', 'change']
  },
})

// 图片上传逻辑
const fileList = ref([])

const deletePic = (event) => {
  fileList.value = fileList.value.filter((item, index) => {
    return index != event.index
  })
  // 删除图片后清空userInfo中的image字段，触发校验
  if(fileList.value.length === 0) {
    userInfo.image = ''
  }
}

const afterRead = async (event) => {
  let lists = [].concat(event.file)
  let fileListLen = fileList.value.length
  lists.map((item) => {
    fileList.value.push({
      ...item,
      status: 'uploading',
      message: '上传中'
    })
  })
  
  // #ifdef VUE3
  fileList.value = fileList.value.filter((item, index) => {
    return index >= 0
  })
  // #endif
  
  for (let i = 0; i < lists.length; i++) {
    const result = await uploadFilePromise(lists[i].url)
    userInfo.image = result; // 更新表单数据
    let item = fileList.value[fileListLen]
    fileList.value.splice(fileListLen, 1, Object.assign(item, {
      status: 'success',
      message: '',
      url: result
    }))
    fileListLen++
  }
}

const uploadFilePromise = (url) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: http.baseUrl + '/api/upload/uploadImage', 
      filePath: url,
      name: 'file',
      formData: {
        user: 'test'
      },
      success: (res) => {
        // 这里需要根据实际后端返回结构解析
        let result = JSON.parse(res.data) 
        // 假设后端返回 {code: 200, data: 'url...'}
        setTimeout(() => {
          resolve(result.data)
        }, 500)
      },
      fail: (err) => {
        uni.showToast({ title: '上传失败', icon: 'none' })
        reject(err)
      }
    });
  })
}

// 修改确定
const submit = () => {
  upRef.value.validate().then(async (res) => {
    if (res) {
      let apiRes = await updateUserInfoApi(userInfo)
      if (apiRes && apiRes.code == 200) {
        uni.showToast({ title: '修改成功', icon: 'success' })
        setTimeout(() => {
             uni.navigateBack({ delta: 1 })
        }, 1000)
      }
    }
  }).catch(errors => {
    // 校验失败的提示
  })
}

const loadUserInfo = async () => {
  const uid = uni.getStorageSync("userId");
  if (!uid) return;
  const res = await getWxUserByIdApi({ userId: uid });
  if (res && res.code === 200 && res.data) {
    Object.assign(userInfo, {
      userId: uid,
      sex: res.data.sex ? String(res.data.sex) : '', // 确保sex是字符串以匹配radio
      phone: res.data.phone || '',
      nickName: res.data.nickName || '',
      image: res.data.image || '',
      name: res.data.name || ''
    });
    
    fileList.value = [];
    if (userInfo.image) {
      const imgs = userInfo.image.split(",");
      for (let j = 0; j < imgs.length; j++) {
        // 判断是否已经是完整路径
        let imgUrl = imgs[j].startsWith('http') ? imgs[j] : http.baseUrl + imgs[j];
        fileList.value.push({ url: imgUrl });
      }
    }
  }
}

onReady(() => {
  upRef.value.setRules(rules)
})

onLoad((option) => {
  // 优化逻辑：优先使用参数，其次网络请求
  try {
    if (option && option.item) {
      const item = JSON.parse(decodeURIComponent(option.item))
      Object.assign(userInfo, item)
      // 数据清洗，确保radio选中正确
      if(userInfo.sex !== undefined) userInfo.sex = String(userInfo.sex) 

      fileList.value = [];
      if (userInfo.image) {
        const imgs = userInfo.image.split(",")
        for (let j = 0; j < imgs.length; j++) {
          let imgUrl = imgs[j].startsWith('http') ? imgs[j] : http.baseUrl + imgs[j];
          fileList.value.push({ url: imgUrl })
        }
      }
    } else {
      loadUserInfo();
    }
  } catch (e) {
    loadUserInfo();
  }
})
</script>

<style lang="scss">
/* 页面整体背景设为浅灰 */
page {
  background-color: #F6F7FB;
}

.page-bg {
  min-height: 100vh;
  padding-top: 30rpx;
  box-sizing: border-box;
}

.container {
  padding: 0 30rpx;
}

/* 顶部标题 */
.header-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
  padding-left: 10rpx;
}

/* 卡片样式 */
.form-card {
  background-color: #FFFFFF;
  border-radius: 24rpx;
  padding: 10rpx 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
}

.form-item {
  padding: 10rpx 0;
}

/* 输入框右对齐容器 */
.radio-box {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

/* 图片上传容器右对齐 */
.upload-box {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: 10rpx;
}

/* 按钮区域 */
.btn-area {
  margin-top: 60rpx;
  padding: 0 20rpx;
}

/* 自定义渐变按钮 */
.submit-btn {
  background: linear-gradient(135deg, #a569bd 0%, #8e44ad 100%);
  color: #FFFFFF;
  font-size: 32rpx;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 44rpx;
  box-shadow: 0 8rpx 16rpx rgba(142, 68, 173, 0.3);
  border: none;
  
  &::after {
    border: none;
  }
}

.btn-hover {
  opacity: 0.9;
  transform: scale(0.99);
}
</style>