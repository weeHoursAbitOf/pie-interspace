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
              <span>定时任务</span>
              <RadioGroup v-model="timedTaskType">
                <Radio label="month">每月</Radio>
                <Radio label="week">每周</Radio>
                <Radio label="day">每日</Radio>
                <Radio label="intervalTime">间隔时间段</Radio>
              </RadioGroup>
            </div>
            <div class="tb-header-item">
              <span>
                {{
                  timedTaskType == "month"
                    ? "每月"
                    : timedTaskType == "week"
                    ? "每周"
                    : timedTaskType == "day"
                    ? "每天"
                    : "间隔时间段"
                }}
              </span>
              <timedTask
                :timedTaskType="timedTaskType"
                :timedTaskItem="timedTaskItem"
                :resetStatus="resetStatus"
                @on-month-event="onMonthEvent"
                @on-day-event="onDayEvent"
                @on-week-event="onWeekEvent"
                @on-hour-minute-second-event="onHourMinuteSecondEvent"
              />
            </div>
          </div>
        </div>
        <div class="pie-tb-footer">
          <div class="tb-header-button">
            <share-btn class="btn-item" title="重置" callBackName="" />
            <share-btn class="btn-item" title="确定" callBackName="" />
          </div>
        </div>
      </div>
    </pie-card>
  </div>
</template>
<script>
import timedTask from "@/components/timedTask";
export default {
  components: {
    timedTask,
  },
  data() {
    return {
      productTemplate: "", //产品模板
      productTemplateList: [
        {
          id: 0,
          name: "模板1",
        },
      ],
      timedTaskType: "month",
      timedTaskItem: {},
      resetStatus: false,
      month: "", //月
      week: "", //周
      day: "", //日
      hour: "", //分
      minute: "", //时
      second: "", //秒
      hourMinuteSecond: "", //时分秒
    };
  },
  created() {},
  methods: {
    // 月
    onMonthEvent(value) {
      this.month = value;
    },
    // 天
    onDayEvent(value) {
      this.day = value;
    },
    // 周
    onWeekEvent(value) {
      this.week = value;
    },
    // 时分秒
    onHourMinuteSecondEvent(obj) {
      this.hour = obj.hour;
      this.minute = obj.minute;
      this.second = obj.second;
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
