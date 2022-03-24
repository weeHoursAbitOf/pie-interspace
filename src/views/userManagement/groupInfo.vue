<template>
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>群组名称</span>
              <Input v-model="searchGroupName" clearable placeholder="请输入群组名称" class="input-style" />
            </div>
            <div class="tb-header-item">
              <span>创建时间</span>
              <DatePicker
                type="date"
                split-panels
                v-model="startTime"
                placeholder="选择时间"
                clearable
                class="date-style"
                @on-change="selectStartTime"
              ></DatePicker>
              <span class="date-mark">至</span>
              <DatePicker
                type="date"
                split-panels
                v-model="endTime"
                placeholder="选择时间"
                clearable
                class="date-style"
                @on-change="selectEndTime"
              ></DatePicker>
              <search-btn class="search-btn" @click="searchGroup"></search-btn>
            </div>
          </div>
          <div class="tb-header-content2">
            <div class="tb-header-button">
              <export-btn @click="exportExcel()"></export-btn>
              <batch-delete-btn class="button-item" @click="batchesDelete"></batch-delete-btn>
              <new-btn class="button-item" @click="addGroupInfo"></new-btn>
            </div>
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
            disabled-hover
            :data="dataList"
            @on-selection-change="multiSelect"
            :lookItem="lookItem"
            :lookIObject="lookData"
            :lookBtn="true"
            @look="look"
            :updateBtn="true"
            @update="update"
            :delBtn="true"
            @confirmDelete="deleteGroup"
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
    <!-- 新建弹出框 -->
    <my-modal
      width="30"
      height="60"
      v-model="isModal"
      @cancel="cancel"
      :title="title"
      :resetBtn="false"
      :close="false"
      @confirm="createGroup"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-content">
              <div class="tb-header-item">
                <span>群组名称</span>
                <Input v-model="groupName" placeholder="请输入群组名称" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span>群组介绍</span>
                <Input v-model="groupDescription" placeholder="请输入群组介绍" class="input-style" />
              </div>
              <div class="tb-header-item group-info">
                <span>群组成员</span>
                <div class="input-style group-member" @click="addGroupMember">
                  <!-- <div>
                    <template v-for="(member, index) in getGroupList">
                      <span :key="member.id">
                        {{ member[titleKey] }}
                        <label v-if="index < getGroupList.length - 1">,</label>
                      </span>
                    </template>
                  </div>-->
                  <div>
                    <template v-for="(member, index) in getUserList">
                      <span :key="member.id">
                        {{ member[titleKey] }}
                        <label v-if="index < getUserList.length - 1">,</label>
                      </span>
                    </template>
                  </div>
                  <span class="iconfont icon-jia"></span>
                </div>
              </div>
              <div class="tb-header-item">
                <span>群组状态</span>
                <RadioGroup v-model="groupStatus" class="input-style">
                  <Radio label="0">
                    <span>禁用</span>
                  </Radio>
                  <Radio label="1">
                    <span>启用</span>
                  </Radio>
                </RadioGroup>
              </div>
              <div class="tb-header-item">
                <span class="tb-title">备注</span>
                <Input
                  v-model="remark"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入备注信息"
                  class="input-style"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
    <div class="group-drag-modal" v-if="dragAffirm">
      <drag-modal
        width="60"
        height="80"
        :selectList="selectList"
        :titleKey="titleKey"
        :targetList="targetList"
        :callBackTitleType="callBackTitleType"
        @changeType="changeType"
        @affirm="createAffirm"
        @search-group="searchGroupUser"
        @cancel="cancelGroupUser"
      ></drag-modal>
    </div>
    <!-- 批量删除弹出框 -->
    <my-dialog @confirm="confirm" @cancel="cancel" :isModal="confirmDelete"></my-dialog>
  </div>
</template>
<script>
import pieCard from "@/components/pie-card/pie-card.vue";
import page from "@/components/page/page.vue";
import myModal from "@/components/modals/modal.vue";
import myTable from "@/components/table/my-table.vue";
import dragModal from "@/components/drag-list/drag-modals.vue";

