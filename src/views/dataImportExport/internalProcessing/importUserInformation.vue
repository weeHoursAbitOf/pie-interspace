<template>
  <!-- 数据导入管理-->
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <!-- <div class="tb-header-item">
              <span>导入数据名称</span>
              <Input
                v-model="exportFileName"
                placeholder="请输入导入数据名称"
                clearable
                class="input-style"
              />
            </div>-->
            <div class="tb-header-item">
              <span>时间范围</span>
              <DatePicker v-model="beginTime" type="date" placeholder="开始时间"></DatePicker>
              <span style="margin: 0 10px">至</span>
              <DatePicker v-model="endTime" type="date" placeholder="结束时间"></DatePicker>
            </div>
            <!-- <div class="tb-header-item">
              <span>任务类型</span>
              <Select v-model="fileType" class="product-type">
                <Option
                  v-for="item in fileTypeList"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.label }}
                  
                </Option>
              </Select>
            </div>-->
            <search-btn class="search-btn" @click="search"></search-btn>
          </div>
          <div class="tb-header-button">
            <batch-delete-btn class="right-btn-item" @click="batechDelete"></batch-delete-btn>
            <export-btn class="right-btn-item" @click="exportExcel()"></export-btn>
            <!-- <Upload action="//jsonplaceholder.typicode.com/posts/">
              <export-btn title="人工导入" class="right-btn-item"></export-btn>
            </Upload>-->
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
            max-height="500"
            @on-selection-change="multiSelect"
            :lookItem="lookItem"
            :lookIObject="lookData"
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
  </div>
</template>
<script>
import myTable from "@/components/table/my-table.vue";
import page from "@/components/page/page.vue";
export default {
  components: {
    myTable,
    page,
  },
  data() {
    return {
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      exportFileName: "", //文件名称
      fileType: "", //文件类型
      timeHorizon: "",
      list: [
        {
          type: "selection",
          width: 80,
          align: "center",
        },
        {
          title: "序号",
          width: 80,
          type: "index",
          align: "center",
        },
        {
          title: "导入数据名称",
          key: "jobDesc",
          align: "center",
        },
        {
          title: "导入类型",
          key: "dataType",
          align: "center",
        },
        {
          title: "导入时间",
          key: "createTime",
          align: "center",
          sortable: true,
        },
        {
          title: "导入状态",
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
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small",
                },
                style: {
                  marginRight: "15px",
                },
                on: {
                  click: () => {
                    this.lookOver(params.row);
                  },
                },
              },
              "查看"
            );
          },
        },
      ],
      data: [],
      // fileTypeList: [
      //   {
      //     value: "0",
      //     label: "文本",
      //   },
      //   {
      //     value: "1",
      //     label: "CVS",
      //   },
      // ],
      taskFileType: "",
      lookItem: [
        { title: "导入数据名称", key: "jobDesc" },
        { title: "导入类型	", key: "dataType" },
        { title: "导入时间", key: "createTime" },
        { title: "更新时间", key: "updateTime" },
      ],
      lookData: {},
      selectRow: [],
      beginTime: "",
      endTime: "",
    };
  },
  watch: {
    // 监听router穿过来的参数
    taskFileType(val) {
      // 请求数据列表接口
      // this.getSelOutPutFileMsg(val);
      this.queryStrategyHis(val);
    },
  },
  mounted() {
    // 获取router传来的参数
    this.taskFileType = this.$route.query.taskFileType;
  },
  methods: {
    // 获取数据列表
    getSelOutPutFileMsg(val) {
      let formData = new FormData();
      formData.append("strType", val);
      formData.append("beginTime", this.beginTime);
      formData.append("endTime", this.endTime);
      formData.append("page", this.pageNum);
      formData.append("size", this.pageSize);
      this.$api.exportService.selOutPutFileMsg(formData).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          this.data = res.data.data;
        }
      });
    },
    queryStrategyHis(val) {
      let params = {
        strategyType: "import",
        dataType: val,
        startTime: this.beginTime,
        endTime: this.endTime,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api.strategyService.queryStrategyHis(params).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          this.data = res.data.strategyHisInfoList;
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },

    // 搜索
    search() {
      // this.getSelOutPutFileMsg(this.taskFileType);
      this.queryStrategyHis(this.taskFileType);
    },
    // 导入按钮方法
    exportExcel() {
      if (this.selectRow.length == 0) {
        this.$Notice.warning({
          title: "导入数据不能为空",
          top: 50,
          duration: 5,
        });
        return;
      }
      let exportData = this.selectRow.map((item) => {
        // let userNameStr = "";
        // for (let userNames of item.userName) {
        //   userNameStr += userNames.username + ";";
        // }
        // item.userName = userNameStr;
        return item;
      });
      this.$refs.selection.$refs.tables.exportCsv({
        filename: "群组数据导入",
        separator: ",",
        columns: this.list.filter((col, index) => index > 0 && index < 7),
        data: exportData,
      });
    },
    // //分页-选择页数
    changePage(e) {
      this.pageNum = e;
      // this.getSelOutPutFileMsg();
      this.queryStrategyHis(this.taskFileType);
    },
    //分页-改变pageSize
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize;
      // this.getSelOutPutFileMsg();
      this.queryStrategyHis(this.taskFileType);
    },
    //多选
    multiSelect(selection) {
      this.selectRow = selection;
    },
    //查看详情
    lookOver(item) {
      this.lookData = item;
      this.$refs.selection.lookOver();
    },
    // 批量删除
    batechDelete() {
      if (this.selectRow.length == 0) {
        this.$Notice.warning({
          title: "导入数据不能为空",
          top: 50,
          duration: 5,
        });
        return;
      }
      let params = {
        ids: this.selectRow.map((item) => item.id).join(),
      };
      this.$api.strategyService.batchDeleteStrategyHis(params).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.pageNum = 1;
          // this.getSelOutPutFileMsg(this.taskFileType);
          this.queryStrategyHis(this.taskFileType);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.pie-tb-header {
  display: flex;
  justify-content: space-between;
  padding: 0 @table-padding @table-padding @table-padding;
  font-size: @lable-font-size;
  flex-wrap: wrap;

  .tb-header-content {
    display: flex;
    justify-content: space-between;
    padding-bottom: @table-padding;
  }
  .tb-header-button {
    display: flex;
    //justify-content: flex-end;
    margin-left: 78.5%;
    .right-btn-item {
      margin-right: @table-btn-space;
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
  padding: @table-top-space @table-padding @table-padding @table-padding;
  max-width: 100%;

  .tb-style {
    max-width: 100%;
  }
}
</style>