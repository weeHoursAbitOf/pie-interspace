<template>
  <!-- 模板1 -->
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>数据来源</span>
              <Select v-model="dataSource" @on-change="onSourceChange">
                <Option
                  v-for="item in dataSourceList"
                  :value="item.label"
                  :key="item.value"
                >{{ item.label }}</Option>
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
            <div class="tb-header-item">
              <span>发布模板</span>
              <Select class="product-type" @on-change="onPublishChange" v-model="publishType">
                <Option
                  v-for="item in publishTypeList"
                  :value="item.id"
                  :key="item.id"
                >{{ item.name }}</Option>
              </Select>
            </div>
            <search-btn class="search-btn" @click="searchClick"></search-btn>
          </div>
          <div class="tb-header-button">
            <export-btn class="right-btn-item" @click="exportExcel()"></export-btn>
            <batch-delete-btn class="right-btn-item" @click="batechDelete"></batch-delete-btn>
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
            @confirmDelete="deleted"
            @download="download"
            @on-selection-change="multiSelect"
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
    <my-dialog @confirm="confirm" @cancel="cancel" :isModal="isDeleteShow"></my-dialog>
  </div>
</template>
<script>
import page from "@/components/page/page.vue";
import MyTable from "../../components/table/my-table.vue";
export default {
  components: {
    page,
    MyTable,
  },

  data() {
    return {
      list: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "序号",
          width: 70,
          type: "index",
          align: "center",
        },
        {
          title: "数据来源",
          key: "source",
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
          title: "产品文件编号",
          key: "storePath",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              params.row.storePath.substring(
                params.row.storePath.lastIndexOf("/") + 1
              )
            );
          },
        },
        {
          title: "发布模板",
          key: "template",
          align: "center",
          filters: [
            {
              label: "模板1",
              value: 1,
            },
            {
              label: "模板2",
              value: 2,
            },
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.template == "模板1";
            }
            if (value === 2) {
              return row.template == "模板2";
            }
          },
        },
        {
          title: "生成时间",
          key: "createtime",
          align: "center",
          sortable: true,
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
        },
      ],
      data: [
        // {
        //   id: 1,
        //   storePath: "D:\\text1.dsad\\sdsv\\sdfdsf.csv",
        //   productType: "ELE",
        //   status: 1,
        //   createtime: "2021-05-04",
        //   audittime: "2021-20-12",
        //   publishtime: "2021-01-10",
        //   creator: "piesat",
        //   auditor: "piesat",
        //   version: "1",
        //   source: "定时",
        //   template: "模板1",
        //   name: "dsa.csv",
        // },
        // {
        //   id: 2,
        //   storePath: "D:\\text1.dsad\\sdsv\\sdfdsf.html",
        //   productType: "TLE",
        //   status: 1,
        //   createtime: "2021-05-04",
        //   audittime: "2021-20-12",
        //   publishtime: "2021-01-10",
        //   creator: "piesat",
        //   auditor: "piesat",
        //   version: "1",
        //   source: "立即",
        //   template: "模板1",
        //   name: "dsa.csv",
        // },
        // {
        //   id: 3,
        //   storePath: "D:\\text1.dsad\\sdsv\\sdfdsf.txt",
        //   productType: "ELE",
        //   status: 1,
        //   createtime: "2021-05-04",
        //   audittime: "2021-20-12",
        //   publishtime: "2021-01-10",
        //   creator: "piesat",
        //   auditor: "piesat",
        //   version: "1",
        //   source: "定时",
        //   template: "模板1",
        //   name: "dsa.csv",
        // },
        // {
        //   id: 4,
        //   storePath: "D:\\text1.dsad\\sdsv\\sdfdsf.csv",
        //   productType: "TLE",
        //   status: 1,
        //   createtime: "2021-05-04",
        //   audittime: "2021-20-12",
        //   publishtime: "2021-01-10",
        //   creator: "piesat",
        //   auditor: "piesat",
        //   version: "1",
        //   source: "定时",
        //   template: "模板2",
        //   name: "dsa.csv",
        // },
        // {
        //   id: 5,
        //   storePath: "D:\\text1.dsad\\sdsv\\sdfdsf.html",
        //   productType: "ELE",
        //   status: 1,
        //   createtime: "2021-05-04",
        //   audittime: "2021-20-12",
        //   publishtime: "2021-01-10",
        //   creator: "piesat",
        //   auditor: "piesat",
        //   version: "1",
        //   source: "立即",
        //   template: "模板1",
        //   name: "dsa.csv",
        // },
        // {
        //   id: 6,
        //   storePath: "D:\\text1.dsad\\sdsv\\sdfdsf.txt",
        //   productType: "ELE",
        //   status: 1,
        //   createtime: "2021-05-04",
        //   audittime: "2021-20-12",
        //   publishtime: "2021-01-10",
        //   creator: "piesat",
        //   auditor: "piesat",
        //   version: "1",
        //   source: "定时",
        //   template: "模板1",
        //   name: "dsa.csv",
        // },
        // {
        //   id: 7,
        //   storePath: "D:\\text1.dsad\\sdsv\\sdfdsf.csv",
        //   productType: "ELE",
        //   status: 1,
        //   createtime: "2021-05-04",
        //   audittime: "2021-20-12",
        //   publishtime: "2021-01-10",
        //   creator: "piesat",
        //   auditor: "piesat",
        //   version: "1",
        //   source: "定时",
        //   template: "模板1",
        //   name: "dsa.csv",
        // },
        // {
        //   id: 8,
        //   storePath: "D:\\text1.dsad\\sdsv\\sdfdsf.txt",
        //   productType: "ELE",
        //   status: 1,
        //   createtime: "2021-05-04",
        //   audittime: "2021-20-12",
        //   publishtime: "2021-01-10",
        //   creator: "piesat",
        //   auditor: "piesat",
        //   version: "1",
        //   source: "定时",
        //   template: "模板1",
        //   name: "dsa.csv",
        // },
        // {
        //   id: 9,
        //   storePath: "D:\\text1.dsad\\sdsv\\sdfdsf.html",
        //   productType: "ELE",
        //   status: 1,
        //   createtime: "2021-05-04",
        //   audittime: "2021-20-12",
        //   publishtime: "2021-01-10",
        //   creator: "piesat",
        //   auditor: "piesat",
        //   version: "1",
        //   source: "立即",
        //   template: "模板2",
        //   name: "dsa.csv",
        // },
        // {
        //   id: 10,
        //   storePath: "D:\\text1.dsad\\sdsv\\sdfdsf.csv",
        //   productType: "ELE",
        //   status: 1,
        //   createtime: "2021-05-04",
        //   audittime: "2021-20-12",
        //   publishtime: "2021-01-10",
        //   creator: "piesat",
        //   auditor: "piesat",
        //   version: "1",
        //   source: "定时",
        //   template: "模板1",
        //   name: "dsa.csv",
        // },
        // {
        //   id: 11,
        //   storePath: "D:\\text1.dsad\\sdsv\\sdfdsf.txt",
        //   productType: "TLE",
        //   status: 1,
        //   createtime: "2021-05-04",
        //   audittime: "2021-20-12",
        //   publishtime: "2021-01-10",
        //   creator: "piesat",
        //   auditor: "piesat",
        //   version: "1",
        //   source: "定时",
        //   template: "模板2",
        //   name: "dsa.csv",
        // },
        // {
        //   id: 12,
        //   storePath: "D:\\text1.dsad\\sdsv\\sdfdsf.csv",
        //   productType: "TLE",
        //   status: 1,
        //   createtime: "2021-05-04",
        //   audittime: "2021-20-12",
        //   publishtime: "2021-01-10",
        //   creator: "piesat",
        //   auditor: "piesat",
        //   version: "1",
        //   source: "立即",
        //   template: "模板1",
        //   name: "dsa.csv",
        // },
        // {
        //   id: 13,
        //   storePath: "D:\\text1.dsad\\sdsv\\sdfdsf.html",
        //   productType: "TLE",
        //   status: 1,
        //   createtime: "2021-05-04",
        //   audittime: "2021-20-12",
        //   publishtime: "2021-01-10",
        //   creator: "piesat",
        //   auditor: "piesat",
        //   version: "1",
        //   source: "定时",
        //   template: "模板2",
        //   name: "dsa.csv",
        // },
        // {
        //   id: 14,
        //   storePath: "D:\\text1.dsad\\sdsv\\sdfdsf.csv",
        //   productType: "TLE",
        //   status: 1,
        //   createtime: "2020-10-10",
        //   audittime: "2020-10-10",
        //   publishtime: "2020-10-10",
        //   creator: "piesat",
        //   auditor: "piesat",
        //   version: "1",
        //   source: "立即",
        //   template: "模板1",
        //   name: "dsa.csv",
        // },
      ],
      lookData: {},
      lookItem: [
        //查看表单
        { title: "数据来源", key: "source" },
        { title: "产品编号", key: "storePath" },
        { title: "产品类型", key: "productType" },
        { title: "生成时间", key: "createtime" },
      ],
      publishType: "", //发布模板
      publishTypeList: [],
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
      productType: "SSR", //用于请求产品类型（TLE、ELE、SSR、危险交汇、陨落、突发）
      templateType: "3", //templateType:(1)轨道模板(2)编目(3)危险交汇(4)陨落(5)解体(6)突发
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      startTime: "", //开始时间
      endTime: "", //结束时间
      selectRow: [], //多选数据
      isDeleteShow: false, //弹出框
    };
  },
  created() {
    this.getList();
    this.getTemplatesByTemplateType();
  },
  methods: {
    // 用于数据来源赋值
    onSourceChange(val) {
      this.dataSource = val;
    },
    // 用于发布模板赋值
    onPublishChange(val) {
      this.publishType = val;
    },
    // 获取发布模板列表
    getTemplatesByTemplateType() {
      let params = {
        type: 1,
        templateTypes: this.templateType,
      };
      this.$api.rendezvous.getTemplatesByTemplateTypes(params).then((res) => {
        if (res.success == true) {
          this.publishTypeList = res.data;
        }
      });
    },
    // 获取数据列表
    getList() {
      // 用于请求参数
      let params = {
        productTypes: this.productType,
        source: this.dataSource, //定时立即
        beginTime: this.startTime, //开始时间
        endTime: this.endTime, //结束时间
        templateId: this.publishType, //模板
        pageIndex: this.pageNum,
        pageSize: this.pageSize,
      };
      // 用于请求数据列表接口
      this.$api.templateManage.getList(params).then((res) => {
        if (res.success == true) {
          // 请求数据列表的数据赋值
          this.pageTotal = res.data.total;
          this.data = res.data.rows;
          this.setResetData();
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
      let exportData = this.selectRow.map((item) => {
        // let userNameStr = "";
        // for (let userNames of item.userName) {
        //   userNameStr += userNames.username + ";";
        // }
        // item.userName = userNameStr;
        return item;
      });
      this.$refs.selection.$refs.tables.exportCsv({
        filename: "群组数据导出",
        separator: ",",
        columns: this.list.filter((col, index) => index > 0 && index < 7),
        data: exportData,
      });
    },
    // 搜索
    searchClick() {
      this.getList();
    },
    // 开始日期
    onBeginChange(date) {
      this.startTime = date;
    },
    // 结束日期
    onFinishChange(date) {
      this.endTime = date;
    },
    //查看
    look(row) {
      let storePath = row.storePath.substring(
        row.storePath.lastIndexOf("/") + 1
      );
      let obj = {
        source: row.source,
        storePath: storePath,
        productType: row.productType,
        createtime: row.createtime,
      };
      this.lookData = obj;
      this.$refs.selection.lookOver();
    },
    // 删除
    deleted(row) {
      let params = {
        ids: row.id,
      };
      // 用于删除接口请求
      this.$api.templateManage.batchDelete(params).then((res) => {
        if (res.success == true) {
          this.pageNum = 1;
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.getList();
        }
      });
    },
    // 用于多项数据导出或删除
    multiSelect(selection) {
      this.selectRow = selection;
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
    // 用于确定删除
    confirm() {
      let params = {
        ids: this.selectRow.map((item) => item.id).join(),
      };
      // 用于删除接口请求
      this.$api.templateManage.batchDelete(params).then((res) => {
        if (res.success == true) {
          this.pageNum = 1;
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.getList();
          this.isDeleteShow = false;
        }
      });
    },
    // 用于取消删除
    cancel() {
      this.isDeleteShow = false;
    },
    // 下载
    download(row) {
      let formData = new FormData();
      formData.append("storePath", row.storePath);
      // 用于下载文件接口
      this.$api.templateManage.download(formData).then((res) => {
        // 用于下载文件 （下载数据类型，数据）
        this.$utils.fileBlobDown(row.storePath, res);
      });
    },
    // 用于重置参数
    setResetData() {
      this.startTime = ""; //开始时间
      this.endTime = ""; //结束时间
      this.dataSource = ""; //数据来源
    },
    // 页数
    pageChange(num) {
      this.pageNum = num;
      this.getList();
    },
    // 条数
    pageSizeChange(size) {
      this.pageSize = size;
      this.getList();
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

.pie-tb-iscontent {
  max-width: 100%;

  .tb-style {
    max-width: 100%;
  }
}

.test {
  color: aquamarine;
  font-size: 100px;
}
</style>