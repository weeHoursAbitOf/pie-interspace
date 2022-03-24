<template>
  <!-- 推送配置 -->
  <div class="pie-tb-content">
    <pie-card :slotIsContent="false" :slotFooter="false">
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div
              class="tb-header-item"
              v-show="this.$route.query.productId == 0"
            >
              <span>产品类型</span>
              <Select v-model="tackType" class="input-style">
                <Option
                  v-for="item in tackTypeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <div class="tb-header-item">
              <span>生成方式</span>
              <Select v-model="triggerMode" class="input-style">
                <Option
                  v-for="item in triggerModeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
              <!-- 每周 -->
              <Select
                v-model="weekly"
                v-if="triggerMode == '2'"
                v-show="this.$route.query.productId != 0"
                class="input-style"
              >
                <Option
                  v-for="item in weeklyTimeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
              <!-- 小时 -->
              <Select
                v-model="time"
                v-if="triggerMode == '2'"
                v-show="this.$route.query.productId == 0"
                class="input-style"
              >
                <Option
                  v-for="item in timeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <div
              class="tb-header-item"
              v-show="this.$route.query.productId == 0"
            >
              <span>根数提取方式</span>
              <Select v-model="toorManne" class="input-style">
                <Option
                  v-for="item in toorManneList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <div
              class="tb-header-item"
              v-if="triggerMode == 1 && tackType == 2"
              v-show="this.$route.query.productId == 0"
            >
              <span>算法类型</span>
              <Select v-model="methodType" class="input-style">
                <Option
                  v-for="item in methodTypeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <div class="tb-header-item">
              <span>时间范围</span>
              <CheckboxGroup v-model="timeHorizon" class="input-style">
                <Checkbox label="0">历元时间（UTC）</Checkbox>
                <Checkbox label="1">入库时间（北京时）</Checkbox>
              </CheckboxGroup>
            </div>
            <div class="tb-header-item" v-show="timeHorizon[0] == 0">
              <span>历元时间（UTC）</span>
              <DatePicker
                value=""
                type="datatime"
                class="input-style"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="开始时间"
              ></DatePicker>
              <p>~</p>
              <DatePicker
                value=""
                type="datatime"
                class="input-style"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="结束时间"
              ></DatePicker>
            </div>
            <div class="tb-header-item" v-show="timeHorizon[1] == 1">
              <span>入库时间（北京时）</span>
              <DatePicker
                value=""
                type="datatime"
                class="input-style"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="开始时间"
              ></DatePicker>
              <p>~</p>
              <DatePicker
                value=""
                type="datatime"
                class="input-style"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="结束时间"
              ></DatePicker>
            </div>
            <!-- <div
              class="tb-header-item"
              v-if="triggerMode == 1"
              v-show="this.$route.query.productId == 0"
            >
              <span>历元时间（UTC）</span>
              <DatePicker
                :value="beginTime"
                type="datatime"
                class="input-style"
                @on-change="onBeginTimeChange"
              ></DatePicker>
            </div> -->
            <!-- <div
              class="tb-header-item"
              v-if="triggerMode == 1"
              v-show="this.$route.query.productId == 0"
            >
              <span>入库时间（北京时）</span>
              <DatePicker
                :value="beginTime"
                type="datatime"
                class="input-style"
                @on-change="onEndTimeChange"
              ></DatePicker>
            </div> -->

            <!-- <div
              class="tb-header-item"
              v-show="this.$route.query.productId == 0"
            >
              <span>质量控制</span>
              <RadioGroup v-model="QCType" class="input-style">
                <Radio label="0">不考虑</Radio>
                <Radio label="1">考虑</Radio>
              </RadioGroup>
              <CheckboxGroup
                v-show="QCType != 0"
                v-model="QC"
                class="input-style"
              >
                <Checkbox label="0">未进行质量评估</Checkbox>
                <Checkbox label="1">质量较差</Checkbox>
                <Checkbox label="2">质量一般</Checkbox>
                <Checkbox label="3">质量良好</Checkbox>
                <Checkbox label="4">质量优秀</Checkbox>
              </CheckboxGroup>
            </div> -->
            <!-- <div
              class="tb-header-item"
              v-show="
                this.$route.query.productId != 19 &&
                this.$route.query.productId != 20
              "
            >
              <span>目标编号</span>
              <RadioGroup v-model="numbers" class="input-style">
                <Radio label="0">所有目标</Radio>
                <Radio label="1">自定义目标</Radio>
              </RadioGroup>
              <Input
                v-show="numbers != 0"
                v-model="targetNumber"
                disabled
                type="text"
                class="input-style"
              ></Input>
              <upload-file-btn
                v-show="numbers != 0"
                title="导入"
                @upload-file-event="uploadFileEvent"
              ></upload-file-btn>
            </div> -->
            <!-- 编目<div class="tb-header-item">
              <span>隐藏信息目标</span>
              <Input
                v-model="targetNumber"
                disabled
                type="text"
                class="input-style"
              ></Input>
              <upload-file-btn
                title="导入"
                @upload-file-event="uploadFileEvent"
              ></upload-file-btn>
            </div> -->
            <!-- 危险交会 <div class="tb-header-item">
              <span>交会距离阈值</span>
              <Input
                v-model="targetNumber"
                disabled
                type="text"
                class="input-style"
              ></Input>
            </div> -->
            <!-- 危险交会<div class="tb-header-item">
              
              <span>交会概率阈值</span>
              <Input
                v-model="targetNumber"
                disabled
                type="text"
                class="input-style"
              ></Input>
            </div> -->
            <!-- 危险交会 时间 3天以内 4天以内 5天以内 6天以内 7天以内
            <div class="tb-header-item">
              
              <span>预报期</span>
              <Input
                v-model="targetNumber"
                disabled
                type="text"
                class="input-style"
              ></Input>
            </div> -->
            <!-- 陨落 解体  立即
            <div class="tb-header-item">
              <span>目标编号</span>
              <RadioGroup v-model="numbers" class="input-style">
                <Radio label="0">所有目标</Radio>
                <Radio label="1">自定义目标</Radio>
              </RadioGroup>
              <Input
                v-show="numbers != 0"
                v-model="targetNumber"
                disabled
                type="text"
                class="input-style"
              ></Input>
              <upload-file-btn
                v-show="numbers != 0"
                title="导入"
                @upload-file-event="uploadFileEvent"
              ></upload-file-btn>
            </div> -->
            <!-- 陨落 解体 
            <div class="tb-header-item">
              <span>入库时间（北京时）</span>
              <span>陨落时间（UTC）</span>
            </div> -->
          </div>
        </div>
        <div class="pie-tb-footer">
          <div class="tb-header-button">
            <share-btn
              class="btn-item"
              title="重置"
              callBackName="on-reset-event"
              @on-reset-event="resetClick"
            />
            <share-btn
              class="btn-item"
              title="确定"
              callBackName="on-create-report-event"
              @on-create-report-event="createReport"
            />
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
      tackType: "1",
      tackTypeList: [
        {
          value: "1",
          label: "TLE",
        },
        {
          value: "2",
          label: "ELE",
        },
      ], //轨道类型
      triggerMode: "1", //触发方式
      triggerModeList: [
        {
          value: "1",
          label: "立即",
        },
        {
          value: "2",
          label: "定时",
        },
        {
          value: "3",
          label: "当前最新",
        },
      ],
      time: "", //定时日期选择
      timeList: [],
      weekly: "", //每周
      weeklyTimeList: [
        {
          value: "2",
          label: "每周一",
        },
        {
          value: "3",
          label: "每周二",
        },
        {
          value: "4",
          label: "每周三",
        },
        {
          value: "5",
          label: "每周四",
        },
        {
          value: "6",
          label: "每周五",
        },
        {
          value: "7",
          label: "每周六",
        },
        {
          value: "1",
          label: "每周日",
        },
      ],
      methodType: "", //算法类型
      methodTypeList: [
        {
          value: "0",
          label: "数值法",
        },
        {
          value: "1",
          label: "SGP4",
        },
        {
          value: "2",
          label: "分析法",
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
      timeHorizon: [], //时间范围
      // ------------------------------------------
      beginTime: "", //开始时间
      endTime: "", //结束时间
      numbers: "0",
      targetNumber: "", //目标编号
      QCType: "0", //质量选项
      QC: [],
    };
  },
  watch: {
    $route() {
      this.resetClick();
    },
    triggerMode() {
      this.getBasicCommonCron();
    },
  },
  created() {
    this.getTimeList();
  },
  methods: {
    // 上传文件
    uploadFileEvent(file) {},
    // 回显上次生成时间段
    getBasicCommonCron() {
      let params = {
        productId:
          this.$route.query.productId == 0
            ? this.tackType
            : this.$route.query.productId,
      };
      this.$api.advanced.basicCommonCron(params).then((res) => {
        this.time = String(res.data);
        this.weekly = res.data;
      });
    },
    getTimeList() {
      for (let i = 0; i <= 23; i++) {
        let obj = {
          value: String(i),
          label: String(i) + ":00 (点)",
        };
        this.timeList.push(obj);
      }
    },
    // 开始时间
    onBeginTimeChange(time) {
      this.beginTime = time;
    },
    // 结束时间
    onEndTimeChange(time) {
      this.endTime = time;
    },
    // 配置
    createReport() {
      if (this.triggerMode == "1") {
        this.time = "";
        this.weekly = "";
      } else {
        if (!this.getVerifyNumber()) {
          return false;
        }
      }
      let params = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        method: this.methodType,
        type: this.toorManne,
        openTaskTime:
          this.$route.query.productId == 0 ? this.time : this.weekly,
        productId:
          this.$route.query.productId == 0
            ? this.tackType
            : this.$route.query.productId,
      };
      this.$api.advanced.basicCommonCreate(params).then((res) => {
        if (res.success == true) {
          this.resetClick();
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    // 重置
    resetClick() {
      this.tackType = "1";
      this.triggerMode = "1";
      this.time = "";
      this.weekly = "";
      this.beginTime = "";
      this.endTime = "";
      this.methodType = "";
      this.toorManne = "";
    },
    getVerifyNumber() {
      if (!this.time && !this.weekly) {
        this.$Notice.warning({
          title: "请选择定时时间",
          top: 50,
          duration: 5,
        });
      } else {
        return true;
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
      padding-top: 100px;
    }
  }
  .pie-tb-header {
    display: flex;
    justify-content: space-between;
    padding: 0 @table-padding @table-padding @table-padding;
    font-size: @lable-font-size;
    flex-wrap: wrap;

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
        margin-bottom: @table-lable-space;
        align-items: center;
        width: 100%;
        margin-left: 30%;
        .input-style {
          margin: auto @table-lable-space;
          width: 300px;
        }
        .checkbox-style {
          margin: auto @table-lable-space;
        }
        .short-input-style {
          width: 80px;
          margin: auto @table-lable-space;
        }
        span {
          width: 130px;
          text-align: right;
        }
        .text {
          width: 60px;
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
  .ivu-checkbox-wrapper {
    margin-right: 50px !important;
  }
}
.pie-tb-content .ivu-checkbox-wrapper {
  margin-right: 0.1rem !important;
}
</style>
