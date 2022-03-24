<template>
  <div class="public-bg">
    <Button :disabled="disabled" class="look-btn" id="q" @click="click">
      <span>{{ title }}</span>
    </Button>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "查看",
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
.look-btn:extend(.btn-style) {
  cursor: pointer;
  background-color: rgb(0, 174, 255);

  span {
    // width: 125px;
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