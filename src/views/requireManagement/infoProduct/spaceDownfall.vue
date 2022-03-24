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
            <!-- 时间范围 -->
            <div class="tb-header-item">
              <span>时间范围</span>
              <div class="input-style">
                <Checkbox v-model="timeHorizon">陨落时间（UTC）</Checkbox>
                <Checkbox v-model="storageTime">入库时间（北京时）</Checkbox>
              </div>
            </div>
            <!-- 历元时间（UTC） -->
            <div class="tb-header-item" v-show="timeHorizon">
              <span>陨落时间（UTC）</span>
              <DatePicker
                :value="beginTime"
                type="datatime"
                class="input-style"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="开始时间"
                style="width: 195px"
              ></DatePicker>
              <p>~</p>
              <DatePicker
                :value="endTime"
                type="datatime"
                class="input-style"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="结束时间"
                style="width: 195px"
              ></DatePicker>
            </div>
            <!-- 入库时间（北京时） -->
            <div class="tb-header-item" v-show="storageTime">
              <span>入库时间（北京时）</span>
              <DatePicker
                :value="storageBeginTime"
                type="datatime"
                class="input-style"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="开始时间"
                style="width: 195px"
              ></DatePicker>
              <p>~</p>
              <DatePicker
                :value="storageEndTime"
                type="datatime"
                class="input-style"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="结束时间"
                style="width: 195px"
              ></DatePicker>
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
      timeHorizon: false, //时间范围
      storageTime: false, //入库时间
      beginTime: "", //开始时间（轨道，陨落，解体）
      endTime: "", //结束时间（轨道，陨落，解体）
      storageGeginTime: "", //入库时间开始
      storageEndTime: "", //入库时间结束
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
</style>
