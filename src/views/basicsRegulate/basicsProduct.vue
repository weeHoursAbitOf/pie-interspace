<template>
  <!-- 编目产品 -->
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>数据来源</span>
              <Select v-model="dataSource">
                <Option
                  v-for="item in dataSourceList"
                  :value="item.label"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <div class="tb-header-item">
              <span>时间范围</span>
              <DatePicker
                v-model="startTime"
                @on-change="onBeginChange"
                type="date"
                placeholder="开始时间"
              ></DatePicker>
              <span style="margin: 0 10px">至</span>
              <DatePicker
                v-model="endTime"
                @on-change="onFinishChange"
                type="date"
                placeholder="结束时间"
              ></DatePicker>
            </div>
            <search-btn class="search-btn" @click="searchClick"></search-btn>
            <export-btn class="search-btn" @click="exportExcel()"></export-btn>
            <batch-delete-btn
              class="search-btn"
              @click="batechDelete"
            ></batch-delete-btn>
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
            :lookItem="lookItem"
            :lookIObject="lookData"
            disabled-hover
            max-height="500"
            :downloadBtn="true"
            :lookBtn="true"
            :delBtn="true"
            @look="look"
            @download="download"
            @on-selection-change="multiSelect"
            @confirmDelete="deleted"
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
            @pageChange="pageChange"
            @pageSizeChange="pageSizeChange"
          ></page>
        </div>
      </div>
    </pie-card>
    <my-dialog
      @confirm="confirm"
      @cancel="cancel"
      :isModal="isDeleteShow"
    ></my-dialog>
    <my-modal
      title="下载格式"
      width="25"
      height="30"
      v-model="isShowDownload"
      @cancel="cancel"
      :resetBtn="false"
      :close="false"
      @confirm="downloadConfirm"
    >
      <div slot="operateItem">
        <ul class="download-content">
          <li>
            <span>
              <RadioGroup v-model="FormatType" size="large">
                <Radio label="txt"></Radio>
                <Radio label="csv"></Radio>
                <Radio label="xml" v-show="productId == 0"></Radio>
                <Radio label="html" v-show="productId != 0"></Radio>
              </RadioGroup>
            </span>
          </li>
        </ul>
      </div>
    </my-modal>
  </div>
