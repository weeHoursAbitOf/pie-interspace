<template>
  <div class="public-bg">
    <div class="export-btn" @click="click">
      <Button class="btn">{{ title }}</Button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "列表导出",
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
.export-btn:extend(.btn-style) {
  background-color: @btn-bg-color;
  width: 80px;

  .btn {
    // background-color: @export-btn-bg;
    border: none;
    font-size: @btn-font-size;
    color: #fff;
    display: contents;
  }
}
</style>