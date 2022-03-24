<template>
  <!-- 留言处理 -->
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <ol>
            <li>
              <p>开始时间</p>
              <span>
                <DatePicker
                  :value="startTime"
                  type="date"
                  placeholder
                  style="width: 200px"
                  @on-change="onStartTimeChenge"
                ></DatePicker>
              </span>
            </li>
            <li>
              <p>结束时间</p>
              <span>
                <DatePicker
                  :value="endTime"
                  type="date"
                  placeholder
                  style="width: 200px"
                  @on-change="onEndTimeChenge"
                ></DatePicker>
              </span>
            </li>
            <li>
              <p>留言类型</p>
              <span>
                <Select v-model="messageType" style="width: 200px">
                  <Option
                    v-for="item in messageTypeList"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</Option
                  >
                </Select>
              </span>
            </li>
            <li style="padding: 0 170px"></li>
            <li>
              <search-btn class="search-btn" @click="search"></search-btn>
              <export-btn
                title="导出"
                @click="exportExcel()"
                class="search-btn"
              ></export-btn>
              <batch-delete-btn
                class="search-btn"
                @click="batchDeleteEvnet"
              ></batch-delete-btn>
            </li>
          </ol>
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
            :backBtn="true"
            :detailBtn="true"
            :issueBtn="false"
            :delBtn="true"
            @back="back"
            @detail="detail"
            @confirmDelete="confirmDelete"
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
    <!-- 反馈弹出框 -->
    <my-modal
      width="35"
      height
      v-model="isModal"
      :resetBtn="false"
      :cancelBtn="false"
      :confirmBtn="false"
      title="问题回复"
    >
      <div slot="operateItem">
        <div class="answer-content">
          <div class="answer-title">
            <span class>{{ title }}</span>
          </div>
          <Scroll class="answer-reply" :on-reach-edge="handleReachEdge">
            <dl v-for="(item, index) in replyDataList" :key="index">
              <dd>
                <p
                  :class="
                    item.userType != 0
                      ? 'answer-name-left'
                      : 'answer-name-right'
                  "
                >
                  {{ item.feedbackUsername }}
                </p>
                <span
                  :class="
                    item.userType != 0
                      ? 'answer-time-left'
                      : 'answer-time-right'
                  "
                  >{{ item.createTime }}</span
                >
                <Icon
                  @click="deleteEachItem(item)"
                  v-show="societyId == item.id"
                  :class="
                    item.userType != 0 ? 'icon-time-left' : 'icon-time-right'
                  "
                  type="md-close-circle"
                />
              </dd>
              <dt @click="societyClick(item.id)">
                <p
                  :class="
                    item.userType != 0
                      ? 'answer-content-left'
                      : 'answer-content-right'
                  "
                >
                  {{ item.content }}
                </p>
              </dt>
            </dl>
          </Scroll>
          <div class="answer-message">
            <Input
              v-model="answerContent"
              type="textarea"
              :rows="1"
              :autosize="{ maxRows: 3, minRows: 1 }"
              class="input-message"
            />
            <share-btn
              title="回复"
              class="share-btn"
              callBackName="on-reply-click"
              @on-reply-click="onReplyClick"
            />
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 批量删除弹出框 -->
    <my-dialog
      @confirm="batchDelete"
      @cancel="cancel"
      :isModal="isShowDelete"
    ></my-dialog>
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
    //deleteBtn,
    page,
    myTable,
    myModal,
  },
  data() {
    return {
      // message: "",
      // detailModal: false,
      // productType: "", //产品类型
      // content: "", //内容
      // number: "", //编号
      // submitTime: "", //提交时间
      // backPerson: "", //留言反馈人
      // backContent: "", //留言反馈内容
      // remark: "", //备注
      // messageSource: "", //留言来源
      // userInit: "", //用户单位
      // backTime: "", //留言反馈时间
      // processState: "", //处理状态
      // messageTime: "",
      // feedbackContent: "",
      // notes: "",
      // ---------------------------------------------------
      societyId: null,
      isModal: false,
      title: "",
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
          title: "用户名称",
          key: "userName",
          width: 150,
          align: "center",
        },
        {
          title: "留言时间",
          key: "createTime",
          width: 250,
          align: "center",
          ellipsis: true,
          sortable: true,
        },
        {
          title: "内容",
          key: "content",
          align: "center",
          ellipsis: true,
        },
        {
          title: "留言类型",
          key: "answerType",
          width: 150,
          align: "center",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "div",
              (params.row.answerType =
                params.row.type == 1
                  ? "账号申请"
                  : params.row.type == 2
                  ? "产品申请"
                  : params.row.type == 3
                  ? "产品服务"
                  : "用户建议")
            );
          },
        },
        {
          title: "留言状态",
          key: "messagesStatus",
          width: 150,
          align: "center",
          ellipsis: true,
          render: (h, params) => {
            return h(
              "div",
              (params.row.messagesStatus =
                params.row.status == 1 ? "未回复" : "已回复")
            );
          },
        },
        {
          title: "操作",
          slot: "action",
          width: 250,
          align: "center",
        },
      ],
      data: [
        {
          title: "开拓",
          userName: "admin",
          createTime: "2021-10-01 12:30:03",
          content: "一般用户需求提出异常！",
          answerType: 3,
          messagesStatus: 1,
        },
        {
          title: "开拓",
          userName: "admin",
          createTime: "2021-10-01 12:30:03",
          content: "一般用户需求提出异常！",
          answerType: 3,
          messagesStatus: 1,
        },
        {
          title: "开拓",
          userName: "admin",
          createTime: "2021-10-01 12:30:03",
          content: "一般用户需求提出异常！",
          answerType: 3,
          messagesStatus: 1,
        },
        {
          title: "开拓",
          userName: "admin",
          createTime: "2021-10-01 12:30:03",
          content: "一般用户需求提出异常！",
          answerType: 3,
          messagesStatus: 1,
        },
        {
          title: "开拓",
          userName: "admin",
          createTime: "2021-10-01 12:30:03",
          content: "一般用户需求提出异常！",
          answerType: 3,
          messagesStatus: 1,
        },
        {
          title: "开拓",
          userName: "admin",
          createTime: "2021-10-01 12:30:03",
          content: "一般用户需求提出异常！",
          answerType: 3,
          messagesStatus: 1,
        },
        {
          title: "开拓",
          userName: "admin",
          createTime: "2021-10-01 12:30:03",
          content: "一般用户需求提出异常！",
          answerType: 3,
          messagesStatus: 1,
        },
        {
          title: "开拓",
          userName: "admin",
          createTime: "2021-10-01 12:30:03",
          content: "一般用户需求提出异常！",
          answerType: 3,
          messagesStatus: 1,
        },
        {
          title: "开拓",
          userName: "admin",
          createTime: "2021-10-01 12:30:03",
          content: "一般用户需求提出异常！",
          answerType: 3,
          messagesStatus: 1,
        },
        {
          title: "开拓",
          userName: "admin",
          createTime: "2021-10-01 12:30:03",
          content: "一般用户需求提出异常！",
          answerType: 3,
          messagesStatus: 1,
        },
        {
          title: "开拓",
          userName: "admin",
          createTime: "2021-10-01 12:30:03",
          content: "一般用户需求提出异常！",
          answerType: 3,
          messagesStatus: 1,
        },
        {
          title: "开拓",
          userName: "admin",
          createTime: "2021-10-01 12:30:03",
          content: "一般用户需求提出异常！",
          answerType: 3,
          messagesStatus: 1,
        },
      ],
      messageType: "", //留言类型
      messageTypeList: [
        {
          id: 1,
          name: "账户申请",
        },
        {
          id: 2,
          name: "产品申请",
        },
        {
          id: 3,
          name: "产品服务",
        },
        {
          id: 4,
          name: "用户建议",
        },
      ],
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
      selectType: "",
      select: "",
      startTime: "", //开始时间
      endTime: "", //结束时间
      lookItem: [
        //查看表单
        { title: "标题", key: "title" },
        { title: "用户", key: "userType" },
        { title: "留言时间", key: "createTime" },
        { title: "留言类型", key: "answerType" },
        { title: "留言状态", key: "messagesStatus" },
        { title: "内容", key: "content" },
      ],
      lookData: {},
      selectRow: [], //选中的行
      isShowDelete: false,
      replyTotal: 0,
      replyNum: 1,
      replySize: 10,
      replyDataList: [],
      feedbackId: 0,
      userStatus: true,
      answerContent: "",
      status: 0,
    };
  },
  created() {
    this.getFeedbackList();
    this.getFeedbackType();
  },
  methods: {
    // 获取留言列表
    getFeedbackList() {
      let params = {
        keywordType: this.selectType, //标题
        keyword: this.select, //标题类型
        type: this.messageType, //留言类型
        startTime: this.startTime, //开始时间
        endTime: this.endTime, //结束时间
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      this.$api.feedback.feedbackList(params).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          this.data = res.data.msg;
        }
      });
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
      this.getFeedbackList();
    },
    // 条数
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.getFeedbackList();
    },
    // 搜索
    search() {
      this.getFeedbackList();
    },
    // 获取留言类型
    getFeedbackType() {
      this.$api.feedback.feedbackType().then((res) => {
        if (res.success == true) {
          this.messageTypeList = res.data;
        }
      });
    },
    // 删除
    confirmDelete(row) {
      let params = {
        feedBackId: row.id,
      };
      this.$api.feedback.feedbackDelete(params).then((res) => {
        if (res.success == true) {
          this.getFeedbackList();
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
    //多选batchDelete
    multiSelect(selection) {
      this.selectRow = selection;
    },
    // 批量删除
    batchDeleteEvnet() {
      this.isShowDelete = true;
    },
    // 批量删除确定
    batchDelete() {
      if (this.selectRow.length == 0) {
        this.$Notice.warning({
          title: "导出数据不能为空",
          top: 50,
          duration: 5,
        });
        return;
      }
      let params = {
        id: this.selectRow.map((item) => item.id).join(),
      };
      this.$api.feedback.batchDelete(params).then((res) => {
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
    //  详情
    detail(row) {
      this.lookData = row;
      this.$refs.selection.lookOver();
    },
    // 取消
    cancel() {
      this.isModal = false;
      this.detailModal = false;
      this.isShowDelete = false;
    },
    //回复弹框
    back(row) {
      this.replyNum = 1;
      this.isModal = true;
      this.feedbackId = row.id;
      this.title = row.title;
      this.status = row.status;
      this.getInquireFeedbackReply();
    },
    // 查询留言回复
    getInquireFeedbackReply() {
      let params = {
        feedbackId: this.feedbackId,
        userType: this.userStatus,
        pageNum: this.replyNum,
        pageSize: this.replySize,
      };
      this.$api.feedback.inquireFeedbackReply(params).then((res) => {
        if (res.success == true) {
          this.replyTotal = res.data.total;
          this.replyDataList = this.$utils.sortNuber(
            res.data.msg,
            "createTime"
          );
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    // 回复信息
    onReplyClick() {
      let params = {
        status: this.status,
        content: this.answerContent,
        feedbackId: this.feedbackId,
        userStatus: this.userStatus,
      };
      this.$api.feedback.feedbackReply(params).then((res) => {
        if (res.success == true) {
          this.getInquireFeedbackReply();
          this.answerContent = "";
          this.replyNum = 1;
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    handleReachEdge(dir) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (dir > 0) {
            let params = {
              feedbackId: this.feedbackId,
              userType: this.userStatus,
              pageNum: ++this.replyNum,
              pageSize: this.replySize,
            };
            this.$api.feedback.inquireFeedbackReply(params).then((res) => {
              if (res.success == true) {
                this.replyTotal = res.data.total;
                let dataList = this.$utils.sortNuber(
                  res.data.msg,
                  "createTime"
                );
                dataList.map((item) => this.replyDataList.unshift(item));
              } else {
                this.replyNum = 1;
                this.$Notice.error({
                  title: res.message,
                  top: 50,
                  duration: 5,
                });
              }
            });
          } else {
            this.getInquireFeedbackReply();
          }
          resolve();
        }, 1000);
      });
    },
    // 选中显示删除按钮
    societyClick(id) {
      this.societyId = id;
    },
    // 回复删除
    deleteEachItem(item) {
      let params = {
        id: item.id,
        status: item.status,
        userType: this.userStatus,
      };
      this.$api.feedback.DeleteReply(params).then((res) => {
        if (res.success == true) {
          this.getInquireFeedbackReply();
          this.replyNum = 1;
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
  },
};
</script>
<style lang="less" scoped>
.pie-tb-header {
  font-size: @lable-font-size;
  color: @lable-font-color;
}
ol {
  display: flex;
  li {
    display: flex;
    align-items: center;
    p {
      margin: 0 10px;
    }
  }
}
.search-btn {
  margin: 0 10px;
}
// .pie-tb-header {
//   display: flex;
//   justify-content: space-between;
//   font-size: @lable-font-size;
//   flex-wrap: wrap;
//   .btn-content {
//     position: relative;
//     bottom: -10px;
//     right: -1170px;
//     z-index: 1;
//     display: flex;
//     .right-btn-item {
//       margin-left: @table-btn-space;
//     }
//   }
//   .tb-header-content {
//     display: flex;
//     width: 100%;
//     justify-content: inherit;
//   }
//   .tb-header-item {
//     display: flex;
//     align-items: center;
//     white-space: nowrap;
//     flex-direction: row;
//     flex-wrap: nowrap;
//     margin-right: @table-input-space;
//     color: @lable-font-color;

//     .search-btn {
//       margin-left: @search-lable-space;
//     }

//     .input {
//       width: 400px;
//     }

//     span {
//       margin-right: @table-lable-space;
//     }
//   }
// }

// .pie-tb-iscontent {
//   max-width: 100%;

//   .tb-style {
//     max-width: 100%;
//   }
// }
// .modal-content-items {
//   display: flex;
//   justify-content: center;

//   .tb-header-content {
//     font-size: @lable-font-size;

//     .tb-header-item {
//       display: flex;
//       align-items: center;
//       white-space: nowrap;
//       flex-direction: row;
//       flex-wrap: nowrap;
//       margin-right: @table-input-space;
//       color: @lable-font-color;
//       margin-bottom: 20px;

//       .input-style {
//         margin-left: @table-lable-space;
//         // width: 300px;
//       }
//       span {
//         width: 140px;
//         text-align: right;
//       }
//       .item-title {
//         margin-left: -130px;
//       }
//     }

//     .tb-header-item:last-child {
//       align-items: end;
//     }
//   }
// }
.answer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: @lable-font-size;
  color: @lable-font-color;
  .answer-title {
    display: flex;
    font-size: 25px;
    color: rgb(81, 246, 233);
    border-bottom: 2px solid rgb(81, 246, 233);
    margin-bottom: 10px;
  }
  .answer-reply {
    width: 100%;
    height: 550px;
    overflow: auto;
    padding: 20px;
    /deep/.ivu-scroll-container {
      height: 100% !important;
    }
    dl {
      width: 100%;
      height: auto;
      padding: 20px;
      dd {
        clear: both;
        height: auto;
        width: 100%;
        .answer-name-left,
        .answer-time-left,
        .icon-time-left {
          float: left;
          padding: 5px;
        }
        .answer-name-right,
        .answer-time-right,
        .icon-time-right {
          float: right;
          padding: 5px;
        }
        .answer-name-right,
        .answer-name-left {
          color: rgb(214, 248, 187);
        }

        .icon-time-left,
        .icon-time-right {
          font-size: 20px;
          color: red;
          margin-top: 1px;
        }
      }
      dt {
        clear: both;
        height: auto;
        width: 100%;
        .answer-content-left:extend(.border) {
          float: left;
          padding: 10px;
          width: 300px;
          height: auto;
          white-space: normal;
          word-wrap: break-word;
          border-radius: 5px;
        }
        .answer-content-right:extend(.border) {
          float: right;
          padding: 10px;
          width: 300px;
          height: auto;
          white-space: normal;
          word-wrap: break-word;
          text-align: right;
          border-radius: 5px;
        }
      }
    }
  }
  .answer-message {
    display: flex;
    align-items: center;
    margin-top: 20px;
    position: relative;
    .input-message {
      width: 500px;
      margin: 0 20px;
    }
    // .share-btn {
    //   position: absolute;
    //   bottom: -50px;
    //   right: -60px;
    //   z-index: 2;
    // }
  }
}
// 隐藏滚动条
/deep/::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
}
</style>
