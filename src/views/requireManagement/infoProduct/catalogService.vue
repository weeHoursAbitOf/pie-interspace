<template>
  <!-- 推送配置 -->
  <div class="pie-tb-content">
    <pie-card :slotIsContent="false" :slotFooter="false">
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>产品模板</span>
              <Select
                v-model="productTemplate"
                class="input-style"
                style="width: 250px"
              >
                <Option
                  v-for="item in productTemplateList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </div>
            <div class="tb-header-item">
              <span>隐藏信息目标</span>
              <Input
                v-model="concealTarget"
                disabled
                type="text"
                class="input-style"
                style="width: 250px"
              ></Input>
              <upload-file-btn
                title="导入"
                @upload-file-event="concealUploadFileEvent"
              ></upload-file-btn>
            </div>
            <!-- 目标编号 -->
            <div class="tb-header-item">
              <span>目标编号</span>
              <RadioGroup v-model="numbers" class="input-style">
                <Radio label="0">所有目标</Radio>
                <Radio label="1">自定义目标</Radio>
              </RadioGroup>
              <Input
                v-model="targetNumberFlie"
                disabled
                type="text"
                class="input-style"
                style="width: 150px"
                v-show="numbers != '0'"
              ></Input>
              <upload-file-btn
                v-show="numbers != '0'"
                title="导入"
                @upload-file-event="uploadFileEvent"
              ></upload-file-btn>
            </div>
          </div>
        </div>
        <div class="pie-tb-footer">
          <div class="tb-header-button">
            <share-btn class="btn-item" title="重置" />
            <share-btn class="btn-item" title="确定" />
          </div>
        </div>
      </div>
    </pie-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      productTemplate: "", //产品模板
      productTemplateList: [
        {
          id: 0,
          name: "模板1",
        },
      ],
      concealTarget: "", //隐藏信息目标
      numbers: "0", //目标编号
      targetNumberFlie: "", //目标编号文件地址
    };
  },
  created() {},
  methods: {
    // 目标编号上传文件
    uploadFileEvent(flie) {
      this.targetNumberFlie = flie.data;
    },
    // 隐藏信息目标
    concealUploadFileEvent(flie) {
      this.concealTarget = flie;
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
    }
  }
  .pie-tb-header {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: @lable-font-size;
    color: @lable-font-color;
    position: relative;
    .tb-header-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: @table-input-space;
      .tb-header-item {
        display: flex;
        align-items: center;
        margin-bottom: @table-lable-space;
        margin-left: 30%;
        .input-style {
          margin: 0 10px;
        }

        span {
          width: 150px;
          text-align: right;
        }
      }
    }
  }
  .btn-item {
    margin-right: @table-button-space;
  }
  .tb-header-button {
    display: flex;
    justify-content: flex-end;
  }
}
.share-btn {
  margin: 0 10px;
}
.pie-tb-content .ivu-checkbox-wrapper {
  margin-right: 0.1rem !important;
}
/deep/.ivu-radio-wrapper {
  margin: 0 10px;
}
</style>
