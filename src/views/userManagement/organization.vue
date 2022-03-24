<template>
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>单位名称</span>
              <Input
                v-model="organizationName"
                placeholder="请输入单位名称"
                clearable
                class="input-style"
              />
            </div>
            <div class="tb-header-item">
              <span>注册时间</span>
              <DatePicker
                type="date"
                v-model="startTime"
                placeholder="开始时间"
                class="start-time"
                @on-change="startTimeSelect"
              ></DatePicker>
              <span class="time">至</span>
              <DatePicker
                type="date"
                v-model="endTime"
                placeholder="结束时间"
                @on-change="endTimeSelect"
              ></DatePicker>
              <search-btn class="search-btn" @click="search()"></search-btn>
            </div>
          </div>
          <div class="tb-header-button">
            <export-btn @click="exportExcel()"></export-btn>
            <batch-delete-btn
              class="button-item"
              @click="batchesDelete"
            ></batch-delete-btn>
            <new-btn class="button-item" @click="addOrgniazation"></new-btn>
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
            :data="dataList"
            @on-selection-change="multiSelect"
            :lookItem="lookItem"
            :lookIObject="lookData"
            :lookBtn="true"
            @look="look"
            :updateBtn="true"
            @update="update"
            :delBtn="true"
            @confirmDelete="deleteEnterprise"
          ></my-table>
        </div>
      </div>
      <!-- 分页 -->
      <div slot="footer">
        <div class="pie-tb-footer">
          <page
            :total="total"
            :pageSize="pageSize"
            :current="pageNum"
            @pageChange="changePage"
            @pageSizeChange="handlePageSizeChange"
          ></page>
        </div>
      </div>
    </pie-card>
    <!-- 新建、修改弹出框 -->
    <my-modal
      width="50"
      height="60"
      v-model="isModal"
      @cancel="cancel"
      :title="title"
      :resetBtn="false"
      @confirm="addEnterprise"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-content">
              <div class="hint">
                <span class="beizhu">*</span>
                <span>为必填项</span>
              </div>
              <div class="tb-header-item">
                <span class="text">
                  单位名称
                  <span class="beizhu">*</span>
                </span>
                <Input
                  v-model="entityName"
                  placeholder="请输入单位名称"
                  class="input-style"
                  clearable
                />
              </div>
              <div class="tb-header-item">
                <span class="text">
                  行政区
                  <span class="beizhu">*</span>
                </span>
                <Cascader
                  v-model="regionCode"
                  placeholder="选择行政区"
                  :data="cityList"
                  class="input-style"
                  @on-change="selectCity"
                ></Cascader>
              </div>
              <div class="tb-header-item">
                <span class="text">
                  单位地址
                  <span class="beizhu">*</span>
                </span>
                <Input
                  v-model="entityAddress"
                  placeholder="请输入单位地址"
                  class="input-style"
                  clearable
                />
              </div>
              <div class="tb-header-item">
                <span class="text">
                  单位电话
                  <span class="beizhu">*</span>
                </span>
                <Input
                  v-model="entityPhone"
                  placeholder="请输入单位电话"
                  @on-keyup="checkEntityPhone('entityPhone')"
                  class="input-style"
                  clearable
                />
              </div>
              <div class="tb-header-item">
                <span class="text">
                  单位邮编
                  <span class="beizhu">*</span>
                </span>
                <Input
                  v-model="postalCode"
                  placeholder="请输入邮政编码"
                  @on-keyup="checkPostalCode()"
                  class="input-style"
                  clearable
                />
              </div>
              <div class="tb-header-item">
                <span class="text">
                  单位传真
                  <span class="beizhu">*</span>
                </span>
                <Input
                  v-model="fax"
                  placeholder="请输入单位传真"
                  @on-keyup="checkFax('fax')"
                  class="input-style"
                  clearable
                />
              </div>
              <!-- <div class="tb-header-item">
                  <span>注册时间</span>
                  <DatePicker v-model="registrationTime" type="date" class="start-time"></DatePicker>
              </div>-->
              <div class="last-row">
                <span class="remark">备注</span>
                <Input
                  v-model="remark"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入备注信息"
                  class="textarea"
                />
              </div>
            </div>
          </div>
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
import page from "@/components/page/page.vue";
import myTable from "@/components/table/my-table.vue";
import city from "@/utils/city.js";

