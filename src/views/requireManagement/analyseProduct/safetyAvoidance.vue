<template>
  <div class="safetyAvoidance-container">
    <div class="safetyAvoidance-content">
      <div class="safetyAvoidance-section">
        <ul>
          <li>
            <p>定时任务:</p>
            <span>
              <Select v-model="taskType" style="width: 200px">
                <Option
                  v-for="item in taskDateList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </span>
            <span v-show="taskType == 1 ? true : false">
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
          <li v-show="taskType == 0 ? true : false">
            <p>目标编号:</p>
            <span>
              <Input style="width: 300px" />
            </span>
          </li>
          <li v-show="taskType == 0 ? true : false">
            <p>产品模板:</p>
            <span>
              <Select v-model="productListTemplate" style="width: 200px">
                <Option
                  v-for="item in productListTemplateList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </span>
          </li>
          <li v-show="taskType == 1 ? true : false">
            <p></p>
            <span>目标集及服务对象:</span>
            <span>
              <share-btn
                title="添加"
                callBackName="add-event"
                @add-event="addEvent(data.length)"
              />
            </span>
          </li>
          <li v-show="taskType == 1 ? true : false">
            <p></p>
            <span>
              <my-table
                border
                ref="selection"
                width="1000"
                max-height="400"
                :delBtn="true"
                :columns="columns"
                :data="data"
                disabled-hover
                :lookItem="lookItem"
                :lookIObject="lookData"
                @on-selection-change="multiSelect"
              />
            </span>
          </li>
          <li>
            <p>卫星名称替换文件:</p>
            <span>
              <Input style="width: 300px" />
            </span>
            <span>
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <share-btn title="导入" />
              </Upload>
            </span>
          </li>
          <li>
            <p>国别名称替换文件:</p>
            <span>
              <Input style="width: 300px" />
            </span>
            <span>
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <share-btn title="导入" />
              </Upload>
            </span>
          </li>
          <li v-show="taskType == 0 ? true : false">
            <p>轨道查询：</p>
            <span>
              <my-table
                border
                ref="selection"
                width="1000"
                max-height="300"
                :columns="atOnceColumns"
                :data="atOnceData"
                disabled-hover
                :lookItem="lookItem"
                :lookIObject="lookData"
                @on-selection-change="multiSelect"
              />
            </span>
          </li>
          <li v-show="taskType == 0 ? true : false">
            <p>对外服务对象：</p>
            <span>
              <share-btn
                class="btn-item"
                title="+"
                callBackName="addServiceTarget"
                @addServiceTarget="addServiceTarget"
              />
            </span>
          </li>
          <li v-show="groupList.length > 0">
            <p>机构ID:</p>
            <div style="width: 20px"></div>
            <template v-for="(member, index) in groupList">
              <div :key="member.id">
                {{ member.name }}
                <label v-if="index < groupList.length - 1">,</label>
              </div>
            </template>
          </li>
          <li v-show="userList.length > 0">
            <p>用户ID:</p>
            <div style="width: 20px"></div>
            <template v-for="(member, index) in userList">
              <div :key="member.id">
                {{ member.username }}
                <label v-if="index < userList.length - 1">,</label>
              </div>
            </template>
          </li>
        </ul>
      </div>
      <div class="safetyAvoidance-footer">
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
    <transferModals
      v-show="isShowTransfer"
      @on-target-keys-event="onTargetKeysEvent"
      @on-confirm-event="onConfirmEvent"
    />
  </div>
</template>

<script>
import myTable from "@/components/table/my-table.vue";
export default {
  components: {
    myTable,
  },
  data() {
    return {
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center",
        },
        {
          title: "目标编号",
          key: "number",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("Input", {
              props: {
                type: "text",
                size: "small",
                value: params.row.number,
              },
              style: {
                // display: "inline-biock",
                // width: "100%",
                // textAlign: "left",
                // padding: "5px 0px",
              },
              on: {
                input: (val) => {
                  this.data[params.index].number = val;
                },
              },
            });
          },
        },
        {
          title: "服务对象",
          key: "service",
          align: "center",
          render: (h, params) => {
            return h("Input", {
              props: {
                type: "text",
                size: "small",
                value: params.row.service,
              },
              style: {},
              on: {
                input: (val) => {
                  this.data[params.index].service = val;
                },
              },
            });
          },
        },
        {
          title: "操作",
          width: 150,
          key: "operation",
          align: "center",
          slot: "action",
        },
      ],
      data: [],
      atOnceColumns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center",
        },
        {
          title: "目标编号",
          key: "s_id",
          align: "center",
        },
        {
          title: "任务编号",
          key: "task_id",
          align: "center",
        },
        {
          title: "规避方案编号",
          key: "solution_id",
          align: "center",
        },
        {
          title: "计算时间",
          key: "in_time",
          align: "center",
        },
      ],
      atOnceData: [
        {
          s_id: "EGWSA3501",
          task_id: "1",
          solution_id: "1",
          in_time: "0.12",
        },
        {
          s_id: "EGWSA3501",
          task_id: "1",
          solution_id: "1",
          in_time: "0.12",
        },
        {
          s_id: "EGWSA3501",
          task_id: "1",
          solution_id: "1",
          in_time: "0.12",
        },
        {
          s_id: "EGWSA3501",
          task_id: "1",
          solution_id: "1",
          in_time: "0.12",
        },
      ],
      timingTaskList: [],
      timingTask: "",
      taskType: "0", //定时任务类型
      taskDateList: [
        {
          value: "0",
          label: "立即",
        },
        {
          value: "1",
          label: "定时",
        },
      ], //定时任务类型数据
      selectList: [
        // {
        //   name: "test1",
        // },
        // {
        //   name: "test2",
        // },
        // {
        //   name: "test3",
        // },
      ],
      callBackTitleType: false,
      productListTemplate: "",
      productListTemplateList: [
        {
          value: "0",
          label: "安全规避模板",
        },
        {
          value: "1",
          label: "机动模板",
        },
      ],
      isShowTransfer: false,
      groupList: [], //机构id
      userList: [], //用户ID
    };
  },
  created() {
    this.getTimingTask();
  },
  methods: {
    // 定时任务数据列表
    getTimingTask() {
      for (let i = 0; i <= 23; i++) {
        let obj = {
          value: i,
          label: i + ":00 (点)",
        };
        this.timingTaskList.push(obj);
      }
    },
    // 添加
    addEvent(len) {
      let obj = {
        id: len + 1,
        number: "",
        service: "",
      };
      this.data.push(obj);
      console.log(this.data);
    },
    // 选择中
    multiSelect(row) {
      console.log(row);
    },
    //查看详情
    lookOver(item) {
      this.lookData = item;
      this.$refs.selection.lookOver();
    },
    // 重置事件
    resetevent() {
      console.log("重置事件");
    },
    // 配置事件
    configurationevent() {
      console.log("配置事件");
    },
    // 添加服务对象
    addServiceTarget() {
      this.isShowTransfer = true;
    },
    // 确定对外服务
    onConfirmEvent(type) {
      this.isShowTransfer = type;
    },
    // 对外服务回调回来的数据
    onTargetKeysEvent(obj) {
      if (obj.name == "机构") {
        this.groupList = obj.data;
      } else {
        this.userList = obj.data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.safetyAvoidance-content {
  padding: @table-padding;
  font-size: @lable-font-size;
  color: @main-font-color;
  .safetyAvoidance-section {
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
          width: 150px;
          text-align: right;
        }
        span {
          margin-left: @table-padding;
        }
      }
    }
  }
  .safetyAvoidance-footer {
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
</style>
