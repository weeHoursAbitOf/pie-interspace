<template>
  <div class="pie-tb-content">
    <pie-card :slotIsContent="false" :slotFooter="false">
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-thermobox">
            <div class="tb-header-content">
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
              <div class="tb-header-item">
                <span>母体编号:</span>
                <Input v-model="satelliteId" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span>解体时间（UTC）:</span>
                <DatePicker
                  :value="breakUpTime"
                  type="date"
                  class="input-style"
                  @on-change="onBreakUpTimeChange"
                ></DatePicker>
              </div>
              <div class="tb-header-item">
                <span>国别名称替换文件:</span>
                <Input v-model="countryFilePath" disabled class="input-style" />
                <uploadFileBtn @upload-file-event="countryUploadFileEvent" />
              </div>
              <div class="tb-header-item">
                <span>卫星名称替换文件:</span>
                <Input
                  v-model="satelliteNameFilePath"
                  disabled
                  class="input-style"
                />
                <uploadFileBtn @upload-file-event="staelliteUploadFileEvent" />
              </div>
              <div class="tb-header-item">
                <span>计算次数:</span>
                <InputNumber
                  :min="1"
                  v-model="numofcacu"
                  class="input-style"
                ></InputNumber>
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
      reportType: "0", //专报类型
      reportTypeList: [
        {
          value: "0",
          label: "初步报",
        },
        {
          value: "1",
          label: "详细报",
        },
      ],
      productTemplate: "", //产品模板
      productTemplateList: [
        {
          id: 0,
          name: "模板1",
        },
      ],
      satelliteId: "", //母体编号
      breakUpTime: "", //解体时间
      countryFilePath: "", //国别名称地址
      satelliteNameFilePath: "", //卫星名称地址
      numofcacu: "1", //计算次数
    };
  },
  created() {
    this.getTemplate();
  },
  methods: {
    // 获取模板
    getTemplate() {
      let params = {
        productId: 26,
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
    // 解体时间
    onBreakUpTimeChange(time) {
      this.breakUpTime = time;
    },
    // 国别成功上传文件
    countryUploadFileEvent(res) {
      this.countryFilePath = res.data;
    },
    // 卫星成功上传文件
    staelliteUploadFileEvent(res) {
      this.satelliteNameFilePath = res.data;
    },
    // 配置
    createReportClick() {
      let formData = new FormData();
      formData.append("satelliteId", this.satelliteId);
      formData.append("breakUpTime", this.breakUpTime);
      formData.append("countryFilePath", this.countryFilePath);
      formData.append("satelliteNameFilePath", this.satelliteNameFilePath);
      formData.append("templateId", this.productTemplate);
      if (this.reportType == 0) {
        // 初步报
        this.$api.advanced.initialBreakUpReport(formData).then((res) => {
          if (res.success == true) {
            this.reset();
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
          }
        });
      } else {
        // 详细报
        this.$api.advanced.detailedBreakUpReport(formData).then((res) => {
          if (res.success == true) {
            this.reset();
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
          }
        });
      }
    },
    // 重置
    reset() {
      this.satelliteId = "";
      this.breakUpTime = "";
      this.countryFilePath = "";
      this.satelliteNameFilePath = "";
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
