<template>
  <div class="public-bg">
    <div class="del-btn" @click="click">
      <span class="iconfont icon-jia"></span>
      <span class="btn">{{ title }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "newBtn",
  props: {
    title: {
      type: String,
      default: "新建",
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
  width: 100px;
  white-space: nowrap;
  flex-direction: row;
  flex-wrap: nowrap;
  cursor: pointer;

  .iconfont {
    font-size: @btn-font-size;
    color: #fff;
  }

  .btn {
    // background-color: @new-btn-bg;
    // border: none;
    color: #fff;
    font-size: @btn-font-size;
    margin-left: 10px;
  }
}
</style>