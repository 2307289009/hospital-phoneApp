"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_list_item2 = common_vendor.resolveComponent("uv-list-item");
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_uv_list2 = common_vendor.resolveComponent("uv-list");
  (_easycom_uv_image2 + _easycom_uv_list_item2 + _easycom_uv_line2 + _easycom_uv_list2)();
}
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_list_item = () => "../../uni_modules/uv-list/components/uv-list-item/uv-list-item.js";
const _easycom_uv_line = () => "../../uni_modules/uv-line/components/uv-line/uv-line.js";
const _easycom_uv_list = () => "../../uni_modules/uv-list/components/uv-list/uv-list.js";
if (!Math) {
  (_easycom_uv_image + _easycom_uv_list_item + _easycom_uv_line + _easycom_uv_list)();
}
const _sfc_main = {
  __name: "primary",
  setup(__props) {
    const toUserInfo = () => {
      common_vendor.index.navigateTo({
        url: "/pages/information/information?item=" + encodeURIComponent(JSON.stringify(userInfo))
      });
    };
    const myVisit = () => {
      common_vendor.index.navigateTo({
        url: "/pages/order_patient/order_patient"
      });
    };
    const myOrder = () => {
      common_vendor.index.navigateTo({
        url: "/pages/order/order"
      });
    };
    const breakOut = () => {
      common_vendor.index.navigateTo({
        url: "/pages/patient/patient"
      });
    };
    const suggestion = () => {
      common_vendor.index.navigateTo({
        url: "/pages/suggestion/suggestion"
      });
    };
    const toNews = () => {
      common_vendor.index.navigateTo({
        url: "/pages/news/news"
      });
    };
    const updateBtn = () => {
      common_vendor.index.navigateTo({
        url: "/pages/reset_password/reset_password"
      });
    };
    const toLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    const userInfo = common_vendor.reactive({
      image: "",
      nickName: ""
    });
    const getWxUserById = async () => {
      let res = await api_index.getWxUserByIdApi({
        userId: common_vendor.index.getStorageSync("userId")
      });
      if (res && res.code == 200) {
        Object.assign(userInfo, res.data);
        console.log(userInfo);
      }
    };
    common_vendor.onShow(() => {
      getWxUserById();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.image
      }, userInfo.image ? {
        b: common_vendor.p({
          shape: "circle",
          src: common_vendor.unref(common_http.http).baseUrl + userInfo.image,
          width: "80px",
          height: "80px"
        })
      } : {
        c: common_vendor.p({
          shape: "circle",
          src: "/static/user.jpg",
          width: "80px",
          height: "80px"
        })
      }, {
        d: userInfo.nickName
      }, userInfo.nickName ? {
        e: common_vendor.t(userInfo.nickName)
      } : {}, {
        f: common_vendor.o(breakOut),
        g: common_vendor.p({
          title: "就诊卡",
          border: true,
          ["show-extra-icon"]: true,
          ["extra-icon"]: {
            icon: "tags",
            color: "#409EFF"
          },
          link: true
        }),
        h: common_vendor.o(suggestion),
        i: common_vendor.p({
          title: "反馈问题",
          border: true,
          ["show-extra-icon"]: true,
          ["extra-icon"]: {
            icon: "email",
            color: "#409EFF"
          },
          link: true
        }),
        j: common_vendor.o(toNews),
        k: common_vendor.p({
          title: "信息",
          border: true,
          ["show-extra-icon"]: true,
          ["extra-icon"]: {
            icon: "chat",
            color: "#409EFF"
          },
          link: true
        }),
        l: common_vendor.o(updateBtn),
        m: common_vendor.p({
          title: "修改账号",
          border: true,
          ["show-extra-icon"]: true,
          ["extra-icon"]: {
            icon: "edit-pen",
            color: "#409EFF"
          },
          link: true
        }),
        n: common_vendor.o(myOrder),
        o: common_vendor.p({
          title: "挂号记录",
          border: true,
          ["show-extra-icon"]: true,
          ["extra-icon"]: {
            icon: "order",
            color: "#409EFF"
          },
          link: true
        }),
        p: common_vendor.o(myVisit),
        q: common_vendor.p({
          title: "就诊记录",
          border: true,
          ["show-extra-icon"]: true,
          ["extra-icon"]: {
            icon: "order",
            color: "#409EFF"
          },
          link: true
        }),
        r: common_vendor.o(toUserInfo),
        s: common_vendor.p({
          title: "修改档案",
          border: true,
          ["show-extra-icon"]: true,
          ["extra-icon"]: {
            icon: "list-dot",
            color: "#409EFF"
          },
          link: true
        }),
        t: common_vendor.o(toLogin),
        v: common_vendor.p({
          title: "退出",
          border: true,
          ["show-extra-icon"]: true,
          ["extra-icon"]: {
            icon: "close",
            color: "#409EFF"
          },
          link: true
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fa34f965"], ["__file", "E:/System/phone/pages/primary/primary.vue"]]);
wx.createPage(MiniProgramPage);
