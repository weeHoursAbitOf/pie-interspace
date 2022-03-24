<template>
  <div class="public-bg">
      <div class="play-btn" @click="click">
          <svg t="1613963775515"
           class="icon" 
           viewBox="0 0 1024 1024"
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            p-id="2756">
            <path d="M512.3 66.2c-246.9 0-447.1 200.2-447.1 447s200.2 447 447.1 447 447-200.1 447-447-200.1-447-447-447z m-179.4 758V202.3l538.5 310.9-538.5 311z" fill="#29ABE2" p-id="2757">
            </path>
            </svg>
    </div>
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
.play-btn:extend(.btn-style) {
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