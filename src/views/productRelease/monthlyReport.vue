<template>
  <!-- 工作月报 -->
  <div class="pie-tb-content">
    <pie-card v-show="isHidden">
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="publish-module-content">
          <div class="publish-module-message">
            <div>
              <span>开始时间</span>
              <DatePicker
                type="date"
                :value="createTime"
                placeholder="开始时间"
                @on-change="createTimeChange"
                style="width: 250px"
              ></DatePicker>
              <span>至</span>
              <DatePicker
                type="date"
                :value="endTime"
                placeholder="结束时间"
                @on-change="endTimeChange"
                style="width: 250px"
              ></DatePicker>
            </div>
            <div>
              <span>期刊号</span>
              <Input
                v-model="serialNumber"
                placeholder="请输入期刊号"
                style="width: 250px"
              />
            </div>
            <div class="publish-module-btn">
              <search-btn
                class="btn-right"
                @click="moversSolSearch"
              ></search-btn>
              <batch-delete-btn
                class="btn-right"
                @click="moversSolDelete"
              ></batch-delete-btn>
              <batch-join-btn
                class="btn-right"
                @click="additionProductEvent"
              ></batch-join-btn>
              <div
                class="iconfont icon-tongji btn-right"
                @click="switchElse"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 表体 -->
      <div slot="iscontent">
        <div>
          <my-table
            border
            ref="tables"
            :columns="moversList"
            :data="moversData"
            disabled-hover
            max-height="500"
            :controlsBtn="true"
            :lookBtn="false"
            :serviceBtn="true"
            :delBtn="true"
            :issueBtn="true"
            :downloadBtn="true"
            @download="download"
            @controls="moversSolControls"
            @look="moversSolLook"
            @service="moversSolService"
            @issue="moversSolIssue"
            @confirmDelete="moversConfirmDelete"
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
    <div class="publish-module-container" v-show="isShow">
      <!-- 待发布 -->
      <div class="publish-module-content">
        <div class="publish-module-top">
          <div class="publish-module-title">待发布</div>
          <div class="publish-module-message">
            <div>
              <span>开始时间</span>
              <DatePicker
                type="date"
                :value="unCreateTime"
                placeholder="开始时间"
                @on-change="unCreateTimeChange"
                style="width: 250px"
              ></DatePicker>
              <span>至</span>
              <DatePicker
                type="date"
                :value="unEndTime"
                placeholder="结束时间"
                @on-change="unEndTimeChange"
                style="width: 250px"
              ></DatePicker>
            </div>
            <div>
              <span>期刊号</span>
              <Input
                v-model="unSerialNumber"
                placeholder="请输入期刊号"
                style="width: 250px"
              />
            </div>
          </div>
          <div class="publish-module-btn">
            <search-btn @click="unSearch" class="btn-right"></search-btn>
            <batch-join-btn
              class="btn-right"
              @click="additionProductEvent"
            ></batch-join-btn>
            <div class="iconfont icon-tongji" @click="switchTable"></div>
          </div>
        </div>
        <div class="publish-module-message">
          <div class="radio-messag-image">
            <RadioGroup
              :value="unPitchOnItem"
              @on-change="onUnPadioCange"
              class="radio-event"
            >
              <Radio v-for="item in unDataLst" :key="item.id" :label="item">
                <img class="messag-img" :src="item.imgUrl" alt />
              </Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="publish-module-message pie-tb-footer">
          <page
            :showSizer="false"
            :total="unPageTotal"
            :pageSize="unPageSize"
            :current="unPageNum"
            @pageChange="unPageChange"
            @pageSizeChange="unPageSizeChange"
          ></page>
          <div class="publish-module-btn module-btn-top">
            <version-btn class="btn-right" @click="controlvs" />
            <look-btn class="btn-right" @click="lookOver(true)" />
            <del-btn class="btn-right" @click="deleteOperation(true)" />
            <issue-btn class="btn-right" @click="publishEvent" />
          </div>
        </div>
      </div>
      <!-- 已发布 -->
      <div class="publish-module-content" style="margin-top: 10px">
        <div class="publish-module-top">
          <div class="publish-module-title">已发布</div>
          <div class="publish-module-message">
            <div>
              <span>开始时间</span>
              <DatePicker
                type="date"
                :value="finishCreateTime"
                placeholder="开始时间"
                @on-change="finishCreateTimeChange"
                style="width: 250px"
              ></DatePicker>
              <span>至</span>
              <DatePicker
                type="date"
                :value="finishEndTime"
                placeholder="结束时间"
                @on-change="finishEndTimeChange"
                style="width: 250px"
              ></DatePicker>
            </div>
            <div>
              <span>期刊号</span>
              <Input
                v-model="finishSerialNumber"
                placeholder="请输入期刊号"
                style="width: 250px"
              />
            </div>
          </div>
          <div class="publish-module-btn">
            <search-btn @click="finishSearch" class="btn-right"></search-btn>
          </div>
        </div>
        <div class="publish-module-message">
          <div class="radio-messag-image">
            <RadioGroup
              :value="finishPitchOnItem"
              @on-change="onFinishPadioCange"
              class="radio-event"
            >
              <Radio
                v-for="item in finishDataList"
                :key="item.id"
                :label="item"
              >
                <img class="messag-img" :src="item.imgUrl" alt />
              </Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="publish-module-message pie-tb-footer">
          <page
            :showSizer="false"
            :total="finishPageTotal"
            :pageSize="finishPageSize"
            :current="finishPageNum"
            @pageChange="finishPageChange"
            @pageSizeChange="finishPageSizeChange"
          ></page>
          <div class="publish-module-btn module-btn-top">
            <version-btn class="btn-right" @click="controlvs" />
            <external-service-btn class="btn-right" @click="externalService" />
            <look-btn class="btn-right" @click="lookOver(false)" />
            <del-btn class="btn-right" @click="deleteOperation(false)" />
          </div>
        </div>
      </div>
    </div>
    <!-- 查看 -->
    <my-modal
      width="25"
      height="40"
      v-model="isShowDetails"
      title="详情"
      :cancelBtn="false"
      :resetBtn="false"
      @confirm="cancel"
    >
      <div slot="operateItem">
        <div class="details-container">
          <ul>
            <li>
              <p>产品类型 :</p>
              <span>{{ pitchOnItem.productType }}</span>
            </li>
            <li>
              <p>产品状态 :</p>
              <span>{{ pitchOnItem.status == 0 ? "未发布" : "已发布" }}</span>
            </li>
            <li>
              <p>创建时间 :</p>
              <span>{{ pitchOnItem.createTime }}</span>
            </li>
            <!-- <li>
              <p>创建者 :</p>
              <span>{{ pitchOnItem.creator }}</span>
            </li>-->
            <li>
              <p>版本 :</p>
              <span>{{ pitchOnItem.version }}</span>
            </li>
          </ul>
        </div>
      </div>
    </my-modal>
    <!-- 新增产品 -->
    <my-modal
      width="30"
      v-model="isShowAddition"
      title="新增"
      :resetBtn="false"
      @cancel="cancel"
      @confirm="confirmAddition"
    >
      <div slot="operateItem">
        <uploadFileMoyle
          :resetParams="resetParams"
          @upload-file-event="uploadFileEvent"
        />
      </div>
    </my-modal>
    <!-- 删除弹出框 -->
    <my-dialog
      @confirm="confirmDelete"
      @cancel="cancel"
      :isModal="isDelete"
    ></my-dialog>
    <!-- 版本管理弹出框 -->
    <my-modal
      width="60"
      height="58"
      v-model="isModal"
      title="版本管理"
      confirmText="提交审核"
      :resetBtn="false"
      @cancel="cancel"
      @confirm="confirmVersion"
    >
      <div slot="operateItem">
        <div class="modal-header-content">
          <share-btn
            class="right-btn-item"
            title="加入"
            callBackName="join-version"
            @join-version="joinVersion"
          />
        </div>
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="pie-tb-iscontent">
              <my-table
                border
                ref="selection"
                max-height="500"
                :columns="versionList"
                :data="versionData"
                :updateBtn="true"
                :delBtn="true"
                @update="update"
                @confirmDelete="versionDelete"
              ></my-table>
            </div>
            <div class="pie-tb-footer">
              <page
                :total="versionPageTotal"
                :pageSize="versionPageSize"
                :current="versionPageNum"
                @pageChange="versionPageChange"
                @pageSizeChange="versionPageSizeChange"
              ></page>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 版本加入弹出框 -->
    <my-modal
      width="30"
      height="45"
      :title="title"
      v-model="isModalJoin"
      @cancel="cancelJoin"
      @confirm="confirmJoin"
      :resetBtn="false"
      :close="true"
    >
      <div slot="operateItem">
        <div class="add-version-content">
          <ul>
            <li>
              <p>审核人</p>
              <span>
                <Input v-model="auditor" placeholder style="width: 300px" />
              </span>
            </li>
            <li>
              <p>版本</p>
              <span>
                <Input v-model="version" placeholder style="width: 300px" />
              </span>
            </li>
            <li>
              <p>产品文件</p>
              <span>
                <Input v-model="productFile" placeholder style="width: 300px" />
                <Upload
                  :action="action"
                  :headers="Authorization"
                  :data="upload"
                  :before-upload="beforeUpload"
                  :on-success="handleSuccess"
                >
                  <share-btn title="选择文件" class="share-btn" />
                </Upload>
              </span>
            </li>
            <li>
              <p>描述</p>
              <span>
                <Input
                  v-model="description"
                  type="textarea"
                  :rows="4"
                  placeholder
                  style="width: 300px"
                />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </my-modal>
    <!-- 发布弹窗 -->
    <my-modal
      width="60"
      height="58"
      v-model="isPublishModal"
      title="发布"
      confirmText="确定发布"
      :resetBtn="false"
      @cancel="cancel"
      @confirm="confirmPublish"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="pie-tb-iscontent">
              <my-table
                border
                ref="selection"
                max-height="500"
                :columns="publishList"
                :data="versionData"
              ></my-table>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 对外服务弹窗-->
    <my-modal
      width="60"
      height="70"
      title="对外服务"
      v-model="isForeignServiceMoadl"
      @cancel="cancel"
      @confirm="confirmForeignService"
      :resetBtn="false"
      :close="true"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-item group-info">
              <span>对外服务对象选择</span>
              <span class="iconfont icon-jia" @click="addGroupMember"></span>
            </div>
            <div class="tb-header-item group-info">
              <div>机构:</div>
              <template v-for="(member, index) in groupList">
                <span :key="member.id">
                  {{ member.name }}
                  <label v-if="index < groupList.length - 1">,</label>
                </span>
              </template>
            </div>
            <div class="tb-header-item group-info">
              <div>用户:</div>
              <template v-for="(member, index) in userList">
                <span :key="member.id">
                  {{ member.username }}
                  <label v-if="index < userList.length - 1">,</label>
                </span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 对外服务弹出框选择 -->
    <div class="group-drag-modal" v-if="dragAffirm">
      <drag-modal
        width="60"
        height="80"
        :selectList="selectList"
        :targetList="targetList"
        :titleKey="titleKey"
        @cancel="cancelAffirm"
        @changeType="changeType"
        @affirm="createAffirm"
      />
    </div>
    <!-- 提交审核弹出框 -->
    <my-dialog
      @confirm="confirmDelete"
      @cancel="cancel"
      :isModal="isSubmit"
      content="确定要提交吗吗?"
    ></my-dialog>
  </div>
