<template>
  <div class="pie-tb-content">
    <pie-card :slotIsContent="false" :slotFooter="false">
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-thermobox">
            <div class="tb-header-content">
              <div class="tb-header-item">
                <span>生成时间:</span>
                <DatePicker
                  :value="epochTime"
                  type="date"
                  class="input-style"
                  @on-change="onEpochTimeChange"
                ></DatePicker>
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
                <span>编写人（必填）:</span>
                <Input v-model="author" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span>卫星关注目标集:</span>
                <Input v-model="satellitesFliePath" class="input-style" />
                <uploadFileBtn @upload-file-event="satellitesFileEvent" />
              </div>
              <div class="tb-header-item">
                <span>卫星名称替换文件:</span>
                <Input v-model="satellitesNameFliePath" class="input-style" />
                <uploadFileBtn @upload-file-event="satellitesNameFileEvent" />
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
      epochTime: "", //生成时间
      productTemplate: "", //产品模板
      productTemplateList: [
        {
          id: 0,
          name: "模板1",
        },
      ],
      author: "", //编写人
      satellitesFliePath: "", //卫星目标集
      satellitesNameFliePath: "", //卫星名
    };
  },
  created() {
    this.getTemplate();
  },
  methods: {
    // 生成时间
    onEpochTimeChange(time) {
      this.epochTime = time;
    },
    // 获取模板
    getTemplate() {
      let params = {
        productId: 10,
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
    // 卫星目标集上传成功
    satellitesFileEvent(res) {
      this.satellitesFliePath = res.data;
    },
    // 卫星名称上传成功
    satellitesNameFileEvent(res) {
      this.satellitesNameFliePath = res.data;
    },

    // 配置
    createReportClick() {
      let params = {
        epochTime: this.epochTime,
        author: this.author,
        templateId: this.productTemplate,
        satellitesFile: this.satellitesFliePath,
        satellitesNameFile: this.satellitesNameFliePath,
      };
      this.$api.advanced.getMonthlyReportr(params).then(
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
      this.epochTime = "";
      this.author = "";
      this.productTemplate = "";
      this.satellitesFliePath = "";
      this.satellitesNameFliePath = "";
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
      padding-top: 100px;
      // margin: 0;
      // width: 100%;
      // display: flex;
      // align-items: center;
    }
  }
  .pie-tb-header {
    display: flex;
    justify-content: center;
    padding: 0 @table-padding @table-padding @table-padding;
    font-size: @lable-font-size;
    flex-wrap: wrap;
    .tb-header-thermobox {
      width: 70%;
      display: flex;
      align-items: center;
      color: @lable-font-color;
      .tb-header-content {
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        .tb-header-item {
          display: flex;
          align-items: center;
          margin-bottom: @table-input-space;
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
