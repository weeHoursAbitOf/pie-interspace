<template>
  <!-- 数据导入配置-->
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>导入策略名称</span>
              <Input
                v-model="exportPolicyName"
                placeholder="请输入导入策略名称"
                clearable
                class="input-style"
              />
            </div>
            <!-- <div class="tb-header-item">
              <span>导入文件类型</span>
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
            <div class="tb-header-item">
              <span>导入数据类型</span>
              <!-- <Select v-model="dataType" class="product-type">
                <Option
                  v-for="item in dataTypeList"
                  :value="item.taskFileType"
                  :key="item.linkMsgKey"
                >
                  {{ item.interfaceDescription }}
                </Option>
              </Select>-->
              <Select v-model="dataType" class="product-type">
                <Option
                  v-for="item in dataTypeList"
                  :value="item.dataType"
                  :key="item.dataType"
                  >{{ item.name }}</Option
                >
              </Select>
            </div>
            <search-btn class="search-btn" @click="search"></search-btn>
          </div>
          <div class="tb-header-button">
            <batch-delete-btn
              class="right-btn-item"
              @click="batchDelete"
            ></batch-delete-btn>
            <export-btn
              class="right-btn-item"
              @click="exportExcel()"
            ></export-btn>
            <batch-join-btn
              class="right-btn-item"
              @click="batchJoinBtnClick"
            ></batch-join-btn>
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
            :detailBtn="true"
            :updateBtn="true"
            :delBtn="true"
            @detail="detail"
            @update="update"
            @confirmDelete="deleted"
            max-height="500"
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
            @pageChange="changePage"
            @pageSizeChange="handlePageSizeChange"
          ></page>
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
        <!-- 新增 或 修改-->
        <div class="add-content">
          <ul>
            <li>
              <p>导入策略名称</p>
              <span>
                <Input
                  v-model="exportName"
                  placeholder="xxxx数据导入策略"
                  style="width: 250px"
                />
              </span>
            </li>
            <li v-show="updateType == 0 ? true : false">
              <p>导入数据类型</p>
              <span>
                <!-- <Select v-model="dataType" style="width: 250px">
                  <Option
                    v-for="item in dataTypeList"
                    :value="item.linkMsgKey"
                    :key="item.linkMsgKey"
                  >
                    {{ item.interfaceDescription }}
                  </Option>
                </Select>-->
                <Select v-model="dataType" class="product-type">
                  <Option
                    v-for="item in dataTypeList"
                    :value="item.dataType"
                    :key="item.dataTyp"
                    >{{ item.name }}</Option
                  >
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
                    >{{ item.name }}</Option
                  >
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
                  placeholder="这是一段xxxx数据导入策略"
                />
              </span>
            </li>
            <!-- <li>
              <p>导入文件类型</p>
              <span>
                <Select v-model="selectModel" style="width: 250px">
                  <Option value="0">文本</Option>
                  <Option value="1">CVS</Option>
                </Select>
              </span>
            </li>-->
            <!-- <li>
              <span>
                <share-btn
                  title="解析规则设置"
                  style="width: 250px"
                  callBackName="ruleSettingClick"
                  @ruleSettingClick="ruleSettingClick"
                />
              </span>
            </li>-->
            <!-- <li>
              <p>文件命名标识</p>
              <span><Input placeholder="" style="width: 250px" /></span>
            </li>-->
          </ul>
          <!-- <div class="Modal-table-but">
            <new-btn title="添加监视目录" @click="addColumns"></new-btn>
            <span>添加监测目录</span>
            <my-table
              border
              ref="selection"
              :columns="detailsColumns"
              :data="detailsData"
              disabled-hover
              max-height="500"
            ></my-table>
            启用情况：
            <RadioGroup v-model="using" size="large">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
          </div>-->
        </div>
        <!-- 详情 -->
        <!-- <div v-if="title == '详情'" class="details-content">
          <ol>
            <li>
              <p>命名标识符</p>
              <span>xxxx数据导入策略</span>
            </li>
          </ol>
          <div class="Modal-table-but">
            <span style="padding: 10px">监视目录</span>
            <my-table
              border
              ref="selection"
              :columns="detailsColumns"
              :data="detailsData"
              disabled-hover
              max-height="500"
            ></my-table>
          </div>
        </div>-->
      </div>
    </my-modal>
    <my-modal
      width="35"
      title="详情"
      :resetBtn="false"
      :value="ruleModal"
      @cancel="cancelRuleModal"
      @confirm="confirmRuleModal"
    >
      <div slot="operateItem">
        <div class="rule-content">
          <ol>
            <li>
              <p>导入策略名称 ：</p>
              <span>{{ row.name }}</span>
            </li>
            <li>
              <p>导入数据描述 ：</p>
              <span>{{ row.describe }}</span>
            </li>
            <li>
              <p>扫描时间隔(MIN) ：</p>
              <span>{{ row.interval }}</span>
            </li>
          </ol>
        </div>
      </div>
    </my-modal>
    <!-- 批量删除弹出框 -->
    <my-dialog
      @confirm="confirm"
      @cancel="cancel"
      :isModal="confirmDelete"
    ></my-dialog>
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
import newBtn from "@/components/button/new-btn.vue";
export default {
  components: {
    pieCard,
    batchDeleteBtn,
    exportBtn,
    searchBtn,
    batchJoinBtn,
    page,
    myTable,
    newBtn,
  },
  data() {
    return {
      title: "",
      selectModel: "",
      isShowModal: false,
      ruleModal: false,
      zIndex: 1000,
      using: "是", //启用情况
      selectRow: [],
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      exportPolicyName: "", //策略名称
      // fileType: "", //文件类型
      dataType: "", //数据类型
      dataTypeList: [
        // {
        //   linkMsgKey: "0",
        //   interfaceDescription: "用户数据导入",
        //   taskFileType: "User",
        // },
      ],
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
          title: "导入策略名称",
          key: "name",
          align: "center",
        },
        {
          title: "导入数据描述",
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
      data: [
        {
          name: "高级发布策略",
          describe: "适用于高级模块发布策略",
          isUse: "启用",
          interval: "1",
        },
        {
          name: "高级发布策略",
          describe: "适用于高级模块发布策略",
          isUse: "启用",
          interval: "1",
        },
        {
          name: "高级发布策略",
          describe: "适用于高级模块发布策略",
          isUse: "启用",
          interval: "1",
        },
        {
          name: "高级发布策略",
          describe: "适用于高级模块发布策略",
          isUse: "启用",
          interval: "1",
        },
        {
          name: "高级发布策略",
          describe: "适用于高级模块发布策略",
          isUse: "启用",
          interval: "1",
        },
        {
          name: "高级发布策略",
          describe: "适用于高级模块发布策略",
          isUse: "启用",
          interval: "1",
        },
        {
          name: "高级发布策略",
          describe: "适用于高级模块发布策略",
          isUse: "启用",
          interval: "1",
        },
        {
          name: "高级发布策略",
          describe: "适用于高级模块发布策略",
          isUse: "启用",
          interval: "1",
        },
        {
          name: "高级发布策略",
          describe: "适用于高级模块发布策略",
          isUse: "启用",
          interval: "1",
        },
        {
          name: "高级发布策略",
          describe: "适用于高级模块发布策略",
          isUse: "启用",
          interval: "1",
        },
      ],
      minType: "",
      minTypeList: [
        {
          value: "",
          key: "0",
        },
      ],
      exportName: "", //导入名称
      describe: "", //描述
      row: {},
      updateType: 0,
      jobNumber: "",
      uadateId: "",
      confirmDelete: false,
    };
  },
  created() {
    this.getselectAlllnPortStrategy();
    this.getSelStrategyJobMsg();
    this.getSelStrategyTime();
  },
  methods: {
    // 获取数据列表
    getselectAlllnPortStrategy() {
      let params = {
        strategyName: this.exportPolicyName,
        dataType: this.dataType,
        strategyType: "import",
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      // 请求数据列表接口
      this.$api.strategyService.selectAllStrategy(params).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          let data = res.data.syncStrategyList;
          for (let i = 0; i < data.length; i++) {
            data[i].isUse = data[i].isUse == 0 ? "启用" : "停用";
          }
          this.data = data;
          this.getResetParam();
        }
      });
    },
    // 搜索
    search() {
      this.getselectAlllnPortStrategy();
    },

    // 获取导入导入类型及分钟类型
    getSelStrategyJobMsg() {
      this.$api.strategyService.selectStrategyType().then((res) => {
        if (res.success == true) {
          this.dataTypeList = res.data;
          // this.minTypeList = res.data.time;
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
    //多选
    multiSelect(selection) {
      this.selectRow = selection;
    },
    // 导入按钮方法
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
        filename: "群组数据导入",
        separator: ",",
        columns: this.list.filter((col, index) => index > 0 && index < 7),
        data: exportData,
      });
    },
    // 批量删除
    batchDelete() {
      if (this.selectRow.length == 0) {
        this.$Notice.warning({
          title: "选项不能为空",
          top: 50,
          duration: 5,
        });
        return;
      }
      this.confirmDelete = true;
    },
    // 批量删除
    confirm() {
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
            this.getselectAlllnPortStrategy();
            this.cancel();
          }
        });
    },
    // 取消批量删除
    cancel() {
      this.confirmDelete = false;
    },
    // 删除
    deleted(row) {
      this.$api.strategyService.deleteStrategy(row.id).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });

          this.getselectAlllnPortStrategy();
        }
      });
    },
    // 新增 确定
    confirmIsShowModal() {
      // 判断输入值是否为空
      if (!this.checkoutData()) {
        return false;
      }
      // 传参
      if (this.updateType == 0) {
        let params = {
          strategyName: this.exportName, //名称
          description: this.describe, //描述
          dataType: this.dataType, //类型
          interval: this.minType, //启动间隔时间
          type: "import",
        };
        this.$api.strategyService.createStrategy(params).then((res) => {
          if (res.success == true) {
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });

            this.getResetParam();
            this.getselectAlllnPortStrategy();
            this.isShowModal = false;
          }
        });
      } else {
        let params = {
          strategyName: this.exportName, //名称
          description: this.describe, //描述
          interval: this.minType, //启动时间
        };
        this.$api.strategyService
          .updateStrategy(this.uadateId, params)
          .then((res) => {
            if (res.success == true) {
              this.$Notice.success({
                title: res.message,
                top: 50,
                duration: 5,
              });

              this.getResetParam();
              this.getselectAlllnPortStrategy();
              this.isShowModal = false;
            }
          });
      }
    },
    // 新增 取消
    cancelIsShowModal() {
      this.isShowModal = false;
      this.getResetParam();
      this.updateType = 0;
    },
    // 修改
    update(row) {
      this.title = "修改";
      this.isShowModal = true;
      this.exportName = row.name; //名称
      this.describe = row.describe; //描述
      this.dataType = row.strategyType; //任务类型
      this.minType = row.interval; //启动时间
      this.updateType = 1;
      this.uadateId = row.id;
      this.jobNumber = row.job_number;
    },
    // //分页-选择页数
    changePage(e) {
      this.pageNum = e;
      this.getselectAlllnPortStrategy();
    },
    //分页-改变pageSize
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getselectAlllnPortStrategy();
    },
    // 重置参数
    getResetParam() {
      this.exportName = ""; //名称
      this.describe = ""; //描述
      this.dataType = ""; //任务类型
      this.minType = ""; //启动时间
      this.exportPolicyName = ""; //导入策略名称
      this.fileType = ""; //文件类型
    },
    // 判断输入值是否为空
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
    // 详情
    detail(row) {
      this.ruleModal = true;
      this.row = row;
    },
    // 新增
    batchJoinBtnClick() {
      this.title = "新增导入配置";
      this.isShowModal = true;
      this.getResetParam();
    },
    //-------------------------------------------------
    // 解析规则设置 取消
    cancelRuleModal() {
      this.ruleModal = false;
    },
    // 解析规则设置 确定
    confirmRuleModal() {
      this.ruleModal = false;
    },
    // 规则设置
    ruleSettingClick() {
      this.ruleModal = true;
    },
    // 添加监视目录
    addColumns() {},
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
    padding-bottom: @table-padding;
  }
  .tb-header-button {
    display: flex;
    //justify-content: flex-end;
    margin-left: 79%;
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
/deep/ .del-btn {
  width: 120px;
  margin-bottom: 10px;
}
/deep/.ivu-table-wrapper {
  margin: 10px 0;
}
</style>
