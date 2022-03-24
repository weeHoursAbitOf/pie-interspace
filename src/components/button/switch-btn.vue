<!--
 * @Title: sueRimn
 * @Descripttion: 
 * @Date: 2021-03-15 16:34:25
 * @LastEditTime: 2021-05-08 14:41:25
-->
<template>
  <!-- 切换按钮 -->
  <div class="public-bg">
    <div class="del-btn" @click="click">
      <span class="btn">{{ title }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "切换",
    },
  },
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
  width: 72px;
  white-space: nowrap;
  flex-direction: row;
  flex-wrap: nowrap;
  cursor: pointer;

  .btn {
    color: #fff;
    font-size: @btn-font-size;
  }
}
</style>