<template>
  <!-- 留言处理 -->
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>开始时间</span>
              <DatePicker
                :value="startTime"
                type="date"
                placeholder
                style="width: 200px"
                @on-change="onStartTimeChenge"
              ></DatePicker>
              <p style="padding: 0 10px">结束时间</p>
              <DatePicker
                :value="endTime"
                type="date"
                placeholder
                style="width: 200px"
                @on-change="onEndTimeChenge"
              ></DatePicker>
            </div>
            <div class="tb-header-item">
              <span>站内搜索</span>
              <Input v-model="keyword">
                <Select v-model="keywordType" slot="prepend">
                  <Option
                    v-for="(item, index) in selectList"
                    :value="item.label"
                    :key="index"
                  >{{ item.label }}</Option>
                </Select>
              </Input>
            </div>
          </div>
          <div class="btn-content">
            <search-btn class="search-btn" @click="search"></search-btn>
            <export-btn title="导出" @click="exportExcel()" class="right-btn-item"></export-btn>
            <batch-delete-btn class="right-btn-item" @click="batchDelete"></batch-delete-btn>
            <batch-join-btn title="加入" class="right-btn-item" @click="batchJoinBtnClick"></batch-join-btn>
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
            @on-selection-change="multiSelect"
            :lookItem="lookItem"
            :lookIObject="lookData"
            disabled-hover
            max-height="500"
            :lookBtn="true"
            :updateBtn="true"
            :delBtn="true"
            @update="update"
            @confirmDelete="deleted"
            @look="look"
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
    <!-- 详情 -->
    <my-modal
      width="50"
      :resetBtn="false"
      :title="title"
      :value="isShowModal"
      @cancel="cancelIsShowModal"
      @confirm="confirmIsShowModal"
    >
      <div slot="operateItem">
        <div class="add-content">
          <ul>
            <li>
              <p>标题</p>
              <span>
                <Input v-model="helpTitle" placeholder="标题内容" style="width: 250px" />
              </span>
            </li>
            <li>
              <p>内容</p>
              <span>
                <Input
                  v-model="helpContent"
                  class="add-content-datadescribe-import"
                  type="textarea"
                  :rows="7"
                  placeholder="内容"
                />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </my-modal>
    <!-- 批量删除弹出框 -->
    <my-dialog @confirm="confirm" @cancel="cancel" :isModal="confirmDelete"></my-dialog>
  </div>
