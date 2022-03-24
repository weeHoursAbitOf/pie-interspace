<template>
  <div class="public-bg">
    <Button :disabled="disabled" class="issue-btn" @click="click">
      <span>{{ title }}</span>
    </Button>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "发布",
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
.issue-btn:extend(.btn-style) {
  cursor: pointer;
  background-color: rgba(0, 175, 99, 1);

  span {
    font-size: @btn-font-size;
    font-weight: 400;
    color: #fff;
  }
}
// .ivu-btn:hover {
//   background-color: rgb(108, 112, 111);
// }
</style>