<template>
  <div class="public-bg">
    <div class="search-btn" @click="click">{{ title }}</div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "搜索",
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
.search-btn:extend(.btn-style) {
  background-color: @search-btn-bg;
  width: 72px;
  position: relative;
  background-color: @btn-bg-color;
  font-size: @btn-font-size;
  color: #fff;
  cursor: pointer;
}
</style>
