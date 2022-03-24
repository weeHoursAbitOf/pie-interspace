<template>
  <!-- 推送配置 -->
  <div class="pie-tb-content">
    <pie-card :slotIsContent="false" :slotFooter="false">
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <!-- 产品类型 -->
            <div class="tb-header-item">
              <span>产品类型</span>
              <Select
                v-model="tackType"
                class="input-style"
                style="width: 250px"
              >
                <Option
                  v-for="item in tackTypeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <!-- 生成方式 -->
            <div class="tb-header-item">
              <span>生成方式</span>
              <Select
                v-model="triggerMode"
                class="input-style"
                style="width: 250px"
              >
                <Option
                  v-for="item in triggerModeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <div class="tb-header-item" v-show="triggerMode != 1">
              <span>根数提取方式</span>
              <Select
                v-model="toorManne"
                class="input-style"
                style="width: 250px"
              >
                <Option
                  v-for="item in toorManneList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <!-- 时间范围 -->
            <div class="tb-header-item" v-show="triggerMode == 0">
              <span>时间范围</span>
              <div class="input-style">
                <Checkbox v-model="timeHorizon">历元时间（UTC）</Checkbox>
                <Checkbox v-model="storageTime">入库时间（北京时）</Checkbox>
              </div>
            </div>
            <!-- 历元时间（UTC） -->
            <div
              class="tb-header-item"
              v-show="triggerMode == 0"
              v-if="timeHorizon"
            >
              <span>历元时间（UTC）</span>
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
            <div
              class="tb-header-item"
              v-show="triggerMode == 0"
              v-if="storageTime"
            >
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
            <!-- 算法类型 -->
            <!-- <div class="tb-header-item" v-show="tackType != 1">
              <span>算法类型</span>
              <CheckboxGroup v-model="methodType" class="input-style">
                <Checkbox label="0">数值法</Checkbox>
                <Checkbox label="1">SGP4</Checkbox>
                <Checkbox label="2">分析法</Checkbox>
              </CheckboxGroup>
            </div> -->
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
            <div class="tb-header-item">
              <span>质量控制</span>
              <RadioGroup v-model="quality" class="input-style">
                <Radio label="0">不考虑</Radio>
                <Radio label="1">考虑</Radio>
              </RadioGroup>
              <CheckboxGroup
                v-show="quality != '0'"
                v-model="QC"
                class="input-style"
              >
                <Checkbox label="0">未进行质量评估</Checkbox>
                <Checkbox label="1">质量较差</Checkbox>
                <Checkbox label="2">质量一般</Checkbox>
                <Checkbox label="3">质量良好</Checkbox>
                <Checkbox label="4">质量优秀</Checkbox>
              </CheckboxGroup>
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
      tackType: "1", //轨道类型
      tackTypeList: [
        {
          value: "1",
          label: "TLE",
        },
        {
          value: "2",
          label: "ELE",
        },
      ],
      triggerMode: "0", //触发方式
      triggerModeList: [
        {
          value: "0",
          label: "立即",
        },
        {
          value: "1",
          label: "当前最新",
        },
      ],
      toorManne: "", //根数提取方式
      toorManneList: [
        {
          value: "0",
          label: "所有",
        },
        {
          value: "1",
          label: "最新",
        },
      ],
      timeHorizon: false, //时间范围
      storageTime: false, //入库时间
      beginTime: "", //开始时间（轨道，陨落，解体）
      endTime: "", //结束时间（轨道，陨落，解体）
      storageGeginTime: "", //入库时间开始
      storageEndTime: "", //入库时间结束
      quality: "0", //质量控制（考虑，不考虑）
      QC: [], //质量控制
      methodType: "", //算法类型
      concealTarget: "", //隐藏信息目标
      numbers: "0", //目标编号
      targetNumberFlie: "", //目标编号文件地址
    };
  },

  created() {},
  methods: {
    // 隐藏信息目标
    concealUploadFileEvent(flie) {
      this.concealTarget = flie;
    },
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
