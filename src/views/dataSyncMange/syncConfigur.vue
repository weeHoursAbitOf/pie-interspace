<template>
  <!-- 数据同步配置-->
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>数据同步策略名称</span>
              <Input
                v-model="dataSyncName"
                placeholder="请输入数据同步策略名称"
                clearable
                class="input-style"
              />
            </div>
            <!-- <div class="tb-header-item">
              <span>同步文件类型</span>
              <Select v-model="syncFileType" class="product-type">
                <Option v-for="item in syncFileTypeList" :value="item.value" :key="item.value">
                  {{ item.label }}
                </Option>
              </Select>
            </div>-->
            <div class="tb-header-item">
              <span>同步数据类型</span>
              <Select v-model="syncDataType" class="product-type">
                <Option
                  v-for="item in syncDataTypeList"
                  :value="item.dataType"
                  :key="item.dataType"
                >{{ item.name }}</Option>
              </Select>
            </div>
            <search-btn class="search-btn" @click="search"></search-btn>
          </div>
          <div class="tb-header-button">
            <batch-delete-btn class="right-btn-item" @click="batchDelete"></batch-delete-btn>
            <!-- <export-btn title="同步" class="right-btn-item"></export-btn> -->
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
          <page :total="pageTotal" :pageSize="pageSize" :current="pageNum"></page>
        </div>
      </div>
    </pie-card>
    <!-- 新增 详情 修改 -->
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
            <li v-show="updateType == 0 ? true : false">
              <p>策略类型</p>
              <RadioGroup v-model="strategyType">
                <Radio label="导出"></Radio>
                <Radio label="导入"></Radio>
              </RadioGroup>
            </li>
            <li>
              <p>策略名称</p>
              <span>
                <Input v-model="strategyName" placeholder="xxxx数据策略" style="width: 250px" />
              </span>
            </li>
            <li v-show="updateType == 0 ? true : false">
              <p>数据类型</p>
              <span>
                <Select v-model="dataType" class="product-type">
                  <Option
                    v-for="item in syncDataTypeList"
                    :value="item.dataType"
                    :key="item.dataTyp"
                  >{{ item.name }}</Option>
                </Select>
              </span>
            </li>
            <li>
              <p>扫描时间</p>
              <span>
                <Select v-model="minType" style="width: 250px">
                  <Option
                    v-for="item in minTypeList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.name }}</Option>
                </Select>
              </span>
            </li>
            <li>
              <p>数据描述</p>
              <span>
                <Input
                  v-model="describe"
                  class="add-content-datadescribe-import"
                  type="textarea"
                  :rows="7"
                  placeholder="这是一段xxxx数据策略"
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
import batchJoinBtn from "@/components/button/batch-join-btn.vue";
import page from "@/components/page/page.vue";
import myTable from "@/components/table/my-table.vue";
// import MyTable from "../../components/table/my-table.vue";
export default {
  components: {
    pieCard,
    batchDeleteBtn,
    batchJoinBtn,
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
      dataSyncName: "", //数据同步策略名称
      syncFileType: "", //同步文件类型
      syncDataType: "", //同步数据类型
      dataType: "",
      confirmDelete: false,
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
          title: "数据同步策略名称",
          key: "name",
          align: "center",
        },
        {
          title: "同步类型",
          key: "strategyType",
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
          title: "同步数据描述",
          key: "describe",
          align: "center",
        },
        {
          title: "是否启用",
          key: "isUse",
          align: "center",
        },
        {
          title: "扫描时间间隔(MIN)",
          key: "interval",
          align: "center",
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
        },
      ],
      data: [],
      syncDataTypeList: [],
      minTypeList: [],
      title: "",
      describe: "",
      minType: "",
      strategyName: "",
      isShowModal: false,
      uadateId: "",
      lookItem: [
        //查看表单
        { title: "数据类型", key: "dataTypeName" },
        { title: "数据同步策略名称", key: "name" },
        { title: "发送方", key: "sender" },
        { title: "接收方", key: "receiver" },
        { title: "同步数据描述", key: "describe" },
        { title: "是否启用", key: "isUse" },
        { title: "扫描时间间隔(MIN)", key: "interval" },
      ],
      lookData: {},
      strategyType: "",
      updateType: 0,
    };
  },
  mounted() {
    this.getSelStrategyJobMsg();
    this.getSelStrategyTime();
    this.getSelectAllOutPortStrategy();
  },
  methods: {
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
    // 批量删除
    confirm() {
      //获取到所有选择的列表
      let params = this.selectRow.map((item) => item.id);
      this.$api.strategyService
        .deleteBatchStrategy(params.join(","))
        .then((res) => {
          if (res.success == true) {
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.getSelectAllOutPortStrategy();
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
    update(row) {
      this.strategyType = row.strategyType == "import" ? "导入" : "导出";
      this.title = "修改";
      this.isShowModal = true;
      this.strategyName = row.name; //名称
      this.describe = row.describe; //描述
      this.dataType = row.dataType; //任务类型
      this.minType = row.interval; //启动时间
      this.uadateId = row.id;
      this.updateType = 1;
    },
    deleted(row) {
      this.$api.strategyService.deleteStrategy(row.id).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.getSelectAllOutPortStrategy();
        }
      });
    },
    // 获取数据列表
    getSelectAllOutPortStrategy() {
      let params = {
        strategyName: this.dataSyncName,
        dataType: this.dataType,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      // 请求数据列表接口
      this.$api.strategyService.selectAllStrategy(params).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          let data = res.data.syncStrategyList;
          for (let i = 0; i < data.length; i++) {
            data[i].number = i + 1;
            data[i].isUse = data[i].isUse == 0 ? "启用" : "停用";
            data[i].strategyType =
              data[i].strategyType == "import" ? "导入" : "导出";
          }
          this.data = data;
          this.getResetParam();
        }
      });
    },
    search() {
      this.getSelectAllOutPortStrategy();
    },
    confirmIsShowModal() {
      // 判断输入值是否为空
      if (!this.checkoutData()) {
        return false;
      }
      // 传参
      let params = {
        strategyName: this.strategyName, //名称
        description: this.describe, //描述
        dataType: this.dataType, //类型
        interval: this.minType, //启动间隔时间
        type: this.strategyType === "导出" ? "export" : "import",
      };
      this.$api.strategyService.createStrategy(params).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.getResetParam();
          this.getSelectAllOutPortStrategy();
          this.isShowModal = false;
        }
      });
    },
    checkoutData() {
      if (!this.exportName) {
        this.$Notice.warning({
          title: "请输入导入策略名称！",
          top: 50,
          duration: 5,
        });
        return;
      } else if (!this.dataType) {
        this.$Notice.warning({
          title: "请选择导入数据类型！",
          top: 50,
          duration: 5,
        });
        return;
      } else if (!this.minType) {
        this.$Notice.warning({
          title: "请选择扫描时间！",
          top: 50,
          duration: 5,
        });
        return;
      } else if (!this.describe) {
        this.$Notice.warning({
          title: "请输入描述不能为空！",
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
      this.getResetParam();
    },
    getSelStrategyJobMsg() {
      this.$api.strategyService.selectStrategyType().then((res) => {
        if (res.success == true) {
          this.syncDataTypeList = res.data;
        }
      });
    },
    getSelStrategyTime() {
      this.$api.strategyService.selectStrategyTime().then((res) => {
        if (res.success == true) {
          this.minTypeList = res.data;
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
        columns: this.list.filter((col, index) => index > 0 && index < 10),
        data: this.selectRow,
      });
    },
    //多选
    multiSelect(selection) {
      this.selectRow = selection;
    },
    //查看
    look(row) {
      this.lookData = row;
      this.$refs.selection.lookOver();
    },
    batchJoinBtnClick() {
      this.title = "新增同步配置";
      this.isShowModal = true;
      this.updateType = 0;
      this.getResetParam();
    },
    getResetParam() {
      this.strategyName = ""; //名称
      this.describe = ""; //描述
      this.dataType = ""; //任务类型
      this.minType = ""; //启动时间
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