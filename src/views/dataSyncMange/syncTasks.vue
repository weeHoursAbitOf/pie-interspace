<template>
  <div class="pie-tb-content">
    <pie-card>
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <div class="tb-header-item">
                <span>时间范围</span>
                <DatePicker v-model="beginTime" type="date" placeholder="开始时间"></DatePicker>
                <span style="margin: 0 10px">至</span>
                <DatePicker v-model="endTime" type="date" placeholder="结束时间"></DatePicker>
              </div>
            </div>
            <search-btn class="search-btn" @click="search"></search-btn>
          </div>
          <div class="tb-header-button">
            <batch-delete-btn class="right-btn-item" @click="batchDelete"></batch-delete-btn>
            <export-btn class="right-btn-item" @click="exportExcel()"></export-btn>
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
            :data="data"
            disabled-hover
            :lookBtn="true"
            :delBtn="true"
            max-height="500"
            @confirmDelete="deleted"
            @on-selection-change="multiSelect"
            :lookItem="lookItem"
            :lookIObject="lookData"
            @look="look"
          ></my-table>
        </div>
      </div>
      <!-- 分页 -->
      <div slot="footer">
        <div class="pie-tb-footer">
          <page :total="pageTotal" :pageSize="pageSize" :current="pageNum"></page>
        </div>
      </div>
    </pie-card>
  </div>
</template>
<script>
import pieCard from "@/components/pie-card/pie-card.vue";
import batchDeleteBtn from "@/components/button/batch-delete-btn.vue";
import exportBtn from "@/components/button/export-btn.vue";
import searchBtn from "@/components/button/search-btn.vue";
import page from "@/components/page/page.vue";
import myTable from "@/components/table/my-table.vue";
export default {
  components: {
    pieCard,
    batchDeleteBtn,
    exportBtn,
    searchBtn,
    page,
    myTable,
  },
  data() {
    return {
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      beginTime: "",
      endTime: "",
      selectRow: [],
      list: [
        {
          type: "selection",
          width: 80,
          align: "center",
        },
        {
          title: "序号",
          width: 90,
          key: "number",
          align: "center",
        },
        {
          title: "同步数据名称",
          key: "jobDesc",
          align: "center",
        },
        {
          title: "发送方",
          key: "sender",
          align: "center",
        },
        {
          title: "接收方",
          key: "receiver",
          align: "center",
        },
        {
          title: "同步时间",
          key: "createTime",
          align: "center",
          sortable: true,
        },
        {
          title: "同步状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              params.row.status == 0
                ? "执行中"
                : params.row.status == 1
                  ? "成功"
                  : "失败"
            );
          },
        },
        {
          title: "操作",
          key: "operation",
          slot: "action",
          align: "center",
        },
      ],
      data: [],
      dataType: "",
      confirmDelete: false,
      lookItem: [
        //查看表单
        { title: "同步数据名称", key: "name" },
        { title: "发送方", key: "sender" },
        { title: "接收方", key: "receiver" },
        { title: "同步时间", key: "createTime" },
        { title: "同步状态", key: "status" },
      ],
      lookData: {},
    };
  },
  mounted() {
    this.dataType = this.$route.query.dataType;
    this.queryStrategyHis(this.dataType);
  },
  methods: {
    look(row) {
      this.lookData = row;
      this.$refs.selection.lookOver();
    },
    // 批量删除
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
    deleted(row) {
      let params = {
        ids: row.id,
      };
      this.$api.strategyService.batchDeleteStrategyHis(params).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.queryStrategyHis(this.dataType);
        }
      });
    },
    multiSelect(selection) {
      this.selectRow = selection;
    },
    // 批量删除
    confirm() {
      //获取到所有选择的列表
      let params = {
        ids: this.selectRow.map((item) => item.id).join(),
      };
      this.$api.strategyService
        .batchDeleteStrategyHis(params.join(","))
        .then((res) => {
          if (res.success == true) {
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.queryStrategyHis(this.dataType);
            this.cancel();
          } else {
            this.$Notice.error({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.confirmDelete = false;
          }
        });
    },
    // 取消批量删除
    cancel() {
      this.confirmDelete = false;
    },
    queryStrategyHis(val) {
      let params = {
        dataType: val,
        startTime: this.beginTime,
        endTime: this.endTime,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api.strategyService.queryStrategyHis(params).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          let data = res.data.strategyHisInfoList;
          for (let i = 0; i < data.length; i++) {
            data[i].number = i + 1;
          }
          this.data = data;
        }
      });
    },
    search() {
      this.queryStrategyHis(this.dataType);
    },
    exportExcel() {
      if (this.selectRow.length == 0) {
        this.$Notice.warning({
          title: "选择数据不能为空",
          top: 50,
          duration: 5,
        });
        return;
      }
      let exportData = this.selectRow.map((item) => {
        return item;
      });
      this.$refs.selection.$refs.tables.exportCsv({
        filename: "数据导出",
        separator: ",",
        columns: this.list.filter((col, index) => index > 0 && index < 7),
        data: exportData,
      });
      // this.$refs.selection.$refs.tables.exportCsv({
      //   filename: "数据导出统计",
      // });
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
    padding-bottom: @table-padding;
  }
  .tb-header-button {
    display: flex;

    .right-btn-item {
      margin-left: @table-btn-space;
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

    span {
      margin-right: @table-lable-space;
    }
    .product-type {
      height: 36px;
      width: 315px;
    }
    .input-style {
      width: 315px;
    }
  }
}

.pie-tb-iscontent {
  max-width: 100%;

  .tb-style {
    max-width: 100%;
  }
}
</style>