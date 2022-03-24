<template>
  <div class="pie-tb-content">
    <pie-card :slotIsContent="false" :slotFooter="false">
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-thermobox">
            <div class="tb-header-content">
              <div class="tb-header-item">
                <span>报告名称:</span>
                <Input v-model="reportName" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span>目标编号:</span>
                <Input v-model="objectId" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span>国别名称替换文件:</span>
                <Input v-model="countryFilePath" disabled class="input-style" />
                <uploadFileBtn @upload-file-event="countryUploadFileEvent" />
              </div>
              <div class="tb-header-item">
                <span>卫星名称替换文件:</span>
                <Input
                  v-model="staelliteNameFilePath"
                  disabled
                  class="input-style"
                />
                <uploadFileBtn @upload-file-event="staelliteUploadFileEvent" />
              </div>
              <div class="tb-header-item">
                <span>事件概要:</span>
                <Input
                  v-model="eventSummary"
                  type="textarea"
                  :rows="4"
                  class="input-style"
                />
              </div>
              <div class="tb-header-item">
                <span>对外服务对象:</span>
                <span class="input-style">
                  <share-btn
                    class="btn-item"
                    title="+"
                    callBackName="addServiceTarget"
                    @addServiceTarget="addServiceTarget"
                  />
                </span>
              </div>
              <div
                class="tb-header-item group-info"
                v-show="groupList.length > 0"
              >
                <span>机构ID:</span>
                <div style="width: 30px"></div>
                <template v-for="(member, index) in groupList">
                  <div :key="member.id">
                    {{ member.name }}
                    <label v-if="index < groupList.length - 1">,</label>
                  </div>
                </template>
              </div>
              <div
                class="tb-header-item group-info"
                v-show="userList.length > 0"
              >
                <span>用户ID:</span>
                <div style="width: 30px"></div>
                <template v-for="(member, index) in userList">
                  <div :key="member.id">
                    {{ member.username }}
                    <label v-if="index < userList.length - 1">,</label>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="pie-tb-footer">
          <div class="tb-header-button">
            <share-btn
              class="btn-item"
              title="重置"
              callBackName="reset"
              @reset="reset"
            />
            <share-btn
              class="btn-item"
              title="配置"
              callBackName="createReportClick"
              @createReportClick="createReportClick"
            />
          </div>
        </div>
      </div>
    </pie-card>
    <transferModals
      v-show="isShowTransfer"
      @on-target-keys-event="onTargetKeysEvent"
      @on-confirm-event="onConfirmEvent"
    />
  </div>
</template>
<script>
import pieCard from "@/components/pie-card/pie-card.vue";

export default {
  components: {
    pieCard,
  },
  data() {
    return {
      reportName: "",
      objectId: "",
      eventSummary: "",
      countryFilePath: "", //国别名称地址
      staelliteNameFilePath: "", //卫星名称地址
      isShowTransfer: false,
      groupList: [], //机构id
      userList: [], //用户ID
    };
  },
  created() {},
  methods: {
    // 国别成功上传文件
    countryUploadFileEvent(res) {
      this.countryFilePath = res.data;
    },
    // 卫星成功上传文件
    staelliteUploadFileEvent(res) {
      this.staelliteNameFilePath = res.data;
    },
    // 配置
    createReportClick() {
      let params = {
        countryRulePath: this.countryFilePath, //国别
        debrisRulePath: this.staelliteNameFilePath, //卫星
        eventSummary: this.eventSummary, //事件概要
        objectId: this.objectId, //目标编号
        reportName: this.reportName, //报告名称
        // templateId: this.productTemplate,//模板ID
        organizationList: this.groupList.map((item) => item.id), //机构ID
        userList: this.userList.map((item) => item.id), //用户ID
      };
      this.$api.advanced.getGenerateReport(params).then((res) => {
        if (res.success == true) {
          this.reset();
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    // 重置
    reset() {
      this.countryFilePath = "";
      this.staelliteNameFilePath = "";
      this.eventSummary = "";
      this.objectId = "";
      this.reportName = "";
    },
    // 添加服务对象
    addServiceTarget() {
      this.isShowTransfer = true;
    },
    // 确定对外服务
    onConfirmEvent(type) {
      this.isShowTransfer = type;
    },
    // 对外服务回调回来的数据
    onTargetKeysEvent(obj) {
      if (obj.name == "机构") {
        this.groupList = obj.data;
      } else {
        this.userList = obj.data;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.pie-tb-content {
  height: 100%;
  .public-bg {
    height: 100%;
    /deep/ .pie-card-header {
      height: 100%;
      // padding-top: 100px;
      // margin: 0;
      // width: 100%;
      // display: flex;
      // align-items: center;
    }
  }
  .pie-tb-header {
    display: flex;
    justify-content: space-between;
    padding: 0 @table-padding @table-padding @table-padding;
    font-size: @lable-font-size;
    flex-wrap: wrap;
    .tb-header-thermobox {
      width: 100%;
      .tb-header-content {
        display: flex;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
        margin: @table-input-space;
        color: @lable-font-color;
        width: 100%;
        .tb-header-item {
          display: flex;
          align-items: center;
          margin-bottom: @table-lable-space;
          width: 100%;
          margin-left: 25%;
          .input-style {
            margin: auto @table-lable-space;
            width: 300px;
          }
          .short-input-style {
            width: 80px;
            margin: auto @table-lable-space;
          }
          span {
            width: 200px;
            text-align: right;
          }
          .text {
            width: 60px;
            text-align: right;
          }
        }
      }
      .tb-header-content:first-of-type {
        margin-bottom: 0;
        .tb-header-item:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
  .btn-item {
    margin-right: @table-button-space;
  }
  /deep/ .del-btn {
    width: 100px;
    border-radius: 5px;
  }
  /deep/ .reset-btn {
    width: 100px;
    border-radius: 5px;
  }
  .tb-header-button {
    display: flex;
    justify-content: flex-end;
    // margin-top: @table-lable-space;
    margin: 10px 0;
  }
  .switch {
    margin-left: @table-lable-space;
  }
  //弹出框样式
  .modal-content-items {
    display: flex;
    padding: 0 @table-padding @table-padding @table-padding;
    font-size: @lable-font-size;
    flex-wrap: wrap;
    color: @lable-font-color;
    .ivu-radio-wrapper {
      display: flex;
      align-items: center;
      font-size: @lable-font-size;
      margin-bottom: @table-lable-space;
    }
    .ivu-radio-group {
      width: 500px;
      height: 480px;
      overflow: scroll;
    }
  }
}
// 对外服务弹出框样式
.group-drag-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1001;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