</template>
<script>
import storage from "store";
import { ACCESS_TOKEN_SYSTEM } from "@/store/mutations.js";
import baseUrl from "@/config/base-url";
import searchBtn from "@/components/button/search-btn.vue";
import batchJoinBtn from "@/components/button/batch-join-btn.vue";
import batchDeleteBtn from "@/components/button/batch-delete-btn.vue";
import myModal from "@/components/modals/modal.vue";
import myTable from "@/components/table/my-table.vue";
import page from "@/components/page/page.vue";
import dragModal from "@/components/drag-list/drag-modals.vue";
import versionBtn from "@/components/button/version-btn.vue";
import lookBtn from "@/components/button/look-btn.vue";
import externalServiceBtn from "@/components/button/external-service-btn.vue";
import delBtn from "@/components/button/del-btn.vue";
import issueBtn from "@/components/button/issue-btn.vue";
import uploadFileMoyle from "@/components/reportMoule/uploadFileMoyle.vue";
export default {
  components: {
    searchBtn,
    batchJoinBtn,
    batchDeleteBtn,
    myModal,
    myTable,
    page,
    dragModal,
    versionBtn,
    lookBtn,
    externalServiceBtn,
    delBtn,
    issueBtn,
    uploadFileMoyle,
  },
  data() {
    return {
      productType: "",
      templateName: "",
      applyRange: "",
      isModal: false,
      isIssue: false,
      isSubmit: false,
      appendPopup: false,
      externalServicePopup: false,
      targetName: "", //目标名称
      targetNumber: "", //目标编号
      selectRow: [],
      // -----------------------------------------------------------
      // 全部
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      createTime: "", //生成时间
      endTime: "", //结束时间
      keyWord: "", //关键字
      serialNumber: "", //期刊号
      moversList: [
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
          title: "期刊号",
          key: "serialNum",
          align: "center",
        },
        {
          title: "生成时间",
          key: "createTime",
          align: "center",
          sortable: true,
        },
        {
          title: "发布状态",
          key: "statusItem",
          align: "center",
          render(h, params) {
            return h(
              "div",
              (params.row.statusItem =
                params.row.status == 0 ? "未发布" : "已发布")
            );
          },
        },
        {
          title: "发布时间",
          key: "createTime",
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
      moversData: [
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
      ],
      // 未发布------------
      unPageTotal: 10, //未发布总数
      unPageNum: 1, //未发布页数
      unPageSize: 8, //未发布条数
      unTargetName: "", //未发布目标名称
      unTargetNumber: "", //未发布目标编号
      unCreateTime: "", //未发布创建时间
      unEndTime: "", //未发布结束时间
      unSerialNumber: "", //未发布期刊号
      unDataLst: [
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
      ],
      unPitchOnItem: undefined, //未发布单击选中参数
      // 已发布------------
      finishPageTotal: 10, //已发布总数
      finishPageNum: 1, //已发布页数
      finishPageSize: 8, //已发布条数
      finishTargetName: "", //已发布目标名称
      finishTargetNumber: "", //已发布目标编号
      finishCreateTime: "", //已发布创建时间
      finishEndTime: "", //已发布结束时间
      finishSerialNumber: "", //已发布期刊号
      finishDataList: [
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
        {
          id: 0,
          path: "1",
          productType: "1",
          status: 1,
          createTime: "2021-10-10 11:45:33.0000",
          publishTime: "2021-10-10 11:45:33.0000",
          creator: "1",
          version: "1.0",
          template: "1",
          templateId: "1",
          serialNum: "1",
          storageName: "",
          imgUrl: require("@/assets/public/monthlyReport.svg"),
        },
      ],
      finishPitchOnItem: undefined, //已发布单击选中参数
      // 公共--------------
      isShow: true,
      isHidden: false,
      isDelete: false,
      isShowDetails: false,
      isModalJoin: false,
      isPublishModal: false,
      isForeignServiceMoadl: false,
      dragAffirm: false,
      pitchOnItem: {}, //共享数据
      productItemId: 10, //每个界面的唯一id标识
      versionPageTotal: 20, //版本管理列表总条数
      versionPageSize: 10, //版本管理列表条数
      versionPageNum: 1, //版本管理列表页数
      title: "新建",
      versionModalStatus: 0,
      versionTargetName: "", //版本管理目标名称
      versionTargetNumber: "", //版本管理目标编号
      versionCreateTime: "", //版本管理生成时间
      versionStatus: "",
      productId: 0, //产品id
      upload: {}, //上传传递参数
      Authorization: {
        // 上传设置请求头携带token
        Authorization: storage.get(ACCESS_TOKEN_SYSTEM),
      },
      action: baseUrl.uploadFile, //设置上传请求地址
      pictureFile: "", //上传图片
      auditor: "", //审核人
      version: "", //版本
      productFile: "", //文件
      description: "", //描述
      groupList: [],
      userList: [],
      titleList: [
        { lable: "机构", value: 0 },
        { lable: "用户", value: 1 },
      ], //标题列表，可以多个或者一个
      targetList: [], //显示弹框列表数据
      selectList: [
        // {
        //   id: 0,
        //   name: "总监",
        // },
        // {
        //   id: 1,
        //   name: "科长",
        // },
        // {
        //   id: 2,
        //   name: "主任",
        // },
        // {
        //   id: 3,
        //   name: "组长",
        // },
      ],
      titleKey: "name", //选中名称
      versionId: 0, //版本id
      versionList: [
        {
          title: "选中",
          width: 80,
          align: "center",
          render: (h, params) => {
            let id = params.row.id;
            let flag = false;
            if (this.versionId == id) {
              flag = true;
            } else {
              flag = false;
            }
            let _this = this;
            return h("div", [
              h("Radio", {
                props: {
                  value: flag,
                },
                on: {
                  "on-change": () => {
                    _this.versionId = id;
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80,
        },
        {
          title: "审核人",
          key: "auditor",
          ellipsis: true,
          align: "center",
        },
        {
          title: "创建时间",
          key: "createTime",
          ellipsis: true,
          align: "center",
        },
        {
          title: "版本号",
          key: "version",
          align: "center",
        },
        {
          title: "描述",
          key: "description",
          ellipsis: true,
          align: "center",
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center",
        },
      ], //版本管理列表
      currentId: 0,
      publishList: [
        {
          title: "选中",
          width: 80,
          align: "center",
          render: (h, params) => {
            let id = params.row.id;
            let flag = false;
            if (this.currentId == id) {
              flag = true;
            } else {
              flag = false;
            }
            let _this = this;
            return h("div", [
              h("Radio", {
                props: {
                  value: flag,
                },
                on: {
                  "on-change": () => {
                    _this.currentId = id;
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80,
        },
        {
          title: "审核人",
          key: "auditor",
          ellipsis: true,
          align: "center",
        },
        {
          title: "创建时间",
          key: "createTime",
          ellipsis: true,
          align: "center",
        },
        {
          title: "版本号",
          key: "version",
          align: "center",
        },
        {
          title: "描述",
          key: "description",
          ellipsis: true,
          align: "center",
        },
      ],
      versionData: [
        {
          id: 0,
          version: "1.0",
          productPath: "工作月报.doc",
          auditor: "kjadmin",
          createTime: "2021-10-12 03:30:03",
          description: "关于工作月报报告!",
          productId: 0,
          productIndexTableName: "202107",
          updateTime: "2022-01-01 00:00:00",
        },
        {
          id: 1,
          version: "1.1",
          productPath: "工作月报.doc",
          auditor: "admin",
          createTime: "2021-10-12 03:30:03",
          description: "关于工作月报报告!",
          productId: 0,
          productIndexTableName: "202107",
          updateTime: "2022-01-01 00:00:00",
        },
        {
          id: 2,
          version: "2.0",
          productPath: "工作月报.doc",
          auditor: "test",
          createTime: "2021-10-12 03:30:03",
          description: "关于工作月报报告!",
          productId: 0,
          productIndexTableName: "202107",
          updateTime: "2022-01-01 00:00:00",
        },
        {
          id: 3,
          version: "3.0",
          productPath: "工作月报.doc",
          auditor: "kjadmins",
          createTime: "2021-10-12 03:30:03",
          description: "关于工作月报报告!",
          productId: 0,
          productIndexTableName: "202107",
          updateTime: "2022-01-01 00:00:00",
        },
        {
          id: 4,
          version: "4.0",
          productPath: "工作月报.doc",
          auditor: "tests",
          createTime: "2021-10-12 03:30:03",
          description: "关于工作月报报告!",
          productId: 0,
          productIndexTableName: "202107",
          updateTime: "2022-01-01 00:00:00",
        },
      ], //版本管理列表
      isShowAddition: false,
      resetParams: false,
      filePath: "", //新增上传文件
    };
  },
  created() {
    this.getUnpublishedData(); //未发布数据列表
    this.getReleasedData(); //已发布数据列表
    this.getAllDataList(); //获取全部数据列表
  },
  methods: {
    // 未发布代码----------------------
    // 获取未发布数据列表
    getUnpublishedData() {
      let params = {
        status: 0,
        page: this.unPageNum,
        size: this.unPageSize,
        beginTime: this.unCreateTime,
        endTime: this.unEndTime,
        serialNum: this.unSerialNumber,
      };
      this.$api.statement.monthlyReport(params).then((res) => {
        if (res.success == true) {
          this.unPageTotal = res.data.total;
          let data = res.data.msg;
          this.unDataLst = data.map((item) => {
            let obj = {
              id: item.id,
              path: item.path,
              productType: item.productType,
              status: item.status,
              createTime: item.createTime,
              publishTime: item.publishTime,
              creator: item.creator,
              version: item.version,
              template: item.template,
              templateId: item.templateId,
              serialNum: item.serialNum,
              storageName: item.storageName,
              imgUrl: require("@/assets/public/monthlyReport.svg"),
            };
            return obj;
          });
        }
      });
    },
    // 未发布页数
    unPageChange(num) {
      this.unPageNum = num;
      this.getUnpublishedData();
    },
    // 未发布条数
    unPageSizeChange(size) {
      this.unPageSize = size;
      this.getUnpublishedData();
    },
    // 未发布生成时间
    unCreateTimeChange(time) {
      this.unCreateTime = time;
    },
    // 未发布结束时间
    unEndTimeChange(time) {
      this.unEndTime = time;
    },
    // 未发布单选
    onUnPadioCange(item) {
      this.unPitchOnItem = item;
    },
    // 未发布搜索
    unSearch() {
      this.getUnpublishedData();
    },
    // 已发布代码----------------------------------------------
    // 获取已发布数据列表
    getReleasedData() {
      let params = {
        status: 1,
        page: this.finishPageNum,
        size: this.finishPageSize,
        beginTime: this.finishCreateTime,
        endTime: this.finishEndTime,
        serialNum: this.finishSerialNumber,
      };
      this.$api.statement.monthlyReport(params).then((res) => {
        if (res.success == true) {
          this.finishPageTotal = res.data.total;
          let data = res.data.msg;
          this.finishDataList = data.map((item) => {
            let obj = {
              id: item.id,
              path: item.path,
              productType: item.productType,
              status: item.status,
              createTime: item.createTime,
              publishTime: item.publishTime,
              creator: item.creator,
              version: item.version,
              template: item.template,
              templateId: item.templateId,
              serialNum: item.serialNum,
              storageName: item.storageName,
              imgUrl: require("@/assets/public/monthlyReport.svg"),
            };
            return obj;
          });
        }
      });
    },
    // 已发布页数
    finishPageChange(num) {
      this.finishPageNum = num;
      this.getReleasedData();
    },
    // 已发布条数
    finishPageSizeChange(size) {
      this.finishPageSize = size;
      this.getReleasedData();
    },
    // 已发布生成时间
    finishCreateTimeChange(time) {
      this.finishCreateTime = time;
    },
    // 已发布结束时间
    finishEndTimeChange(time) {
      this.finishEndTime = time;
    },
    // 已发布点选
    onFinishPadioCange(item) {
      this.finishPitchOnItem = item;
    },
    // 已发布搜索
    finishSearch() {
      this.getReleasedData();
    },
    // 全部数据列表 ----------------------------------------------------
    // 二级界面获取全部数据列表
    getAllDataList() {
      let params = {
        status: "",
        page: this.pageNum,
        size: this.pageSize,
        beginTime: this.createTime,
        endTime: this.endTime,
        serialNum: this.serialNumber,
      };
      this.$api.statement.monthlyReport(params).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          this.moversData = res.data.msg;
        }
      });
    },
    // 二级界面条数
    pageChange(num) {
      this.pageNum = num;
      this.getAllDataList();
    },
    // 二级界面页数
    pageSizeChange(size) {
      this.pageSize = size;
      this.getAllDataList();
    },
    // 二级界面搜索
    moversSolSearch() {
      this.getAllDataList();
    },
    // 二级界面查看
    moversSolLook(row) {
      this.pitchOnItem = row;
      this.isShowDetails = true;
    },
    // 二级界面table生成时期
    createTimeChange(date) {
      this.createTime = date;
    },
    // 二级界面table结束时期
    endTimeChange(date) {
      this.endTime = date;
    },
    // 二级界面批量删除
    moversSolDelete() {
      if (this.selectRow.length == 0) {
        this.$Notice.warning({
          title: "批量删除数据不能为空",
          top: 50,
          duration: 5,
        });
        return;
      }
      this.isDelete = true;
    },
    // 二级界面版本管理
    moversSolControls(row) {
      this.pitchOnItem = row;
      this.isModal = true;
      this.getversionData();
    },
    // 二级界面对外服务
    moversSolService(row) {
      this.pitchOnItem = row;
      this.isForeignServiceMoadl = true;
    },
    // 二级界面发布
    moversSolIssue(row) {
      this.pitchOnItem = row;
      this.versionStatus = 0;
      this.isPublishModal = true;
      this.getversionData();
    },
    // 二级界面删除
    moversConfirmDelete(row) {
      this.pitchOnItem = row;
      let params = {
        ids: this.pitchOnItem.id,
      };
      this.$api.statement.DeleteMonthlyReport(params).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.getUnpublishedData(); //未发布数据列表
          this.getReleasedData(); //已发布数据列表
          this.getAllDataList(); //获取全部数据列表
          this.cancel();
        }
      });
    },
    // 公共代码------------------------------------------
    //一级切换表格
    switchTable() {
      this.isShow = false;
      this.isHidden = true;
    },
    // 二级界面切换
    switchElse() {
      this.isShow = true;
      this.isHidden = false;
    },
    // 公共代码------------------------------------------
    // 下载
    download(row) {
      this.$api.statement.downloadMonthlyReport(row.id).then((res) => {
        this.$utils.fileBlobDown(row.path, res);
      });
    },
    // 新增产品
    additionProductEvent() {
      this.isShowAddition = true;
    },
    // 新增产品上传文件
    uploadFileEvent(path) {
      this.filePath = path;
    },
    // 确定添加产品
    confirmAddition() {
      let params = {
        filePath: this.filePath,
      };
      this.$api.statement.briefReportBrief(params).then((res) => {
        if (res.success == true) {
          this.getUnpublishedData(); //未发布数据列表
          this.getReleasedData(); //已发布数据列表
          this.getAllDataList(); //获取全部数据列表
          this.resetParams = !this.resetParams;
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    // 选中状态
    multiSelect(row) {
      this.selectRow = row;
    },
    // 版本管理导出
    exportDataList() {
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
        filename: "群组数据导出",
        separator: ",",
        columns: this.versionList.filter(
          (col, index) => index > 0 && index < 7
        ),
        data: exportData,
      });
    },
    // 点击查看按钮
    lookOver(type) {
      if (type) {
        // 未发布如果单选没有选择其中一条数据就请选择一条数据；
        if (this.unPitchOnItem != undefined) {
          // 在查看详情时，从新赋值到新的对象{}上进行展示；
          this.pitchOnItem = this.unPitchOnItem;
          this.isShowDetails = true;
        } else {
          this.$Notice.warning({
            title: "请选择一条数据！",
            top: 50,
            duration: 5,
          });
        }
      } else {
        // 未发布如果单选没有选择其中一条数据就请选择一条数据；
        if (this.finishPitchOnItem != undefined) {
          // 在查看详情时，从新赋值到新的对象{}上进行展示；
          this.pitchOnItem = this.finishPitchOnItem;
          this.isShowDetails = true;
        } else {
          this.$Notice.warning({
            title: "请选择一条数据！",
            top: 50,
            duration: 5,
          });
        }
      }
    },
    //点击删除按钮
    deleteOperation(type) {
      if (type) {
        // 如果单选没有选择其中一条数据就请选择一条数据；
        if (this.unPitchOnItem != undefined) {
          // this.isDelete = true;
          // this.pitchOnItem = this.unPitchOnItem;
          this.moversConfirmDelete(this.unPitchOnItem);
        } else {
          this.$Notice.warning({
            title: "请选择一条数据！",
            top: 50,
            duration: 5,
          });
        }
      } else {
        // 如果单选没有选择其中一条数据就请选择一条数据；
        if (this.finishPitchOnItem != undefined) {
          // this.isDelete = true;
          // this.pitchOnItem = this.finishPitchOnItem;
          this.moversConfirmDelete(this.finishPitchOnItem);
        } else {
          this.$Notice.warning({
            title: "请选择一条数据！",
            top: 50,
            duration: 5,
          });
        }
      }
    },
    //公共确认删除按钮
    confirmDelete() {
      let params = {
        ids: this.selectRow.map((item) => item.id).join(","),
      };
      this.$api.statement.DeleteMonthlyReport(params).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.getUnpublishedData(); //未发布数据列表
          this.getReleasedData(); //已发布数据列表
          this.getAllDataList(); //获取全部数据列表
          this.cancel();
        }
      });
    },
    // 公共点击版本管理弹出框按钮
    controlvs() {
      // 如果单选没有选择其中一条数据就请选择一条数据；
      if (this.unPitchOnItem != undefined) {
        this.isModal = true;
        this.pitchOnItem = this.unPitchOnItem;
        this.getversionData();
      } else {
        this.$Notice.warning({
          title: "请选择一条数据！",
          top: 50,
          duration: 5,
        });
      }
    },
    // 获取公共版本管理数据列表
    getversionData() {
      let params = {
        productIndex: this.pitchOnItem.id,
        productItemId: this.productItemId,
        status: this.versionStatus,
        pageNum: this.versionPageNum,
        pageSize: this.versionPageSize,
      };
      this.$api.statementCommon.commonVersion(params).then((res) => {
        if (res.success == true) {
          this.versionPageTotal = res.data.total;
          this.versionData = res.data.productVersionInfoList;
        }
      });
    },
    // 版本管理页数
    versionPageChange(num) {
      this.versionPageNum = num;
      this.getversionData();
    },
    // 版本管理条数
    versionPageSizeChange(size) {
      this.versionPageSize = size;
      this.getversionData();
    },
    // 上传之前
    beforeUpload(file) {
      this.upload.multipartFile = file;
    },
    // 上传成功之后
    handleSuccess(res, file) {
      this.productFile = res.data;
    },
    // 加入版本管理
    joinVersion() {
      this.title = "新建";
      this.versionModalStatus = 0;
      this.isModalJoin = true;
    },
    // 加入取消
    cancelJoin() {
      this.isModalJoin = false;
    },
    //  版本管理更新
    update(row) {
      this.title = "修改";
      this.versionModalStatus = 1;
      this.isModalJoin = true;
      this.versionId = row.id;
      this.auditor = row.auditor;
      this.description = row.description;
      this.productFile = row.productPath;
      this.version = row.version;
      this.productId = row.productId;
    },
    // 版本新增按钮
    confirmJoin() {
      if (this.versionModalStatus == 0) {
        let params = {
          productId: this.pitchOnItem.id,
          productItemId: this.productItemId,
          auditor: this.auditor,
          description: this.description,
          productPath: this.productFile,
          version: this.version,
        };
        // 新增接口
        this.$api.statementCommon.productVersionAdd(params).then((res) => {
          if (res.success == true) {
            this.getversionData();
            this.resetParameter();
            this.isModalJoin = false;
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
          }
        });
      } else {
        let params = {
          id: this.versionId,
          productId: this.productId,
          productItemId: this.productItemId,
          auditor: this.auditor,
          description: this.description,
          productPath: this.productFile,
          version: this.version,
        };
        // 更新接口
        this.$api.statementCommon
          .productVersionUpadte(this.versionId, params)
          .then((res) => {
            if (res.success == true) {
              this.getversionData();
              this.resetParameter();
              this.isModalJoin = false;
              this.$Notice.success({
                title: res.message,
                top: 50,
                duration: 5,
              });
            }
          });
      }
    },
    //  版本管理删除
    versionDelete(row) {
      // 删除版本管理版本接口
      this.$api.statementCommon.DeletetVersion(row.id).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });

          this.getversionData();
          this.isModalJoin = false;
        }
      });
    },
    // 版本管理提交版本确定按钮
    confirmVersion() {
      let params = {
        versionId: this.versionId,
      };
      this.$api.statementCommon.commonVersionExamine(params).then((res) => {
        if (res.success == true) {
          this.getUnpublishedData(); //未发布数据列表
          this.getReleasedData(); //已发布数据列表
          this.getAllDataList(); //获取全部数据列表
          this.cancel();
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    //点击发布按钮
    publishEvent() {
      // 如果单选没有选择其中一条数据就请选择一条数据；
      if (this.unPitchOnItem != undefined) {
        this.isPublishModal = true;
        this.versionStatus = 0;
        this.pitchOnItem = this.unPitchOnItem;
        this.getversionData();
      } else {
        this.$Notice.warning({
          title: "请选择一条数据！",
          top: 50,
          duration: 5,
        });
      }
    },
    //  确定发布
    confirmPublish() {
      this.$api.statementCommon
        .productVersionRelease(this.currentId)
        .then((res) => {
          if (res.success == true) {
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });

            this.getUnpublishedData(); //未发布数据列表
            this.getReleasedData(); //已发布数据列表
            this.getAllDataList(); //获取全部数据列表
            this.cancel();
          }
        });
    },
    // 点击对外服务按钮
    externalService() {
      // 如果单选没有选择其中一条数据就请选择一条数据；
      if (this.finishPitchOnItem != undefined) {
        this.isForeignServiceMoadl = true;
        this.pitchOnItem = this.finishPitchOnItem;
      } else {
        this.$Notice.warning({
          title: "请选择一条数据！",
          top: 50,
          duration: 5,
        });
      }
    },
    // 触发对外服务配置界面
    addGroupMember() {
      this.dragAffirm = true;
    },
    // 对外服务确定按钮
    confirmForeignService() {
      let params = {
        // 月报id
        productCategoryId: this.productItemId,
        // 每一项的路径-名称
        productInfoList: [
          {
            productPath: this.pitchOnItem.path,
            productTitle:
              this.pitchOnItem.serialNum + this.pitchOnItem.productType,
          },
        ],
        // 机构id
        organizationList: this.groupList.map((item) => item.id),
        // 用户id
        userList: this.userList.map((item) => item.id),
      };
      this.$api.statementCommon.publishOutAdd(params).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: "授权成功！",
            top: 50,
            duration: 5,
          });
          this.cancel();
        }
      });
    },
    //  对外服务配置事件
    changeType(item) {
      if (item.value == 0) {
        this.getOrganization();
      } else if (item.value == 1) {
        this.getUserData();
      }
    },
    // 对外服务配置确定按钮
    createAffirm(item) {
      this.groupList = item.group;
      this.userList = item.user;
      this.dragAffirm = false;
    },
    // 对外服务取消配置
    cancelAffirm() {
      this.dragAffirm = false;
    },
    //获得用户
    getUserData() {
      this.$api.userManage.newQueryAllUser().then((res) => {
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
      this.$api.userManage.querySelective().then((res) => {
        if (res.success == true) {
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
    // 弹框取消按钮
    cancel() {
      this.isShowDetails = false;
      this.isDelete = false;
      this.isPublishModal = false;
      this.dragAffirm = false;
      this.isForeignServiceMoadl = false;
      this.unPitchOnItem = undefined;
      this.finishPitchOnItem = undefined;
      this.groupList = [];
      this.userList = [];
      this.isModal = false;
      this.targetList = undefined;
      this.isShowAddition = false;
      this.resetParams = !this.resetParams;
      this.versionStatus = "";
    },
    // 重置版本参数
    resetParameter() {
      this.auditor = "";
      this.version = "";
      this.productFile = "";
      this.description = "";
    },
    //提交审核操作
    submit() {
      this.isSubmit = true;
    },
  },
};
</script>
<style lang="less" scoped>
.pie-tb-content {
  width: 100%;
  font-size: @lable-font-size;
  color: @lable-font-color;
}
.publish-module-container {
  display: flex;
  flex-direction: column;
}
.publish-module-content:extend(.border) {
  flex: 1;
  display: flex;
  flex-direction: column;
  // padding: 10px 10px 0 10px;
}
.publish-module-message {
  display: flex;
  align-items: center;
  position: relative;
  padding: 7px 0;
  span {
    padding: 0 10px;
  }
}
.publish-module-top {
  position: relative;
  width: 100%;
  flex: 1;
  background: @menu-item-bg;
  background-size: 100%;
  background-repeat: no-repeat;
  height: 38px;
  line-height: 38px;
  padding: 0 20px;
  font-size: @template-font-size;
  font-weight: 400;
  color: #fff;
  min-height: 0;
  display: flex;
  align-items: center;
}
.publish-module-title {
  border-right: 1px solid #fff;
  padding-right: 20px;
}
.publish-module-btn {
  display: flex;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 1;
}
.module-btn-top {
  top: 20px;
}
.btn-right {
  margin-right: 20px;
}
.radio-messag-image {
  height: 220px;
  .messag-img {
    width: 170px;
    height: 220px;
    margin-left: 15px;
    // vertical-align: middle;
  }
}

.radio-event {
  /deep/.ivu-radio {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
  }
}

.details-container {
  font-size: @lable-font-size;
  color: @lable-font-color;
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    list-style: none;
    li {
      display: flex;
      padding: 5px 0;
      p {
        width: 80px;
        text-align: right;
        margin-right: 10px;
      }
    }
  }
}
.modal-header-content {
  display: flex;
  justify-content: flex-end;
  margin-bottom: @table-input-space;
  .right-btn-item {
    margin-left: @table-btn-space;
  }
}
.add-version-content {
  font-size: @lable-font-size;
  color: @lable-font-color;
  ul {
    list-style: none;
    li {
      display: flex;
      align-items: center;
      margin-top: 10px;
      p {
        width: 80px;
        margin-right: 10px;
        text-align: right;
      }
      span {
        display: flex;
        .share-btn {
          margin-left: 10px;
        }
      }
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
.pie-tb-iscontent {
  max-width: 100%;

  .tb-style {
    max-width: 100%;
  }
}
/deep/.ivu-upload-list {
  display: none;
}
</style>
