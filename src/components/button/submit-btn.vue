<template>
  <!-- 版本管理  提交审核按钮 -->
  <div class="public-bg">
    <div class="submit-btn" @click="click">
      <span class="submit-for-btn">提交审核</span>
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
<style lang="less">
.submit-btn:extend(.btn-style) {
  width: 110px;
  background-color: @btn-bg-color;
  white-space: nowrap;
  flex-direction: row;
  flex-wrap: nowrap;
  cursor: pointer;

  .submit-for-btn {
    color: #fff;
    font-size: @btn-font-size;
    margin-left: 10px;
  }
}
</style>