<template>
  <div class="pie-interspace register">
    <div class="register-title">
      <span class="register-title-text-style">C2系统用户服务门户</span>
    </div>
    <div class="register-zhuyi">
      <span>*为必填项</span>
    </div>
    <div class="register-body">
      <div class="register-item">
        <div class="register-items">
          <span class="register-biaoti">密保问题</span>
          <span class="register-yanzheng">*</span>
        </div>
        <Input
          class="input-style"
          size="large"
          placeholder="请输入密保问题"
          v-model="inputVal.userSecurityQuestion"
        />
      </div>
      <div class="register-item">
        <div class="register-items">
          <span class="register-biaoti">密保答案</span>
          <span class="register-yanzheng">*</span>
        </div>
        <Input
          class="input-style"
          size="large"
          placeholder="请输入密保答案"
          v-model="inputVal.userSecurityAnswer"
        />
      </div>
      <div class="register-item">
        <div class="register-items">
          <span class="register-biaoti">密码</span>
          <span class="register-yanzheng">*</span>
        </div>
        <Input
          class="input-style"
          size="large"
          placeholder="请输入密码"
          v-model="inputVal.userPassword"
        />
      </div>
      <div class="register-item">
        <div class="register-items">
          <span class="register-biaoti">确认密码</span>
          <span class="register-yanzheng">*</span>
        </div>
        <Input
          class="input-style"
          size="large"
          placeholder="请再次输入密码"
          v-model="inputVal.userConfirmPassword"
        />
      </div>
    </div>
    <!-- 确认按钮 -->
    <Button class="registerButton" @click="registerButtonEvent">
      <span class="registerButton-item">确认</span>
    </Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modeQuestion: null,
      inputVal: {
        userSecurityQuestion: "",//密保问题
        userSecurityAnswer: "",  //密保答案
        userPassword: "",  //密码
        userConfirmPassword: "",//确认密码
      }
    };
  },
  methods: {
    registerButtonEvent() {
      let inputVal = Object.values(this.inputVal)
      if (inputVal.includes("")) {
        this.$Notice.error({
          title: '密码设置失败，请联系值班人员，值班电话010-666666',
          top: 50,
          duration: 5,
        });
      } else {
        this.$Notice.success({
          title: '注册成功',
          top: 50,
          duration: 5,
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.register-title {
  margin-bottom: 30px;
}
.register-zhuyi {
  width: 34%;
  display: flex;
  justify-content: flex-end;
  font-size: 18px;
  color: rgb(217, 0, 27);
  margin-bottom: 30px;
}
.register-body {
  width: 700px;
  //   width: 100%;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  /* background-color: aquamarine; */
}
.register-item {
  display: flex;
  width: 100%;
  /* margin-bottom: 25px; */
  /deep/ .ivu-input-large {
    height: 60px;
    // background: rgba(26, 62, 75, 1);
    background-color: transparent;
    border-color: #074596 #074596;
    padding: 25px 25px 25px 25px;
    font-family: "SourceHanSansCN-Normal", "Source Han Sans CN Normal",
      "Source Han Sans CN", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    letter-spacing: normal;
  }
  /deep/.ivu-input-wrapper {
    width: 72%;
  }
  /deep/ .ivu-input-large::-webkit-input-placeholder {
    color: #f2f2f2;
  }
  /deep/ .ivu-select-selection {
    position: relative;
    height: 0.3125rem;
    background-color: transparent;
    border-color: #074596 #074596;
    padding: 0.130208rem 0.130208rem 0.130208rem 0.130208rem;
    font-family: "SourceHanSansCN-Normal", "Source Han Sans CN Normal",
      "Source Han Sans CN", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 0.104167rem;
    letter-spacing: normal;
  }
  /deep/.ivu-select {
    width: 72%;
  }
  /deep/ .ivu-select-placeholder {
    color: #f2f2f2;
    font-size: 0.104167rem;
    position: absolute;
    top: 13px;
    left: 17px;
  }
}
.register-biaoti {
  color: #f2f2f2;
  font-size: 20px;
  font-weight: 400;
  font-family: "SourceHanSansCN-Normal", "Source Han Sans CN Normal",
    "Source Han Sans CN", sans-serif;
  font-style: normal;
}
.register-yanzheng {
  color: #d9001b;
  font-size: 20px;
  font-family: "SourceHanSansCN-Normal", "Source Han Sans CN Normal",
    "Source Han Sans CN", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.register-items {
  /* margin-left:-20px; */
  width: 20%;
  line-height: 48px;
  //   justify-content: flex-end;
  padding: 10px;
  text-align: right;
}
.registerButton {
  width: 514px;
  height: 72px;
  //   background: inherit;
  background-color: #074596;
  border: none;
  border-radius: 5px;
  box-shadow: none;
  font-size: 20px;
}
.registerButton-item {
  font-size: 20px;
  color: #ffffff;
  line-height: 72px;
}
</style>