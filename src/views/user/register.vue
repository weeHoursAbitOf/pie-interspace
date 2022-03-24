<template>
  <div class="pie-interspace register">
    <div class="register-title">
      <img src="@/assets/register/zhuce.png" alt class="picture" />
    </div>
    <div class="register-zhuyi">
      <span>*为必填项</span>
    </div>
    <div class="register-body">
      <div class="register-item">
        <div class="register-items">
          <span class="register-biaoti">用户名</span>
          <span class="register-yanzheng">*</span>
        </div>
        <Input class="input-style" v-model="userName" size="large" placeholder="请输入用户名" />
      </div>
      <div class="register-item">
        <div class="register-items">
          <span class="register-biaoti">单位名称</span>
          <span class="register-yanzheng">*</span>
        </div>
        <Input class="input-style" v-model="unitName" size="large" placeholder="请输入单位名称" />
      </div>
      <div class="register-item">
        <div class="register-items">
          <span class="register-biaoti">密码</span>
          <span class="register-yanzheng">*</span>
        </div>
        <Input class="input-style" v-model="password" size="large" placeholder="请输入密码" />
      </div>
      <div class="register-item">
        <div class="register-items">
          <span class="register-biaoti">单位地址</span>
          <span class="register-yanzheng">*</span>
        </div>
        <Input class="input-style" v-model="unitSite" size="large" placeholder="请输入单位地址" />
      </div>
      <div class="register-item">
        <div class="register-items">
          <span class="register-biaoti">确认密码</span>
          <span class="register-yanzheng">*</span>
        </div>
        <Input class="input-style" v-model="confirmPassword" size="large" placeholder="请再次输入密码" />
      </div>
      <div class="register-item">
        <div class="register-items">
          <span class="register-biaoti">行政区</span>
          <span class="register-yanzheng">*</span>
        </div>
        <Input class="input-style" v-model="district" size="large" placeholder="请输入行政区" />
      </div>
      <div class="register-item">
        <div class="register-items">
          <span class="register-biaoti">个人手机号</span>
          <span class="register-yanzheng">*</span>
        </div>
        <Input class="input-style" v-model="Mobile" size="large" placeholder="请输入个人手机号" />
      </div>
      <div class="register-item">
        <div class="register-items">
          <span class="register-biaoti">单位电话</span>
          <span class="register-yanzheng">*</span>
        </div>
        <Input class="input-style" v-model="unitPhone" size="large" placeholder="请输入单位电话" />
      </div>
      <div class="register-item">
        <div class="register-items">
          <span class="register-biaoti">密保问题</span>
          <span class="register-yanzheng">*</span>
        </div>
        <Select v-model="encrypted" size="large" clearable placeholder="我的名字是什么？">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="register-item">
        <div class="register-items">
          <span class="register-biaoti">职务</span>
          <span class="register-yanzheng">*</span>
        </div>
        <Input class="input-style" v-model="position" size="large" placeholder="请输入职务" />
      </div>
      <div class="register-item">
        <div class="register-items">
          <span class="register-biaoti">单位邮编</span>
          <span class="register-yanzheng">*</span>
        </div>
        <Input class="input-style" v-model="postcode" size="large" placeholder="请输入单位邮编" />
      </div>
      <div class="register-item">
        <div class="register-items">
          <span class="register-biaoti">单位传真</span>
          <span class="register-yanzheng">*</span>
        </div>
        <Input class="input-style" v-model="unitFax" size="large" placeholder="请输入单位传真" />
      </div>
    </div>
    <Button class="registerButton" @click="register">
      <span class="registerButton-item">注册</span>
    </Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "", //用户名称
      password: "", //密码
      confirmPassword: "", //确认密码
      Mobile: "", //手机号
      encrypted: "", //密保问题
      postcode: "", //单位邮编
      unitName: "", //单位名称
      unitSite: "", //单位地址
      district: "", //行政区
      unitPhone: "", //单位电话
      position: "", //岗位
      unitFax: "", //单位传真
      cityList: [
        {
          value: "New York",
          label: "New York",
        },
        {
          value: "London",
          label: "London",
        },
        {
          value: "Sydney",
          label: "Sydney",
        },
        {
          value: "Ottawa",
          label: "Ottawa",
        },
        {
          value: "Paris",
          label: "Paris",
        },
        {
          value: "Canberra",
          label: "Canberra",
        },
      ],
    };
  },
  methods: {
    register() {
      if (!this.getVerifyNumber()) {
        return false;
      }
      const params = {
        nickname: this.userName, //用户名称
        username: this.userName, //用户名
        pwd: this.password, //密码
        confirmPassword: this.confirmPassword, //确认密码
        mobile: this.Mobile, //手机号
        position: this.position, //职务
        positionTitle: "", //职称
        // encrypted: this.encrypted, //密保问题
        // postcode: this.postcode, //单位邮编
        // unitName: this.unitName, //单位名称
        // unitSite: this.unitSite, //单位地址
        // district: this.district, //行政区
        // unitPhone: this.unitPhone, //单位电话
        // unitFax: this.unitFax, //单位传真
      };
      console.log(params);
      this.$api.user.createUser(params).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.$router.push("/login");
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
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
      } else if (this.confirmPassword == "") {
        this.$Notice.warning({
          title: "确认密码不能为空！",
          top: 50,
          duration: 5,
        });
      } else if (this.password !== this.confirmPassword) {
        this.$Notice.warning({
          title: "密码不一致！",
          top: 50,
          duration: 5,
        });
      } else if (this.Mobile == "") {
        this.$Notice.warning({
          title: "手机号不能为空！",
          top: 50,
          duration: 5,
        });
      } else if (this.encrypted == "") {
        this.$Notice.warning({
          title: "密保问题不能为空！",
          top: 50,
          duration: 5,
        });
      } else if (this.unitName == "") {
        this.$Notice.warning({
          title: "单位名称不能为空！",
          top: 50,
          duration: 5,
        });
      } else if (this.unitSite == "") {
        this.$Notice.warning({
          title: "单位地址不能为空！",
          top: 50,
          duration: 5,
        });
      } else if (this.district == "") {
        this.$Notice.warning({
          title: "行政区不能为空！",
          top: 50,
          duration: 5,
        });
      } else if (this.unitPhone == "") {
        this.$Notice.warning({
          title: "单位电话不能为空！",
          top: 50,
          duration: 5,
        });
      } else if (this.position == "") {
        this.$Notice.warning({
          title: "职务不能为空！",
          top: 50,
          duration: 5,
        });
      } else if (this.unitFax == "") {
        this.$Notice.warning({
          title: "单位传真不能为空！",
          top: 50,
          duration: 5,
        });
      } else {
        return true;
      }
    },
  },
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
  margin-bottom: 40px;
}
.register-zhuyi {
  width: 62%;
  display: flex;
  justify-content: flex-end;
  font-size: 18px;
  color: rgb(217, 0, 27);
  margin-bottom: 40px;
}
.register-body {
  width: 1300px;
  //   width: 100%;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  /* background-color: aquamarine; */
}
.register-item {
  display: flex;
  width: 50%;
  /* margin-bottom: 25px; */
  /deep/ .ivu-input-large {
    height: 60px;
    // background: rgba(26, 62, 75, 1);
    background-color: transparent;
    border-color: rgba(0, 128, 128, 1) rgba(0, 128, 128, 1);
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
    border-color: #008080 #008080;
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
  background-color: rgba(44, 156, 146, 1);
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