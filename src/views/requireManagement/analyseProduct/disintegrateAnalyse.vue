<template>
  <div class="disintegrateAnalyse-container">
    <div class="disintegrateAnalyse-content">
      <div class="disintegrateAnalyse-section">
        <ul>
          <li>
            <p>定时任务:</p>
            <span>
              <Select v-model="weeklyTimingTask" style="width: 200px">
                <Option
                  v-for="item in weeklyTimingTaskList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </span>
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
          <li>
            <p>产品模板:</p>
            <span>
              <Select v-model="productTemplate" style="width: 200px">
                <Option
                  v-for="item in productTemplateList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </span>
          </li>
          <li>
            <p>卫星名称替换文件:</p>
            <span>
              <Input
                v-model="satelliteFilePath"
                disabled
                style="width: 300px"
              />
            </span>
            <span>
              <uploadFileBtn @upload-file-event="satelliteUploadFileEvnet" />
            </span>
          </li>
          <li>
            <p>国别名称替换文件:</p>
            <span>
              <Input v-model="countryFilePath" disabled style="width: 300px" />
            </span>
            <span>
              <uploadFileBtn @upload-file-event="countryUploadFileEvnet" />
            </span>
          </li>
        </ul>
      </div>
      <div class="disintegrateAnalyse-footer">
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
      productTemplate: "", //产品模板
      productTemplateList: [
        {
          id: 0,
          name: "模板1",
        },
      ],
      weeklyTimingTaskList: [
        {
          value: "1",
          label: "每周一",
        },
        {
          value: "2",
          label: "每周二",
        },
        {
          value: "3",
          label: "每周三",
        },
        {
          value: "4",
          label: "每周四",
        },
        {
          value: "5",
          label: "每周五",
        },
        {
          value: "6",
          label: "每周六",
        },
        {
          value: "7",
          label: "每周日",
        },
      ], //每周的定时任务
      weeklyTimingTask: "",
      timingTaskList: [], //几点定时任务
      timingTask: "", //几点定时任务值
      satelliteFilePath: "", //卫星名称地址
      countryFilePath: "", //国别地址
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
        this.timingTaskList.push(obj);
      }
    },
    // 卫星名称上传文件成功
    satelliteUploadFileEvnet(res) {
      this.satelliteFilePath = res.data;
    },
    // 国别上传文件成功
    countryUploadFileEvnet(res) {
      this.countryFilePath = res.data;
    },
    // 配置事件
    configurationevent() {
      let params = {
        countryRulePath: this.countryFilePath,
        satelliteRulePath: this.satelliteFilePath,
        timeHour: this.timingTask,
        timeWeek: this.weeklyTimingTask,
      };
      this.$api.advanced.getBreakUpCreateTask(params).then(
        (res) => {
          if (res.success == true) {
            this.resetevent();
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
          } else {
            this.$Notice.error({
              title: res.message,
              top: 50,
              duration: 5,
            });
          }
        },
        (error) => {
          this.$Notice.error({
            title: error.status,
            top: 50,
            duration: 5,
          });
        }
      );
    },
    // 重置事件
    resetevent() {
      this.weeklyTimingTask = "";
      this.timingTask = "";
      this.satelliteFilePath = "";
      this.countryFilePath = "";
    },
  },
};
</script>

<style lang="less" scoped>
.disintegrateAnalyse-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .disintegrateAnalyse-content {
    font-size: @lable-font-size;
    color: @main-font-color;
    .disintegrateAnalyse-section {
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
          margin: 20px 0;
          p {
            width: 150px;
            text-align: right;
          }
          span {
            margin-left: @table-padding;
          }
        }
      }
    }
    .disintegrateAnalyse-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: @table-padding;
    }
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
</style>
