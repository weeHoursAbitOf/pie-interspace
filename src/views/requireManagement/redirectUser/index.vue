<template>
  <div class="advanced-container">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>单位名称</span>
              <Input
                v-model="entityName"
                placeholder="请输入单位名称"
                class="input-style"
              />
            </div>
            <div class="tb-header-item">
              <span>时间范围</span>
              <DatePicker
                :value="startTime"
                type="date"
                placeholder="开始时间"
                class="start-time"
                @on-change="onStartChange"
              ></DatePicker>
              <span style="margin: 0 10px">至</span>
              <DatePicker
                :value="endTime"
                type="date"
                placeholder="结束时间"
                @on-change="onEndChange"
              ></DatePicker>
            </div>
            <div class="tb-header-item">
              <span>产品类型</span>
              <Select v-model="productType" class="input-style">
                <Option
                  v-for="item in productTypeList"
                  :value="item.label"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
          </div>
          <div class="tb-header-content2">
            <div class="tb-header-item">
              <span class="tb-header-yonghu">用户名</span>
              <Input
                v-model="userName"
                placeholder="请输入用户名"
                class="input-style"
              />
              <span style="margin: 0 15px"></span>
              <span class="tb-header-yonghu">受理状态</span>
              <Select v-model="applyStatus" class="input-style">
                <Option
                  v-for="item in applyStatusList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <div class="tb-header-button">
              <search-btn class="search-btn" @click="search"></search-btn>
              <export-btn
                class="button-item"
                @click="exportExcel()"
              ></export-btn>
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
            :data="data"
            :checkProductBtn="true"
            :progress="true"
            :manualService="true"
            @check-product-event="checkProductEvent"
            @progress-event="progressEvent"
            @manual-serviceevent="manualServiceEvent"
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
    <!-- 进度 -->
    <my-modal
      width="90"
      height="26"
      v-show="isShowProgress"
      :resetBtn="false"
      :confirmBtn="false"
      title="进度"
      @cancel="cancel"
    >
      <div slot="operateItem">
        <progressModule
          :scheduleStatus="scheduleStatus"
          :stepsDataList="scheduleDataList"
        />
      </div>
    </my-modal>
    <!-- 审核 -->
    <my-modal
      width="25"
      height="45"
      title="审核"
      v-show="isShowCheck"
      resetText="禁止"
      confirmText="通过"
      @cancel="cancel"
      @reset="checkForbid"
      @confirm="checkConfirm"
    >
      <div slot="operateItem">
        <checkModule :dataItem="dataItem" />
      </div>
    </my-modal>
    <!--人工处理安全规避 -->
    <my-modal
      width="60"
      height="90"
      title="机动信息查询"
      v-show="isModalSafety"
      :resetBtn="false"
      class="artificial-processing"
      @cancel="cancel"
      @confirm="productConfirm"
    >
      <div slot="operateItem">
        <securityAroundModule
          :dataItem="dataItem"
          :resetStatus="resetStatus"
          @on-frontProbability-change="onFrontProbabilityChange"
          @on-safetyProbability-change="onSafetyProbabilityChange"
        />
      </div>
    </my-modal>
    <!--视频 -->
    <my-modal
      width="60"
      height="55"
      title="视频"
      v-show="isShowVideo"
      :resetBtn="false"
      class="artificial-processing"
      @cancel="cancel"
      @confirm="VideoConfirm"
    >
      <div slot="operateItem">
        <videoModule />
      </div>
    </my-modal>
  </div>
</template>

<script>
import myTable from "@/components/table/my-table.vue";
import page from "@/components/page/page.vue";
import myModal from "@/components/modals/modal.vue";
import progressModule from "@/components/hpEnvyModule/progressModule";
import checkModule from "@/components/hpEnvyModule/checkModule";
import securityAroundModule from "@/components/hpEnvyModule/securityAroundModule";
import videoModule from "./videoModule";

