<template>
  <div class="timed-task-content">
    <div class="timed-task-type">
      <ul>
        <li v-show="timedTaskType == 'month'">
          <span>
            <Select v-model="day" style="width: 80px" placeholder>
              <Option
                v-for="item in dayList"
                :key="item.value"
                :value="item.value"
                :label="item.values"
                >{{ item.label }}</Option
              >
            </Select>
          </span>
          <p>日</p>
        </li>
        <li v-show="timedTaskType == 'week'">
          <p>星期</p>
          <span>
            <Select v-model="week" style="width: 80px" placeholder>
              <Option
                v-for="item in weekList"
                :key="item.value"
                :value="item.value"
                :label="item.values"
                >{{ item.label }}</Option
              >
            </Select>
          </span>
        </li>
        <li v-show="timedTaskType == 'intervalTime'">
          <p>起始时间</p>
          <span>
            <TimePicker
              v-model="startingTime"
              format="HH:mm:ss"
              type="width:170px"
              style="width: 170px"
              placeholder=""
            />
          </span>
        </li>
        <li>
          <p v-show="timedTaskType == 'intervalTime'">间隔时间</p>
          <span>
            <TimePicker
              v-model="hourMinuteSecond"
              format="HH:mm:ss"
              type="width:170px"
              style="width: 170px"
              placeholder=""
            />
          </span>
          <p v-show="timedTaskType != 'intervalTime'">时分秒</p>
        </li>
      </ul>
    </div>
    <share-btn
      title="任务策略"
      callBackName="on-tiemd-task-list-event"
      @on-tiemd-task-list-event="onTiemdTaskListEvent"
    />
    <my-modal
      width="60"
      :resetBtn="false"
      v-model="isShowTimedTask"
      @cancel="timedTaskCancel"
      @confirm="timedTaskConfirm"
      title="任务策略"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <taskStrategy />
          </div>
        </div>
      </div>
    </my-modal>
  </div>
</template>

<script>
import myModal from "@/components/modals/modal.vue";
import taskStrategy from "@/components/timedTask/taskStrategy";
export default {
  components: {
    myModal,
    taskStrategy,
  },
  props: {
    timedTaskType: {
      type: String,
      default: "month",
    },
    resetStatus: {
      type: Boolean,
      default: false,
    },
    timedTaskItme: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      isShowTimedTask: false,
      day: "", //日
      dayList: [
        { value: "1", values: "1", label: "1" },
        { value: "2", values: "2", label: "2" },
        { value: "3", values: "3", label: "3" },
        { value: "4", values: "4", label: "4" },
        { value: "5", values: "5", label: "5" },
        { value: "6", values: "6", label: "6" },
        { value: "7", values: "7", label: "7" },
        { value: "8", values: "8", label: "8" },
        { value: "9", values: "9", label: "9" },
        { value: "10", values: "10", label: "10" },
        { value: "11", values: "11", label: "11" },
        { value: "12", values: "12", label: "12" },
        { value: "13", values: "13", label: "13" },
        { value: "14", values: "14", label: "14" },
        { value: "15", values: "15", label: "15" },
        { value: "16", values: "16", label: "16" },
        { value: "17", values: "17", label: "17" },
        { value: "18", values: "18", label: "18" },
        { value: "19", values: "19", label: "19" },
        { value: "20", values: "20", label: "20" },
        { value: "21", values: "21", label: "21" },
        { value: "22", values: "22", label: "22" },
        { value: "23", values: "23", label: "23" },
        { value: "24", values: "24", label: "24" },
        { value: "25", values: "25", label: "25" },
        { value: "26", values: "26", label: "26" },
        { value: "27", values: "27", label: "27" },
        { value: "28", values: "28", label: "28" },
        { value: "29", values: "29", label: "29" },
        { value: "30", values: "30", label: "30" },
        { value: "31", values: "31", label: "31" },
      ],
      week: "", //周
      weekList: [
        { value: "1", values: "日", lable: "星期日" },
        { value: "2", values: "一", lable: "星期一" },
        { value: "3", values: "二", lable: "星期二" },
        { value: "4", values: "三", lable: "星期三" },
        { value: "5", values: "四", lable: "星期四" },
        { value: "6", values: "五", lable: "星期五" },
        { value: "7", values: "六", lable: "星期六" },
      ],
      startingTime: "", //起始时间
      hourMinutsSecond: "", //时分秒，间隔时间
    };
  },
  methods: {
    // 任务列表
    onTiemdTaskListEvent() {
      this.isShowTimedTask = true;
    },
    // 任务列表 确定
    timedTaskConfirm() {},
    // 任务列表 取消
    timedTaskCancel() {
      this.isShowTimedTask = false;
    },
  },
};
</script>

<style lang="less" scoped>
.timed-task-content {
  display: flex;
  font-size: @lable-font-size;
  color: @lable-font-color;
}
ul {
  display: flex;
  li {
    display: flex;
    align-items: center;
    span {
      margin: 0 5px;
    }
    p {
      margin: 0 5px;
    }
  }
}
/deep/.ivu-input {
  height: 30px !important;
}
</style>
