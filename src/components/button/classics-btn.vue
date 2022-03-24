<template>
  <div class="public-bg">
    <div class="classics-btn" @click="click">
      <span>{{ title }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "查看",
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
.classics-btn:extend(.btn-style) {
  cursor: pointer;
  
  span {
    width: 125px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    justify-content: center;
    font-size: @btn-font-size;
    font-weight: 400;
    color: #fff;
  }
}
</style>