export default {
  data() {
    return {
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      userName: "", //用户名称
      entityName: "", //单位名称
      startTime: "", //开始时间
      endTime: "", //结束时间
      productType: "", //产品类型
      productTypeList: [
        {
          value: "0",
          label: "发射碰撞预警",
        },
        {
          value: "1",
          label: "安全规避分析",
        },
      ],
      applyStatus: "-1", //受理状态
      applyStatusList: [
        {
          value: "-1",
          label: "全部",
        },
        {
          value: "0",
          label: "需求：待审核",
        },
        {
          value: "1",
          label: "需求：已受理",
        },
        {
          value: "2",
          label: "专项任务请求受理：已上报",
        },
        // {
        //   value: "3",
        //   label: "检测集合制定情况：已下发",
        // },
        // {
        //   value: "4",
        //   label: "观测数据处理情况：已完成",
        // },
        {
          value: "5",
          label: "预警分析：已处理",
        },
        {
          value: "6",
          label: "数据准备完毕：待生成",
        },
        {
          value: "7",
          label: "产品已生成：未审核",
        },
        {
          value: "8",
          label: "产品已审核：未发布",
        },
        {
          value: "9",
          label: "已发布",
        },
        {
          value: "10",
          label: "不受理",
        },
      ],
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
          title: "用户名",
          width: 100,
          key: "userName",
          align: "center",
          tooltip: true,
          ellipsis: true,
        },
        {
          title: "角色",
          width: 100,
          key: "userRole",
          align: "center",
          tooltip: true,
          ellipsis: true,
        },
        {
          title: "单位名称",
          width: 150,
          key: "userEnterprise",
          align: "center",
          tooltip: true,
          ellipsis: true,
        },
        {
          title: "产品类型",
          key: "productType",
          align: "center",
          tooltip: true,
          ellipsis: true,
        },
        {
          title: "用户需求编号",
          width: 200,
          key: "userDemandNumber",
          align: "center",
          tooltip: true,
          ellipsis: true,
        },
        {
          title: "需求类型",
          key: "userDemandType",
          align: "center",
          tooltip: true,
          ellipsis: true,
        },
        {
          title: "申请时间",
          width: 200,
          key: "create_time",
          align: "center",
          sortable: true,
          tooltip: true,
          ellipsis: true,
        },
        {
          title: "受理状态",
          key: "acceptanceStatusMsg",
          align: "center",
          tooltip: true,
          ellipsis: true,
        },
        {
          title: "操作",
          width: 250,
          key: "operation",
          align: "center",
          slot: "action",
        },
      ],
      data: [
        {
          id: 0,
          userName: "test1",
          userRole: "test1",
          userEnterprise: null,
          productType: "视频",
          userDemandNumber: "FS20210616118",
          userDemandType: "视频",
          create_time: "2021-10-01",
          acceptanceStatus: 0,
          acceptanceStatusMsg: "未受理",
          jsonMsg: "dsbfjhdsfjdsfksdf",
          productTypeNumber: 3,
          userType: 1,
          acceptance: 1,
          roleName: "test1",
          enterName: "航天宏图",
        },
        {
          id: 1,
          userName: "test1",
          userRole: "test1",
          userEnterprise: null,
          productType: "发射碰撞预警",
          userDemandNumber: "FS20210616118",
          userDemandType: "发射碰撞预警",
          create_time: "2021-10-01",
          acceptanceStatus: 6,
          acceptanceStatusMsg: "未受理",
          jsonMsg: "dsbfjhdsfjdsfksdf",
          productTypeNumber: 2,
          userType: 1,
          acceptance: 1,
          roleName: "test1",
          enterName: "航天宏图",
        },
        {
          id: 2,
          userName: "test1",
          userRole: "test1",
          userEnterprise: null,
          productType: "视频",
          userDemandNumber: "FS20210616118",
          userDemandType: "视频",
          create_time: "2021-10-01",
          acceptanceStatus: 6,
          acceptanceStatusMsg: "未受理",
          jsonMsg: "dsbfjhdsfjdsfksdf",
          productTypeNumber: 3,
          userType: 1,
          acceptance: 1,
          roleName: "test1",
          enterName: "航天宏图",
        },
        {
          id: 0,
          userName: "test1",
          userRole: "test1",
          userEnterprise: null,
          productType: "视频",
          userDemandNumber: "FS20210616118",
          userDemandType: "视频",
          create_time: "2021-10-01",
          acceptanceStatus: 0,
          acceptanceStatusMsg: "未受理",
          jsonMsg: "dsbfjhdsfjdsfksdf",
          productTypeNumber: 3,
          userType: 1,
          acceptance: 1,
          roleName: "test1",
          enterName: "航天宏图",
        },
        {
          id: 1,
          userName: "test1",
          userRole: "test1",
          userEnterprise: null,
          productType: "发射碰撞预警",
          userDemandNumber: "FS20210616118",
          userDemandType: "发射碰撞预警",
          create_time: "2021-10-01",
          acceptanceStatus: 6,
          acceptanceStatusMsg: "未受理",
          jsonMsg: "dsbfjhdsfjdsfksdf",
          productTypeNumber: 2,
          userType: 1,
          acceptance: 1,
          roleName: "test1",
          enterName: "航天宏图",
        },
        {
          id: 2,
          userName: "test1",
          userRole: "test1",
          userEnterprise: null,
          productType: "视频",
          userDemandNumber: "FS20210616118",
          userDemandType: "视频",
          create_time: "2021-10-01",
          acceptanceStatus: 6,
          acceptanceStatusMsg: "未受理",
          jsonMsg: "dsbfjhdsfjdsfksdf",
          productTypeNumber: 3,
          userType: 1,
          acceptance: 1,
          roleName: "test1",
          enterName: "航天宏图",
        },
        {
          id: 0,
          userName: "test1",
          userRole: "test1",
          userEnterprise: null,
          productType: "视频",
          userDemandNumber: "FS20210616118",
          userDemandType: "视频",
          create_time: "2021-10-01",
          acceptanceStatus: 0,
          acceptanceStatusMsg: "未受理",
          jsonMsg: "dsbfjhdsfjdsfksdf",
          productTypeNumber: 3,
          userType: 1,
          acceptance: 1,
          roleName: "test1",
          enterName: "航天宏图",
        },
        {
          id: 1,
          userName: "test1",
          userRole: "test1",
          userEnterprise: null,
          productType: "发射碰撞预警",
          userDemandNumber: "FS20210616118",
          userDemandType: "发射碰撞预警",
          create_time: "2021-10-01",
          acceptanceStatus: 6,
          acceptanceStatusMsg: "未受理",
          jsonMsg: "dsbfjhdsfjdsfksdf",
          productTypeNumber: 2,
          userType: 1,
          acceptance: 1,
          roleName: "test1",
          enterName: "航天宏图",
        },
        {
          id: 2,
          userName: "test1",
          userRole: "test1",
          userEnterprise: null,
          productType: "视频",
          userDemandNumber: "FS20210616118",
          userDemandType: "视频",
          create_time: "2021-10-01",
          acceptanceStatus: 6,
          acceptanceStatusMsg: "未受理",
          jsonMsg: "dsbfjhdsfjdsfksdf",
          productTypeNumber: 3,
          userType: 1,
          acceptance: 1,
          roleName: "test1",
          enterName: "航天宏图",
        },
        {
          id: 0,
          userName: "test1",
          userRole: "test1",
          userEnterprise: null,
          productType: "视频",
          userDemandNumber: "FS20210616118",
          userDemandType: "视频",
          create_time: "2021-10-01",
          acceptanceStatus: 0,
          acceptanceStatusMsg: "未受理",
          jsonMsg: "dsbfjhdsfjdsfksdf",
          productTypeNumber: 3,
          userType: 1,
          acceptance: 1,
          roleName: "test1",
          enterName: "航天宏图",
        },
        {
          id: 1,
          userName: "test1",
          userRole: "test1",
          userEnterprise: null,
          productType: "发射碰撞预警",
          userDemandNumber: "FS20210616118",
          userDemandType: "发射碰撞预警",
          create_time: "2021-10-01",
          acceptanceStatus: 6,
          acceptanceStatusMsg: "未受理",
          jsonMsg: "dsbfjhdsfjdsfksdf",
          productTypeNumber: 2,
          userType: 1,
          acceptance: 1,
          roleName: "test1",
          enterName: "航天宏图",
        },
        {
          id: 2,
          userName: "test1",
          userRole: "test1",
          userEnterprise: null,
          productType: "视频",
          userDemandNumber: "FS20210616118",
          userDemandType: "视频",
          create_time: "2021-10-01",
          acceptanceStatus: 6,
          acceptanceStatusMsg: "未受理",
          jsonMsg: "dsbfjhdsfjdsfksdf",
          productTypeNumber: 3,
          userType: 1,
          acceptance: 1,
          roleName: "test1",
          enterName: "航天宏图",
        },
      ],
      selectRow: [], //多选数据
      isShowProgress: false,
      isShowCheck: false,
      isShowVideo: false,
      isModalSafety: false,
      scheduleStatus: 0, //进度参数
      dataItem: {}, //审核对象
      scheduleDataList: [
        {
          value: 0,
          des: "用户产品需求",
          label: "待审核",
        },
        {
          value: 1,
          des: "用户产品需求",
          label: "已受理",
        },
        {
          value: 2,
          des: "专项任务请求受理情况",
          label: "已上报",
        },
        // {
        //   value: 3,
        //   des: "监测计划制定情况",
        //   label: "已下发",
        // },
        // {
        //   value: 4,
        //   des: "观测数据处理情况",
        //   label: "已完成",
        // },
        {
          value: 5,
          des: "预警分析完成情况",
          label: "已处理",
        },
        {
          value: 6,
          des: "产品生成情况",
          label: "待生成",
        },
        {
          value: 7,
          des: "产品生成情况",
          label: "待审核",
        },
        {
          value: 8,
          des: "产品发布情况",
          label: "已发布",
        },
      ], //进度数据列表
      // 人工服务参数
      itemId: 0, //列表id
      productTypeNumber: "", //列表的产品类型
      currentid: 0, //发射与安全规避的id
      frontProbability: "", //安全规避参数
      safetyProbability: "", //安全规避参数
      resetStatus: false,
    };
  },
  components: {
    myTable,
    page,
    myModal,
    progressModule,
    checkModule,
    videoModule,
    securityAroundModule,
  },
  created() {
    this.directionalSelSafeApply();
  },
  methods: {
    // 获取数据列表
    // 获取数据列表
    directionalSelSafeApply() {
      let formData = new FormData();
      formData.append("enName", this.entityName);
      formData.append("proType", this.productType);
      formData.append("userName", this.userName);
      formData.append("beginTime", this.startTime);
      formData.append("endTime", this.endTime);
      formData.append("page", this.pageNum);
      formData.append("size", this.pageSize);
      formData.append("applyStatus", this.applyStatus);
      this.$api.advanced.directionalSelSafeApply(formData).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          this.data = res.data.msg;
          this.setResetParameter();
        }
      });
    },
    // 开始时间
    onStartChange(time) {
      this.startTime = time;
      this.directionalSelSafeApply();
    },
    // 结束时间
    onEndChange(time) {
      this.endTime = time;
      this.directionalSelSafeApply();
    },
    // 页数
    pageChange(num) {
      this.pageNum = num;
      this.directionalSelSafeApply();
    },
    // 条数
    pageSizeChange(size) {
      this.pageSize = size;
      this.directionalSelSafeApply();
    },
    // 搜索
    search() {
      this.directionalSelSafeApply();
    },
    // 获取进度数据列表
    getScheduleApplyStatusMsg() {
      // 获取进度数据列表
      this.$api.advanced.selApplyStatusMsg().then((res) => {
        if (res.success == true) {
          this.scheduleDataList = res.data;
        }
      });
    },
    // // 获取受理状态数据列表
    getSelApplyStatusMsg() {
      let params = {
        status: 0,
      };
      this.$api.advanced.selApplyStatusMsg(params).then((res) => {
        if (res.success == true) {
          this.applyStatusList = res.data;
        }
      });
    },
    //多选
    multiSelect(selection) {
      this.selectRow = selection;
    },
    // 导出列表
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
        filename: "群组数据导出",
        separator: ",",
        columns: this.list.filter((col, index) => index > 0 && index < 7),
        data: exportData,
      });
    },
    // 进度
    progressEvent(row) {
      this.scheduleStatus = row.acceptanceStatus;
      this.isShowProgress = true;
    },
    // 审核
    checkProductEvent(row) {
      this.dataItem = row;
      this.isShowCheck = true;
    },
    // 审核不通过 禁止
    checkForbid() {
      let formData = new FormData();
      formData.append("applyId", this.dataItem.id);
      formData.append("status", false);
      this.$api.advanced.examineApproveApply(formData).then((res) => {
        if (res.success == true) {
          this.isShowCheck = false;
          this.directionalSelSafeApply();
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    // 审核通过  确定
    checkConfirm() {
      let formData = new FormData();
      formData.append("applyId", this.dataItem.id);
      formData.append("status", true);
      this.$api.advanced.examineApproveApply(formData).then((res) => {
        if (res.success == true) {
          this.isShowCheck = false;
          this.directionalSelSafeApply();
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    // 进度人工服务
    manualServiceEvent(row) {
      this.itemId = row.id;
      this.productTypeNumber = row.productTypeNumber;
      // productTypeNumber  1 =发射预警产品类型 2 = 安全规避 3= 在轨预警专报产品的需求
      if (row.productTypeNumber == 2) {
        this.isModalSafety = true;
      } else {
        this.isShowVideo = true;
      }
    },
    // 监听回调人工服务传递过来的发射与安全规避的id
    onCurrentidChange(val) {
      this.currentid = val;
    },
    // 变轨段交会信息碰撞概率设置：
    onFrontProbabilityChange(val) {
      this.frontProbability = val;
    },
    // 变轨后交会信息碰撞概率设置：
    onSafetyProbabilityChange(val) {
      this.safetyProbability = val;
    },
    // 人工服务，产品生成成功按钮
    productConfirm() {
      let params = {
        dataIds: this.currentid, //发射与安全规避的id
        taskId: this.itemId, //数据列表id
        productType: this.productTypeNumber, //产品类型
        pro: this.frontProbability,
        next: this.safetyProbability,
      };
      // 用于请求安全规避接口
      this.$api.advanced.applyEnd(params).then((res) => {
        if (res.success == true) {
          this.resetStatus = !this.resetStatus;
          this.directionalSelSafeApply();
          this.cancel();
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    // 视频
    VideoConfirm() {},
    // 取消
    cancel() {
      this.isShowCheck = false;
      this.isShowProgress = false;
      this.isShowVideo = false;
      this.isModalSafety = false;
      this.resetStatus = !this.resetStatus;
    },
    // 重置
    setResetParameter() {
      this.entityName = ""; //单位名称
      this.userName = ""; //用户名
      this.startTime = ""; //开始时间
      this.endTime = ""; //结束时间
      this.productType = ""; //产品类型
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
</style>
