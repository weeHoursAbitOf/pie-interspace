<template>
  <div class="pie-tb-content">
    <pie-card>
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>单位名称</span>
              <Select v-model="entityNameSearch" multiple class="input-style">
                <Option
                  v-for="item in entityNameSearchList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <div class="tb-header-item">
              <span>角色名称</span>
              <Select clearable v-model="roleNameSearch" class="input-style">
                <Option
                  v-for="item in roleList"
                  :value="item.roleName"
                  :key="item.roleName"
                  >{{ item.roleName }}</Option
                >
              </Select>
            </div>
            <div class="tb-header-item">
              <span>用户名称</span>
              <Input
                v-model="usernameSearch"
                placeholder
                clearable
                class="input-style"
              />
            </div>
          </div>
          <div class="tb-header-content2">
            <div class="tb-header-item">
              <span>注册时间</span>
              <DatePicker
                v-model="startTimeSearch"
                type="date"
                placeholder="开始时间"
                class="start-time"
                format="yyyy-MM-dd"
                @on-change="start"
              ></DatePicker>
              <span style="margin: 0 10px">至</span>
              <DatePicker
                v-model="endTimeSearch"
                type="date"
                placeholder="结束时间"
                format="yyyy-MM-dd"
                @on-change="end"
              ></DatePicker>
              <search-btn class="search-btn" @click="search()"></search-btn>
            </div>
            <div class="tb-header-button">
              <export-btn @click="exportExcel()"></export-btn>
              <batch-delete-btn
                class="button-item"
                @click="batchesDelete"
              ></batch-delete-btn>
              <new-btn class="button-item" @click="addUserInfro"></new-btn>
            </div>
          </div>
        </div>
      </div>
      <div slot="iscontent">
        <div class="pie-tb-iscontent">
          <my-table
            border
            ref="selection"
            :columns="list"
            max-height="500"
            :data="dataList"
            :updateBtn="true"
            :delBtn="true"
            :checkBtn="true"
            @check="check"
            @update="update"
            @confirmDelete="deleteUser"
            @on-selection-change="multiSelect"
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
    <!-- 修改用户信息弹出框 -->
    <my-modal
      width="50"
      height="50"
      v-model="updateModal"
      :title="modelTitle"
      :resetBtn="false"
      @cancel="cancel"
      @confirm="updateUser"
    >
      <div slot="operateItem" class="updModal">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-content">
              <div class="tb-header-item">
                <span>用户名称</span>
                <Input
                  v-model="updUserName"
                  placeholder="请输入用户名称"
                  class="input-style"
                  disabled
                />
              </div>
              <div class="tb-header-item">
                <span>单位名称</span>
                <Select clearable v-model="entityName" class="input-style">
                  <Option
                    v-for="item in entityList"
                    :value="item.id"
                    :key="item.value"
                    >{{ item.name }}</Option
                  >
                </Select>
              </div>
              <div class="tb-header-item">
                <span class="tb-title">职务</span>
                <Input
                  v-model="updPosition"
                  placeholder="请输入职务"
                  class="input-style"
                  clearable
                />
              </div>
              <div class="tb-header-item">
                <span class="tb-title">职称</span>
                <Input
                  v-model="updPositionTitle"
                  placeholder="请输入职称"
                  class="input-style"
                  clearable
                />
              </div>
              <div class="tb-header-item">
                <span class="tb-title">角色</span>
                <!-- :placeholder="updRoleName" -->
                <Select clearable v-model="roleName" class="input-style">
                  <Option
                    v-for="item in roleList"
                    :value="item.roleId"
                    :key="item.value"
                    >{{ item.roleName }}</Option
                  >
                </Select>
              </div>
              <div class="tb-header-item">
                <span class="tb-title">群组</span>
                <Select
                  clearable
                  multiple
                  v-model="groupName"
                  class="input-style"
                  :placeholder="updGroupName"
                >
                  <Option
                    v-for="item in groupList"
                    :value="item.id"
                    :key="item.value"
                    >{{ item.name }}</Option
                  >
                </Select>
              </div>
              <div class="tb-header-item">
                <span>用户状态</span>
                <Select clearable v-model="isCheckUp.value" class="input-style">
                  <Option
                    v-for="item in userStatusList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</Option
                  >
                </Select>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 新建用户信息弹出框 -->
    <my-modal
      width="50"
      height="60"
      v-model="isModal"
      title="新建"
      :resetBtn="false"
      @cancel="cancel"
      @confirm="addAllUser"
    >
      <div slot="operateItem" class="addModal" :key="myModalKey">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-content">
              <div class="hint">
                <sign></sign>
                <span>为必填项</span>
              </div>
              <div class="tb-header-item">
                <span class="text">用户名</span>
                <sign></sign>
                <Input
                  v-model="username"
                  placeholder="请输入用户名"
                  class="input-style"
                  clearable
                />
              </div>
              <div class="tb-header-item">
                <span class="text">单位名称</span>
                <sign></sign>
                <Select clearable v-model="enterpriseId" class="input-style">
                  <Option
                    v-for="item in entityList"
                    :value="item.id"
                    :key="item.value"
                    >{{ item.name }}</Option
                  >
                </Select>
              </div>
              <div class="tb-header-item">
                <span class="text">密码</span>
                <sign></sign>
                <Input
                  v-model="pwd"
                  placeholder="请输入密码"
                  class="input-style"
                  clearable
                />
              </div>
              <div class="tb-header-item">
                <span class="text">职称</span>
                <div class="placeholder"></div>
                <Input
                  v-model="addPost"
                  placeholder="请输入职称"
                  class="input-style"
                  clearable
                />
              </div>
              <div class="tb-header-item">
                <span class="text">确认密码</span>
                <sign></sign>
                <Input
                  v-model="confirmPassword"
                  placeholder="请再次输入密码"
                  class="input-style"
                  clearable
                />
              </div>
              <div class="tb-header-item">
                <span class="text">职务</span>
                <div class="placeholder"></div>
                <Input
                  v-model="positionTitle"
                  placeholder="请输入职务"
                  class="input-style"
                  clearable
                />
              </div>
              <div class="tb-header-item">
                <span class="text">个人手机号</span>
                <sign></sign>
                <Input
                  v-model="mobile"
                  placeholder="请输入11位手机号"
                  class="input-style"
                  clearable
                />
              </div>
              <div class="tb-header-item">
                <span class="text">角色</span>
                <sign></sign>
                <Select clearable v-model="roleName" class="input-style">
                  <Option
                    v-for="item in roleList"
                    :value="item.roleId"
                    :key="item.value"
                    >{{ item.roleName }}</Option
                  >
                </Select>
              </div>
              <div class="tb-header-item">
                <span class="text">群组</span>
                <div class="placeholder"></div>
                <Select
                  clearable
                  multiple
                  v-model="groupName"
                  class="input-style"
                  :max-tag-count="2"
                  :max-tag-placeholder="maxTagPlaceholder"
                >
                  <Option
                    v-for="item in groupList"
                    :value="item.id"
                    :key="item.value"
                    >{{ item.name }}</Option
                  >
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 审核用户信息弹出框 -->
    <my-modal
      width="30"
      height="60"
      v-model="checkModal"
      @cancel="checkCancel"
      @confirm="checkConfirm"
      title="审核用户信息"
      :resetBtn="false"
      :showBtn="true"
      :cancelText="'不通过'"
      :confirmText="'通过'"
    >
      <div slot="operateItem">
        <div class="modal-content-items check">
          <div slot="iscontent">
            <div class="tb-header-content">
              <div class="tb-header-item">
                <span class="tb-title">用户名称:</span>
                <span class="checkInfor">{{ username }}</span>
              </div>
              <div class="tb-header-item">
                <span class="tb-title">单位名称:</span>
                <span class="checkInfor">{{ entityName }}</span>
              </div>
              <div class="tb-header-item">
                <span class="tb-title">单位地址:</span>
                <span class="checkInfor">{{ entityAddress }}</span>
              </div>
              <div class="tb-header-item">
                <span class="tb-title">注册时间:</span>
                <span class="checkInfor">{{ registTime }}</span>
              </div>
              <div class="tb-header-item">
                <span class="tb-title">职务:</span>
                <span class="checkInfor">{{ position }}</span>
              </div>
              <div class="tb-header-item">
                <span class="tb-title">职称:</span>
                <span class="checkInfor">{{ positionTitle }}</span>
              </div>
              <div class="tb-header-item">
                <span class="tb-title">角色:</span>
                <!-- <Select clearable v-model="checkRole.value" class="input-style">
                  <Option
                    v-for="item in roleList"
                    :value="item.roleName"
                    :key="item.value"
                    >{{ item.roleName }}
                  </Option>
                </Select>-->
                <Select clearable v-model="roleName" class="input-style">
                  <Option
                    v-for="item in roleList"
                    :value="item.roleId"
                    :key="item.value"
                    >{{ item.roleName }}</Option
                  >
                </Select>
              </div>
              <div class="tb-header-item">
                <span class="tb-title">群组:</span>
                <!-- <Select
                  clearable
                  multiple
                  v-model="checkGroupName"
                  class="input-style"
                >
                  <Option
                    v-for="item in groupList"
                    :value="item.name"
                    :key="item.value"
                    >{{ item.name }}</Option
                  >
                </Select>-->
                <Select
                  clearable
                  multiple
                  v-model="groupName"
                  class="input-style"
                  :placeholder="updGroupName"
                >
                  <Option
                    v-for="item in groupList"
                    :value="item.id"
                    :key="item.value"
                    >{{ item.name }}</Option
                  >
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 删除弹出框 -->
    <my-dialog
      @confirm="confirm"
      @cancel="cancel"
      :isModal="confirmDelete"
      @delete-password="deletePassword"
    ></my-dialog>
  </div>
