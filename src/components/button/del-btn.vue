<template>
  <div class="public-bg">
    <Button :disabled="disabled" class="del-btn" @click="click">
      <span>{{ title }}</span>
    </Button>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "删除",
    },
    disabled: {
      type: Boolean,
      default: false,
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
  cursor: pointer;
  background-color: rgb(206, 2, 7);

  span {
    // width: 96px;
    // height: 40px;
    // text-align: center;
    // line-height: 40px;
    // justify-content: center;
    font-size: @btn-font-size;
    font-weight: 400;
    color: #fff;
  }
}
.ivu-btn:hover {
  background-color: rgb(108, 112, 111);
}
</style>