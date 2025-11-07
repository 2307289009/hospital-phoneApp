"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  (_easycom_uv_image2 + _easycom_uv_icon2)();
}
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
if (!Math) {
  (_easycom_uv_image + _easycom_uv_icon)();
}
const _sfc_main = {
  __name: "primary",
  setup(__props) {
    const isLoading = common_vendor.ref(true);
    const isError = common_vendor.ref(false);
    const userInfo = common_vendor.reactive({
      image: "",
      nickName: ""
    });
    const isLoggedIn = common_vendor.computed(() => !!common_vendor.index.getStorageSync("userId"));
    const getWxUserById = async () => {
      const userId = common_vendor.index.getStorageSync("userId");
      if (!userId) {
        Object.assign(userInfo, {
          image: "",
          nickName: ""
        });
        isLoading.value = false;
        isError.value = false;
        return;
      }
      isLoading.value = true;
      isError.value = false;
      try {
        let res = await api_index.getWxUserByIdApi({
          userId
        });
        if (res && res.code == 200) {
          Object.assign(userInfo, res.data);
        } else {
          throw new Error("Failed to fetch user info");
        }
      } catch (error) {
        console.error("获取用户信息失败:", error);
        isError.value = true;
      } finally {
        isLoading.value = false;
        common_vendor.index.stopPullDownRefresh();
      }
    };
    const retryLoad = () => {
      getWxUserById();
    };
    common_vendor.onShow(() => {
      getWxUserById();
    });
    common_vendor.onPullDownRefresh(() => {
      getWxUserById();
    });
    const see = () => {
      common_vendor.index.navigateTo({
        url: "/pages/see/see"
      });
    };
    const evaluate = () => {
      common_vendor.index.navigateTo({
        url: "/pages/evaluate/evaluate"
      });
    };
    const record = () => {
      common_vendor.index.navigateTo({
        url: "/pages/record/record"
      });
    };
    const toNews = () => {
      common_vendor.index.navigateTo({
        url: "/pages/journal/journal"
        // 修正了路径，与上个页面一致
      });
    };
    const toAuthIdentity = () => {
      common_vendor.index.navigateTo({
        url: "/pages/identity/identity"
      });
    };
    const toLogin = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("userId");
            getWxUserById();
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoading.value
      }, isLoading.value ? {} : isError.value ? {
        c: common_vendor.p({
          shape: "circle",
          src: "/static/user.jpg",
          width: "150rpx",
          height: "150rpx"
        }),
        d: common_vendor.o(retryLoad)
      } : common_vendor.e({
        e: userInfo.image
      }, userInfo.image ? {
        f: common_vendor.p({
          shape: "circle",
          src: common_vendor.unref(common_http.http).baseUrl + userInfo.image,
          width: "150rpx",
          height: "150rpx"
        })
      } : {
        g: common_vendor.p({
          shape: "circle",
          src: "/static/user.jpg",
          width: "150rpx",
          height: "150rpx"
        })
      }, {
        h: common_vendor.t(userInfo.nickName || "请登录")
      }), {
        b: isError.value,
        i: common_vendor.p({
          name: "list-dot",
          color: "#409EFF",
          size: "22"
        }),
        j: common_vendor.p({
          name: "arrow-right",
          color: "#909399",
          size: "16"
        }),
        k: common_vendor.o(toNews),
        l: common_vendor.p({
          name: "account",
          color: "#409EFF",
          size: "22"
        }),
        m: common_vendor.p({
          name: "arrow-right",
          color: "#909399",
          size: "16"
        }),
        n: common_vendor.o(toAuthIdentity),
        o: common_vendor.p({
          name: "list-dot",
          color: "#F9AE3D",
          size: "22"
        }),
        p: common_vendor.p({
          name: "arrow-right",
          color: "#909399",
          size: "16"
        }),
        q: common_vendor.o(evaluate),
        r: common_vendor.p({
          name: "list-dot",
          color: "#F9AE3D",
          size: "22"
        }),
        s: common_vendor.p({
          name: "arrow-right",
          color: "#909399",
          size: "16"
        }),
        t: common_vendor.o(record),
        v: common_vendor.p({
          name: "list-dot",
          color: "#F9AE3D",
          size: "22"
        }),
        w: common_vendor.p({
          name: "arrow-right",
          color: "#909399",
          size: "16"
        }),
        x: common_vendor.o(see),
        y: common_vendor.unref(isLoggedIn)
      }, common_vendor.unref(isLoggedIn) ? {
        z: common_vendor.o(toLogin)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fa34f965"], ["__file", "E:/System/phone/pages/primary/primary.vue"]]);
wx.createPage(MiniProgramPage);
