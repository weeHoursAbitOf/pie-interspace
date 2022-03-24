<template>
  <div class="pie-interspace denglu">
    <div class="denglu-title">
      <img src="@/assets/login/denglu4.png" alt class="picture" />
    </div>
    <div class="login">
      <div class="login-items">
        <div class="login-item-style login-item">
          <img class="img-style" src="@/assets/login/denglu1.png" alt />
          <Input class="input-style" v-model="userName" size="large" placeholder="请输入用户名" />
        </div>
        <div class="login-item">
          <img class="img-style" src="@/assets/login/denglu2.png" alt />
          <Input
            type="password"
            class="input-style"
            v-model="password"
            size="large"
            placeholder="请输入密码"
          />
        </div>
        <div class="login-item">
          <div class="login-item-style1">
            <img class="img-style" src="@/assets/login/denglu3.png" alt />
            <Input class="input-style" v-model="securityCode" size="large" placeholder="验证码" />
            <img class="yanzhengma" ref="img" alt />
          </div>
          <div class="login-item-style2" @click="pudateCodeClick(authCode)">
            <!-- <img src="@/assets/login/denglu5.svg" alt="" /> -->
            <span class="jizhumima">换一张</span>
          </div>
        </div>
        <Button class="dengluButton" @click="login">
          <span class="dengluButton-item">登录</span>
        </Button>
        <div class="login-footer">
          <span class="login-footer-items" @click="register">立即注册</span>
          <span class="login-footer-items" @click="forgetPassword">忘记密码</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from "store";
import {
  ACCESS_TOKEN_SYSTEM
} from "../../store/mutations.js";
import { mapState, mapActions, mapGetters } from "vuex";
import base from "../../config/base-url.js";
export default {
  data() {
    return {
      userName: "", //用户
      password: "", //密码
      securityCode: "", //
      systemId: 1, //值班门户登录界面1，，用户服务登录界面0
      authCode: base.authCode,
    };
  },
  computed: {},
  mounted() {
    this.pudateCodeClick(this.authCode);
    this.setArguments()
  },
  methods: {
    setArguments() {
      // 监听回车键登录
      document.onkeydown = (event) => {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
          if (!storage.get(ACCESS_TOKEN_SYSTEM)) {
            this.login()
          }
        }
      }
    },
    // 获取登录验证码
    pudateCodeClick(val) {
      this.$refs.img.src = val + "?" + new Date().getTime();
    },
    //登录
    login() {
      if (!this.getVerifyNumber()) {
        return false;
      }
      const params = {
        username: this.userName,
        password: this.password,
        systemId: this.systemId,
        code: this.securityCode,
      };
      this.$api.user.login(params).then((res) => {
        if (res.success == true) {
          this.$store.dispatch("userData", res.data);
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.$router.push("/");
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.pudateCodeClick(this.authCode);
        }
      });
    },
    getVerifyNumber() {
      if (this.userName == "") {
        this.$Notice.warning({
          title: "用户名不能为空！",
          top: 50,
          duration: 5,
        });
      } else if (this.password == "") {
        this.$Notice.warning({
          title: "密码不能为空！",
          top: 50,
          duration: 5,
        });
      } else if (this.securityCode == "") {
        this.$Notice.warning({
          title: "验证码不对！请重新输入。。。",
          top: 50,
          duration: 5,
        });
      } else {
        return true;
      }
    },
    //注册
    register() {
      this.$router.push("/register");
    },
    // 忘记密码
    forgetPassword() { },
  },
};
</script>

<style lang='less' scoped>
.denglu {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  flex: 1;
  justify-content: center;
}

.denglu-title {
  margin-bottom: 40px;
}
.login {
  background: url(../../assets/login/denglu.png) no-repeat;
  background-size: 100%;
  width: 724px;
  height: 544px;
}
.login-items {
  width: 553px;
  height: 447px;
  // background-color: aqua;
  margin: 45px auto;
}
.login-item {
  display: flex;
  margin-bottom: 25px; 
  /deep/ .ivu-input-large {
    height: 60px;
    background: rgba(26, 62, 75, 1);
    border-color: rgba(0, 128, 128, 1) rgba(0, 128, 128, 1);
    padding: 25px 25px 25px 25px;
    font-family: "SourceHanSansCN-Normal", "Source Han Sans CN Normal",
      "Source Han Sans CN", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    letter-spacing: normal;
  }
  /deep/ .ivu-input-large::-webkit-input-placeholder {
    color: #f2f2f2;
  }
}
.login-item-style {
  margin-top: 75px;
}
.img-style {
  width: 44px;
  height: 44px;
  margin: auto;
  margin-left: 0px;
  margin-right: 20px;
}
.input-style {
  width: 458px;
  height: 72px;
  border-color: rgba(0, 128, 128, 1);
  background-color: rgba(255, 255, 255, 0);
}
.login-item-style1 {
  display: flex;
  position: relative;
  width: 67%;
}
.login-item-style2 {
  width: 33%;
  padding: 20px;
}
.jizhumima {
  font-size: 20px;
  color: #f2f2f2;
  padding: 0px 2px 0px 5px;
}
.yanzhengma {
  position: absolute;
  left: 244px;
  top: 6px;
  width: 114px;
  height: 48px;
}
.dengluButton {
  width: 514px;
  height: 72px;
  background: inherit;
  background-color: rgba(44, 156, 146, 1);
  border: none;
  border-radius: 5px;
  box-shadow: none;
  font-size: 20px;
}
.dengluButton-item {
  font-size: 20px;
  color: #ffffff;
  line-height: 72px;
}
.login-footer {
  display: flex;
  margin: 25px 75px;
  justify-content: space-around;
}
.login-footer-items {
  font-size: 20px;
  color: #f2f2f2;
}
</style>