</template>
<script>
import myModal from "@/components/modals/modal.vue";
import myTable from "@/components/table/my-table.vue";
import page from "@/components/page/page.vue";
export default {
  components: {
    page,
    myTable,
    myModal,
  },
  data() {
    return {
      dataSource: "", //数据来源 定时立即
      dataSourceList: [
        {
          value: "0",
          label: "定时",
        },
        {
          value: "1",
          label: "立即",
        },
      ],
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      startTime: "", //开始时间
      endTime: "", //结束时间
      list: [
        {
          type: "selection",
          width: 100,
          align: "center",
        },
        {
          title: "序号",
          width: 150,
          type: "index",
          align: "center",
        },
        {
          title: "产品类型",
          key: "productType",
          align: "center",
        },
        {
          title: "数据来源",
          key: "source",
          width: 250,
          align: "center",
          ellipsis: true,
          filters: [
            {
              label: "定时",
              value: 1,
            },
            {
              label: "立即",
              value: 2,
            },
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.source == "定时";
            } else if (value === 2) {
              return row.source == "立即";
            }
          },
        },
        {
          title: "开始时间",
          key: "beginTime",
          align: "center",
        },
        {
          title: "结束时间",
          key: "endTime",
          align: "center",
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
        },
      ],
      data: [
        {
          id: 0,
          productType: "TLE",
          creator: "piesat",
          source: "立即",
          productId: "1",
          beginTime: "2021-02-01 00:00:00",
          endTime: "2021-02-01 00:00:00",
        },
        {
          id: 1,
          productType: "ELE",
          creator: "piesat",
          source: "定时",
          productId: "2",
          beginTime: "2021-02-01 00:00:00",
          endTime: "2021-02-01 00:00:00",
        },
      ],
      lookData: {},
      lookItem: [
        //查看表单
        { title: "产品类型", key: "productType" },
        { title: "数据来源", key: "source" },
        { title: "开始时间", key: "beginTime" },
        { title: "结束时间", key: "endTime" },
      ],
      selectRow: [], //多选数据
      isShowDownload: false,
      isDeleteShow: false,
      downloadItem: {},
      FormatType: "txt", //格式类型
      productId: 0,
    };
  },
  watch: {
    $route(to) {
      this.pageNum = 1;
      this.productId = to.query.productId;
      this.getList();
    },
  },
  created() {
    this.productId = this.$route.query.productId;
    this.getList();
  },
  methods: {
    // 获取数据列表
    getList() {
      // 用于请求参数
      let params = {
        productId: this.productId,
        source: this.dataSource,
        beginTime: this.startTime,
        endTime: this.endTime,
        pageIndex: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api.advanced.basicServiceList(params).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          this.data = res.data.rows;
          this.cancel();
        }
      });
    },
    // 页数
    pageChange(num) {
      this.pageNum = num;
      this.getList(this.$route.query.productId);
    },
    // 条数
    pageSizeChange(size) {
      this.pageSize = size;
      this.getList(this.$route.query.productId);
    },
    // 开始日期
    onBeginChange(date) {
      this.startTime = date;
    },
    // 结束日期
    onFinishChange(date) {
      this.endTime = date;
    },
    // 搜索
    searchClick() {
      this.getList(this.$route.query.productId);
    },
    //查看
    look(row) {
      this.lookData = row;
      this.$refs.selection.lookOver();
    },
    // 用于多项数据导出或删除
    multiSelect(selection) {
      this.selectRow = selection;
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
      let exportData = this.selectRow.map((item) => {
        return item;
      });
      this.$refs.selection.$refs.tables.exportCsv({
        filename: "群组数据导出",
        separator: ",",
        columns: this.list.filter((col, index) => index > 0 && index < 7),
        data: exportData,
      });
    },
    // 删除
    deleted(row) {
      let params = {
        ids: row.id,
      };
      this.$api.advanced.batchDelete(params).then((res) => {
        if (res.success == true) {
          this.getList(this.$route.query.productId);
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    // 批量删除
    batechDelete() {
      if (this.selectRow.length > 0) {
        this.isDeleteShow = true;
      } else {
        this.$Notice.warning({
          title: "批量删除数据不能为空",
          top: 50,
          duration: 5,
        });
        return;
      }
    },
    // 用于确定批量删除
    confirm() {
      let params = {
        ids: this.selectRow.map((item) => item.id).join(),
      };
      this.$api.advanced.batchDelete(params).then((res) => {
        if (res.success == true) {
          this.getList(this.$route.query.productId);
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    // 下载
    download(row) {
      this.downloadItem = row;
      this.isShowDownload = true;
    },
    // 确定下载
    downloadConfirm() {
      let params = {
        id: this.downloadItem.id,
        suffix: this.FormatType,
      };
      // // 用于下载文件接口
      this.$api.advanced.basicCommonDownload(params).then((res) => {
        // 用于下载文件 （下载数据类型，数据）
        this.$utils.fileBlobDown(
          `${this.downloadItem.productName}.${this.FormatType}`,
          res
        );
        this.cancel();
      });
    },
    // 用于取消按钮
    cancel() {
      this.isDeleteShow = false;
      this.isShowDownload = false;
      this.beginTime = "";
      this.endTime = "";
      this.dataSource = "";
      this.FormatType = "txt";
    },
  },
};
</script>
<style lang="less" scoped>
.pie-tb-header {
  display: flex;
  justify-content: space-between;
  font-size: @lable-font-size;
  flex-wrap: wrap;

  .tb-header-content {
    display: flex;
    justify-content: space-between;
  }
  .tb-header-button {
    display: flex;
    //justify-content: flex-end;
    margin-top: @table-button-space;
    margin-left: 85%;
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

    /deep/ .ivu-select-single .ivu-select-selection {
      height: 36px;
      width: 315px;
    }

    .product-type {
      height: 36px;
      width: 315px;
    }
    .input-style {
      margin-left: 20px;
      width: 315px;
    }
  }
}
.search-btn {
  margin: 0 10px;
}
.pie-tb-iscontent {
  max-width: 100%;
  .tb-style {
    max-width: 100%;
  }
}
.download-content {
  width: 100%;
  height: 100%;
  color: @lable-font-color;
  font-size: @lable-font-size;
  display: flex;
  align-content: center;
  justify-content: center;
  // flex-direction: column;
  li {
    display: flex;
    margin-top: 45px;
  }
}
/deep/.ivu-radio {
  font-size: 20px;
  margin: 0 10px 0 20px;
}
/deep/.ivu-radio-wrapper {
  margin: 0 15px;
  font-size: 20px;
}
</style>
