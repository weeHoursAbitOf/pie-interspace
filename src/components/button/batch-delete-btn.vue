<template>
  <!-- 批量删除按钮 -->
  <div class="public-bg">
    <div class="batch-delete-btn" @click="click">
      <span class="iconfont icon-shanchu"></span>
      <span class="delete-btn">批量删除</span>
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
.batch-delete-btn:extend(.btn-style) {
  width: 110px;
  background-color: @btn-bg-color;
  white-space: nowrap;
  flex-direction: row;
  flex-wrap: nowrap;
  cursor: pointer;

  .iconfont {
    font-size: @btn-font-size;
    color: #fff;
  }

  .delete-btn {
    color: #fff;
    font-size: @btn-font-size;
    margin-left: 10px;
  }
}
</style>