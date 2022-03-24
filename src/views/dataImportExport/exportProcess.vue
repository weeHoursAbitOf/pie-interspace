<template>
  <!-- 数据导入 （对外服务区）-->
  <div class="pie-tb-content">
    <pie-card :slotHeader="false" :slotFooter="false">
      <!-- 产品处理 -->
      <!-- <div slot="header">
        <div class="pie-tb-header">
          <span class="product-process">产品处理</span>
          <div class="pie-tb-header">
            <div class="tb-header-content">
              <div
                class="tb-header-item"
                @click="userInfo(item)"
                v-for="(item, indext) in proHandleData"
                :key="indext"
              >
                <span :class="[item.icon, 'iconfont']"></span>
                <span class="items-name">{{ item.interfaceDescription }}</span>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <!-- 数据处理 -->
      <div slot="iscontent">
        <div class="pie-tb-iscontent">
          <span class="data-processing"></span>
          <div class="tb-header-content">
            <div
              class="tb-header-item"
              @click="userInfo(item)"
              v-for="(item, indext) in dataHandleData"
              :key="indext"
            >
              <span :class="[item.icon, 'iconfont']"></span>
              <span class="items-name">{{ item.interfaceDescription }}</span>
            </div>
          </div>
        </div>
      </div>
    </pie-card>
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
      //     title: "轨道产品",
      //     path: "/exportTrackProduct",
      //   },
      //   {
      //     icon: "icon-fenzu23",
      //     title: "编目产品",
      //     path: "/exportCatalogProduct",
      //   },
      //   {
      //     icon: "icon-kongjian",
      //     title: "空间态势报告",
      //     path: "/exportSpaceReport",
      //   },
      //   {
      //     icon: "icon-early-warn",
      //     title: "在轨预警产品",
      //     path: "/exportWarningProduct",
      //   },
      //   {
      //     icon: "icon-kongjian",
      //     title: "发射预警产品",
      //     path: "/exportLaunchWarning",
      //   },
      //   {
      //     icon: "icon-guidaoxiaoguo",
      //     title: "解体事件分析产品",
      //     path: "/exportDisintegrationProduct",
      //   },
      //   {
      //     icon: "icon-guidaoxiaoguo",
      //     title: "再入陨落分析产品",
      //     path: "/exportFallProduct",
      //   },
      //   {
      //     icon: "icon-guidaoxiaoguo",
      //     title: "安全规避分析产品",
      //     path: "/exportSecurityAvoidanceProduct",
      //   },
      //   {
      //     icon: "icon-guidaoxiaoguo",
      //     title: "空间事件报告",
      //     path: "/exportSpaceEvent",
      //   },
      //   {
      //     icon: "icon-yuebao",
      //     title: "工作月报",
      //     path: "/exportMonthReport",
      //   },
      //   {
      //     icon: "icon-bijizhangben",
      //     title: "工作简报",
      //     path: "/exportBriefReport",
      //   },
      //   {
      //     icon: "icon-duchazhuanbao",
      //     title: "工作专报",
      //     path: "/exportSpecialReport",
      //   },
      // ],
      id: 0,
      // listdata: [
      //   {
      //     icon: "icon-fenzu23",
      //     title: "预警分析结果表",
      //     path: "/exportTable",
      //   },
      //   {
      //     icon: "icon-fenzu23",
      //     title: "用户需求响应消息",
      //     path: "/exportUserDemand",
      //   },
      //   {
      //     icon: "icon-guidaoxiaoguo",
      //     title: "用户信息管理消息",
      //     path: "/exportUserMessages",
      //   },
      //   {
      //     icon: "icon-fenzu23",
      //     title: "用户留言反馈",
      //     path: "/exportUserFeedback",
      //   },
      // ],
      proHandleData: [
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
          interfaceDescription: "高级产品",
          linkMsgKey: 1,
          taskFileType: "dsf",
        },
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
          interfaceDescription: "基础产品",
          linkMsgKey: 1,
          taskFileType: "dsf",
        },
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
          interfaceDescription: "留言反馈",
          linkMsgKey: 1,
          taskFileType: "dsf",
        },
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
          interfaceDescription: "用户信息",
          linkMsgKey: 1,
          taskFileType: "dsf",
        },
      ],
      proHandleIcon: [
        {
          icon: "icon-guidaoxiaoguo",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-kongjian",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-early-warn",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-kongjian",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-guidaoxiaoguo",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-guidaoxiaoguo",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-guidaoxiaoguo",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-guidaoxiaoguo",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-yuebao",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-bijizhangben",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-duchazhuanbao",
          path: "/exportUserUserinfo",
        },
      ],
      dataHandleData: [
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
          interfaceDescription: "高级产品",
          linkMsgKey: 1,
          taskFileType: "dsf",
        },
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
          interfaceDescription: "基础产品",
          linkMsgKey: 1,
          taskFileType: "dsf",
        },
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
          interfaceDescription: "留言反馈",
          linkMsgKey: 1,
          taskFileType: "dsf",
        },
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
          interfaceDescription: "用户信息",
          linkMsgKey: 1,
          taskFileType: "dsf",
        },
      ],
      dataHandIcon: [
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-guidaoxiaoguo",
          path: "/exportUserUserinfo",
        },
        {
          icon: "icon-fenzu23",
          path: "/exportUserUserinfo",
        },
      ],
    };
  },
  created() {
    this.getqueryOutInMsg();
  },
  methods: {
    // 获取数据列表
    getqueryOutInMsg() {
      this.$api.exportService.queryOutInMsg().then((res) => {
        if (res.success == true) {
          const _this = this;
          let proHandle = res.data.insideHandle.proHandle;
          _this.proHandleData = proHandle.map((item, index) => {
            let obj = {
              interfaceDescription: item.interfaceDescription,
              linkMsgKey: item.linkMsgKey,
              taskFileType: item.taskFileType,
              icon: "icon-duchazhuanbao",
              path: "/exportUserUserinfo",
              // icon: _this.proHandleIcon[index].icon,
              // path: _this.proHandleIcon[index].path,
            };
            return obj;
          });
          let dataHandle = res.data.insideHandle.dataHandle;
          _this.dataHandleData = dataHandle.map((item, index) => {
            let obj = {
              interfaceDescription: item.interfaceDescription,
              linkMsgKey: item.linkMsgKey,
              taskFileType: item.taskFileType,
              icon: "icon-guidaoxiaoguo",
              path: "/exportUserUserinfo",
              // icon: _this.dataHandIcon[index].icon,
              // path: _this.dataHandIcon[index].path,
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
  }
  .product-process {
    color: @lable-font-color;
    margin-bottom: 20px;
  }
  .tb-header-item {
    display: flex;
    flex-direction: column;
    width: 15%;
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
  }
}
// 数据处理
.pie-tb-iscontent {
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
  }
  .data-processing {
    padding: 0 20px;
    color: @lable-font-color;
    margin: 20px 0;
  }
  .tb-header-item {
    display: flex;
    flex-direction: column;
    width: 23%;
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
  }
}
.tb-header-item:hover {
  transform: scale(1.1);
  border: 0.005208rem solid #1b58a6;
}
.iconfont {
  font-size: 40px;
}
.items-name {
  margin-top: 10px;
}
</style>
