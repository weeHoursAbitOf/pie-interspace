<template>
  <!-- 数据导入 （内部处理区）-->
  <div class="pie-tb-content">
    <div slot="iscontent">
      <div class="pie-tb-header">
        <div class="tb-header-content">
          <div
            class="tb-header-item"
            v-for="(item, indext) in businessData"
            :key="indext"
            @click="userInfo(item)"
          >
            <span :class="[item.icon, 'iconfont']"></span>
            <span class="items-name">{{ item.interfaceDescription }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      // list: [
      //   {
      //     icon: "icon-guidaoxiaoguo",
      //     title: "用户信息",
      //     path: "/exportUserUserinfo",
      //   },
      //   {
      //     icon: "icon-fenzu23",
      //     title: "用户需求",
      //     path: "/exportSeniorUser",
      //   },
      //   {
      //     icon: "icon-fenzu23",
      //     title: "用户日志信息",
      //     path: "/exportuserLogInformation",
      //   },
      //   {
      //     icon: "icon-fenzu23",
      //     title: "用户留言",
      //     path: "/exportuserMessage",
      //   },
      // ],
      icon: [
        {
          icon: "icon-guidaoxiaoguo",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
        },
      ],
      businessData: [
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
          interfaceDescription: "定向用户信息",
          linkMsgKey: 1,
          taskFileType: "dsf",
        },
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
          interfaceDescription: "定向用户留言",
          linkMsgKey: 1,
          taskFileType: "dsf",
        },
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
          interfaceDescription: "定向用户需求",
          linkMsgKey: 1,
          taskFileType: "dsf",
        },
      ],
    };
  },
  created() {
    // this.getqueryOutInMsg();
    this.getSelStrategyJobMsg();
  },
  methods: {
    // 获取数据列表
    getqueryOutInMsg() {
      this.$api.exportService.queryOutInMsg().then((res) => {
        if (res.success == true) {
          const _this = this;
          let business = res.data.business;
          _this.businessData = business.map((item, index) => {
            let obj = {
              interfaceDescription: item.interfaceDescription,
              linkMsgKey: item.linkMsgKey,
              taskFileType: item.taskFileType,
              icon: "icon-guidaoxiaoguo",
              path: "/exportUserUserinfo",
              // icon: _this.icon[index].icon,
              // path: _this.icon[index].path,
            };
            return obj;
          });
        }
      });
    },
    getSelStrategyJobMsg() {
      this.$api.strategyService.selectStrategyType().then((res) => {
        if (res.success == true) {
          let business = res.data;
          this.businessData = business.map((item, index) => {
            let obj = {
              interfaceDescription: item.name,
              // linkMsgKey: item.linkMsgKey,
              taskFileType: item.dataType,
              icon: "icon-guidaoxiaoguo",
              path: "/exportUserUserinfo",
              // icon: _this.icon[index].icon,
              // path: _this.icon[index].path,
            };
            return obj;
          });
        }
      });
    },
    userInfo(item) {
      this.$router.push({
        path: item.path,
        //  params
        query: {
          taskFileType: item.taskFileType,
          routerType: true,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
// 产品处理
.pie-tb-header {
  display: flex;
  justify-content: space-between;
  padding: 0 @table-padding @table-padding @table-padding;
  font-size: @lable-font-size;
  flex-wrap: wrap;

  .tb-header-content {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: @table-padding;
    // overflow: hidden;
  }
  .product-process {
    color: @lable-font-color;
    margin-bottom: 20px;
  }
  .tb-header-item {
    display: flex;
    flex-direction: column;
    width: 30%;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    flex-wrap: nowrap;
    color: @lable-font-color;
    margin-bottom: 20px;
    padding: 40px 20px;
    box-shadow: inset 0px 0px 5px 3px rgba(3, 53, 182, 0.4);
    border: 1px solid @main-border-color;
    -webkit-transition: 0.3s linear;
    transition: 0.3s linear;
    .items-name {
      margin-top: 10px;
    }
  }
  .tb-header-item:hover {
    transform: scale(1.1);
    border: 0.005208rem solid #1b58a6;
  }
  .iconfont {
    font-size: 40px;
  }
}
</style>
