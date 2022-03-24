<template>
  <div class="layout pie-interspace">
    <Layout>
      <header class="home-header">
        <router-link
          :to="{
            name: 'systemHome',
            path: '/systemHome',
          }"
        >
          <Button class="btn-home" type="dashed" ghost>首页</Button>
        </router-link>
        <div class="home-header-left"></div>
        <div class="home-header-centre">
          <div class="home-header-item left-item">
            <div class="current-date">
              <label>当前日期</label>
              <span>{{ dateTime }}</span>
            </div>
          </div>
          <div class="home-main-title">
            <span class="main-title">C2系统用户服务值班门户</span>
          </div>
          <div class="home-header-item right-item">
            <div class="current-time">
              <label>北京时间</label>
              <span>{{ time }}</span>
            </div>
            <!-- <div class="home-message-item">
            <span class="iconfont icon-youxiang"></span><span>用户注册申请通知</span>
          </div>
          <div class="home-message-item">
            <span class="iconfont icon-youxiang"></span><span>用户注册申请通知</span>
          </div>
          <div class="home-message-item">
            <span class="iconfont icon-youxiang"></span><span>用户注册申请通知</span>
            </div>-->
          </div>
        </div>
        <div class="home-header-right"></div>
        <div class="system-setting">
          <div class="system-setting-item">
            <span
              class="iconfont icon-gonggao message-info notice"
              @click="notice"
            >
              <div class="notice-message" v-show="isShow">
                <ul>
                  <li>消息通知</li>
                  <li>消息通知</li>
                  <li>消息通知</li>
                </ul>
              </div>
            </span>
          </div>
          <!-- <div class="system-setting-item">
              设置
          </div>-->
          <div class="system-setting-item current-user">
            <span>当前用户：</span>
            <span>{{ userName }}</span>
            <span
              class="iconfont icon-tuichu exit-btn"
              @click="exitLogin"
            ></span>
          </div>
        </div>
      </header>
      <div class="content">
        <div class="header-navigation">
          <template v-for="item in navigationList">
            <div
              class="navigation-item"
              :class="{ selected: selectId == item.url }"
              :key="item.id"
              @click="menuCkick(item)"
            >
              <!-- <span class="iconfont icon-fangkuai-32"></span> -->
              <span class="navigation-item-title">{{ item.name }}</span>
            </div>
          </template>
        </div>
        <Content class="home-content">
          <router-view></router-view>
        </Content>
      </div>
      <!-- <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer> -->
    </Layout>
    <my-modal
      width="23"
      height="20"
      title
      v-model="isShowLosig"
      :resetBtn="false"
      cancelText="取消"
      confirmText="确定"
      @cancel="checkCancel"
      @confirm="checkConfirm"
    >
      <div slot="operateItem">
        <div class="operateItem-reminder">
          <!-- <Icon class="icon" type="logo-snapchat" /> -->
          <p>您是否退出登录？</p>
        </div>
      </div>
    </my-modal>
  </div>
