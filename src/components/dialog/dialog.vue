<template>
  <div class="my-modal" v-show="show">
    <div class="my-modal-content" :style="{ width: width + 'vw', minHeight: height + 'vh' }">
      <div class="header">
        <span>{{ title }}</span>
        <span class="iconfont icon-guanbi" v-if="close" @click="cancel"></span>
      </div>
      <div class="operate-content">{{ content }}</div>
      <div class="operate-item">
        <p>密码 :</p>
        <span>
          <Input v-model="password" placeholder="请输入用户密码。。。" />
        </span>
      </div>
      <div class="operate-btn">
        <span class="cancel-btn" v-if="cancelBtn" @click="cancel">取消</span>
        <span class="confirm-btn" v-if="confirmBtn" @click="confirm">确定</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      //控制查看按钮是否显示
      type: String,
      default: "温馨提示...",
    },
    content: {
      type: String,
      default: "请输入用户密码，进行删除。。。",
    },
    isModal: {
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
      default: "20",
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
      default: false,
    },
  },
  data() {
    return {
      show: false,
      password: "",
    };
  },
  watch: {
    isModal(newVal, oldVal) {
      if (newVal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      this.show = newVal;
    },
    // 监听删除输入的密码
    password(val) {
      this.$emit("delete-password", val);
    },
  },
  methods: {
    //重置事件
    reset() {
      this.$emit("reset");
    },
    //确认事件
    confirm() {
      let params = {
        password: this.password,
      };
      // 用于请求验证用户密码批量删除
      this.$api.user.judgeDList(params).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.$emit("confirm");
          this.password = "";
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.password = "";
        }
      });
    },
    //取消事件
    cancel() {
      this.$emit("cancel");
      this.password = "";
    },
    // close() {
    //   this.show = false;
    // this.$emit("cancel");
    // },
  },
};
</script>
<style lang="less" scoped>
.my-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  z-index: 1000;
  min-height: 0;
  overflow: hidden;

  .my-modal-content {
    position: relative;
    background-color: rgba(10, 13, 62, 0.85);
    box-sizing: border-box;
    border-width: 2px;
    border-style: solid;
    border-color: rgba(3, 52, 122, 1);
    min-height: 300px;
    overflow-y: scroll;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex: 1;
    /* background: url('../../assets/public/bgPopu.png'); */
    background-size: cover;
    height: 38px;
    padding-left: 20px;
    font-size: @template-font-size;
    font-weight: 400;
    color: #fff;
    min-height: 0;

    span {
      height: 38px;
      line-height: 38px;
      font-size: @template-font-size;
    }
  }
  .operate-content {
    color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: @template-font-size;
  }
  .operate-item {
    padding: @table-padding;
    height: 100px;
    width: 100%;
    margin-bottom: 50px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: @template-font-size;
    p {
      margin-right: 10px;
    }
  }

  .operate-btn {
    display: flex;
    position: absolute;
    bottom: 26px;
    right: 30px;

    span {
      width: 60px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      margin-left: 30px;
      font-size: 14px;
      font-weight: 400;
      color: #fff;
      box-sizing: content-box;
      border: 2px solid @global-border-color;
    }

    .confirm-btn {
      background-color: @btn-bg-color;
    }
  }
}
</style>