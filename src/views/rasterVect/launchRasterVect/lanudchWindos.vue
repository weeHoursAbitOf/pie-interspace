<template>
  <div class="lanuch-windos-content">
    <div class="lanuch-windos-search">
      <ul>
        <li>
          <p>发射时间范围</p>
          <span>
            <DatePicker
              :value="lanuchBeginTime"
              type="datetime"
              format="yyyy-MM-dd HH:mmm:ss"
              placeholder="开始时间"
              style="width: 200px"
              @on-change="onLaunchBeginChange"
            ></DatePicker>
          </span>
          <p>~</p>
          <span>
            <DatePicker
              :value="launchEndTime"
              type="datetime"
              format="yyyy-MM-dd HH:mmm:ss"
              placeholder="结束时间"
              style="width: 200px"
              @on-change="onLaunchEndChange"
            ></DatePicker>
          </span>
        </li>
        <li>
          <p>计算时间范围</p>
          <span>
            <DatePicker
              :value="calculateBeginTime"
              type="datetime"
              format="yyyy-MM-dd HH:mmm:ss"
              placeholder="开始时间"
              style="width: 200px"
              @on-change="onCalculateBeginChange"
            ></DatePicker>
          </span>
          <p>~</p>
          <span>
            <DatePicker
              :value="calculateEndTime"
              type="datetime"
              format="yyyy-MM-dd HH:mmm:ss"
              placeholder="结束时间"
              style="width: 200px"
              @on-change="onCalculateEndChange"
            ></DatePicker>
          </span>
        </li>
        <li>
          <p>交会距离阈值</p>
          <span>
            <Input
              v-model="intersectionDistance"
              placeholder=""
              style="width: 200px"
            />
          </span>
        </li>
        <li>
          <p>碰撞概率阈值</p>
          <span>
            <Input
              v-model="impactProbabilty"
              placeholder=""
              style="width: 200px"
            />
          </span>
        </li>
        <li>
          <p>任务编号</p>
          <span>
            <Input v-model="taskNumber" placeholder="" style="width: 200px" />
          </span>
        </li>
        <li>
          <p></p>
          <span>
            <share-btn
              title="检索"
              callBackName="on-search-event"
              @on-search-event="onSearchEvent"
            />
          </span>
        </li>
      </ul>
    </div>
    <div class="lanuch-windos-table">
      <my-table
        border
        ref="tables"
        :columns="columns"
        :data="data"
        disabled-hover
        height="400"
      ></my-table>
    </div>
    <div class="pie-tb-footer">
      <page
        :total="pageTotal"
        :pageSize="pageSize"
        :current="pageNum"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
      ></page>
    </div>
  </div>
</template>

<script>
import myTable from "@/components/table/my-table.vue";
import page from "@/components/page/page.vue";
export default {
  // params: {
  //   resetParams: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  components: {
    myTable,
    page,
  },
  data() {
    return {
      pageTotal: 0,
      pageNum: 1,
      pageSize: 10,
      lanuchBeginTime: "", //发射开始时间
      launchEndTime: "", //发射结束时间
      calculateBeginTime: "", //计算开始时间
      calculateEndTime: "", //计算结束时间
      intersectionDistance: "", //交会距离阈值
      impactProbabilty: "", //碰撞概率阈值
      taskNumber: "", //任务编号
      dataList: [],
      phone: "",
      id: 0,
      columns: [
        {
          title: "选中",
          width: 80,
          align: "center",
          render: (h, params) => {
            let id = params.row.launchWindowsId;
            let flag = false;
            if (this.id == id) {
              flag = true;
            } else {
              flag = false;
            }
            let _this = this;
            return h("div", [
              h("Radio", {
                params: {
                  value: flag,
                },
                on: {
                  "on-change": () => {
                    _this.id = id;
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "序号",
          width: 80,
          type: "index",
          align: "center",
        },
        {
          title: "发射窗口名称",
          width: 250,
          key: "name",
          align: "center",
        },
        {
          title: "任务编号",
          width: 250,
          key: "taskId",
          align: "center",
        },
        {
          title: "发射开始时间",
          width: 250,
          key: "beginningTime",
          align: "center",
          render: (h, params) => {
            return h("div", this.$utils.formatDate(params.row.beginningTime));
          },
        },
        {
          title: "发射结束时间",
          width: 250,
          key: "endTime",
          align: "center",
          render: (h, params) => {
            return h("div", this.$utils.formatDate(params.row.endTime));
          },
        },
        {
          title: "计算时间",
          width: 250,
          key: "",
          align: "center",
        },
        {
          title: "交会距离最大值",
          width: 150,
          key: "maxIntersectDistamce",
          align: "center",
        },
        {
          title: "交会距离最小值",
          width: 150,
          key: "minIntersectDistamce",
          align: "center",
        },
        {
          title: "碰撞概率最大值",
          width: 150,
          key: "maxProbability",
          align: "center",
        },
        {
          title: "碰撞概率最小值",
          width: 150,
          key: "minProbability",
          align: "center",
        },
      ],
      data: [],
    };
  },
  watch: {
    id(val) {
      this.$emit("on-launch-windows-id-event", val);
    },
  },
  methods: {
    getData() {
      let params = {
        // launchOrbitId: "",//发射轨道
        page: this.pageNum, //页数
        size: this.pageSize, //条数
        startTime: this.lanuchBeginTime, //发射开始时间
        endTime: this.launchEndTime, //发射结束时间
        startInTime: this.calculateBeginTime, //计算开始时间
        endInTime: this.calculateEndTime, //计算结束时间
        intersectionDistance: this.intersectionDistance, //交会距离
        probabilty: this.impactProbabilty, //碰撞概率
        taskId: this.taskNumber, //任务id
      };
      this.$api.common.getLaunchWindows(params).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          this.data = res.data.msg;
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    // 页数
    pageChange(num) {
      this.pageNum = num;
      this.getData();
    },
    // 条数
    pageSizeChange(size) {
      this.pageSize = size;
      this.getData();
    },
    // 检索按钮
    onSearchEvent() {
      this.getData();
    },
    //发射开始时间
    onLaunchBeginChange(time) {
      this.lanuchBeginTime = time;
    },
    //发射结束时间
    onLaunchEndChange(time) {
      this.launchEndTime = time;
    },
    //计算开始时间
    onCalculateBeginChange(time) {
      this.calculateBeginTime = time;
    },
    //计算结束时间
    onCalculateEndChange(time) {
      this.calculateEndTime = time;
    },
    // 重置参数
    resetParameters() {},
  },
};
</script>

<style scoped lang="less">
.lanuch-windos-content {
  font-size: @lable-font-size;
  color: @lable-font-color;
  .lanuch-windos-search {
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        display: flex;
        align-items: center;
        margin: 10px;
        p {
          margin: 0 10px;
        }
      }
    }
  }
  .lanuch-windos-table {
    padding: 10px 0;
    overflow: auto;
  }
}
</style>
