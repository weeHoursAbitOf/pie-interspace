<template>
  <!-- 软件下载按钮 -->
  <div class="public-bg">
    <div class="download-btn" @click="upDownload">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "立即下载",
    },
  },
  data() {
    return {};
  },
  methods: {
    upDownload() {
      this.$emit("upDownload");
    },
  },
};
</script>
<style lang="less" scoped>
.download-btn:extend(.btn-style)  {
  align-items: center;
  background-color: @btn-bg-color;
  padding: 4px 16px;
  // border-radius: 4px;
  cursor: pointer;
  font-size: @btn-font-size;
  color: #fff;
  
}
</style>