</template>
<script>
import pieCard from "@/components/pie-card/pie-card.vue";
import batchDeleteBtn from "@/components/button/batch-delete-btn.vue";
import exportBtn from "@/components/button/export-btn.vue";
import searchBtn from "@/components/button/search-btn.vue";
import newBtn from "@/components/button/new-btn.vue";
//import deleteBtn from '@/components/button/delete-btn.vue';
import page from "@/components/page/page.vue";
import myTable from "@/components/table/my-table.vue";
import myModal from "@/components/modals/modal.vue";
export default {
  components: {
    pieCard,
    batchDeleteBtn,
    exportBtn,
    searchBtn,
    newBtn,
    page,
    myTable,
    myModal,
  },
  data() {
    return {
      isShowModal: false,
      confirmDelete: false,
      helpTitle: "", //标题
      helpContent: "", //内容
      title: "",
      // --------------------------------------
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      list: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center",
        },
        {
          title: "标题",
          width: 100,
          key: "title",
          align: "center",
        },
        {
          title: "发布时间",
          key: "createTime",
          width: 250,
          align: "center",
          ellipsis: true,
          sortable: true,
        },
        {
          title: "内容",
          key: "content",
          width: 350,
          align: "center",
          ellipsis: true,
        },
        {
          title: "操作",
          slot: "action",
          width: 250,
          align: "center",
        },
      ],
      updateType: 0,
      data: [],
      lookItem: [
        //查看表单
        { title: "标题", key: "title" },
        { title: "发布时间", key: "createTime" },
        { title: "内容", key: "content" },
      ],
      lookData: {},
      updateId: "",
      selectRow: [], //选中的行
      startTime: "", //开始时间
      endTime: "", //结束时间
      keywordType: "",
      keyword: "",
      selectList: [
        // {
        //   label: "标题",
        //   value: "title",
        // },
        // {
        //   label: "内容",
        //   value: "content",
        // },
      ],
    };
  },
  watch: {
    data(dataList) {
      // 用于监控table表格数据变化
      dataList.map((item) => {
        if (item.status == 0) {
          item.messagesStatus = "已回复";
        } else if (item.status == 1) {
          item.messagesStatus = "未回复";
        } else if (item.status == 2) {
          item.messagesStatus = "已删除";
        }
        if (item.type == 1) {
          item.type = "账户申请";
        } else if (item.type == 2) {
          item.type = "产品申请";
        } else if (item.type == 3) {
          item.type = "产品服务";
        } else if (item.type == 4) {
          item.type = "用户建议";
        }
      });
    },
  },
  created() {
    this.selfHelpList();
  },
  methods: {
    batchDelete() {
      if (this.selectRow.length == 0) {
        this.$Notice.warning({
          title: "选择数据不能为空",
          top: 50,
          duration: 5,
        });
        return;
      }
      this.confirmDelete = true;
    },
    // 批量删除
    confirm() {
      //获取到所有选择的列表
      let params = {
        ids: this.selectRow.map((item) => item.id).join(","),
      };
      this.$api.selfHelp.selfHelpBatchDelete(params).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.selfHelpList();
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
    // 获取留言列表
    selfHelpList() {
      let params = {
        type: 1, //自助咨询类型 1 账户申请
        keywordType: this.keywordType, //标题
        keyword: this.keyword, //标题类型
        startTime: this.startTime, //开始时间
        endTime: this.endTime, //结束时间
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api.selfHelp.selfHelpList(params).then((res) => {
        if (res.success == true) {
          this.total = res.data.total;
          this.data = res.data.msg;
        }
      });
    },
    // 搜索
    search() {
      this.selfHelpList();
    },
    // 开始时间
    onStartTimeChenge(time) {
      this.startTime = time;
    },
    // 结束时间
    onEndTimeChenge(time) {
      this.endTime = time;
    },
    // 页数
    changePage(num) {
      this.pageNum = num;
      this.selfHelpList();
    },
    // 条数
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.selfHelpList();
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
    //多选
    multiSelect(selection) {
      this.selectRow = selection;
    },
    // 删除
    deleted(row) {
      this.$api.selfHelp.selfHelpBatchDelete(row.id).then((res) => {
        if (res.success == true) {
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
    //  详情
    look(row) {
      this.lookData = row;
      this.$refs.selection.lookOver();
    },
    update(row) {
      this.title = "修改";
      this.isShowModal = true;
      this.updateId = row.id;
      this.updateType = 1;
    },
    confirmIsShowModal() {
      // 判断输入值是否为空
      if (!this.checkoutData()) {
        return false;
      }
      if (this.updateType == 0) {
        //新增
        let params = {
          content: this.helpContent,
          title: this.helpTitle,
        };
        this.$api.selfHelp.addSelfHelp(params).then((res) => {
          if (res.success == true) {
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.getResetParam();
            this.selfHelpList();
            this.isShowModal = false;
          }
        });
      } else if (this.updateType == 1) {
        //修改
        let params = {
          content: this.helpContent,
          title: this.helpTitle,
          id: this.updateId,
        };
        this.$api.selfHelp.updateSelfHelp(params).then((res) => {
          if (res.success == true) {
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.getResetParam();
            this.selfHelpList();
            this.isShowModal = false;
          }
        });
      }
    },
    batchJoinBtnClick() {
      this.title = "新增";
      this.isShowModal = true;
      this.updateType = 0;
      this.getResetParam();
    },
    getResetParam() {
      this.helpTitle = "";
      this.helpContent = "";
    },
    checkoutData() {
      if (!this.helpTitle) {
        this.$Notice.warning({
          title: "请输入标题！",
          top: 50,
          duration: 5,
        });
        return;
      } else if (!this.helpContent) {
        this.$Notice.warning({
          title: "请输入内容",
          top: 50,
          duration: 5,
        });
        return;
      } else {
        return true;
      }
    },
    cancelIsShowModal() {
      this.isShowModal = false;
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
  .btn-content {
    position: relative;
    bottom: -10px;
    right: -1170px;
    z-index: 1;
    display: flex;
    .right-btn-item {
      margin-left: @table-btn-space;
    }
  }
  .tb-header-content {
    display: flex;
    width: 100%;
    justify-content: inherit;
  }
  .tb-header-item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-right: @table-input-space;
    color: @lable-font-color;

    .search-btn {
      margin-left: @search-lable-space;
    }

    span {
      margin-right: @table-lable-space;
    }
  }
}

.pie-tb-iscontent {
  max-width: 100%;

  .tb-style {
    max-width: 100%;
  }
}
.modal-content-items {
  display: flex;
  justify-content: center;

  .tb-header-content {
    font-size: @lable-font-size;

    .tb-header-item {
      display: flex;
      align-items: center;
      white-space: nowrap;
      flex-direction: row;
      flex-wrap: nowrap;
      margin-right: @table-input-space;
      color: @lable-font-color;
      margin-bottom: 20px;

      .input-style {
        margin-left: @table-lable-space;
        // width: 300px;
      }
      span {
        width: 140px;
        text-align: right;
      }
      .item-title {
        margin-left: -130px;
      }
    }

    .tb-header-item:last-child {
      align-items: end;
    }
  }
}

.add-content,
.details-content,
.rule-content {
  font-size: 18px;
  color: #fff;
  padding: 20px;
  ul,
  ol {
    li {
      display: flex;
      align-items: center;
      padding: 10px 0;
      p {
        margin-right: 10px;
        width: 150px;
        text-align: right;
      }
      span {
        display: flex;
      }
    }
  }
}
.add-content {
  ul {
    display: flex;
    flex-direction: column;
    // flex-wrap: wrap;
    // justify-content: space-between;
    li {
      padding: 10px 0;
    }
  }
}
.add-content-datadescribe-import {
  width: calc(80vh - 6px);
}
</style>