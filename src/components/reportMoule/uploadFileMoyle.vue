<template>
  <div class="upload-file-content">
    <span>上传文件</span>
    <Input
      class="upload-ptah"
      v-model="filePath"
      placeholder=""
      style="width: 300px"
    />
    <upload-file-btn @upload-file-event="upload - file - event" />
  </div>
</template>

<script>
import uploadFileBtn from "../button/publicUpload/uploadFileBtn.vue";
export default {
  props: {
    resetParams: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filePath: "",
    };
  },
  watch: {
    // 重置参数
    resetParams() {
      this.filePath = "";
    },
  },
  components: {
    uploadFileBtn,
  },
  methods: {
    uploadFileEvent(file) {
      this.filePath = file.data;
      this.$emit("upload-file-event", this.filePath);
    },
  },
};
</script>

<style lang="less" scoped>
.upload-file-content {
  display: flex;
  align-items: center;
  padding: 20px 0;
  .upload-ptah {
    margin: 0 10px;
  }
}
</style>