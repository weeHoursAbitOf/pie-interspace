<template>
  <div class="emergency-container">
    <div class="emergency-content">
      <div class="emergency-section">
        <ul>
          <li>
            <p>定时任务:</p>
            <span>
              <Select v-model="timingTask" style="width: 200px">
                <Option
                  v-for="item in timingTaskList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </span>
          </li>
          <li v-show="timingTask == 0">
            <p></p>
            <span>
              <Select v-model="weeklyTimingTask" style="width: 200px">
                <Option
                  v-for="item in weeklyTimingTaskList"
                  :value="item.label"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </span>
            <span>
              <Select v-model="timingTaskTime" style="width: 200px">
                <Option
                  v-for="item in timingTaskTimeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </span>
          </li>
          <li>
            <p>预报时间:</p>
            <span>
              <Select v-model="forecast" style="width: 200px">
                <Option
                  v-for="item in forecastList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </span>
          </li>
          <li>
            <p>近地点远地点高度图时间:</p>
            <span>
              <Select v-model="locationTime" style="width: 200px">
                <Option
                  v-for="item in locationTimeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </span>
          </li>
          <li>
            <p>卫星名称替换文件:</p>
            <span>
              <Input v-model="satellitePath" placeholder style="width: 300px" />
            </span>
            <span>
              <uploadFileBtn
                title="导入文件"
                @upload-file-event="satelliteUploadFileEvent"
              />
            </span>
          </li>
          <li>
            <p>国别名称替换文件:</p>
            <span>
              <Input v-model="countryPath" placeholder style="width: 300px" />
            </span>
            <span>
              <uploadFileBtn
                title="导入文件"
                @upload-file-event="CountryUploadFileEvent"
              />
            </span>
          </li>
        </ul>
      </div>
      <div class="emergency-footer">
        <share-btn
          title="重置"
          callBackName="reset-event"
          @reset-event="resetevent"
        />
        <div style="width: 20px"></div>
        <share-btn
          title="配置"
          callBackName="configuration-event"
          @configuration-event="configurationevent"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      timingTask: "0", //定时任务
      timingTaskList: [
        {
          value: "0",
          label: "定时",
        },
        {
          value: "1",
          label: "立即",
        },
      ],
      weeklyTimingTask: "", //每周的定时任务
      weeklyTimingTaskList: [
        {
          value: "1",
          label: "星期一",
        },
        {
          value: "2",
          label: "星期二",
        },
        {
          value: "3",
          label: "星期三",
        },
        {
          value: "4",
          label: "星期四",
        },
        {
          value: "5",
          label: "星期五",
        },
        {
          value: "6",
          label: "星期六",
        },
        {
          value: "7",
          label: "星期日",
        },
      ],
      timingTaskTimeList: [], //几点定时任务
      timingTaskTime: "", //几点定时任务值
      forecast: "", //预报时间
      forecastList: [
        {
          value: "1",
          label: "一个月",
        },
        {
          value: "2",
          label: "两个月",
        },
        {
          value: "3",
          label: "三个月",
        },
      ],
      locationTime: "", //地点时间
      locationTimeList: [
        {
          value: "2",
          label: "两个月",
        },
        {
          value: "3",
          label: "三个月",
        },
        {
          value: "4",
          label: "四个月",
        },
      ],
      satellitePath: "", //卫星
      countryPath: "", //国别
    };
  },
  created() {
    this.getTimingTask();
  },
  methods: {
    // 几点定时任务数据列表
    getTimingTask() {
      for (let i = 0; i <= 23; i++) {
        let obj = {
          value: i,
          label: i + ":00 (点)",
        };
        this.timingTaskTimeList.push(obj);
      }
    },
    // 卫星上传成功之后
    satelliteUploadFileEvent(res) {
      this.satellitePath = res.data;
    },
    // 国别上传成功之后
    CountryUploadFileEvent(res) {
      this.countryPath = res.data;
    },
    // 配置事件
    configurationevent() {
      if (this.timingTask == "1") {
        this.weeklyTimingTask = "";
        this.timingTaskTime = "";
      }
      let formData = new FormData();
      formData.append("week", this.weeklyTimingTask);
      formData.append("hour", this.timingTaskTime);
      formData.append("satelliteNameFilePath", this.satellitePath);
      formData.append("countryFilePath", this.countryPath);
      formData.append("preTime", this.forecast);
      formData.append("targetEndTime", this.locationTime);
      formData.append("orgList", this.groupList.map((item) => item.id).join());
      formData.append("userList", this.userList.map((item) => item.id).join());
      if (this.timingTask == "0") {
        // 定时
        this.$api.advanced.getFallCreateFallJob(formData).then((res) => {
          if (res.success == true) {
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.resetevent();
          }
        });
      } else {
        // 立即
        this.$api.advanced.getFallPeport(formData).then((res) => {
          if (res.success == true) {
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.resetevent();
          }
        });
      }
    },
    // 重置事件
    resetevent() {
      this.timingTask = "0";
      this.weeklyTimingTask = "";
      this.timingTaskTime = "";
      this.forecast = "";
      this.locationTime = "";
      this.satellitePath = "";
      this.countryPath = "";
      this.targetList = [];
      this.selectList = [];
      this.groupList = [];
      this.userList = [];
      this.titleKey = "name";
    },
  },
};
</script>

<style lang="less" scoped>
.emergency-content {
  padding: @table-padding;
  font-size: @lable-font-size;
  color: @main-font-color;
  .emergency-section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    ul {
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        align-items: center;
        margin: 10px 0;
        p {
          width: 200px;
          text-align: right;
        }
        span {
          margin-left: @table-padding;
        }
      }
    }
  }
  .emergency-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: @table-padding;
  }
}
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
.service-class {
  width: 500px;
  display: flex;
  flex-wrap: wrap;
}
</style>