export default {
  components: {
    pieCard,
    page,
    myModal,
    myTable,
    dragModal,
  },
  data() {
    return {
      total: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      timeHorizon: "",
      groupName: "", //群组名称
      searchGroupName: "",
      groupDescription: "", //群组介绍
      groupMembers: "", //群组成员
      remark: "", //备注
      createTime: "", //创建时间
      list: [
        {
          type: "selection",
          width: 52,
          align: "center",
        },
        {
          title: "序号",
          key: "row",
          width: 70,
          align: "center",
        },
        {
          title: "群组名称",
          key: "name",
          ellipsis: true,
          align: "center",
        },
        {
          title: "群组介绍",
          ellipsis: true,
          key: "groupDesc",
          align: "center",
        },
        {
          title: "群组成员",
          ellipsis: true,
          key: "userName",
          align: "center",
          tooltip: true,
          slot: "dataHandle",
        },
        {
          title: "群组状态",
          key: "status",
          ellipsis: true,
          align: "center",
          render: (h, params) => {
            return h("div",
              params.row.status == 0 ? '禁用' : '启用'
            )
          }
        },
        {
          title: "创建时间",
          key: "createTime",
          ellipsis: true,
          align: "center",
        },
        {
          title: "备注",
          key: "memo",
          ellipsis: true,
          align: "center",
          tooltip: true,
        },
        {
          title: "操作",
          key: "operation",
          slot: "action",
          align: "center",
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
          //           marginRight: "10px",
          //         },
          //         on: {
          //           click: () => {
          //             this.lookOver(params.row);
          //             // this.showDetail(params.ro)w.uuid);
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
          //             // this.showDelete(params.row.uuid, params.row.ruleName);
          //           },
          //         },
          //       },
          //       "修改"
          //     ),
          //     // h(
          //     //   "Button",
          //     //   {
          //     //     props: {
          //     //       type: "error",
          //     //       size: "small",
          //     //     },
          //     //     on: {
          //     //       click: () => {
          //     //         // this.showDelete(params.row.uuid, params.row.ruleName);
          //     //       },
          //     //     },
          //     //   },
          //     //   "删除"
          //     // ),
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
          //             },
          //             on: {
          //               "on-ok": () => {
          //          
          //                 this.deleteGroup(params.row);
          //               },
          //               "on-cancel": function () {
          //              
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
      dataList: [], //表单列表
      isModal: false,
      dragAffirm: false,
      //成员列表
      userList: [],
      lookItem: [
        { title: "群组名称", key: "name" },
        { title: "创建时间	", key: "createTime" },
        { title: "简介", key: "groupDesc" },
        { title: "群组成员", key: "userName" },
        { title: "备注", key: "memo" },
      ],
      lookData: {},
      startTime: "",
      endTime: "",
      selectRow: [], //选中的行
      currentId: "", //删除当前行
      confirmDelete: false,
      addOrUpdate: 0,
      title: "新建",
      id: "", //系统用户组id
      organizationList: [],
      selectList: [],
      targetList: [],
      titleKey: "name",
      callBackTitleType: false,
      username: "",
      name: "",
      getGroupList: [],
      getUserList: [],
      groupStatus: "1",//群组状态
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 查看
    look(row) {
      this.lookOver(row);
    },
    // 重置输入参数
    setResetData() {
      this.searchGroupName = "";
      this.startTime = "";
      this.endTime = "";
      this.groupName = "";
      this.groupDescription = "";
      this.remark = "";
      this.getGroupList = [];
      this.getUserList = [];
    },
    // 开始时间
    selectStartTime(startTime) {
      this.startTime = startTime;
    },
    // 结束时间
    selectEndTime(endTime) {
      this.endTime = endTime;
    },
    //查看详情
    lookOver(item) {
      let text = "";
      if (item.userName.length > 0) {
        for (let i = 0; i < item.userName.length; i++) {
          text += item.userName[i].username;
        }
      }
      let obj = {
        name: item.name,
        createTime: item.createTime,
        groupDesc: item.groupDesc,
        userName: text,
        memo: item.memo,
      };
      this.lookData = obj;
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
      let exportData = this.selectRow.map((item) => {
        let userNameStr = "";
        for (let userNames of item.userName) {
          userNameStr += userNames.username + ";";
        }
        item.userName = userNameStr;
        return item;
      });
      this.$refs.selection.$refs.tables.exportCsv({
        filename: "群组数据导出",
        separator: ",",
        columns: this.list.filter((col, index) => index > 0 && index < 7),
        data: exportData,
      });
    },
    //新建弹出框
    addGroupInfo() {
      this.addOrUpdate = 0;
      this.isModal = true;
      this.title = "新建";
      this.setResetData();
    },
    //修改弹出框
    update(item) {
      this.addOrUpdate = 1;
      this.title = "修改信息";
      this.id = item.id;
      this.groupName = item.name;
      this.remark = item.memo;
      this.groupDescription = item.groupDesc;
      this.isModal = true;
    },
    //获取数据
    getData() {
      let params = {
        endTime: this.endTime,
        startTime: this.startTime,
        userIds: [], //群组ID
        enterpriseIds: "", //计购ID
        name: this.searchGroupName, //组名称
        groupDesc: "", //描述
        memo: "", //备注
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        // userIds: [],
      };
      this.$api.userManage.queryBySelective(params).then((res) => {
        if (res.success == true) {
          this.total = res.data.total;
          this.dataList = res.data.groupList;
          this.setResetData();
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });

        }
      });
    },
    //创建群组
    createGroup() {
      let getGroupList = this.getGroupList.map((item) => item.id);
      let getUserList = this.getUserList.map((item) => item.id);
      let params = {
        enterpriseIds: getGroupList, //机构ID
        groupDesc: this.groupDescription, //机构用户描述
        memo: this.remark, //备注
        name: this.groupName, //组件名
        userIds: getUserList, //用户ID
      };
      if (this.addOrUpdate == 0) {
        this.$api.userManage.createGroup(params).then((res) => {
          if (res.code == 0) {
            this.isModal = false;
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.setResetData();
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
        this.$api.userManage.updateGroup(this.id, params).then((res) => {
          if (res.code == 0) {
            this.isModal = false;
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
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
    //删除角色
    deleteGroup(item) {
      // this.currentId = item.id;
      // this.batchesDeleteOpt();
      let params = {
        groupIds: item.id,
      };
      this.$api.userManage.deleteGroupBatch(params).then((res) => {
        if (res.code == 0) {
          this.confirmDelete = false;
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
    //多选
    multiSelect(selection) {
      this.selectRow = selection;
    },
    //删除操作
    batchesDeleteOpt() {
      let results = this.selectRow.map((item) => item.id).join();
      let params = {
        groupIds: this.currentId ? this.currentId : results,
      };
      this.$api.userManage.deleteGroupBatch(params).then((res) => {
        if (res.code == 0) {
          this.confirmDelete = false;
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
    //搜索
    searchGroup() {
      this.getData();
    },
    // 取消
    cancel() {
      this.isModal = false;
      this.confirmDelete = false;
    },
    //添加群组成员
    addGroupMember() {
      this.callBackTitleType = true;
      this.dragAffirm = true;
    },
    // 新增搜索
    searchGroupUser(val, type) {
      if (type) {
        // 机构
        this.name = val;
        this.getOrganization();
      } else {
        // 用户
        this.username = val;
        this.getUserData();
      }
    },
    // 新增类型切换
    changeType(item) {
      if (item.value == 0) {
        //机构
        this.getOrganization();
        this.callBackTitleType = true;
      } else if (item.value == 1) {
        //用户
        this.getUserData();
        this.callBackTitleType = false;
      }
    },
    //选中成员结果
    createAffirm(item) {
      this.getGroupList = item.group;
      this.getUserList = item.user;
      // this.targetList = item.list2;
      this.dragAffirm = false;
    },
    // 取消新增群组
    cancelGroupUser() {
      this.dragAffirm = false;
    },
    //获得用户
    getUserData() {
      let params = {
        endTime: "",
        enterpriseName: "",
        roleId: [],
        roleName: "",
        startTime: "",
        username: this.username,
      };
      this.$api.userManage.newQueryAllUser(params).then((res) => {
        if (res.success == true) {
          this.titleKey = "username";
          this.selectList = res.data.roleList;
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });

        }
      });
    },
    //获取机构数据
    getOrganization() {
      let params = {
        name: this.name,
      };
      this.$api.userManage.querySelective(params).then((res) => {
        if (res.success == true) {
          // this.organizationList = res.data.dataList;
          // this.selectList = res.data.dataList;
          this.titleKey = "name";
          this.selectList = res.data.dataList;
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });

        }
      });
    },

    // //分页-选择页数
    changePage(e) {
      this.pageNum = e;
      this.getData();
    },
    //分页-改变pageSize
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getData();
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
    margin-bottom: @table-input-space;

    .search-btn {
      margin-left: @search-lable-space;
    }
  }

  .tb-header-content2 {
    display: flex;
    width: 100%;
    justify-content: flex-end;

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

    .date-style {
      margin-left: @table-lable-space;
      width: 260px;
    }

    .date-mark {
      margin: 0 -20px 0 10px;
    }

    .input-style {
      margin-left: @table-lable-space;
      width: 300px;
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

      .start-time {
        margin-left: @table-lable-space;
      }

      .tb-title {
        width: 15%;
        text-align: end;
      }
    }

    .tb-header-item:last-child {
      align-items: end;
    }
  }
}

.group-drag-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1001;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}

.group-member {
  display: flex;
  flex-wrap: wrap;
}
</style>