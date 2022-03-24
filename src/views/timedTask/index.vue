<template>
  <div class="timed-task-content">
    <pie-card>
      <div slot="header">
        <div class="timed-task-top">
          <share-btn
            class="share-btn"
            title="新增"
            callBackName="on-add-click"
            @on-add-click="onAddClick"
          />
        </div>
      </div>
      <div slot="iscontent">
        <Table border disabled-hover :columns="columns" :data="data">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row }" slot="action">
            <Button>启用</Button>
            <Button>停用</Button>
            <Button class="green" @click="history(row)">历史记录</Button>
            <Button class="blue" @click="revisionChart(row)">修改记录</Button>
            <Button class="yellow" @click="amend(row)">修改</Button>
            <Button class="red" @click="deletes(row)">删除</Button>
          </template>
        </Table>
      </div>
      <div slot="footer">
        <div class="pie-tb-footer">
          <page
            :total="total"
            :pageSize="pageSize"
            :current="pageNum"
            @pageChange="changePage"
            @pageSizeChange="handlePageSizeChange"
          ></page>
        </div>
      </div>
    </pie-card>
    <!-- 新增 修改 -->
    <my-modal
      width="30"
      v-model="isShowTask"
      @cancel="cancel"
      :title="title"
      :resetBtn="false"
      :close="false"
      @confirm="confirm"
    >
      <div slot="operateItem">
        <addTask />
      </div>
    </my-modal>

    <!-- 历史 记录 -->
    <my-modal
      width="60"
      v-model="isShowHistory"
      @cancel="cancel"
      title="历史记录"
      :resetBtn="false"
      :close="false"
      @confirm="confirm"
    >
      <div slot="operateItem">
        <history />
      </div>
    </my-modal>

    <!-- 修改 记录 -->
    <my-modal
      width="60"
      v-model="isShowRevisionChart"
      @cancel="cancel"
      title="历史记录"
      :resetBtn="false"
      :close="false"
      @confirm="confirm"
    >
      <div slot="operateItem">
        <revision-chart />
      </div>
    </my-modal>
  </div>
</template>

<script>
import page from "@/components/page/page.vue";
import myModal from "@/components/modals/modal.vue";
import addTask from "@/views/timedTask/addTask.vue";
import history from "@/views/timedTask/history.vue";
import revisionChart from "@/views/timedTask/revisionChart.vue";
export default {
  components: {
    page,
    myModal,
    addTask,
    history,
    revisionChart,
  },
  data() {
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      columns: [
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
          title: "任务名称",
          key: "taskName",
          width: 100,
          ellipsis: true,
          align: "center",
        },
        {
          title: "任务组名称",
          key: "taskGroupName",
          width: 150,
          ellipsis: true,
          align: "center",
        },
        {
          title: "Cron表达式",
          key: "cronWhile",
          ellipsis: true,
          align: "center",
        },
        {
          title: "IP地址",
          key: "IPsite",
          width: 300,
          ellipsis: true,
          align: "center",
        },
        {
          title: "请求参数",
          key: "JSONParams",
          width: 200,
          ellipsis: true,
          align: "center",
        },
        {
          title: "操作",
          key: "operation",
          width: 500,
          slot: "action",
          align: "center",
        },
      ],
      data: [],
      title: "新增",
      isShowTask: false,
      isShowRevisionChart: false,
      isShowHistory: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //   请求数据
    getData() {
      this.data = [
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
      ];
    },
    // 页数
    changePage(num) {
      this.pageNum = num;
      this.getData();
    },
    // 条数
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.getData();
    },
    // 添加
    onAddClick() {
      this.title = "新增";
      this.isShowTask = true;
    },
    // 修改
    amend() {
      this.title = "修改";
      this.isShowTask = true;
    },
    //   历史记录
    history() {
      this.isShowHistory = true;
    },
    //   修改记录
    revisionChart() {
      this.isShowRevisionChart = true;
    },
    deletes() {},
    //   确定
    confirm() {},
    //   取消
    cancel() {
      this.isShowTask = false;
      this.isShowRevisionChart = false;
      this.isShowHistory = false;
    },
  },
};
</script>

<style lang="less" scoped>
.timed-task-content {
  padding: 20px;
}
.timed-task-top {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.blue {
  color: blue;
}
.green {
  color: green;
}
.yellow {
  color: yellow;
}
.red {
  color: red;
}
</style>
