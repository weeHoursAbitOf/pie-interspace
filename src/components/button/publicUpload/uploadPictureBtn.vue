<template>
  <div class="upload-file-content">
    <!-- 上传图片 -->
    <Upload
      :action="action"
      :headers="Authorization"
      :data="upload"
      :before-upload="beforeUploadFile"
      :on-success="handleUploadFile"
    >
      <share-btn :title="title" />
    </Upload>
  </div>
</template>

<script>
import storage from "store";
import { ACCESS_TOKEN_SYSTEM } from "@/store/mutations.js";
import baseUrl from "@/config/base-url";
export default {
  props: {
    title: {
      type: String,
      default: "上传图标",
    },
  },
  data() {
    return {
      action: baseUrl.upload, //上传地址
      upload: { upLoadImg: undefined }, //上传参数
      Authorization: {
        //上传携带token
        Authorization: storage.get(ACCESS_TOKEN_SYSTEM),
      },
    };
  },
  methods: {
    //   上传之前
    beforeUploadFile(file) {
      this.upload.upLoadImg = file;
    },
    //   上传之后
    handleUploadFile(res) {
      this.$emit("upload-picture-event", res);
    },
  },
};
</script>


<style lang="less" scoped>
/deep/.ivu-upload-list {
  display: none;
}
</style>