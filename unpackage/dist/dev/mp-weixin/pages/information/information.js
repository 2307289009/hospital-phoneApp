"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_form_item2 = common_vendor.resolveComponent("uv-form-item");
  const _easycom_uv_radio2 = common_vendor.resolveComponent("uv-radio");
  const _easycom_uv_radio_group2 = common_vendor.resolveComponent("uv-radio-group");
  const _easycom_uv_upload2 = common_vendor.resolveComponent("uv-upload");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_form2 = common_vendor.resolveComponent("uv-form");
  (_easycom_uv_input2 + _easycom_uv_form_item2 + _easycom_uv_radio2 + _easycom_uv_radio_group2 + _easycom_uv_upload2 + _easycom_uv_button2 + _easycom_uv_form2)();
}
const _easycom_uv_input = () => "../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_form_item = () => "../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js";
const _easycom_uv_radio = () => "../../uni_modules/uv-radio/components/uv-radio/uv-radio.js";
const _easycom_uv_radio_group = () => "../../uni_modules/uv-radio/components/uv-radio-group/uv-radio-group.js";
const _easycom_uv_upload = () => "../../uni_modules/uv-upload/components/uv-upload/uv-upload.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_form = () => "../../uni_modules/uv-form/components/uv-form/uv-form.js";
if (!Math) {
  (_easycom_uv_input + _easycom_uv_form_item + _easycom_uv_radio + _easycom_uv_radio_group + _easycom_uv_upload + _easycom_uv_button + _easycom_uv_form)();
}
const _sfc_main = {
  __name: "information",
  setup(__props) {
    const upRef = common_vendor.ref();
    const userInfo = common_vendor.reactive({
      userId: "",
      sex: "",
      phone: "",
      nickName: "",
      image: "",
      name: ""
    });
    const rules = common_vendor.reactive({
      "name": {
        type: "string",
        required: true,
        message: "姓名",
        trigger: ["blur", "change"]
      },
      "sex": {
        type: "string",
        required: true,
        message: "性别",
        trigger: ["blur", "change"]
      },
      "phone": {
        type: "string",
        required: true,
        message: "联系方式",
        trigger: ["blur", "change"]
      },
      "nickName": {
        type: "string",
        required: true,
        message: "微信昵称",
        trigger: ["blur", "change"]
      },
      "image": {
        type: "string",
        required: true,
        message: "头像",
        trigger: ["blur", "change"]
      }
    });
    const fileList = common_vendor.ref([]);
    const deletePic = (event) => {
      fileList.value = fileList.value.filter((item, index) => {
        return index != event.index;
      });
    };
    const afterRead = async (event) => {
      console.log(event);
      let lists = [].concat(event.file);
      let fileListLen = fileList.value.length;
      lists.map((item) => {
        fileList.value.push({
          ...item,
          status: "uploading",
          message: "上传中"
        });
      });
      fileList.value = fileList.value.filter((item, index) => {
        return index >= 0;
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await uploadFilePromise(lists[i].url);
        console.log(result);
        userInfo.image = result;
        let item = fileList.value[fileListLen];
        fileList.value.splice(fileListLen, 1, Object.assign(item, {
          status: "success",
          message: "",
          url: result
        }));
        fileListLen++;
      }
    };
    const uploadFilePromise = (url) => {
      return new Promise((resolve, reject) => {
        common_vendor.index.uploadFile({
          url: common_http.http.baseUrl + "/api/upload/uploadImage",
          // 仅为示例，非真实的接口地址
          filePath: url,
          name: "file",
          formData: {
            user: "test"
          },
          success: (res) => {
            let result = JSON.parse(res.data);
            setTimeout(() => {
              resolve(result.data);
            }, 1e3);
          }
        });
      });
    };
    const submit = () => {
      upRef.value.validate().then(async (res) => {
        if (res) {
          let res2 = await api_index.updateUserInfoApi(userInfo);
          if (res2 && res2.code == 200) {
            common_vendor.index.navigateBack({
              delta: -1
            });
          }
        }
      });
    };
    common_vendor.onReady(() => {
      upRef.value.setRules(rules);
    });
    common_vendor.onLoad((option) => {
      const item = JSON.parse(decodeURIComponent(option.item));
      console.log(item);
      Object.assign(userInfo, item);
      if (userInfo.image) {
        let imgs = userInfo.image.split(",");
        for (let j = 0; j < imgs.length; j++) {
          let obj = {
            url: ""
          };
          obj.url = common_http.http.baseUrl + imgs[j];
          fileList.value.push(obj);
        }
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => userInfo.name = $event),
        b: common_vendor.p({
          border: "none",
          modelValue: userInfo.name
        }),
        c: common_vendor.p({
          label: "姓名:",
          prop: "name",
          borderBottom: true
        }),
        d: common_vendor.p({
          customStyle: {
            marginLeft: "16px",
            marginRight: "25px"
          },
          name: "0",
          label: "男"
        }),
        e: common_vendor.p({
          customStyle: {
            marginRight: "16px"
          },
          name: "1",
          label: "女"
        }),
        f: common_vendor.o(($event) => userInfo.sex = $event),
        g: common_vendor.p({
          placement: "row",
          activeColor: "#8e44ad",
          modelValue: userInfo.sex
        }),
        h: common_vendor.p({
          label: "性别:",
          prop: "sex",
          borderBottom: true
        }),
        i: common_vendor.o(($event) => userInfo.phone = $event),
        j: common_vendor.p({
          border: "none",
          modelValue: userInfo.phone
        }),
        k: common_vendor.p({
          label: "联系方式:",
          prop: "phone",
          borderBottom: true
        }),
        l: common_vendor.o(($event) => userInfo.nickName = $event),
        m: common_vendor.p({
          border: "none",
          modelValue: userInfo.nickName
        }),
        n: common_vendor.p({
          label: "微信昵称:",
          prop: "nickName",
          borderBottom: true
        }),
        o: common_vendor.o(afterRead),
        p: common_vendor.o(deletePic),
        q: common_vendor.p({
          fileList: fileList.value,
          multiple: true,
          maxCount: 1
        }),
        r: common_vendor.p({
          label: "头像:",
          prop: "image",
          borderBottom: true
        }),
        s: common_vendor.o(submit),
        t: common_vendor.p({
          type: "primary",
          text: "确定",
          customStyle: "margin-top: 50px;background:#8e44ad;border:none;"
        }),
        v: common_vendor.sr(upRef, "69649b0e-0", {
          "k": "upRef"
        }),
        w: common_vendor.p({
          labelPosition: "left",
          model: userInfo,
          rules
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/System/phone/pages/information/information.vue"]]);
wx.createPage(MiniProgramPage);