export default {
  components: {
    page,
    // batchJoinBtn,
    myTable,
    city,
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
          type: "index",
          align: "center",
          width: 70,
        },
        {
          title: "单位名称",
          key: "name",
          align: "center",
        },
        {
          title: "单位地址",
          key: "address",
          align: "center",
        },
        {
          title: "行政区",
          key: "region",
          align: "center",
        },
        {
          title: "注册时间",
          key: "createTime",
          sortable: true,
          align: "center",
          render: (h, params) => {
            let date = params.row.createTime;
            if (date) {
              date = this.$utils.formatDate(new Date(date), 1);
            }
            return h("div", [h("div", date)]);
          },
        },
        {
          title: "备注",
          key: "memo",
          align: "center",
          resizable: true,
          width: 220,
          tooltip: true,
        },
        {
          title: "操作",
          key: "operation",
          slot: "action",
          align: "center",
          width: 280,
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
          //           marginRight: "15px",
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
          //         props: {
          //           type: "default",
          //           size: "small",
          //         },
          //         style: {
          //           marginRight: "15px",
          //         },
          //         on: {
          //           click: () => {
          //             this.update(params);
          //           },
          //         },
          //       },
          //       "修改"
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
          //               height: "300",
          //             },
          //             style: {
          //               marginRight: "15px",
          //             },
          //             on: {
          //               "on-ok": () => {
          //                 this.deleteEnterprise(params.row);
          //               },
          //               "on-cancel": function () {
          //               },
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
      total: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      organizationName: "",
      timeHorizon: "",
      entityName: "", //单位名称
      district: [], //行政区
      entityAddress: "", //单位地址
      remark: "", //备注
      entityPhone: "", //单位电话
      postalCode: "", //邮政编码
      fax: "", //单位传真
      registrationTime: "", //注册时间
      dataList: [
        // {
        //   row: 1,
        //   name: "航天宏图",
        //   createTime: 1,
        //   region: "北京市/海淀区",
        //   address: "北京",
        //   entityPhone: "010-88888888",
        //   zipcode: "100000",
        //   fax: "888888",
        //   memo: "空间",
        // },
        // {
        //   row: 2,
        //   name: "航天宏图",
        //   createTime: 1,
        //   region: "北京市/海淀区",
        //   address: "北京",
        //   entityPhone: "010-88888888",
        //   zipcode: "100000",
        //   fax: "888888",
        //   memo: "空间",
        // },
        // {
        //   row: 1,
        //   name: "航天宏图",
        //   createTime: 1,
        //   region: "北京市/海淀区",
        //   address: "北京",
        //   entityPhone: "010-88888888",
        //   zipcode: "100000",
        //   fax: "888888",
        //   memo: "空间",
        // },
        // {
        //   row: 3,
        //   name: "航天宏图",
        //   createTime: 1,
        //   region: "北京市/海淀区",
        //   address: "北京",
        //   entityPhone: "010-88888888",
        //   zipcode: "100000",
        //   fax: "888888",
        //   memo: "空间",
        // },
        // {
        //   row: 4,
        //   name: "航天宏图",
        //   createTime: 1,
        //   region: "北京市/海淀区",
        //   address: "北京",
        //   entityPhone: "010-88888888",
        //   zipcode: "100000",
        //   fax: "888888",
        //   memo: "空间",
        // },
        // {
        //   row: 5,
        //   name: "航天宏图",
        //   createTime: 1,
        //   region: "北京市/海淀区",
        //   address: "北京",
        //   entityPhone: "010-88888888",
        //   zipcode: "100000",
        //   fax: "888888",
        //   memo: "空间",
        // },
      ], //表单列表
      isModal: false,
      title: "新建",
      selectRow: [], //选中的行
      confirmDelete: false,
      currentId: "",
      cityList: [], //城市列表
      endTime: "", //结束时间
      startTime: "", //开始时间
      lookItem: [
        //查看表单
        { title: "单位名称", key: "name" },
        { title: "注册时间	", key: "createTime" },
        { title: "行政区", key: "region" },
        { title: "单位地址", key: "address" },
        { title: "单位电话", key: "phoneNum" },
        { title: "单位邮编", key: "zipcode" },
        { title: "传真", key: "fax" },
        { title: "备注", key: "memo" },
      ],
      lookData: {},
      addOrUpdate: 0,
      id: "", //企业id
      regionCode: [],
    };
  },
  mounted() {
    this.cityList = city.cityList;
  },
  created() {
    this.getData();
  },
  computed: {
    token() {
      return this.$store.state.user.token;
    },
  },
  methods: {
    // 查看
    look(row) {
      this.lookOver(row);
    },
    // 重置
    setResetParameter() {
      this.entityName = "";
      this.district = [];
      this.entityAddress = "";
      this.remark = "";
      this.fax = "";
      this.postalCode = "";
      this.regionCode = [];
      this.entityPhone = "";
      this.endTime = "";
      this.startTime = "";
      this.organizationName = "";
    },
    //获取数据
    getData() {
      let params = {
        address: "",
        code: "",
        endTime: this.endTime,
        fax: "",
        memo: "",
        name: this.organizationName.trim(),
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        startTime: this.startTime,
        zipcode: "",
      };
      this.$api.userManage.querySelective(params).then((res) => {
        if (res.success == true) {
          this.total = res.data.total;
          this.dataList = res.data.dataList;
          this.setResetParameter();
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    //搜索
    search() {
      this.getData();
    },
    //新建弹出框
    addOrgniazation() {
      this.addOrUpdate = 0;
      this.isModal = true;
      this.title = "新建";
      this.setResetParameter();
    },
    //添加数据
    addEnterprise() {
      if (!this.checkoutData()) {
        return false;
      }
      let params = {
        address: this.entityAddress, //地址
        code: "", //企业编码
        zipcode: this.postalCode, //邮政编码
        endTime: this.endTime, //结束时间
        fax: this.fax, //传真
        memo: this.remark, //备注
        name: this.entityName, //企业名称
        startTime: this.startTime, //开始时间
        region: this.district[this.district.length - 1].__label, //行政区
        regionCode: this.regionCode.join(","), //行政编码
        phoneNum: this.entityPhone,
      };
      console.log(params);
      if (this.addOrUpdate == 0) {
        this.$api.userManage.addEnterprise(params).then((res) => {
          if (res.success == true) {
            this.isModal = false;
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.setResetParameter();
            this.getData();
          } else {
            this.$Notice.error({
              title: res.message,
              top: 50,
              duration: 5,
            });
          }
        });
      } else {
        this.$api.userManage.updateEnterprise(this.id, params).then((res) => {
          if (res.success == true) {
            this.isModal = false;
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.setResetParameter();
            this.getData();
          } else {
            this.$Notice.error({
              title: res.message,
              top: 50,
              duration: 5,
            });
          }
        });
      }
    },
    checkPostalCode() {
      this.postalCode = this.postalCode.replace(/[^\d]/g, "");
      if (this.postalCode.length > 6) {
        this.$Notice.warning({
          title: "单位邮编长度为6位",
          top: 50,
          duration: 5,
        });
      }
    },
    checkEntityPhone() {
      this.entityPhone = this.entityPhone.replace(/[^\d]/g, "");
      if (this.entityPhone.length > 11) {
        this.$Notice.warning({
          title: "单位电话长度不超过11位",
          top: 50,
          duration: 5,
        });
      }
    },
    checkFax() {
      this.fax = this.fax.replace(/[^\d]/g, "");
      if (this.fax.length > 7) {
        this.$Notice.warning({
          title: "单位传真长度不超过7位",
          top: 50,
          duration: 5,
        });
      }
    },
    //时间范围
    startTimeSelect(startTime) {
      this.startTime = startTime;
    },
    endTimeSelect(endTime) {
      this.endTime = endTime;
    },
    //表单查看
    lookOver(item) {
      this.lookData = item;
      this.$refs.selection.lookOver();
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

    //修改弹出框
    update(item) {
      this.addOrUpdate = 1;
      this.title = "修改信息";
      this.entityName = item.name;
      this.district = item.region;
      this.entityAddress = item.address;
      this.remark = item.memo;
      this.id = item.id;
      this.fax = item.fax;
      this.postalCode = item.zipcode;
      this.entityPhone = item.phoneNum;
      this.isModal = true;
    },
    cancel() {
      this.isModal = false;
      this.confirmDelete = false;
    },
    //多选
    multiSelect(selection) {
      this.selectRow = selection;
    },
    //批量删除
    batchesDelete() {
      if (this.selectRow.length > 0) {
        this.confirmDelete = true;
      } else {
        this.$Notice.warning({
          title: "批量删除数据不能为空",
          top: 50,
          duration: 5,
        });
        return;
      }
    },
    //根据ID删除
    deleteEnterprise(item) {
      let params = {
        ids: item.id,
      };
      this.$api.userManage.deleteBatchEnterprise(params).then((res) => {
        if (res.success == true) {
          this.confirmDelete = false;
          this.pageNum = 1;
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.selectRow = [];
          this.getData();
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    //删除操作
    batchesDeleteOpt() {
      let params = {
        ids: this.selectRow.map((item) => item.id).join(),
      };
      console.log(params);
      this.$api.userManage.deleteBatchEnterprise(params).then((res) => {
        if (res.success == true) {
          this.confirmDelete = false;
          this.pageNum = 1;
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.selectRow = [];
          this.getData();
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    //确认删除
    confirm() {
      this.batchesDeleteOpt();
    },
    //分页-选择页数
    changePage(e) {
      this.pageNum = e;
      this.getData();
    },
    //分页-改变pageSize
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getData();
    },
    //选择行政区
    selectCity(val, selectedData) {
      this.regionCode = val;
      this.district = selectedData;
    },
    //表单校验
    checkoutData() {
      if ("" == this.entityAddress) {
        this.$Notice.warning({
          title: "单位地址不能为空",
          top: 50,
          duration: 5,
        });
        return;
      } else if ("" == this.entityName) {
        this.$Notice.warning({
          title: "单位名称不能为空",
          top: 50,
          duration: 5,
        });
        return;
      } else if ("" == this.district) {
        this.$Notice.warning({
          title: "行政区不能为空",
          top: 50,
          duration: 5,
        });
        return;
      } else if (!this.$utils.checkoutPhoneNum(this.entityPhone)) {
        this.$Notice.warning({
          title: "单位电话长度在7位到11位之间",
          top: 50,
          duration: 5,
        });
        return;
      } else if (!this.$utils.checkoutZipCode(this.postalCode)) {
        this.$Notice.warning({
          title: "单位邮编长度为6位",
          top: 50,
          duration: 5,
        });
        return;
      } else if (!this.$utils.checkoutFax(this.fax)) {
        this.$Notice.warning({
          title: "单位传真长度位7位",
          top: 50,
          duration: 5,
        });
        return;
      } else {
        return true;
      }
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
    .search-btn {
      margin-left: @search-lable-space;
    }
  }

  .tb-header-button {
    display: flex;

    .button-item {
      margin-left: @table-btn-space;
    }
  }

  .tb-header-item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-right: @table-input-space;
    color: @lable-font-color;

    .input-style {
      margin-left: @table-lable-space;
      width: 300px;
    }

    .start-time {
      margin-left: @table-lable-space;
    }
  }
}

.pie-tb-iscontent {
  max-width: 100%;

  .tb-style {
    max-width: 100%;
  }
}

//弹出框样式
.modal-content-items {
  .tb-header-content {
    display: flex;
    font-size: @lable-font-size;
    flex-wrap: wrap;

    .tb-header-item {
      display: flex;
      align-items: center;
      white-space: nowrap;
      flex-direction: row;
      flex-wrap: nowrap;
      // margin-right: @table-input-space;
      color: @lable-font-color;
      margin-bottom: 20px;
      width: 50%;

      .input-style {
        margin-left: @table-lable-space;
        width: 280px;
        position: relative;
      }
    }
  }
}

.hint {
  width: 100%;
  text-align: end;
  margin-bottom: @table-lable-space;
  color: @lable-font-color;
}

.last-row {
  display: flex;
  align-items: center;
  color: @lable-font-color;
  margin-bottom: 20px;

  .textarea {
    margin-left: @table-lable-space;
    width: 800px;
  }
}

.text {
  width: 20%;
  text-align: end;
}

.remark {
  width: 11%;
  text-align: end;
  margin-right: 3px;
}

.beizhu {
  color: red;
  margin-left: 3px;
  text-align: center;
}

.time {
  margin: 0 10px;
}

//行政区下拉菜单位置
.input-style {
  /deep/ .ivu-select-dropdown {
    left: -100px !important;
  }
}
</style>
