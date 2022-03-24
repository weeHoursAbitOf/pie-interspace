<template>
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>用户名称</span>
              <Input v-model="userName" placeholder="请输入用户名称" class="input-style" clearable />
            </div>
            <div class="tb-header-item">
              <span>操作时间</span>
              <DatePicker
                v-model="startTime"
                type="date"
                placeholder="开始时间"
                class="start-time"
                @on-change="startTimeSelect"
              ></DatePicker>
              <span style="margin: 0 10px">至</span>
              <DatePicker
                type="date"
                placeholder="结束时间"
                v-model="endTime"
                @on-change="endTimeSelect"
              ></DatePicker>
            </div>
            <div class="tb-header-item">
              <span>日志类型</span>
              <Select clearable v-model="logType" class="input-style">
                <Option
                  v-for="item in logTypeList"
                  :value="item.name"
                  :key="item.value"
                >{{ item.name }}</Option>
              </Select>
            </div>
          </div>
          <div class="tb-header-button">
            <div class="tb-header-item operate-select">
              <span>操作类型</span>
              <Select clearable v-model="operateType" class="input-style">
                <Option
                  v-for="item in operateTypeList"
                  :value="item.name"
                  :key="item.value"
                >{{ item.name }}</Option>
              </Select>
            </div>
            <search-btn class="button-item" @click="search"></search-btn>
            <export-btn class="button-item" @click="exportExcel()"></export-btn>
            <batch-delete-btn class="button-item" @click="batchDelete"></batch-delete-btn>
            <Button class="log-statistic button-item">日志统计</Button>
          </div>
        </div>
      </div>
      <!-- 表体 -->
      <div slot="iscontent">
        <div class="pie-tb-iscontent">
          <my-table
            border
            ref="selection"
            :columns="list"
            max-height="500"
            disabled-hover
            :data="data"
            :lookItem="lookItem"
            :lookIObject="lookData"
            @on-selection-change="multiSelect"
            :lookBtn="true"
            @look="look"
            :delBtn="true"
            @confirmDelete="getDeleteLogs"
          ></my-table>
        </div>
      </div>
      <!-- 分页 -->
      <div slot="footer">
        <div class="pie-tb-footer">
          <page
            :total="pageTotal"
            :pageSize="pageSize"
            :current="pageNum"
            @pageChange="changePage"
            @pageSizeChange="handlePageSizeChange"
          ></page>
        </div>
      </div>
    </pie-card>
    <div>
      <table-details></table-details>
    </div>
    <!-- 批量删除弹出框 -->
    <my-dialog @confirm="confirm" @cancel="cancel" :isModal="confirmDelete"></my-dialog>
  </div>
</template>
<script>
import pieCard from "@/components/pie-card/pie-card.vue";
import batchDeleteBtn from "@/components/button/batch-delete-btn.vue";
import exportBtn from "@/components/button/export-btn.vue";
import searchBtn from "@/components/button/search-btn.vue";
import page from "@/components/page/page.vue";
import batchJoinBtn from "@/components/button/batch-join-btn.vue";
import tableDetails from "@/components/table/table-details.vue";
import myTable from "@/components/table/my-table.vue";

