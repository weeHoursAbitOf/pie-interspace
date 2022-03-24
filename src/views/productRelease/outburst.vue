<template>
  <!-- 突发 -->
  <div class="pie-tb-content">
    <pie-card>
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
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
              <span>目标编号</span>
              <Input v-model="targetNumber" placeholder style="width: 300px" />
            </div>
            <search-btn class="search-btn" @click="searchClick"></search-btn>
          </div>
          <div class="tb-header-button">
            <export-btn class="right-btn-item" @click="exportExcel()"></export-btn>
            <batch-delete-btn class="right-btn-item" @click="batechDelete"></batch-delete-btn>
            <batch-join-btn class="right-btn-item" @click="batchJoinBtn"></batch-join-btn>
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
            :lookBtn="true"
            :delBtn="true"
            :updateBtn="true"
            @look="look"
            @on-selection-change="multiSelect"
            @confirmDelete="deleted"
            @update="update"
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
    <!-- 加入 \\ 修改-->
    <my-modal
      width="40"
      height="55"
      v-model="isShowModal"
      @cancel="cancel"
      title="新增"
      :resetBtn="false"
      @confirm="confirm"
    >
      <div slot="operateItem">
        <div class="add">
          <ul>
            <li>
              <p>目标编号</p>
              <span>
                <Input v-model="addTargetNumber" placeholder class="input-style" />
              </span>
            </li>
            <li>
              <p>事件时间（UTC)</p>
              <span>
                <DatePicker
                  :value="addFindTime"
                  type="date"
                  placeholder="选择时间"
                  class="input-style"
                  @on-change="onFindTimeChange"
                ></DatePicker>
              </span>
            </li>
            <li>
              <p>发现时间（UTC)</p>
              <span>
                <DatePicker
                  :value="addEventTime"
                  type="date"
                  placeholder="选择时间"
                  class="input-style"
                  @on-change="onEventTimeChange"
                ></DatePicker>
              </span>
            </li>
            <li>
              <p>事件描述</p>
              <span>
                <Input
                  v-model="addEventDescription"
                  placeholder
                  class="input-style"
                  type="textarea"
                  :rows="4"
                />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </my-modal>
    <my-dialog @confirm="confirmDelete" @cancel="cancelDelete" :isModal="isDeleteShow"></my-dialog>
  </div>