</template>
<script>
import storage from "store";
import {
  USER_NAME_SYSTEM,
  ACCESS_TOKEN_SYSTEM,
} from "../../store/mutations.js";
export default {
  data() {
    return {
      userName: storage.get(USER_NAME_SYSTEM),
      navigationList: [
        // {
        //   name: "首页",
        //   id: 0,
        //   url: "systemHome",
        // },
        {
          name: "用户管理",
          id: 1,
          url: "userManagement",
        },
        {
          name: "需求处理管理",
          id: 2,
          url: "requireManagement",
        },
        {
          name: "基础产品管理",
          id: 3,
          url: "basicsRegulate?productId=0",
        },
        {
          name: "高级产品管理",
          id: 4,
          url: "advancedRegulate",
        },
        {
          name: "定向产品管理",
          id: 5,
          url: "orientRegulate",
        },
        // {
        //   name: "产品发布管理",
        //   id: 3,
        //   url: "productRelease",
        // },
        // {
        //   name: "产品模板管理",
        //   id: 4,
        //   url: "templateMangment",
        // },
        // {
        //   name: "专项任务请求管理",
        //   id: 6,
        //   url: "earlyWarningManagement",
        // },
        {
          name: "视频管理",
          id: 6,
          url: "videoManagement",
        },
        {
          name: "数据导入导出管理",
          id: 7,
          url: "dataImportExport",
        },
        {
          name: "数据同步管理",
          id: 8,
          url: "dataSyncMange",
        },
        {
          name: "相关法规管理",
          id: 9,
          url: "regulationManage?typeName=law",
        },
        {
          name: "公告公示管理",
          id: 10,
          url: "publicProclamation?typeName=noticeManagement",
        },
        {
          name: "软件下载管理",
          id: 11,
          url: "softwareDownload",
        },
        {
          name: "用户留言管理",
          id: 12,
          url: "guestbookManage",
        },
        {
          name: "数据统计",
          id: 13,
          url: "dataStatistics",
        },
        {
          name: "工作报告",
          id: 14,
          url: "workStatement",
        },
      ],
      selectId: "userManagement",
      dateTime: this.$utils.formatDate(new Date(), 1),
      time: "",
      week: this.$utils.getWeek(new Date()),
      clickNum: 0,
      lastLeft: 0, // 上次滑动距离
      maxClickNum: 0, // 最大点击次数
      isShow: false,
      isShowLosig: false,
    };
  },
  computed: {},
  created() {
    // this.getData();
    this.selectId = this.$route.meta.parentId;
    this.isTime();
  },
  mounted() {
    // 监听浏览器关闭事件触发提示
    window.addEventListener("beforeunload", (e) => this.beforeunloadHandler(e));
  },
  // 销毁
  destroyed() {
    // 销毁浏览器关闭事件
    window.removeEventListener("beforeunload", (e) =>
      this.beforeunloadHandler(e)
    );
  },
  methods: {
    // 浏览器关闭触发提示
    beforeunloadHandler(e) {
      this._beforeUnload_time = new Date().getTime();
      e = e || window.event;
      if (e) {
        e.returnValue = "关闭提示";
      }
      // return "关闭提示";
    },
    //获取数据
    getData() {
      let params = {
        parentId: 0,
        systemId: 1,
        type: "",
        pageNum: "",
        pageSize: "",
      };
      this.$api.menuList.getMenuList(params).then((res) => {
        if (res.code == 0) {
          this.navigationList = res.data.permissionList;
          // this.dataList = res.data.groupList;
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    menuCkick(item) {
      this.$router.push({
        path: item.url,
      });
      this.selectId = item.url;
    },
    //计时器
    isTime() {
      let _this = this;
      let time = setInterval(() => {
        _this.time = _this.$utils.formatDate(new Date(), 2);
      }, 1000);
    },
    //通知
    notice() {
      this.isShow = !this.isShow;
    },
    exitLogin() {
      this.isShowLosig = true;
    },
    checkCancel() {
      this.isShowLosig = false;
    },
    checkConfirm() {
      storage.remove(USER_NAME_SYSTEM);
      storage.remove(ACCESS_TOKEN_SYSTEM);
      this.$router.push("/login");
      this.$Notice.success({
        title: "退出登录成功！",
        top: 50,
        duration: 5,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.layout {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  min-height: 100vh;
}
.home-header {
  display: flex;
  width: 100%;
  height: 100px;
  position: relative;
  .btn-home {
    position: absolute;
    top: 70px;
    left: 50px;
    z-index: 1;
    color: @menu-font-color;
    border: 2px dashed @global-border-color;
  }
  .system-home-top {
    position: absolute;
    top: 70px;
    left: 50px;
    font-size: 18px;
    color: #fff;
  }
  .home-header-right {
    width: 350px;
    background-image: url("../../assets/public/right.png");
    background-size: 100% 125%;
    background-repeat: no-repeat;
  }
  .home-header-left {
    width: 350px;
    background-image: url("../../assets/public/left.png");
    background-size: 100% 125%;
    background-repeat: no-repeat;
  }
  .home-header-centre {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../../assets/public/header_bg_3.gif");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .home-header-item {
      display: flex;
      font-size: @main-font-size;
      flex: 1;
      color: @menu-font-color;

      .current-date {
        display: flex;
        flex-direction: column;
        padding-right: 140px;

        span {
          line-height: 1;
          font-size: 22px;
          font-weight: 500;
        }

        lable {
          line-height: 1;
        }
      }

      .current-time {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-left: 150px;

        span {
          line-height: 1;
          font-size: 22px;
          font-weight: 500;
        }

        lable {
          line-height: 1;
        }
      }
    }
  }
  .system-setting {
    position: absolute;
    right: 50px;
    top: 30px;
    display: flex;
    align-items: center;
    color: @main-font-color;
    z-index: 1;

    .current-user {
      font-size: 18px;
      margin-left: 30px;

      .exit-btn {
        margin-left: 30px;
        font-size: 20px;
        cursor: pointer;
      }
    }

    .message-info {
      font-size: 20px;
      cursor: pointer;
    }
  }
}
.home-main-title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin-bottom: 8px;

  .main-title {
    font-size: @main-title-size;
    color: @menu-font-color;
    font-weight: bold;
  }
}

.left-item {
  justify-content: flex-end;
  align-items: flex-end;
  padding-bottom: 8px;
}

.right-item {
  justify-content: space-between;
  padding-bottom: 8px;
  flex-direction: row;
  /* flex-direction: column; */
  flex: 1;
}

.content {
  box-shadow: inset 0px 0px 5px 3px rgba(3, 53, 182, 0.4);
  border: 2px solid @global-border-color;
  padding: 20px;
  margin: 20px 24px 0 24px;
  min-height: calc(100vh - 138px);

  .header-navigation {
    display: flex;
    background: transparent;
    max-width: 100%;
    overflow-x: hidden;

    .navigation-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      color: @menu-font-color;
      margin-right: 12px;
      padding: 6px 10px;
      // background: url('../../assets/public/menubg.png');
      background: @menu-item-bg;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
      min-width: 120px;
      max-width: 130px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      flex-wrap: nowrap;
      padding-right: 10px;
      cursor: pointer;

      .navigation-item-title {
        margin: 0 10px;
        font-size: @main-font-size;
      }

      .iconfont {
        color: #0f3a4f;
        margin: 0 10px;
        font-size: 10px;
      }
    }

    .selected {
      color: @menu-selected;
      // background: url('../../assets/public/menubg_ac.png');
      background: @menu-item-bg-ac;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding-right: 14px;

      .iconfont {
        color: @menu-selected;
        margin: 0 10px;
        font-size: 8px;
      }
    }
  }

  .header-navigation::-webkit-scrollbar {
    display: none;
  }

  .home-content {
    margin-top: 20px;
  }
}
.notice {
  position: relative;
  .notice-message {
    position: absolute;
    top: 30px;
    left: -40px;
    width: 100px;
    max-height: 200px;
    background-color: #09123e;
    opacity: 0.8;
    overflow-y: scroll;
  }
}
ul {
  font-size: 15px;
  li {
    padding: 5px 0;
    text-align: center;
  }
}
.operateItem-reminder {
  padding: 30px 0;
  font-size: 25px;
  color: @menu-selected;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    font-size: 50px;
    color: rgb(10, 124, 165);
    margin: 0 10px;
  }
}
</style>
