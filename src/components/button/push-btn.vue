<template>
  <!-- 推送配置按钮 -->
  <div class="public-bg">
    <div class="del-btn" @click="click">
      <span class="btn">推送配置</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>
<style lang="less" scoped>
.del-btn:extend(.btn-style) {
  background-color: @btn-bg-color;
  width: 90px;
  white-space: nowrap;
  flex-direction: row;
  flex-wrap: nowrap;
  cursor: pointer;

  .iconfont {
    font-size: @btn-font-size;
    color: #fff;
  }

  .btn {
    color: #fff;
    font-size: @btn-font-size;
    margin-left: 10px;
  }
}
</style>