export default {
  components: {
    pieCard,
    batchDeleteBtn,
    exportBtn,
    searchBtn,
    page,
    batchJoinBtn,
    tableDetails,
    myTable,
  },
  data() {
    return {
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      operateType: "",
      timeHorizon: "",
      userName: "",
      lookItem: [
        { title: "用户名称", key: "userName" },
        { title: "操作类型", key: "operation" },
        { title: "用户IP", key: "ip" },
        { title: "操作时间", key: "createTime" },
        { title: "日志描述", key: "describe" },
      ],
      lookData: {},
      list: [
        {
          type: "selection",
          width: 52,
          align: "center",
        },
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 70,
        },
        {
          title: "用户名称",
          key: "userName",
          ellipsis: true,
          align: "center",
        },
        {
          title: "操作类型",
          key: "operation",
          ellipsis: true,
          align: "center",
        },
        {
          title: "用户IP",
          key: "ip",
          ellipsis: true,
          align: "center",
        },
        {
          title: "操作时间",
          key: "createTime",
          ellipsis: true,
          align: "center",
          sortable: true,
        },
        {
          title: "日志描述",
          key: "describe",
          align: "center",
          ellipsis: true,
        },
        {
          title: "操作",
          key: "operation",
          slot: "action",
          align: "center",
          // render: (h, params) => {
          //   return h("div", [
          //     h(
          //       "Button",
          //       {
          //         props: {
          //           type: "success",
          //           size: "small",
          //         },
          //         style: {
          //           marginRight: "10px",
          //         },
          //         on: {
          //           click: () => {
          //             this.lookOver(params.row);
          //           },
          //         },
          //       },
          //       "查看"
          //     ),
          //     h(
          //       "Button",
          //       {
          //         props: { type: "warning", size: "small" },
          //       },
          //       [
          //         h(
          //           "Poptip",
          //           {
          //             props: {
          //               confirm: true,
          //               transfer: true,
          //               placement: "left-end",
          //               title: "确定要删除吗！",
          //               type: "error",
          //               size: "small",
          //               width: "300",
          //             },
          //             on: {
          //               "on-ok": () => {
          //                 this.getDeleteLogs(params.row.id);
          //               },
          //               "on-cancel": function () {},
          //             },
          //           },
          //           "删除"
          //         ),
          //       ]
          //     ),
          //   ]);
          // },
        },
      ],
      data: [
        // {
        //   id: 1,
        //   userName: "admi21",
        //   operation: "删除",
        //   ip: "120.21",
        //   createTime: "2021-06-14",
        //   describe: "123",
        //   method: "select",
        //   params: "get",
        // },
        // {
        //   id: 2,
        //   userName: "admi21",
        //   operation: "删除",
        //   ip: "120.21",
        //   createTime: "2021-06-14",
        //   describe: "123",
        //   method: "select",
        //   params: "get",
        // },
        // {
        //   id: 3,
        //   userName: "admi21",
        //   operation: "删除",
        //   ip: "120.21",
        //   createTime: "2021-06-14",
        //   describe: "123",
        //   method: "select",
        //   params: "get",
        // },
      ],
      selectRow: [], //选中的行
      startTime: "",
      endTime: "",
      operateTypeList: [
        {
          value: "0",
          name: "登录",
        },
        {
          value: "1",
          name: "注册",
        },
        {
          value: "2",
          name: "修改",
        },
        {
          value: "2",
          name: "删除",
        },
      ],
      confirmDelete: false,
      logType: "",
      logTypeList: [
        {
          value: "0",
          name: "用户端",
        },
        {
          value: "1",
          name: "值班端",
        },
      ],
    };
  },
  created() {
    this.getQueryLog();
  },
  methods: {
    // 查看
    look(row) {
      this.lookOver(row);
    },
    // 删除
    deleted(row) {
      console.log(row);
    },
    // 用于获取数据列表
    getQueryLog() {
      let formData = new FormData();
      formData.append("userName", this.userName);
      formData.append("startTime", this.startTime);
      formData.append("endTime", this.endTime);
      formData.append("type", this.operateType);
      formData.append("size", this.pageSize);
      formData.append("page", this.pageNum);
      // 请求数据列表接口
      this.$api.userManage.queryLog(formData).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          this.data = res.data.rows;
        }
      });
    },
    // 导出按钮方法
    exportExcel() {
      if (this.selectRow.length == 0) {
        this.$Notice.warning({
          title: "导出数据不能为空",
          top: 50,
          duration: 5,
        });
        return;
      }
      this.selectRow.map((item) => {
        return item;
      });
      this.$refs.selection.$refs.tables.exportCsv({
        filename: "群组数据导出",
        separator: ",",
        columns: this.list.filter((col, index) => index > 0 && index < 7),
        data: this.selectRow,
      });
    },
    // 搜索
    search() {
      this.getQueryLog();
    },
    // 开始时间
    startTimeSelect(date) {
      this.startTime = date;
    },
    // 结束时间
    endTimeSelect(date) {
      this.endTime = date;
    },
    //多选
    multiSelect(selection) {
      this.selectRow = selection;
    },
    //表单查看
    lookOver(item) {
      this.lookData = item;
      this.$refs.selection.lookOver();
    },
    // //分页-选择页数
    changePage(e) {
      this.pageNum = e;
      this.getQueryLog();
    },
    //分页-改变pageSize
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getQueryLog();
    },
    // 删除
    getDeleteLogs(item) {
      let params = {
        ids: item.id,
      };
      this.$api.userManage.deleteLogs(params).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.getQueryLog();
        }
      });
    },
    // 批量删除、
    batchDelete() {
      if (this.selectRow.length == 0) {
        this.$Notice.warning({
          title: "导出数据不能为空",
          top: 50,
          duration: 5,
        });
        return;
      }
      this.confirmDelete = true;
    },
    // 确定批量删除、
    confirm() {
      let params = {
        ids: this.selectRow.map((item) => item.id).join(),
      };
      this.$api.userManage.deleteLogs(params).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.pageNum = 1;
          this.getQueryLog();
          this.cancel();
        }
      });
    },
    // 取消删除
    cancel() {
      this.confirmDelete = false;
    },
  },
};
</script>
<style lang="less" scoped>
.pie-tb-header {
  display: flex;
  justify-content: flex-end;
  font-size: @lable-font-size;
  flex-wrap: wrap;

  .tb-header-content {
    display: flex;
    justify-content: space-between;
    margin-bottom: @table-input-space;

    .search-btn {
      margin-left: @search-lable-space;
    }
  }
  .tb-header-item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-right: 40px;
    color: @lable-font-color;

    .input-style {
      margin-left: @table-lable-space;
      width: 300px;
    }

    .start-time {
      margin-left: @table-lable-space;
    }
  }
  .tb-header-button {
    position: relative;
    display: flex;
    .button-item {
      margin-left: @table-btn-space;
    }
    .operate-select {
      position: absolute;
      top: 0;
      right: 1020px;
    }
  }
}

.pie-tb-iscontent {
  max-width: 100%;

  .tb-style {
    max-width: 100%;
  }
}

.log-statistic {
  border-width: 0px;
  width: 96px;
  height: 36px;
  font-style: normal;
  color: #ffffff;
  font-size: @btn-font-size;
  background-color: @btn-bg-color;
  cursor: pointer;
}
</style>