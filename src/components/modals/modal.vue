<template>
  <div :id="zIndex" class="my-modal" v-show="showMask">
    <div
      class="my-modal-content"
      :style="{ width: width + 'vw', minHeight: height + 'vh' }"
    >
      <div class="header">
        <span>{{ title }}</span>
        <span
          style="color: '#000'"
          class="iconfont icon-guanbi"
          v-if="close"
          @click="cancels"
        ></span>
      </div>
      <div class="operate-item">
        <slot name="operateItem"></slot>
      </div>
      <div class="operate-btn" v-if="showBtn">
        <span class="cancel-btn" v-if="cancelBtn" @click="cancel">
          {{ cancelText }}
        </span>
        <span class="reset-btn" v-if="resetBtn" @click="reset">{{
          resetText
        }}</span>
        <span class="confirm-btn" v-if="confirmBtn" @click="confirm">
          {{ confirmText }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    zIndex: {
      type: String,
      default: "",
    },
    title: {
      //控制查看按钮是否显示
      type: String,
      default: "新建",
    },
    value: {
      //控制是否弹出框
      type: Boolean,
      default: false,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "80",
    },
    height: {
      type: String,
      default: "0",
    },
    cancelBtn: {
      //取消按钮是否显示
      type: Boolean,
      default: true,
    },
    resetBtn: {
      //重置按钮是否显示
      type: Boolean,
      default: true,
    },
    confirmBtn: {
      //确认按钮是否显示
      type: Boolean,
      default: true,
    },
    //关闭按钮
    close: {
      type: Boolean,
      default: true,
    },
    //是否显示菜单
    showBtn: {
      type: Boolean,
      default: true,
    },
    //是否显示菜单
    confirmText: {
      type: String,
      default: "确定",
    },
    //是否显示菜单
    cancelText: {
      type: String,
      default: "取消",
    },
    resetText: {
      type: String,
      default: "重置",
    },
  },
  data() {
    return {
      showMask: false,
    };
  },
  mounted() {
    this.showMask = this.value;
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      this.showMask = newVal;
    },
    showMask(val) {
      this.$emit("input", val);
    },
  },
  methods: {
    //重置事件
    reset() {
      this.$emit("reset");
    },
    //确认事件
    confirm() {
      this.$emit("confirm");
    },
    //取消事件
    cancel() {
      this.$emit("cancel");
    },
    //取消事件
    cancels() {
      this.showMask = false;
      this.$emit("cancel");
    },
    // close() {
    //   this.show = false;
    // this.$emit("cancel");
    // },
  },
};
</script>
<style lang="less" scoped>
#zIndex {
  z-index: 2000 !important;
}
.my-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 0;
  overflow: hidden;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  z-index: 1000;

  .my-modal-content {
    position: relative;
    box-sizing: border-box;
    border-radius: 10px;
    min-height: 200px;
    // overflow-y: scroll;
    height: auto;
    width: auto;
    padding: 10px;

    background-image: linear-gradient(
      rgba(20,1,54, 0.7) 0%,
      rgba(17,44,80, 0.5) 15%,
      rgba(20,1,54, 0.7) 35%,
      rgba(24, 0, 71, 0.5) 50%,
      rgba(20,1,54, 0.7) 70%,
      rgba(29, 83, 153, 0.5) 100%
    );
    box-shadow: 0 0 6px 6px #152e5c;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex: 1;
    background-size: cover;
    height: 38px;
    padding-left: 20px;
    padding-top: 6px;
    font-size: @template-font-size;
    font-weight: 400;
    color: @main-font-color;

    span {
      height: 38px;
      line-height: 38px;
      font-size: @template-font-size;
    }
  }

  .operate-item {
    padding: @table-padding;
    min-height: 0;
    width: 100%;
    margin-bottom: 50px;
  }

  .operate-btn {
    display: flex;
    position: absolute;
    bottom: 30px;
    right: 50px;

    span {
      width: 96px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      margin-left: 30px;
      font-size: @template-font-size;
      font-weight: 400;
      color: #fff;
      border-width: 2px;
      border-style: solid;
      border-color: @global-border-color;
    }

    .cancel-btn {
      cursor: pointer;
    }

    .confirm-btn {
      background-color: @btn-bg-color;
      cursor: pointer;
    }
  }
}
</style>
