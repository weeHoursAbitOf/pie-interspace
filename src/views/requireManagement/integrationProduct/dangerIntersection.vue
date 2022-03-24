<template>
  <div class="pie-tb-content">
    <pie-card :slotIsContent="false" :slotFooter="false">
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-thermobox">
            <div class="tb-header-content">
              <div class="tb-header-item">
                <span>专报名称:</span>
                <Input v-model="reportName" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span>专报类型:</span>
                <Select v-model="reportType" class="input-style">
                  <Option
                    v-for="item in reportTypeList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</Option
                  >
                </Select>
              </div>
              <div class="tb-header-item">
                <span>触发方式:</span>
                <Select v-model="triggerMode" class="input-style">
                  <Option
                    v-for="item in triggerModeList"
                    :value="item.label"
                    :key="item.value"
                    >{{ item.label }}</Option
                  >
                </Select>
                <Select
                  v-model="timingTask"
                  style="width: 200px"
                  v-show="triggerMode == '定时'"
                >
                  <Option
                    v-for="item in timingTaskList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</Option
                  >
                </Select>
              </div>
              <div class="tb-header-item" v-show="triggerMode == '立即'">
                <span>交会时间:</span>
                <!-- <DatePicker
                  :value="intersectTime"
                  type="date"
                  class="input-style"
                  @on-change="onIntersectTimeChange"
                ></DatePicker>-->
                <Input v-model="intersectTime" class="input-style" />
              </div>
              <div class="tb-header-item" v-show="triggerMode == '立即'">
                <span>目标编号:</span>
                <Input
                  v-model="sNumber"
                  class="input-style"
                  v-show="triggerMode == '立即'"
                />
              </div>
              <div class="tb-header-item" v-show="triggerMode == '立即'">
                <span>背景编号:</span>
                <Input v-model="backNumber" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span>产品模板:</span>
                <Select v-model="productTemplate" class="input-style">
                  <Option
                    v-for="item in productTemplateList"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                  >
                </Select>
              </div>
              <div class="tb-header-item" v-show="triggerMode == '定时'">
                <span>关注目标集:</span>
                <Input v-model="targetFilePath" class="input-style" />
                <uploadFileBtn @upload-file-event="targetUploadFileEvent" />
              </div>
              <div class="tb-header-item">
                <span>卫星名称替换文件:</span>
                <Input v-model="satNameFilePath" class="input-style" />
                <uploadFileBtn @upload-file-event="satNameUploadFileEvent" />
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
      reportType: "before", //专报类型
      reportTypeList: [
        {
          value: "before",
          label: "事前",
        },
        {
          value: "after",
          label: "事后",
        },
      ],
      triggerMode: "定时", //触发方式
      triggerModeList: [
        {
          value: "1",
          label: "定时",
        },
        {
          value: "2",
          label: "立即",
        },
      ],
      timingTaskList: [], //定时时间
      timingTask: "",
      productTemplate: "", //产品模板
      productTemplateList: [
        {
          id: 0,
          name: "模板1",
        },
      ],
      reportName: "", //专报名称
      sNumber: "", //目标编号
      backNumber: "", //背景编号
      intersectTime: "", //交会时间
      targetFilePath: "", //关注目标集地址
      satNameFilePath: "", //卫星替换文件
    };
  },
  created() {
    this.getTimingTask();
    this.getTemplate();
  },
  methods: {
    // 定时任务数据列表
    getTimingTask() {
      for (let i = 0; i <= 23; i++) {
        let obj = {
          value: i,
          label: i + ":00 (点)",
        };
        this.timingTaskList.push(obj);
      }
    },
    // 获取模板
    getTemplate() {
      let params = {
        productId: 25,
        isUse: true,
      };
      this.$api.commonTemplate.getTemplateList(params).then((res) => {
        if (res.success == true) {
          this.productTemplateList = res.data.templateInfoList;
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    // 交会时间
    onIntersectTimeChange(time) {
      this.intersectTime = time;
    },
    targetUploadFileEvent(res) {
      this.targetFilePath = res.data;
    },
    satNameUploadFileEvent(res) {
      this.satNameFilePath = res.data;
    },

    createReportClick() {
      if (this.triggerMode == "定时") {
        this.sNumber = "";
        this.backNumber = "";
        this.intersectTime = "";
      }
      let params = {
        sId: this.sNumber, //目标编号
        dId: this.backNumber, //背景编号
        hourPoint: this.timingTask, //定时任务0-23
        intersectTime: this.intersectTime, //交会时间
        reportName: this.reportName, //专报名称
        reportType: this.reportType, //事前事后
        satNameFilePath: this.satNameFilePath, //卫星名称替换文件
        targetFilePath: this.targetFilePath, //关注目标集路径
        templateId: this.productTemplate, //模板id
        type: this.triggerMode, //定时立即任务类型
      };
      this.$api.advanced.getgenerator(params).then(
        (res) => {
          if (res.success == true) {
            this.reset();
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
          }
        },
        (error) => {
          this.$Notice.error({
            title: error,
            top: 50,
            duration: 5,
          });
        }
      );
    },
    // 重置
    reset() {
      this.sNumber = "";
      this.backNumber = "";
      this.intersectTime = "";
      this.triggerMode = "定时";
      this.satNameFilePath = "";
      this.setParams();
    },
    setParams() {
      this.timingTask = "";
      this.reportName = "";
      this.reportType = "before";
      this.targetFilePath = "";
      this.productTemplate = "";
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
    padding: @table-padding;
    font-size: @lable-font-size;
    flex-wrap: wrap;
    margin-top: 50px;
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
