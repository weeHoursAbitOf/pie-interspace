<template>
  <!-- 批量加入按钮 -->
  <div class="public-bg">
    <div class="batch-join-btn" @click="click">
      <span class="iconfont icon-jia"></span>
      <span class="join-btn">加入</span>
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
.batch-join-btn:extend(.btn-style) {
  background-color: @btn-bg-color;
  width: 72px;
  white-space: nowrap;
  flex-direction: row;
  flex-wrap: nowrap;

  .iconfont {
    font-size: @btn-font-size;
    color: #fff;
  }

  .join-btn {
    color: #fff;
    font-size: @btn-font-size;
    margin-left: 10px;
  }
}
</style>