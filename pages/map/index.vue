<template>
  <view style="width: 100%; height: 100vh;">
    <canvas 
      type="webgl" 
      id="fengmap" 
      canvas-id="fengmap"
      style="width: 100%; height: 100%;" 
      @touchstart="touchStart" 
      @touchmove="touchMove" 
      @touchend="touchEnd"
    ></canvas>
    <canvas 
      type="2d" 
      id="overlay" 
      canvas-id="overlay"
      style="position:absolute; left:-1000px; width: 500px; height: 500px;"
    ></canvas>
  </view>
</template>

<script>
// ---------------------------------------------------------
// 1. 环境垫片 (Polyfill)：欺骗 SDK 以为在浏览器环境
// ---------------------------------------------------------
if (typeof window === 'undefined') {
    const noop = () => {};
    const dummyDocument = {
        createElement: () => ({
            getContext: () => ({ fillRect: noop, drawImage: noop, clearRect: noop, getImageData: () => ({ data: [] }) }),
            style: {}, width: 0, height: 0
        }),
        createElementNS: () => ({}),
        getElementById: () => null,
        body: { appendChild: noop, removeChild: noop }
    };
    global.window = global;
    global.document = dummyDocument;
    global.navigator = { userAgent: 'micromessenger' };
}

// ---------------------------------------------------------
// 2. 引入 SDK (修复点：使用 * as 语法)
// ---------------------------------------------------------
// 解释：因为文件没有 export default，我们要把它的所有 exports 抓取到一个叫 fengmapModule 的对象里
import * as fengmapModule from '@/common/miniProgram_SDK_v3.1.8_Lib/fengmap.minimap.min.js';

// ---------------------------------------------------------
// 3. 提取核心类
// ---------------------------------------------------------
// 此时 fengmapModule 包含了文件里所有的导出
// 我们优先取 fengmapModule.FMWXSetting，备选 fengmapModule.default.FMWXSetting
const FMWXSetting = fengmapModule.FMWXSetting || fengmapModule.default?.FMWXSetting;
const FMMap = fengmapModule.FMMap || fengmapModule.default?.FMMap;

export default {
  data() {
    return {
      fmap: null,
      canvasNode: null
    };
  },
  onReady() {
    // 调试：如果控制台打印出的对象是空的，说明路径可能还有问题
    console.log("SDK Module Loaded:", fengmapModule);
    
    if (!FMMap) {
        console.error("SDK 类提取失败，请查看上面打印的 SDK Module 内容");
        return;
    }
    this.initMap();
  },
  methods: {
    initMap() {
      wx.createSelectorQuery().in(this).select('#fengmap').boundingClientRect(rect => {
        if (!rect) {
            console.error('未找到 canvas #fengmap');
            return;
        }
        
        FMWXSetting.boundingClientRect = rect;

        wx.createSelectorQuery().in(this).select('#fengmap').node().exec((res) => {
          if (!res[0] || !res[0].node) return;
          const canvas = res[0].node;
          this.canvasNode = canvas;

          wx.createSelectorQuery().in(this).select("#overlay").node().exec((tempRes) => {
            const tmpCanvas = tempRes[0]?.node;
            if (tmpCanvas) FMWXSetting.textureCanvas = [tmpCanvas];

            // 你的配置保持不变
            const mapOptions = {
              container: canvas,
              appName: 'HospitalNav',
              key: 'ddc2639ce5ff01d57e9d4a61f8ea67a5',
              mapID: '1991048910850551809',
              mapThemeURL: 'https://lib.fengmap.com/theme/2001',
              defaultThemeName: '2001',
              modelSelectedEffect: false,
              floorSpace: 5,
              webWorker: { useWebWorker: false }
            };

            this.fmap = new FMMap(mapOptions);

            // 监听加载完成
            this.fmap.on('loaded', () => {
                console.log('>>> 地图加载完成');
                
                if (this.fmap.bound) {
                    this.fmap.setFitView(this.fmap.bound, {
                        animate: true,
                        duration: 0.1,
                        finish: () => { console.log(">>> 视角适配完成"); }
                    });
                }
                console.log("FloorSpace:", this.fmap.getFloorSpace());
            });

            // 显式触发加载
            this.fmap.openMapById(mapOptions.mapID, (error) => {
                if(error) console.error("地图数据下载失败:", error);
            });

          });
        });
      }).exec();
    },

    touchStart(e) {
      if (this.canvasNode) this.canvasNode.dispatchTouchEvent({ ...e, type: 'touchstart' });
    },
    touchMove(e) {
      if (this.canvasNode) this.canvasNode.dispatchTouchEvent({ ...e, type: 'touchmove' });
    },
    touchEnd(e) {
      if (this.canvasNode) this.canvasNode.dispatchTouchEvent({ ...e, type: 'touchend' });
    }
  }
};
</script>