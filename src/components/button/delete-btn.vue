<template>
  <div class="public-bg">
    <div class="del-btn" @click="click">
      <Button class="btn">删除</Button>
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
  background-color: @del-btn-bg;
  padding: 4px 16px;

  .btn {
    background-color: @del-btn-bg;
    border: none;
    font-size: @btn-font-size;
    color: @export-btn-color;
  }
}
</style>