</template>
<script>
import myTable from "@/components/table/my-table.vue";
import page from "@/components/page/page.vue";
// import newBtn from "@/components/button/new-btn.vue";
export default {
  components: {
    page,
    myTable,
    // newBtn,
  },
  data() {
    return {
      timeHorizon: "", //时间范围
      dataSource: "",
      productType: "",
      target: "", //目标编号
      homeland: "", //国家
      trackType: "", //轨道类型
      cityList: [],
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
          title: "目标编号",
          key: "targetNumber",
          align: "center",
        },
        {
          title: "事件时间",
          key: "eventTime",
          align: "center",
          sortable: true,
        },
        {
          title: "事件描述",
          key: "eventDescription",
          align: "center",
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "发现时间",
          key: "findTime",
          align: "center",
          sortable: true,
        },
        {
          title: "操作",
          slot: "action",
          width: 400,
          align: "center",
        },
      ],
      data: [
        // {
        //   id: 1,
        //   targetNumber: "目标编号",
        //   eventDescription: "事件描述",
        //   eventTime: "2021-01-20 10:20:10",
        //   findTime: "2021-01-21 01:10:10",
        // },
        // {
        //   id: 1,
        //   targetNumber: "目标编号",
        //   eventDescription: "事件描述",
        //   eventTime: "2021-01-20 10:20:10",
        //   findTime: "2021-01-21 01:10:10",
        // },
        // {
        //   id: 1,
        //   targetNumber: "目标编号",
        //   eventDescription: "事件描述",
        //   eventTime: "2021-01-20 10:20:10",
        //   findTime: "2021-01-21 01:10:10",
        // },
      ],
      lookItem: [
        //查看表单
        { title: "目标编号", key: "targetNumber" },
        { title: "事件时间", key: "eventTime" },
        { title: "发现时间", key: "findTime" },
        { title: "事件描述", key: "eventDescription" },
      ],
      lookData: {},
      isModal: false, //修改弹出框
      // ---------------------------------
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      startTime: "", //开始时间
      endTime: "", //结束时间
      targetNumber: "", //目标编号
      selectRow: [], //多选数据
      isDeleteShow: false,
      isShowModal: false,
      addTargetNumber: "", //目标编号
      addEventDescription: "", //事件描述
      addEventTime: "", //发现时间（UTC)
      addFindTime: "", //事件时间（UTC)
      id: "",
      replaceOperation: 0, //替换新增修改
    };
  },
  created() {
    this.getBasicSudden();
  },
  methods: {
    // 开始日期
    onBeginChange(date) {
      this.startTime = date;
    },
    // 结束日期
    onFinishChange(date) {
      this.endTime = date;
    },
    // 目标编号赋值
    onTargetChange(val) {
      this.targetNumber = val.data;
    },
    // 新增事件时间（UTC
    onFindTimeChange(time) {
      this.addFindTime = time;
    },
    // 新增发现时间（UTC
    onEventTimeChange(time) {
      this.addEventTime = time;
    },
    // 获取所有数据列表
    getBasicSudden() {
      let params = {
        pageIndex: this.pageNum,
        pageSize: this.pageSize,
        beginTime: this.startTime, //开始时间
        endTime: this.endTime, //结束时间
        targetNumber: this.targetNumber, //目标编号
      };
      console.log(params);
      // 请求所有数据列表接口
      this.$api.templateManage.getBasicSudden(params).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          this.data = res.data.rows;
          this.setResetData();
        }
      });
    },
    // 搜索
    searchClick() {
      this.getBasicSudden();
    },
    // 用于多项数据导出或删除
    multiSelect(selection) {
      this.selectRow = selection;
    },
    //查看
    look(row) {
      this.lookData = row;
      this.$refs.selection.lookOver();
    },
    //添加或修改
    confirm() {
      let params = {
        id: this.id,
        targetNumber: this.addTargetNumber, //目标编号
        eventTime: this.addFindTime, //事件时间
        findTime: this.addEventTime, //发现时间
        eventDescription: this.addEventDescription, //事件描述
      };
      console.log(params);
      if (this.replaceOperation == 1) {
        // 新增
        // 请求所有数据列表接口
        this.$api.templateManage.addBasicSudden(params).then((res) => {
          if (res.success == true) {
            this.isShowModal = false;
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.getBasicSudden();
            this.setResetData();
          }
        });
      } else {
        // 修改
        // 请求所有数据列表接口
        this.$api.templateManage.updateBasicSudden(params).then((res) => {
          if (res.success == true) {
            this.isShowModal = false;
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.getBasicSudden();
            this.setResetData();
          }
        });
      }
    },
    //弹出框 取消
    cancel() {
      this.isShowModal = false;
    },
    //修改
    update(row) {
      this.isShowModal = true;
      this.replaceOperation = 2;
      this.id = row.id;
      this.addTargetNumber = row.targetNumber;
      this.addEventTime = row.eventTime;
      this.addFindTime = row.findTime;
      this.addEventDescription = row.eventDescription;
    },
    // 加入
    batchJoinBtn() {
      this.isShowModal = true;
      this.replaceOperation = 1;
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
    // 用于取消删除
    cancelDelete() {
      this.isDeleteShow = false;
    },
    // 用于确定删除
    confirmDelete() {
      let params = {
        ids: this.selectRow.map((item) => item.id).join(),
      };
      // 用于删除接口请求
      this.$api.templateManage.getDatchDelete(params).then((res) => {
        if (res.success == true) {
          this.pageNum = 1;
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.isDeleteShow = false;
          this.getBasicSudden();
        }
      });
    },
    // 删除
    deleted(row) {
      let params = {
        ids: row.id,
      };
      // 用于删除接口请求
      this.$api.templateManage.getDatchDelete(params).then((res) => {
        if (res.success == true) {
          this.pageNum = 1;
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.getBasicSudden();
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
    // 用于重置参数
    setResetData() {
      this.startTime = ""; //开始时间
      this.endTime = ""; //结束时间
      this.targetNumber = ""; //目标编号
      this.addTargetNumber = ""; //目标编号
      this.addEventDescription = ""; //事件描述
      this.addEventTime = ""; //发现时间（UTC)
      this.addFindTime = ""; //事件时间（UTC)
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
    align-items: center;
  }
  .tb-header-button {
    display: flex;
    //justify-content: flex-end;
    margin-top: @table-button-space;
    margin-left: 79.5%;
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
//弹出框样式
.modal-content-items {
  .tb-header-content {
    display: flex;
    font-size: @lable-font-size;
    flex-wrap: wrap;
    justify-content: center;

    .tb-header-item {
      display: flex;
      align-items: center;
      white-space: nowrap;
      flex-direction: row;
      flex-wrap: nowrap;
      color: @lable-font-color;
      margin-bottom: 20px;

      .input-style {
        margin-left: @table-lable-space;
        width: 315px;
        position: relative;
      }

      span {
        width: 80px;
        text-align: right;
      }
    }
  }
}
.add {
  ul {
    display: flex;
    flex-direction: column;
    // flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    li {
      // width: 100%;
      // text-align: center;
      list-style: none;
      color: #fff;
      font-size: 18px;
      display: flex;
      align-items: center;
      p {
        width: 150px;
      }
      span {
        margin: 10px;
        display: flex;
        align-items: center;
        .input-style {
          width: 360px;
        }
      }
      .up-btn {
        margin-left: 20px;
      }
    }
  }
}
</style>