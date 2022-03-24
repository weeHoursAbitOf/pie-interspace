<template>
  <div class="timed-task-manage-content">
    <pie-card>
      <div slot="header">
        <div class="timed-task-manage-header">
          <div class="timed-task-manage-left">
            <p>产品类型</p>
            <span>
              <Select v-model="productType" style="width: 200px">
                <Option
                  v-for="(item, index) in productTypeList"
                  :key="index"
                  :value="item.value"
                  >{{ item.lable }}</Option
                >
              </Select>
            </span>
          </div>
          <div class="timed-task-manage-right">
            <share-btn title="检索" callBackName="" />
          </div>
        </div>
      </div>
      <div slot="iscontent">
        <Table
          border
          ref="selection"
          :columns="columns"
          :data="timedTaskList"
          disabled-hover
        >
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row }" slot="action">
            <Button class="primary_color">启用</Button>
            <Button class="light_primary_color">停用</Button>
            <Button class="light_primary_color">修改</Button>
            <Poptip
              placement="left-end"
              confirm
              transfer
              title="title"
              @on-ok="verifyDelete(row)"
              @on-cancel="cancelDelete"
              ok-title="确定"
              cancel-text="取消"
            >
              <div slot="title" class="poptip-delete-content">
                <p>
                  输入
                  <b>DELETE</b>删除该消息！
                </p>
                <span>
                  <Input
                    v-model="deleteVal"
                    x
                    placeholder="请输入DELETE将其删除人。。。"
                    style="width: 300px"
                  ></Input>
                </span>
              </div>
              <Button class="red.color">删除</Button>
            </Poptip>
          </template>
        </Table>
      </div>
      <div slot="footer">
        <div class="pie-tb-footer">
          <page
            :total="pageTotal"
            :pageSize="pageSize"
            :current="pageNum"
            @pageChange="changePage"
            @pageSizeChange="pageSizeChange"
          />
        </div>
      </div>
    </pie-card>
  </div>
</template>

<script>
import page from "@/components/page/page.vue";
export default {
  components: {
    page,
  },
  props: {
    productId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      timedTaskTitle: "",
      timedTaskType: 0,
      isShowTimedTasks: false,
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      deleteVal: "",
      columns: [
        {
          title: "序号",
          width: 80,
          type: "index",
          align: "center",
        },
        {
          title: "产品类型",
          width: 150,
          key: "productType",
          align: "center",
        },
        {
          title: "产品类型",
          width: 100,
          key: "productStatus",
          align: "center",
          render: (h, params) => {
            return h("div", params.row.productStatus == 0 ? "启用" : "停用");
          },
        },
        {
          title: "任务类型",
          width: 150,
          key: "taskType",
          align: "center",
          ellipsis: true,
          tooltip: true,
          filters: [
            {
              label: "每月",
              value: 1,
            },
            {
              label: "每周",
              value: 2,
            },
            {
              label: "每天",
              value: 3,
            },
            {
              label: "间隔时间段",
              value: 4,
            },
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return (row.taskType = "每月");
            } else if (value === 2) {
              return (row.taskType = "每周");
            } else if (value === 3) {
              return (row.taskType = "每天");
            } else if (value === 4) {
              return (row.taskType = "间隔时间段");
            }
          },
        },
        {
          title: "日",
          width: 100,
          key: "day",
          align: "center",
          render: (h, params) => {
            if (params.row.day) {
              return h("div", params.row.day);
            } else {
              return h("div", `-`);
            }
          },
        },
        {
          title: "星期",
          width: 100,
          key: "week",
          align: "center",
          render: (h, params) => {
            if (params.row.week) {
              return h("div", params.row.week);
            } else {
              return h("div", `-`);
            }
          },
        },
        {
          title: "时分秒",
          width: 200,
          key: "hour",
          align: "center",
          render: (h, params) => {
            if (params.row.hour) {
              return h(
                "div",
                `${params.row.hour}:${params.row.minute}:${params.row.second}`
              );
            } else {
              return h("div", `-`);
            }
          },
        },
        {
          title: "起始时间",
          width: 200,
          key: "startingTime",
          align: "center",
          ellipsis: true,
          sortable: true,
          render: (h, params) => {
            if (params.row.startingTime) {
              return h("div", params.row.startingTime);
            } else {
              return h("div", `-`);
            }
          },
        },
        {
          title: "间隔时间",
          width: 200,
          key: "hourMinuteSecond",
          align: "center",
          ellipsis: true,
          sortable: true,
          render: (h, params) => {
            if (params.row.hourMinuteSecond) {
              return h("div", params.row.hourMinuteSecond);
            } else {
              return h("div", `-`);
            }
          },
        },
        {
          title: "操作",
          key: "operation",
          slot: "action",
          align: "center",
        },
      ],
      timedTaskList: [
        {
          productType: "轨道任务策略",
          taskType: "每月",
          day: "",
          week: "",
          hour: "10",
          minute: "23",
          second: "00",
          startingTime: "",
          hourMinuteSecond: "",
          productStatus: 0,
        },
        {
          productType: "轨道任务策略",
          taskType: "每月",
          day: "",
          week: "",
          hour: "10",
          minute: "23",
          second: "00",
          startingTime: "",
          hourMinuteSecond: "",
          productStatus: 1,
        },
      ],
      productType: "",
      productTypeList: [
        {
          value: "0",
          lable: "轨道任务策略",
        },
        {
          value: "1",
          lable: "编目任务策略",
        },
        {
          value: "2",
          lable: "危险交会任务策略",
        },
        {
          value: "3",
          lable: "陨落任务策略",
        },
        {
          value: "4",
          lable: "解体任务策略",
        },
      ],
    };
  },
  methods: {
    //   获取定时任务数据列表
    getTimeBygroupName() {
      let params = {
        productId: this.productId,
      };
      this.$api.advanced.getTimeBygroupName(params).then((res) => {
        this.timedTaskList = res.data;
      });
    },
    // 页数
    changePage(num) {
      this.pageNum = num;
    },
    // 条数
    handlePageSizeChange(size) {
      this.pageSize = size;
    },
    // 校验删除
    verifyDelete(row) {
      let params = {
        str: this.deleteVal,
      };
      this.$api.user.judgeD(params).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.confirmDelete(row);
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.deleteVal = "";
        }
      });
    },
    // 确定删除
    confirmDelete(row) {
      let params = {
        id: row.id,
      };
      this.$api.software.deleteVersions(params).then((res) => {
        if (res.code == 200) {
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
      });
    },
    // 任务策略确定
    timedTakConfirm() {},
    // 任务策略取消
    timedTaskCancel() {},
  },
};
</script>

<style lang="less" scoped>
.timed-task-manage-content {
  font-size: @lable-font-size;
  color: @lable-font-color;
  .timed-task-manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .timed-task-manage-left {
      display: flex;
      align-items: center;
      p {
        margin-right: 10px;
      }
    }
  }
}
.red.color {
  color: #ed4014;
}
.primary_color {
  color: #2d8cf0;
}
.light_primary_color {
  color: #5cadff;
}
</style>
