<template>
  <Button
    :style="styles"
    :disabled="disabled"
    type="primary"
    class="produce-btn"
    @click="ProduceTrackBtnClick"
  >
    <Icon v-if="iconShow" :type="iconType" class="icon-style" />
    <span class="btn">{{ title }}</span>
  </Button>
</template>

<script>
export default {
  name: "shareBtn",
  props: {
    styles: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    iconShow: {
      type: Boolean,
      default: false,
    },
    iconType: {
      type: String,
      default: "ios-water-outline",
    },
    title: {
      //按钮名称
      type: String,
      default: "生成轨道产品",
    },
    callBackName: {
      //触发按钮回调事件名称
      type: String,
      default: "porduceBtnClick",
    },
  },
  methods: {
    ProduceTrackBtnClick() {
      this.$emit(this.callBackName);
    },
  },
};
</script>

<style lang="less" scoped>
.produce-btn:extend(.btn-style) {
  padding: 0px 10px;
  background-color: @btn-bg-color;
  white-space: nowrap;
  flex-direction: row;
  flex-wrap: nowrap;
  cursor: pointer;
  border: none;
  .icon-style {
    font-size: @btn-font-size;
    color: #fff;
    margin-right: 5px;
  }

  .btn {
    color: #fff;
    padding: 0px 10px;
    font-size: @btn-font-size;
  }
}
</style>