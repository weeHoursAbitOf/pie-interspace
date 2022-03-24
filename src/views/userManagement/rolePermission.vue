<template>
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <!-- <div class="tb-header-item">
              <span>单位名称</span>
              <Input v-model="entityName" placeholder="请输入单位名称" class="input-style" clearable />
            </div>-->
            <div class="tb-header-item">
              <span>产品类型</span>
              <Select multiple v-model="productType" class="input-style">
                <Option
                  v-for="item in productTypeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <div class="tb-header-item">
              <span>角色名称</span>
              <Input
                v-model="roleName"
                placeholder="请输入角色名称"
                class="input-style"
                clearable
              />
            </div>
            <div class="tb-header-item">
              <span>创建时间</span>
              <DatePicker
                type="date"
                v-model="startTime"
                placeholder="开始时间"
                class="start-time"
                @on-change="startTimeSelect"
              ></DatePicker>
              <span style="margin: 0 10px">至</span>
              <DatePicker
                type="date"
                v-model="endTime"
                placeholder="结束时间"
                @on-change="endTimeSelect"
              ></DatePicker>
              <search-btn class="search-btn" @click="search()"></search-btn>
            </div>
          </div>
          <div class="tb-header-content2">
            <div class="tb-header-button">
              <export-btn @click="exportExcel()"></export-btn>
              <batch-delete-btn
                class="button-item"
                @click="batchesDelete"
              ></batch-delete-btn>
              <new-btn class="button-item" @click="newRole()"></new-btn>
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
            :data="dataList"
            @on-selection-change="multiSelect"
            :lookItem="lookItem"
            :lookIObject="lookData"
            :lookBtn="true"
            @look="look"
            :updateBtn="true"
            @update="update"
            :delBtn="true"
            @confirmDelete="deleteRole"
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
    <!-- 新建、修改弹窗 -->
    <my-modal
      width="80"
      height="80"
      v-model="isModal"
      :resetBtn="false"
      @cancel="cancel"
      @reset="reset"
      @confirm="operationRole"
      :title="modalTitle"
    >
      <div slot="operateItem" class="new-role" :key="myModalKey">
        <div class="modal-content-items">
          <div>
            <div class="model-first-line">
              <div class="modal1-items">
                <span class="modal-title">角色名称</span>
                <Input
                  v-model="roleName2"
                  placeholder="请输入角色名称"
                  class="modal-input"
                  clearable
                />
              </div>
            </div>

            <div class="model-first-line">
              <div class="modal1-items">
                <span class="modal-title">角色类型</span>
                <Select v-model="userType" class="modal-input">
                  <Option
                    v-for="(item, index) in userTypeList"
                    :value="item.value"
                    :key="index"
                    >{{ item.label }}</Option
                  >
                </Select>
              </div>
            </div>

            <div class="modal1-items">
              <span class="modal-title">产品需求</span>
              <div class="modal-product-require">
                <div v-show="userType == '0' || userType == '1'">
                  <div class="product-require-item">
                    <span class="product-require-title">基础</span>
                  </div>
                  <div class="product-require-items">
                    <template v-for="(basicsItem, index) in basicsProducts">
                      <div class="product-require-item" :key="basicsItem.pkId">
                        <Checkbox
                          v-model="basicsItem.isChecked"
                          @on-change="checkboxItem(basicsItem)"
                          v-if="basicsItem.isChecked"
                          >{{ basicsItem.name }}</Checkbox
                        >
                        <Checkbox
                          v-model="basicsItem.isChecked"
                          @on-change="checkboxItem(basicsItem)"
                          v-else
                          >{{ basicsItem.name }}</Checkbox
                        >
                        <div>
                          <!-- <span>{{ basicsItem.serviceControlDesc }}</span> -->
                          <Select
                            :placeholder="basicsItem.serviceControlDesc"
                            :value="basicsItem.serviceLimit"
                            class="product-require-style"
                            @on-change="selectCurrent($event, basicsItem)"
                          >
                            <Option
                              v-for="item in basicsItem.serviceControlLimits"
                              :value="item"
                              :label="item"
                              :key="item"
                              >{{ item }}</Option
                            >
                          </Select>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>

                <dir v-show="userType != '0'">
                  <div class="product-require-item">
                    <span class="product-require-title">高级</span>
                  </div>
                  <div class="product-require-items">
                    <template v-for="(advancedItem, index) in advancedProducts">
                      <div class="product-require-item" :key="index">
                        <Checkbox
                          v-if="advancedItem.isChecked"
                          v-model="advancedItem.isChecked"
                          @on-change="checkboxItem(advancedItem)"
                          >{{ advancedItem.name }}</Checkbox
                        >
                        <Checkbox
                          v-else
                          v-model="advancedItem.isChecked"
                          @on-change="checkboxItem(advancedItem)"
                          >{{ advancedItem.name }}</Checkbox
                        >
                        <div>
                          <!-- <span>{{ advancedItem.serviceControlDesc }}</span> -->
                          <Select
                            :placeholder="advancedItem.serviceControlDesc"
                            class="product-require-style"
                            :value="advancedItem.serviceLimit"
                            @on-change="selectCurrent($event, advancedItem)"
                          >
                            <Option
                              v-for="item in advancedItem.serviceControlLimits"
                              :value="item"
                              :key="item"
                              >{{ item }}</Option
                            >
                          </Select>
                        </div>
                      </div>
                    </template>
                  </div>
                </dir>

                <div v-show="userType == '2'">
                  <div class="product-require-item">
                    <span class="product-require-title">定向</span>
                  </div>
                  <div class="product-require-items">
                    <template v-for="(orientItem, index) in orientProducts">
                      <div
                        class="product-require-item orientProducts"
                        :key="index"
                      >
                        <Checkbox
                          v-if="orientItem.isChecked"
                          v-model="orientItem.isChecked"
                          @on-change="checkboxItem(orientItem)"
                          >{{ orientItem.name }}</Checkbox
                        >
                        <Checkbox
                          v-else
                          v-model="orientItem.isChecked"
                          @on-change="checkboxItem(orientItem)"
                          >{{ orientItem.name }}</Checkbox
                        >
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal1-items">
              <span class="modal-title">角色行为</span>
              <div class="modal-footer-twoline">
                <Checkbox v-model="isRead" class="radio">支持查看</Checkbox>
                <Checkbox v-model="isDownload" class="radio">支持下载</Checkbox>
                <!-- <Checkbox v-model="isDefined" class="radio"
                  >需求自定义</Checkbox
                >-->
              </div>
            </div>
            <div class="modal1-items role-status">
              <span class="modal-title">角色状态</span>
              <div class="modal-footer-twoline">
                <RadioGroup v-model="roleStatus">
                  <Radio label="1" value="1" class="radio">启用</Radio>
                  <Radio label="0" value="0" class="radio">禁用</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 批量删除弹出框 -->
    <my-dialog
      @confirm="confirmRemove"
      @cancel="cancel"
      :isModal="confirmDelete"
    ></my-dialog>
  </div>
