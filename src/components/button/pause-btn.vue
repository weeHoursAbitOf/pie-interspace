<template>
  <div class="public-bg">
      <div class="pause-btn" @click="click">
      <svg t="1613971065403" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3663"><path d="M640 832V192h128v640h-128zM256 192h128v640H256V192z" fill="#0590DF" p-id="3664"></path></svg>  </div>
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
.pause-btn:extend(.btn-style) {
  width: 36px;
  white-space: nowrap;
  flex-direction: row;
  flex-wrap: nowrap;
  cursor: pointer;

  .iconfont {
    font-size: @btn-font-size;
    color: #fff;
  }

  .btn {
    color: #fff;
    font-size: @btn-font-size;
    margin-left: 10px;
  }
}
</style>