</template>
<script>
import page from "@/components/page/page.vue";
// import batchJoinBtn from "@/components/button/batch-join-btn.vue";
import myTable from "@/components/table/my-table.vue";
import Sign from "../../components/sign/sign.vue";

export default {
  components: {
    page,
    // batchJoinBtn,
    myTable,
    Sign,
  },
  data() {
    return {
      // updentityName: "", //修改单位名称
      entityAddress: "", //单位地址
      updEntityAddress: "", //修改单位地址
      position: "",
      checkGroupName: "", //审核群组
      checkRole: {}, //审核角色
      registTime: "", //注册时间
      ifAccept: "", //审核结果
      endTimeSearch: "", //搜索结束时间
      securityQuestion: "", //密保问题
      updateModal: false, //修改用户信息弹出框
      checkModal: false, //审核用户信息弹出框
      userStatusList: [
        {
          value: 1,
          label: "启用",
        },
        {
          value: 3,
          label: "禁用",
        },
      ],
      myModalKey: 0,
      // ---------------------
      total: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      startTime: "", //开始时间
      endTime: "", //结束时间
      entityNameSearch: [], //搜索单位名称
      entityNameSearchList: [
        {
          value: "0",
          label: "航天宏图",
        },
        {
          value: "1",
          label: "国家天文台",
        },
      ],
      roleNameSearch: "", //搜索角色名称
      usernameSearch: "", //搜索用户名称
      usernameSearchList: [
        {
          value: "0",
          label: "test1",
        },
        {
          value: "1",
          label: "test2",
        },
        {
          value: "2",
          label: "test3",
        },
        {
          value: "3",
          label: "test4",
        },
        {
          value: "4",
          label: "test5",
        },
        {
          value: "5",
          label: "test6",
        },
      ],
      startTimeSearch: "", //搜索开始时间
      list: [
        {
          type: "selection",
          width: 52,
          align: "center",
        },
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 70,
        },
        {
          title: "用户名",
          key: "username",
          align: "center",
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "单位名称",
          key: "enterpriseName",
          ellipsis: true,
          align: "center",
          tooltip: true,
        },
        {
          title: "注册时间",
          key: "createTime",
          ellipsis: true,
          align: "center",
          sortable: true,
          tooltip: true,
        },
        {
          title: "角色",
          key: "roleInfo",
          ellipsis: true,
          tooltip: true,
          align: "center",
          filters: [
            {
              label: "卫星研制类-高级",
              value: 1,
            },
            {
              label: "卫星研制类-中级",
              value: 2,
            },
            {
              label: "卫星研制类-初级",
              value: 3,
            },
            {
              label: "火箭发射类-高级",
              value: 4,
            },
            {
              label: "一般用户",
              value: 5,
            },
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.roleInfo == "卫星研制类-高级";
            } else if (value === 2) {
              return row.roleInfo == "卫星研制类-中级";
            } else if (value === 3) {
              return row.roleInfo == "卫星研制类-初级";
            } else if (value === 4) {
              return row.roleInfo == "火箭发射类-高级";
            } else if (value === 5) {
              return row.roleInfo == "一般用户";
            }
          },
        },
        {
          title: "群组",
          key: "groupName",
          ellipsis: true,
          tooltip: true,
          align: "center",
          filters: [
            {
              label: "云服务产品研发",
              value: 1,
            },
            {
              label: "云服务产品",
              value: 2,
            },
            {
              label: "机构群组测试",
              value: 3,
            },
            {
              label: "云服务",
              value: 4,
            },
          ],
          // filterMultiple: true,
          // filterMethod(value, row) {
          //   if (value === 1) {
          //     return row.groupName == "云服务产品研发";
          //   } else if (value === 2) {
          //     return row.groupName == "云服务产品";
          //   } else if (value === 3) {
          //     return row.groupName == "机构群组测试";
          //   } else if (value === 4) {
          //     return row.groupName == "云服务";
          //   }
          // },
          // render: (h, params) => {
          //   let text = "";
          //   let data = params.row.groupList;
          //   if (data != null) {
          //     for (let i = 0; i < data.length; i++) {
          //       text += data[i].name + ";";
          //     }
          //   }
          //   return h("div", [h("div", text)]);
          // },
        },
        {
          title: "用户状态",
          key: "isCheckup",
          ellipsis: true,
          align: "center",
          filters: [
            {
              label: "未审核",
              value: 0,
            },
            {
              label: "启用",
              value: 1,
            },
            {
              label: "审核未通过",
              value: 2,
            },
            {
              label: "禁用",
              value: 3,
            },
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 0) {
              return row.isCheckup == "0";
            } else if (value === 1) {
              return row.isCheckup == "1";
            } else if (value === 2) {
              return row.isCheckup == "2";
            } else if (value === 3) {
              return row.isCheckup == "3";
            }
          },
          render: (h, params) => {
            let isCheckup = params.row.isCheckup;
            if (isCheckup == 0) {
              isCheckup = "未审核";
            } else if (isCheckup == 1) {
              isCheckup = "启用";
            } else if (isCheckup == 2) {
              isCheckup = "审核未通过";
            } else if (isCheckup == 3) {
              isCheckup = "禁用";
            }
            return h("div", [h("div", isCheckup)]);
          },
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center",
          // render: (h, params) => {
          //   return h("div", [
          //     h(
          //       "Button",
          //       {
          //         props: {
          //           type: "success",
          //           size: "small",
          //           disabled: params.row.isCheckUp == "禁用",
          //         },
          //         style: {
          //           marginRight: "15px",
          //         },
          //         on: {
          //           click: () => {
          //             this.check(params);
          //           },
          //         },
          //       },
          //       "审核"
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
          //             },
          //             on: {
          //               "on-ok": () => {
          //
          //
          //                 this.deleteUser(params.row);
          //               },
          //               // "on-cancel": function () {
          //
          //               // },
          //             },
          //           },
          //           "删除"
          //         ),
          //     ]
          //   ),
          // ]);
          // },
        },
      ],
      dataList: [
        {
          row: 1,
          username: "kjadmin",
          enterpriseName: "航天宏图",
          entityName: "北京空间碎片中心",
          createTime: "2016-10-03",
          roleInfo: "管理员",
          groupName: "云服务产品研发",
          isCheckup: 1,
        },
        {
          row: 2,
          username: "kjadmin",
          enterpriseName: "航天宏图",
          entityName: "北京空间碎片中心",
          createTime: "2016-10-03",
          roleInfo: "管理员",
          groupName: "云服务产品研发",
          isCheckup: 1,
        },
        {
          row: 3,
          username: "kjadmin",
          enterpriseName: "航天宏图",
          entityName: "北京空间碎片中心",
          createTime: "2016-10-03",
          roleInfo: "管理员",
          groupName: "云服务产品研发",
          isCheckup: 1,
        },
        {
          row: 4,
          username: "kjadmin",
          enterpriseName: "航天宏图",
          entityName: "北京空间碎片中心",
          createTime: "2016-10-03",
          roleInfo: "管理员",
          groupName: "云服务产品研发",
          isCheckup: 1,
        },
        {
          row: 5,
          username: "kjadmin",
          enterpriseName: "航天宏图",
          entityName: "北京空间碎片中心",
          createTime: "2016-10-03",
          roleInfo: "管理员",
          groupName: "云服务产品研发",
          isCheckup: 1,
        },
        {
          row: 6,
          username: "kjadmin",
          enterpriseName: "航天宏图",
          entityName: "北京空间碎片中心",
          createTime: "2016-10-03",
          roleInfo: "管理员",
          groupName: "云服务产品研发",
          isCheckup: 1,
        },
        {
          row: 7,
          username: "kjadmin",
          enterpriseName: "航天宏图",
          entityName: "北京空间碎片中心",
          createTime: "2016-10-03",
          roleInfo: "管理员",
          groupName: "云服务产品研发",
          isCheckup: 1,
        },
        {
          row: 8,
          username: "kjadmin",
          enterpriseName: "航天宏图",
          entityName: "北京空间碎片中心",
          createTime: "2016-10-03",
          roleInfo: "管理员",
          groupName: "云服务产品研发",
          isCheckup: 1,
        },
        {
          row: 9,
          username: "kjadmin",
          enterpriseName: "航天宏图",
          entityName: "北京空间碎片中心",
          createTime: "2016-10-03",
          roleInfo: "管理员",
          groupName: "云服务产品研发",
          isCheckup: 1,
        },
        {
          row: 70,
          username: "kjadmin",
          enterpriseName: "航天宏图",
          entityName: "北京空间碎片中心",
          createTime: "2016-10-03",
          roleInfo: "管理员",
          groupName: "云服务产品研发",
          isCheckup: 1,
        },
      ], //表单列表
      roleList: [], //角色列表
      isModal: false, //增加用户信息弹出框
      username: "", //用户名称
      enterpriseId: "", //单位名称
      entityList: [], //单位列表
      pwd: "", //密码
      addPost: "", //职务:
      confirmPassword: "", //再次确认密码
      positionTitle: "", //职称
      mobile: "", //手机号
      roleName: "", //角色名称
      groupName: "", //群组
      groupList: [], //群组列表
      updUserName: "", //修改用户名称
      entityName: "", //单位名称
      updPosition: "", //修改职务
      updPositionTitle: "", //修改职称
      updRoleName: "", //修改角色名称
      isCheckUp: {}, //用户状态
      updGroupName: "", //修改群组
      modelTitle: "新建",
      currentId: "", //删除当前行
      selectRow: [], //选中的行
      confirmDelete: false, //批量删除
      userID: 0, //修改用户的ID
      isCheckUpStatus: 0, //审核状态
      roleInfo: "",
      delPassword: "", //删除密码
    };
  },
  created() {
    this.getData();
    this.getRoleList(); //查询角色信息列表
    // this.getEnterpriseData(); //查询单位列表信息赋给下拉框
  },
  mounted() {
    console.log(this.$utils.CheckSecretKey("1fds32dsf"), "校验密码");
    console.log(this.$utils.CheckUserName("zxcvbnmasdfgj"), "校验用户名称");
  },
  methods: {
    // 删除验证密码参数
    deletePassword(val) {
      this.delPassword = val;
    },
    //开始时间
    start(startTime) {
      this.startTime = startTime;
    },
    // 结束时间
    end(endTime) {
      this.endTime = endTime;
    },
    //  搜索
    search() {
      this.getData();
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
    //获取数据
    getData() {
      let params = {
        // userId: 7100, //用户ID
        // suerCreateEndTime: this.endTimeSearch,
        // suerCreateBeginTime: this.entityNameSearch,
        // roleId: [],
        // roleName: this.roleNameSearch,
        // startTime: this.startTimeSearch,
        // username: this.usernameSearch,
        enterpriseName: this.entityNameSearch, //单位名称
        roleName: this.roleNameSearch, //角色名称
        userName: this.usernameSearch, //用户名称
        userCreateBeginTime: this.startTime, //开始时间
        userCreateEndTime: this.endTime, //结束时间
        page: this.pageNum, //页数
        size: this.pageSize, //条数
      };
      this.$api.userManage.newQueryAllUser(params).then((res) => {
        if (res.success == true) {
          this.total = res.data.total;
          this.dataList = res.data.roleList;
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
    //查询所有角色列表
    getRoleList() {
      let params = {
        endTime: "",
        pageNum: 0,
        pageSize: 0,
        productItemId: [],
        roleId: [],
        startTime: "",
        roleName: "",
      };
      this.$api.userManage.getRoleList(params).then((res) => {
        if (res.success == true) {
          this.roleList = res.data.roleList;
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    //点击新建按钮事件
    addUserInfro() {
      // this.username = "";
      // this.position = "";
      // this.positionTitle = "";
      // this.roleName = "";
      // this.groupName = "";
      this.modelTitle = "新建用户信息";
      this.isModal = true;
      this.setResetData();
      // this.myModalKey += 1;
      this.getEnterpriseData(); //查询单位列表信息赋给下拉框
      this.getRoleList(); //查询角色列表信息赋给下拉框
      this.getGroupList(); //查询群组名称信息列表赋给下拉框
    },
    //获取企业名称信息
    getEnterpriseData() {
      let params = {
        address: "",
        code: "",
        fax: "",
        memo: "",
        pageNum: 1,
        pageSize: 100,
        zipcode: "",
      };
      this.$api.userManage.querySelective(params).then((res) => {
        if (res.success == true) {
          this.entityList = res.data.dataList;
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    //获取所有群组信息列表
    getGroupList() {
      let params = {
        endTime: "",
        groupDesc: "",
        memo: "",
        name: "",
        startTime: "",
        userIds: [],
      };
      this.$api.userManage.queryBySelective(params).then((res) => {
        if (res.success == true) {
          this.groupList = res.data.groupList;
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    //新建、修改取消按钮
    cancel() {
      this.isModal = false;
      this.updateModal = false;
      this.confirmDelete = false;
    },
    //添加数据
    addAllUser() {
      if (!this.checkoutData()) {
        return false;
      }

      let params = {
        roleId: this.roleName == "" ? [] : [this.roleName],
        enterpriseId: this.enterpriseId, //单位Id
        groupIds: this.groupName == "" ? [] : this.groupName, //群组ID
        mobile: this.mobile, //手机号
        position: this.addPost, //职务
        positionTitle: this.positionTitle, //职称
        pwd: this.pwd, //密码
        username: this.username, //用户名称
        nickname: this.username, //用户名称
        isCheckUp: "", //审核状态
        userID: "", //用户ID
      };
      console.log(params);
      this.$api.userManage.createUser(params).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.isModal = false;
          this.getData();
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
        // if (res.code == 0) {
        //   this.isModal = false;
        //   this.username = "";
        //   this.entityName = "";
        //   this.mobile = "";
        //   this.pwd = "";
        //   this.position = "";
        //   this.positionTitle = "";
        //   this.roleName = "";
        //   this.groupName = "";
        //   this.getData();
        // } else {

        // }
      });
    },
    //点击修改
    update(item) {
      console.log(item);
      this.modelTitle = "修改用户信息";
      this.updateModal = true;
      this.userID = item.id;
      this.updPosition = item.position;
      this.registTime = item.registTime;
      this.updRoleName = item.roleInfo; //点击修改赋给角色下拉框值
      this.updPositionTitle = item.positionTitle;
      this.updEntityAddress = item.enterpriseAddress; //单位地址
      this.updUserName = item.username;
      this.isCheckUp = {
        value: item.isCheckup,
      };
      this.getGroupList(); //获取群组信息列表
      this.getEnterpriseData(); //查询单位列表信息赋给下拉框
      this.getRoleList(); //查询角色列表信息赋给下拉框
    },
    //多选
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
      // this.selectRow.map((item) => {
      //   let groupNameStr = "";
      //   if (item.groupList.length > 0) {
      //     for (let groupNames of item.groupList) {
      //       groupNameStr += groupNames.name + ";";
      //     }
      //     if (item.isCheckup == 0) {
      //       item.isCheckUps = "未审核";
      //     } else if (item.isCheckup == 1) {
      //       item.isCheckUps = "启用";
      //     } else if (item.isCheckup == 2) {
      //       item.isCheckUps = "审核未通过";
      //     } else if (item.isCheckup == 3) {
      //       item.isCheckUps = "禁用";
      //     }
      //     item.groupName = groupNameStr;
      //     return item;
      //   }
      // });
      this.$refs.selection.$refs.tables.exportCsv({
        filename: "群组数据导出",
        separator: ",",
        columns: this.list.filter((col, index) => index > 0 && index < 8),
        data: JSON.parse(JSON.stringify(this.selectRow)),
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
    //根据ID删除
    deleteUser(item) {
      console.log(item);
      let params = {
        userIds: item.id,
      };
      console.log(params);
      this.$api.userManage.deleteBatchUser(params).then((res) => {
        console.log(res);
        if (res.success == true) {
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
      let params = {
        userIds: this.selectRow.map((item) => item.id).join(),
      };
      this.$api.userManage.deleteBatchUser(params).then((res) => {
        if (res.success == true) {
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
    // //删除操作
    // batchesDeleteOpt() {
    //   // console.log(this.currentId);
    //   // let results = this.selectRow.map((item) => item.id).join();
    //   // let params = {
    //   //   userIds: this.currentId ? this.currentId : results,
    //   // };
    //   // console.log(params);
    //   // this.$api.userManage.deleteBatchUser(params).then((res) => {
    //   //   console.log(res);
    //   //   if (res.success == true) {
    //   //     this.confirmDelete = false;

    //   //     this.selectRow = [];
    //   //     this.getData();
    //   //   } else {

    //   //   }
    //   // });
    // },
    //-----------------------------------

    //修改用户信息
    updateUser() {
      let params = {
        id: this.userID,
        isCheckUp: this.isCheckUp.value,
        organizationId: this.entityName,
        position: this.updPosition,
        positionTitle: this.updPositionTitle,
        roleIds: this.roleName == "" ? [] : [this.roleName],
        groupIds: this.groupName == "" ? [] : this.groupName,
      };
      console.log(params);
      this.$api.userManage.updateUser(params).then((res) => {
        if (res.success == true) {
          this.updateModal = false;
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
      // this.updPosition = "";
      // this.updPositionTitle = "";
      // this.groupName = "";
      // this.roleName = "";
      // this.entityName = "";
    },
    //点击审核
    check(item) {
      console.log(item);
      this.checkModal = true;
      this.getRoleList(); //获取角色信息列表
      this.getGroupList(); //获取群组信息列表
      this.userID = item.id;
      this.username = item.username; //用户名称
      this.entityName = item.enterpriseName; //单位名称
      this.entityAddress = item.enterpriseAddress; //单位地址
      this.registTime = item.createTime; //创建时间
      this.position = item.position; //职务
      this.positionTitle = item.positionTitle; //职称
      this.groupName = item.row.groupName; //群组
      this.roleInfo = item.roleInfo; //角色

      // this.enterpriseId = item.enterpriseInfo.id;
      // //用户状态
      let updateCheck = item.isCheckup;
      if (updateCheck == "0") {
        updateCheck = "未审核";
      } else if (updateCheck == "1") {
        updateCheck = "启用";
      } else if (updateCheck == "2") {
        updateCheck = "审核未通过";
      } else if (updateCheck == "3") {
        updateCheck = "禁用";
      }
      this.isCheckUp = {
        label: updateCheck,
        value: updateCheck,
      };
    },
    //取消审核
    checkCancel() {
      // 禁用
      this.isCheckUp.value = 2;
      this.roleName = "";
      this.groupName = "";
      this.updateUser();
      this.checkModal = false;
      // this.getUpdateUserStatus();
    },
    //确认审核
    checkConfirm() {
      // 启用
      this.isCheckUp.value = 1;
      this.updateUser();
      this.checkModal = false;
      // this.getUpdateUserStatus();
    },
    // 审核状态请求
    // getUpdateUserStatus() {
    //   let formData = new FormData();
    //   formData.append("userId", this.userID);
    //   formData.append("isCheckUp", this.isCheckUpStatus);
    //   this.$api.userManage.updateUserStatus(formData).then((res) => {
    //     if (res.success == true) {

    //       this.checkModal = false;
    //     } else {

    //     }
    //   });
    // },
    //表单手机号、密码校验
    checkoutData() {
      if (!this.username) {
        this.$Notice.warning({
          title: "用户名不能为空",
          top: 50,
          duration: 5,
        });
        return;
      } else if (!this.enterpriseId) {
        this.$Notice.warning({
          title: "单位名称不能为空",
          top: 50,
          duration: 5,
        });
        return;
      } else if (!this.pwd || this.confirmPassword != this.pwd) {
        this.$Notice.warning({
          title: "密码不一致，请重新输入密码!",
          top: 50,
          duration: 5,
        });
        return;
      } else if (!this.$utils.checkoutPhoneNum(this.mobile)) {
        this.$Notice.warning({
          title: "手机号码格式错误，请重新输入！",
          top: 50,
          duration: 5,
        });
        return;
      } else {
        return true;
      }
    },
    // 重置参数
    setResetData() {
      this.startTime = ""; //开始时间
      this.endTime = ""; //结束时间
      this.entityNameSearch = []; //搜索单位名称
      this.roleNameSearch = ""; //搜索角色名称
      this.usernameSearch = ""; //搜索用户名称
      this.startTimeSearch = ""; //搜索开始时间
      this.endTimeSearch = "";
      this.username = ""; //用户名称
      this.enterpriseId = ""; //单位名称
      this.entityList = []; //单位列表
      this.pwd = ""; //密码
      this.addPost = ""; //职务:
      this.confirmPassword = ""; //再次确认密码
      this.positionTitle = ""; //职称
      this.mobile = ""; //手机号
      this.roleName = ""; //角色名称
      this.groupName = ""; //群组
      this.groupList = []; //群组列表
    },
    //群组输入框超出....显示
    maxTagPlaceholder() {
      return "....";
    },
    // //审核通过
    // pass() {
    //   this.isCheckUp.value = 1;
    //   this.updateUser();
    //   this.checkModal = false;
    // },
    // //审核未通过
    // noPass() {
    //   this.isCheckUp.value = 0;
    //   this.updateUser();
    //   this.checkModal = false;
    // },
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
    justify-content: space-between;

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

//表格样式
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

      .text {
        width: 80px;
        text-align: right;
        margin-right: 3px;
      }

      .input-style {
        margin-left: @table-lable-space;
        width: 220px;
        // width: 300px;
      }

      .start-time {
        margin-left: @table-lable-space;
      }

      .tb-title {
        width: 15%;
        text-align: end;
      }

      .checkInfor {
        margin-left: 20px;
      }

      .ivu-radio-wrapper {
        margin-left: 90px;
      }
    }
  }
}

.hint {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: @table-lable-space;
  color: @lable-font-color;
}

//已审核状态按钮颜色
/deep/ .ivu-btn-success[disabled] {
  color: gray;
  background-color: transparent;
}

//修改弹出框样式
.updModal {
  .modal-content-items {
    .tb-header-content {
      display: flex;
      font-size: @lable-font-size;
      flex-wrap: wrap;

      .tb-header-item {
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        flex-direction: row;
        flex-wrap: nowrap;
        // margin-right: @table-input-space;
        color: @lable-font-color;
        margin-bottom: 20px;
        width: 46%;

        .input-style {
          margin-left: @table-lable-space;
          width: 280px;
          position: relative;
        }
      }
    }
  }
}

//新建弹出框样式
.addModal {
  .modal-content-items {
    .tb-header-content {
      display: flex;
      font-size: @lable-font-size;
      flex-wrap: wrap;
      margin: 20px;

      .tb-header-item {
        .input-style {
          margin-left: @table-lable-space;
          width: 280px;
        }
      }

      .tb-title {
        width: 21%;
        text-align: end;
      }

      .placeholder {
        width: 6px;
      }
    }
  }
}

.pass {
  font-weight: 400;
  border-style: solid;
  background-color: @btn-bg-color;
}

.noPass {
  text-align: center;
  font-weight: 400;
  border-style: solid;
  border-color: #2e8095;
}
</style>