</template>
<script>
import page from "@/components/page/page.vue";
// import batchJoinBtn from "@/components/button/batch-join-btn.vue";
import myModal from "@/components/modals/modal.vue";

import myTable from "@/components/table/my-table.vue";

export default {
  components: {
    page,
    // batchJoinBtn,
    myModal,
    myTable,
  },
  data() {
    return {
      userType: "",
      userTypeList: [
        {
          value: "0",
          label: "基础用户",
        },
        {
          value: "1",
          label: "高级用户",
        },
        {
          value: "2",
          label: "定向用户",
        },
      ],
      total: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      productType: [],
      list: [
        {
          type: "selection",
          width: 55,
          align: "center",
        },
        {
          title: "序号",
          key: "row",
          align: "center",
          width: 70,
        },
        {
          title: "角色名称",
          key: "roleName",
          ellipsis: true,
          align: "center",
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
        },
        {
          title: "权限范围",
          key: "competence",
          align: "center",
          ellipsis: true,
          tooltip: true,
          width: 500,
          render: (h, params) => {
            let text = "";
            let data = params.row.productResourceAccessList;
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                if (data[i].serviceLimit) {
                  text +=
                    data[i].productItemName +
                    "(" +
                    data[i].serviceLimit +
                    ")" +
                    ";";
                } else {
                  text += data[i].productItemName + ";";
                }
              }
            }
            return h("div", [
              h(
                "Tooltip",
                {
                  props: {
                    placement: "top-start",
                    transfer: true,
                  },
                },
                [
                  text,
                  h(
                    "span",
                    {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                      },
                    },
                    text
                  ),
                ]
              ),
            ]);

            // return h("div", [h("div", text)]);
          },
        },
        {
          title: "角色状态",
          key: "status",
          ellipsis: true,
          align: "center",
          render: (h, params) => {
            return h("div", params.row.status == 1 ? "启用" : "禁用");
          },
        },
        {
          title: "操作",
          width: 210,
          slot: "action",
          key: "operation",
          align: "center",
        },
      ],
      data: [],
      isModal: false,
      updateModal: false,
      confirmDelete: false,
      single: [],
      catalogCheck: "",
      catalog: "",
      track: "",
      space: "",
      warning: "",
      breakUp: "",
      safe: "",
      downfall: "",
      monthly: "",
      brief: "",
      special: "",
      roleBehavior: "roleBehavior1",
      timeList: [],
      productTypeList: [
        {
          value: "0",
          label: "编目产品",
        },
        {
          value: "1",
          label: "轨道产品",
        },
        {
          value: "2",
          label: "空间态势报告",
        },
        {
          value: "3",
          label: "在轨预警产品",
        },
        {
          value: "4",
          label: "发射预警产品",
        },
        {
          value: "5",
          label: "解体事件分析",
        },
        {
          value: "6",
          label: "陨落事件分析",
        },
        {
          value: "7",
          label: "安全规避分析",
        },
        {
          value: "8",
          label: "工作月报",
        },
        {
          value: "9",
          label: "工作简报",
        },
        {
          value: "10",
          label: "工作专报",
        },
        {
          value: "11",
          label: "视频",
        },
        {
          value: "12",
          label: "系统状态产品",
        },
        {
          value: "13",
          label: "系统服务产品",
        },
      ],
      dataList: [
        {
          roleId: 1,
          roleName: "管理员",
          code: "ROLE_ADMIN",
          description: "",
          status: 1,
          createUser: 1,
          createTime: "2021-03-02 09:59:00",
          lastModifierUser: 7090,
          lastModifyTime: "2021-04-01 10:00:00",
          applicationId: 1,
          row: 1,
          productResourceAccessList: [
            {
              pkId: 107,
              productItemId: 1,
              isRead: 0,
              isDownload: 1,
              isDefined: 0,
              serviceLimit: 100,
              productItemName: "轨道产品",
            },
            {
              pkId: 108,
              productItemId: 2,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 500,
              productItemName: "编目产品",
            },
            {
              pkId: 109,
              productItemId: 3,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 1000,
              productItemName: "空间态势报告",
            },
            {
              pkId: 200,
              productItemId: 5,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 100,
              productItemName: "发射预警产品",
            },
            {
              pkId: 201,
              productItemId: 6,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 5,
              productItemName: "解体事件分析",
            },
          ],
        },
        {
          roleId: 2,
          roleName: "高级-研究员",
          code: "ROLE_ADMIN",
          description: "",
          status: 1,
          createUser: 1,
          createTime: "2021-03-02 09:59:00",
          lastModifierUser: 7090,
          lastModifyTime: "2021-04-01 10:00:00",
          applicationId: 1,
          row: 1,
          productResourceAccessList: [
            {
              pkId: 107,
              productItemId: 1,
              isRead: 0,
              isDownload: 1,
              isDefined: 0,
              serviceLimit: 100,
              productItemName: "轨道产品",
            },
            {
              pkId: 108,
              productItemId: 2,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 500,
              productItemName: "编目产品",
            },
            {
              pkId: 109,
              productItemId: 3,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 1000,
              productItemName: "空间态势报告",
            },
            {
              pkId: 200,
              productItemId: 5,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 100,
              productItemName: "发射预警产品",
            },
            {
              pkId: 201,
              productItemId: 6,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 5,
              productItemName: "解体事件分析",
            },
          ],
        },
        {
          roleId: 2,
          roleName: "高级-研究员",
          code: "ROLE_ADMIN",
          description: "",
          status: 1,
          createUser: 1,
          createTime: "2021-03-02 09:59:00",
          lastModifierUser: 7090,
          lastModifyTime: "2021-04-01 10:00:00",
          applicationId: 1,
          row: 1,
          productResourceAccessList: [
            {
              pkId: 107,
              productItemId: 1,
              isRead: 0,
              isDownload: 1,
              isDefined: 0,
              serviceLimit: 100,
              productItemName: "轨道产品",
            },
            {
              pkId: 108,
              productItemId: 2,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 500,
              productItemName: "编目产品",
            },
            {
              pkId: 109,
              productItemId: 3,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 1000,
              productItemName: "空间态势报告",
            },
            {
              pkId: 200,
              productItemId: 5,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 100,
              productItemName: "发射预警产品",
            },
            {
              pkId: 201,
              productItemId: 6,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 5,
              productItemName: "解体事件分析",
            },
          ],
        },
        {
          roleId: 2,
          roleName: "高级-研究员",
          code: "ROLE_ADMIN",
          description: "",
          status: 1,
          createUser: 1,
          createTime: "2021-03-02 09:59:00",
          lastModifierUser: 7090,
          lastModifyTime: "2021-04-01 10:00:00",
          applicationId: 1,
          row: 1,
          productResourceAccessList: [
            {
              pkId: 107,
              productItemId: 1,
              isRead: 0,
              isDownload: 1,
              isDefined: 0,
              serviceLimit: 100,
              productItemName: "轨道产品",
            },
            {
              pkId: 108,
              productItemId: 2,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 500,
              productItemName: "编目产品",
            },
            {
              pkId: 109,
              productItemId: 3,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 1000,
              productItemName: "空间态势报告",
            },
            {
              pkId: 200,
              productItemId: 5,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 100,
              productItemName: "发射预警产品",
            },
            {
              pkId: 201,
              productItemId: 6,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 5,
              productItemName: "解体事件分析",
            },
          ],
        },
        {
          roleId: 2,
          roleName: "高级-研究员",
          code: "ROLE_ADMIN",
          description: "",
          status: 1,
          createUser: 1,
          createTime: "2021-03-02 09:59:00",
          lastModifierUser: 7090,
          lastModifyTime: "2021-04-01 10:00:00",
          applicationId: 1,
          row: 1,
          productResourceAccessList: [
            {
              pkId: 107,
              productItemId: 1,
              isRead: 0,
              isDownload: 1,
              isDefined: 0,
              serviceLimit: 100,
              productItemName: "轨道产品",
            },
            {
              pkId: 108,
              productItemId: 2,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 500,
              productItemName: "编目产品",
            },
            {
              pkId: 109,
              productItemId: 3,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 1000,
              productItemName: "空间态势报告",
            },
            {
              pkId: 200,
              productItemId: 5,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 100,
              productItemName: "发射预警产品",
            },
            {
              pkId: 201,
              productItemId: 6,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 5,
              productItemName: "解体事件分析",
            },
          ],
        },
        {
          roleId: 2,
          roleName: "高级-研究员",
          code: "ROLE_ADMIN",
          description: "",
          status: 1,
          createUser: 1,
          createTime: "2021-03-02 09:59:00",
          lastModifierUser: 7090,
          lastModifyTime: "2021-04-01 10:00:00",
          applicationId: 1,
          row: 1,
          productResourceAccessList: [
            {
              pkId: 107,
              productItemId: 1,
              isRead: 0,
              isDownload: 1,
              isDefined: 0,
              serviceLimit: 100,
              productItemName: "轨道产品",
            },
            {
              pkId: 108,
              productItemId: 2,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 500,
              productItemName: "编目产品",
            },
            {
              pkId: 109,
              productItemId: 3,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 1000,
              productItemName: "空间态势报告",
            },
            {
              pkId: 200,
              productItemId: 5,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 100,
              productItemName: "发射预警产品",
            },
            {
              pkId: 201,
              productItemId: 6,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 5,
              productItemName: "解体事件分析",
            },
          ],
        },
        {
          roleId: 2,
          roleName: "高级-研究员",
          code: "ROLE_ADMIN",
          description: "",
          status: 1,
          createUser: 1,
          createTime: "2021-03-02 09:59:00",
          lastModifierUser: 7090,
          lastModifyTime: "2021-04-01 10:00:00",
          applicationId: 1,
          row: 1,
          productResourceAccessList: [
            {
              pkId: 107,
              productItemId: 1,
              isRead: 0,
              isDownload: 1,
              isDefined: 0,
              serviceLimit: 100,
              productItemName: "轨道产品",
            },
            {
              pkId: 108,
              productItemId: 2,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 500,
              productItemName: "编目产品",
            },
            {
              pkId: 109,
              productItemId: 3,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 1000,
              productItemName: "空间态势报告",
            },
            {
              pkId: 200,
              productItemId: 5,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 100,
              productItemName: "发射预警产品",
            },
            {
              pkId: 201,
              productItemId: 6,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 5,
              productItemName: "解体事件分析",
            },
          ],
        },
        {
          roleId: 2,
          roleName: "高级-研究员",
          code: "ROLE_ADMIN",
          description: "",
          status: 1,
          createUser: 1,
          createTime: "2021-03-02 09:59:00",
          lastModifierUser: 7090,
          lastModifyTime: "2021-04-01 10:00:00",
          applicationId: 1,
          row: 1,
          productResourceAccessList: [
            {
              pkId: 107,
              productItemId: 1,
              isRead: 0,
              isDownload: 1,
              isDefined: 0,
              serviceLimit: 100,
              productItemName: "轨道产品",
            },
            {
              pkId: 108,
              productItemId: 2,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 500,
              productItemName: "编目产品",
            },
            {
              pkId: 109,
              productItemId: 3,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 1000,
              productItemName: "空间态势报告",
            },
            {
              pkId: 200,
              productItemId: 5,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 100,
              productItemName: "发射预警产品",
            },
            {
              pkId: 201,
              productItemId: 6,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 5,
              productItemName: "解体事件分析",
            },
          ],
        },
        {
          roleId: 2,
          roleName: "高级-研究员",
          code: "ROLE_ADMIN",
          description: "",
          status: 1,
          createUser: 1,
          createTime: "2021-03-02 09:59:00",
          lastModifierUser: 7090,
          lastModifyTime: "2021-04-01 10:00:00",
          applicationId: 1,
          row: 1,
          productResourceAccessList: [
            {
              pkId: 107,
              productItemId: 1,
              isRead: 0,
              isDownload: 1,
              isDefined: 0,
              serviceLimit: 100,
              productItemName: "轨道产品",
            },
            {
              pkId: 108,
              productItemId: 2,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 500,
              productItemName: "编目产品",
            },
            {
              pkId: 109,
              productItemId: 3,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 1000,
              productItemName: "空间态势报告",
            },
            {
              pkId: 200,
              productItemId: 5,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 100,
              productItemName: "发射预警产品",
            },
            {
              pkId: 201,
              productItemId: 6,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 5,
              productItemName: "解体事件分析",
            },
          ],
        },
        {
          roleId: 2,
          roleName: "高级-研究员",
          code: "ROLE_ADMIN",
          description: "",
          status: 1,
          createUser: 1,
          createTime: "2021-03-02 09:59:00",
          lastModifierUser: 7090,
          lastModifyTime: "2021-04-01 10:00:00",
          applicationId: 1,
          row: 1,
          productResourceAccessList: [
            {
              pkId: 107,
              productItemId: 1,
              isRead: 0,
              isDownload: 1,
              isDefined: 0,
              serviceLimit: 100,
              productItemName: "轨道产品",
            },
            {
              pkId: 108,
              productItemId: 2,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 500,
              productItemName: "编目产品",
            },
            {
              pkId: 109,
              productItemId: 3,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 1000,
              productItemName: "空间态势报告",
            },
            {
              pkId: 200,
              productItemId: 5,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 100,
              productItemName: "发射预警产品",
            },
            {
              pkId: 201,
              productItemId: 6,
              isRead: null,
              isDownload: null,
              isDefined: 1,
              serviceLimit: 5,
              productItemName: "解体事件分析",
            },
          ],
        },
      ], //表单列表
      modalTitle: "修改",
      competence: [], //权限范围
      roleName: "", //角色名称
      roleName2: "", //角色名称
      endTime: "", //结束时间
      startTime: "", //开始时间
      selectRow: [], //选中的行
      currentId: "", //删除当前行
      spaceEvent: "", //空间事件
      lookData: {},
      lookItem: [
        //查看表单
        { title: "角色编码", key: "code" },
        { title: "角色名称", key: "roleName" },
        { title: "角色状态", key: "status" },
        { title: "创建时间", key: "createTime" },
        { title: "权限范围", key: "productResourceAccessList" },
      ],
      permissionList: [],
      basicsProducts: [], //基础产品
      advancedProducts: [], //高级产品
      orientProducts: [], //定向产品
      isUpdata: false, //是否是更新
      roleStatus: "0",
      myModalKey: 0,
      isDefined: false,
      isDownload: false,
      isRead: false,
      readDown: 0,
      currentClickItem: undefined,
    };
  },
  watch: {
    userType() {
      this.getProductItemList();
    },
  },
  created() {
    this.getData();
    this.getProductItemList(); //获取产品资源列表
  },
  methods: {
    // 查看
    look(row) {
      this.lookOver(row);
    },
    //获取数据
    getData() {
      let params = {
        endTime: this.endTime,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        productItemId: this.productType,
        roleId: [],
        roleName: this.roleName,
        startTime: this.startTime,
      };
      this.$api.userManage.getRoleList(params).then((res) => {
        if (res.success == true) {
          this.total = res.data.totalKey;
          this.dataList = res.data.roleList;
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
        let competenceStr = "";
        for (let competence of item.productResourceAccessList) {
          competenceStr +=
            competence.productItemName +
            "(" +
            competence.serviceLimit +
            ")" +
            ";";
        }
        item.competence = competenceStr;
        return item;
      });
      this.$refs.selection.$refs.tables.exportCsv({
        filename: "群组数据导出",
        separator: ",",
        columns: this.list.filter((col, index) => index > 0 && index < 5),
        data: this.selectRow,
      });
    },
    //新建弹窗
    newRole() {
      this.isModal = true;
      this.modalTitle = "新建角色";
      this.roleName2 = "";
      // this.setResetParameter();
      this.isUpdata = false;
      this.myModalKey = Math.random();
      this.userType = "0";
    },
    //选中某一个产品
    checkboxItem(item) {
      // if (this.isUpdata) {
      //   if (item.isChecked) {
      //     item.isChecked = true;
      //   } else {
      //     item.isChecked = false;
      //   }
      // } else {
      //   item.isChecked = !item.isChecked;
      // }
    },
    //选中当前服务上限
    selectCurrent(val, item) {
      item.serviceLimit = val;
    },
    //修改弹窗
    update(item) {
      this.isUpdata = true;
      this.currentClickItem = item;
      this.myModalKey = Math.random();
      this.roleStatus = item.status.toString();
      this.isModal = true;
      this.modalTitle = "修改角色";
      this.roleName2 = item.roleName;
      this.userType = "0";
    },
    //搜索
    search() {
      this.getData();
    },
    //表单查看
    lookOver(item) {
      let text = "";
      if (item.productResourceAccessList.length > 0) {
        for (let i = 0; i < item.productResourceAccessList.length; i++) {
          text +=
            item.productResourceAccessList[i].productItemName +
            "(" +
            item.productResourceAccessList[i].serviceLimit +
            ")" +
            ";";
        }
      }
      // this.productResourceAccessList = text;
      let obj = {
        code: item.code,
        createTime: item.createTime,
        status: item.status,
        roleName: item.roleName,
        productResourceAccessList: text,
      };
      this.lookData = obj;
      this.$refs.selection.lookOver();
    },
    //获取产品资源列表
    getProductItemList() {
      let params = {};
      this.$api.userManage.getProductItemList(params).then((res) => {
        if (res.success == true) {
          if (this.userType == "2") {
            res.data[1].productCategoryGroupItemList.filter((item, index) => {
              if (item.name == "发射预警产品") {
                res.data[1].productCategoryGroupItemList.splice(index, 1);
              }
            });
          }
          this.permissionList = res.data;
          this.basicsProducts = JSON.parse(
            JSON.stringify(this.permissionList[0].productCategoryGroupItemList)
          );
          this.advancedProducts = JSON.parse(
            JSON.stringify(this.permissionList[1].productCategoryGroupItemList)
          );
          this.orientProducts = JSON.parse(
            JSON.stringify(this.permissionList[2].productCategoryGroupItemList)
          );
          if (this.currentClickItem != undefined) {
            if (
              this.currentClickItem.productResourceAccessList[0].isDefined == 1
            ) {
              this.isDefined = true;
            } else {
              this.isDefined = false;
            }
            if (
              this.currentClickItem.productResourceAccessList[0].isDownload == 1
            ) {
              this.isDownload = true;
            } else {
              this.isDownload = false;
            }
            if (
              this.currentClickItem.productResourceAccessList[0].isRead == 1
            ) {
              this.isRead = true;
            } else {
              this.isRead = false;
            }
            this.currentClickItem.productResourceAccessList.map((proList) => {
              //基础产品回显
              let basicsProItem = this.basicsProducts.find(
                (proItem) => proItem.pkId == proList.productItemId
              );
              if (basicsProItem) {
                basicsProItem.serviceLimit = proList.serviceLimit + "";
                // this.$set(basicsProItem,"serviceLimit",proList.serviceLimit)
                basicsProItem.isChecked = true;
              }
              //高级回显
              let advancedProItem = this.advancedProducts.find(
                (proItem) => proItem.pkId == proList.productItemId
              );
              if (advancedProItem) {
                advancedProItem.serviceLimit = proList.serviceLimit + "";
                advancedProItem.isChecked = true;
              }
              //定向回显
              let orientProItem = this.orientProducts.find(
                (proItem) => proItem.pkId == proList.productItemId
              );
              if (orientProItem) {
                orientProItem.serviceLimit = proList.serviceLimit + "";
                orientProItem.isChecked = true;
              }
            });
          }
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    //新建、修改角色
    operationRole() {
      if (!this.roleName2) {
        this.$Notice.warning({
          title: "角色名称不能为空",
          top: 50,
          duration: 5,
        });
        return;
      }
      //高级产品
      let advancedProducts = this.advancedProducts.filter((item) => {
        if (item.isChecked) {
          item.productItemId = item.pkId;
          return item;
        }
      });
      //基础产品
      let basicsProducts = this.basicsProducts.filter((item) => {
        if (item.isChecked) {
          item.productItemId = item.pkId;
          return item;
        }
      });
      //定向产品
      let orientProducts = this.orientProducts.filter((item) => {
        if (item.isChecked) {
          item.productItemId = item.pkId;
          return item;
        }
      });

      let productItemIdList = [
        ...basicsProducts,
        ...advancedProducts,
        ...orientProducts,
      ];
      let params = {
        accessType: 0,
        description: "",
        name: this.roleName2,
        productItemIdList: productItemIdList,
        status: this.roleStatus,
        isDefined: this.isDefined == true ? 1 : 0,
        isDownload: this.isDownload == true ? 1 : 0,
        isRead: this.isRead == true ? 1 : 0,
      };
      if (this.isUpdata) {
        this.$api.userManage
          .newUpdateRole(this.currentClickItem.roleId, params)
          .then((res) => {
            if (res.success == true) {
              this.$Notice.success({
                title: res.message,
                top: 50,
                duration: 5,
              });
              this.isModal = false;
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
        this.$api.userManage.newCreateRole(params).then((res) => {
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

    //弹出框 取消
    cancel() {
      this.isModal = false;
      this.confirmDelete = false;
      this.updateModal = false;
      this.setResetParameter();
    },
    //弹出框 重置
    reset() {
      this.isModal = false;
      this.updateModal = false;
    },
    //新建 确认
    confirm() {
      this.isModal = false;
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
    //删除角色
    deleteRole(item) {
      let params = {
        roleIds: item.roleId,
      };
      this.$api.userManage.deleteRoleBatch(params).then((res) => {
        if (res.success == true) {
          this.selectRow = [];
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.pageNum = 1;
          this.getData();
          this.confirmDelete = false;
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
        roleIds: this.selectRow.map((item) => item.roleId).join(),
      };
      this.$api.userManage.deleteRoleBatch(params).then((res) => {
        if (res.success == true) {
          this.selectRow = [];
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.pageNum = 1;
          this.getData();
          this.confirmDelete = false;
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
    confirmRemove() {
      this.batchesDeleteOpt();
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
    //时间范围
    startTimeSelect(startTime) {
      this.startTime = startTime;
    },
    endTimeSelect(endTime) {
      this.endTime = endTime;
    },
    // 重置
    setResetParameter() {
      this.productData = [];
      this.productDataList = [];
      this.isDefined = false; //是否自定义
      this.isDownload = false; //是否可下载
      this.isRead = false; //是否可查看
      this.roleStatus = "0";
      this.roleName = "";
      this.multiterm = "";
      this.multitermBox = false;
      this.roleName2 = "";
      this.produdctType = [];
      this.startTime = "";
      this.endTime = "";
      this.productType = [];
      this.userType = "";
      this.currentClickItem = undefined;
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

    .input-style {
      margin-left: @table-lable-space;
      width: 300px;

      /deep/ .ivu-select-selection {
        border-color: @checked-color;
      }
    }

    .start-time {
      margin-left: @table-lable-space;
    }
  }
}

//新建角色弹出框
.new-role {
  display: flex;
  padding: 0 @table-padding @table-padding @table-padding;
  font-size: @lable-font-size;
  flex-wrap: wrap;
  color: @lable-font-color;

  .modal-title {
    display: inline-block;
    width: 100px;
    text-align: right;
    margin-top: 8px;
  }

  .model-first-line {
    display: flex;

    .modal1-items {
      margin-right: 50px;
      margin-bottom: 20px;
    }

    .modal-input {
      width: 270px;
      margin-left: @table-lable-space;
    }
  }

  .modal1-items {
    display: flex;
  }

  .role-status {
    margin-top: 16px;
  }

  .modal-product-require {
    width: 1300px;
    height: 410px;
    overflow: auto;
    justify-content: space-between;
    margin-left: 30px;
    border: 1px solid @content-border-color;
    border-radius: 5px;
    margin-bottom: 20px;
    background-color: @input-bg-color;

    .product-require-items {
      display: flex;
      flex-wrap: wrap;

      .product-require-item {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        width: 30%;
        // padding: 10px 30px;
        margin: 20px 10px 10px 20px;

        span {
          margin-right: 10px;
          margin-block: auto;
        }

        .product-require-style {
          width: 180px;
        }
      }

      // .orientProducts {
      //   width: 25%;
      // }
    }
  }
  .product-require-orient-style {
    width: 300px;
    display: flex;
    justify-content: space-between;
    width: 66.6666%;
    padding: 10px 30px;
  }
  .product-require-title {
    display: block;
    font-size: 18px;
    font-weight: 600;
    margin: 20px 0 0 20px;
  }

  .modal-footer-twoline {
    display: flex;
    flex: 1;
    margin-left: 30px;
    align-items: center;
    height: 50px;
    border: 1px solid @content-border-color;
    border-radius: 5px;
    padding: 20px 30px;
    background-color: @input-bg-color;

    /deep/.ivu-input {
      margin-left: 12px;
      height: 50px;
    }
  }

  .checkbox {
    margin-right: 100px;
  }

  .checkbox:last-child {
    width: 200px;
  }

  .radio {
    margin-right: 200px;
    font-size: @lable-font-size;
  }

  .product-type {
    display: flex;
  }
}

/deep/ .ivu-radio {
  margin-right: 8px;
}

/deep/ .ivu-checkbox {
  margin-right: 3px;
}

.ivu-checkbox-wrapper {
  /* width: 120px; */
  font-size: @lable-font-size;
  margin-right: 15px;
  margin-block: auto;
}

.pie-tb-iscontent {
  max-width: 100%;

  .tb-style {
    max-width: 100%;
  }
}
/deep/.ivu-input-icon-clear {
  position: absolute;
  top: 0;
  right: -25px;
}
</style>
