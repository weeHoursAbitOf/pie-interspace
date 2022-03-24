<template>
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <!-- <div class="tb-header-item">
              <span>单位名称</span>
              <Input
                v-model="entityName"
                placeholder="请输入单位名称"
                class="input-style"
              />
              <search-btn class="search-btn"></search-btn>
            </div>
            <batch-delete-btn class="button-item"></batch-delete-btn>-->
            <!-- <div class="tb-header-item">
              <span>查询时间</span>
              <DatePicker
                type="date"
                placeholder="选择时间"
                class="start-time"
              ></DatePicker>
              <search-btn class="search-btn"></search-btn>
            </div>-->
          </div>
          <div class="tb-header-button">
            <!-- <export-btn @click="exportExcel()"></export-btn> -->
            <!-- <batch-join-btn class="button-item"></batch-join-btn> -->
            <batch-delete-btn class="button-item"></batch-delete-btn>
            <export-btn class="button-item" @click="join"></export-btn>

            <!-- <new-btn class="button-item" @click="addOrgniazation"></new-btn> -->
          </div>
        </div>
      </div>
      <!-- 表体 -->
      <div slot="iscontent">
        <div class="pie-tb-iscontent">
          <Table
            border
            ref="selection"
            :columns="list"
            max-height="500"
            disabled-hover
            :data="data"
          ></Table>
        </div>
      </div>
      <!-- 分页 -->
      <div slot="footer">
        <div class="pie-tb-footer">
          <page :total="pageTotal" :pageSize="pageSize" :current="pageNum"></page>
        </div>
      </div>
    </pie-card>
  </div>
</template>
<script>
import pieCard from "@/components/pie-card/pie-card.vue";
import batchDeleteBtn from "@/components/button/batch-delete-btn.vue";
import exportBtn from "@/components/button/export-btn.vue";
import searchBtn from "@/components/button/search-btn.vue";
import page from "@/components/page/page.vue";
import batchJoinBtn from "@/components/button/batch-join-btn.vue";
import newBtn from "@/components/button/new-btn";
import myModal from "@/components/modals/modal.vue";

export default {
  components: {
    pieCard,
    batchDeleteBtn,
    exportBtn,
    searchBtn,
    page,
    batchJoinBtn,
    newBtn,
    myModal,
  },
  data() {
    return {
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      entityName: "", //单位名称
      list: [
        {
          type: "selection",
          width: 58,
          align: "center",
        },
        {
          title: "序号",
          key: "number",
          align: "center",
          width: 80,
        },
        {
          title: "用户业务监测需求编号",
          width: 200,
          key: "businessMonitoringNumber",
          align: "center",
        },
        {
          title: "对应用户需求任务编号",
          width: 200,
          key: "userRequireNumber",
          align: "center",
        },
        {
          title: "请求类型",
          key: "requireType",
          align: "center",
          sortable: true,
        },
        {
          title: "专项任务请求受理情况",
          width: 200,
          key: "requestAcceptance",
          align: "center",
        },
        {
          title: "监测计划制定情况",
          key: "makePlane",
          align: "center",
        },
        {
          title: "观测数据处理情况",
          key: "dataProcess",
          align: "center",
        },
        {
          title: "预警分析完成情况",
          key: "warningAnalysis",
          align: "center",
        },
        {
          title: "产品生成情况",
          key: "productGenerate",
          align: "center",
        },
        {
          title: "产品审核情况",
          key: "productAudit",
          align: "center",
        },
        {
          title: "产品发布情况",
          key: "productSend",
          align: "center",
        },
        // {
        //   title: "操作",
        //   key: "operation",
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "success",
        //             size: "small",
        //           },
        //           style: {
        //             marginRight: "10px",
        //           },
        //           on: {
        //             click: () => {
        //               // this.showDetail(params.row.uuid);
        //             },
        //           },
        //         },
        //         "查看"
        //       ),
        //       // h(
        //       //   "Button",
        //       //   {
        //       //     class: "test",
        //       //     props: {
        //       //       type: "error",
        //       //       size: "small",
        //       //     },
        //       //     on: {
        //       //       click: () => {
        //       //         // this.showDelete(params.row.uuid, params.row.ruleName);
        //       //       },
        //       //     },
        //       //   },
        //       //   "删除"
        //       // ),
        //       h(
        //         "Button",
        //         {
        //           props: { type: "warning", size: "small" },
        //         },
        //         [
        //           h(
        //             "Poptip",
        //             {
        //               props: {
        //                 confirm: true,
        //                 transfer: true,
        //                 placement: "left-end",
        //                 title: "确定要删除吗！",
        //                 type: "error",
        //                 size: "small",
        //                 width: "200",
        //               },
        //               on: {
        //                 "on-ok": () => {
        //            
        //                 },
        //                 "on-cancel": function () {
        //                  
        //                 },
        //               },
        //             },
        //             "删除"
        //           ),
        //         ]
        //       ),
        //     ]);
        //   },
        // },
      ],
      data: [
        {
          number: 1,
          businessMonitoringNumber: "YHJCXQ20210916051",
          userRequireNumber: "GD20210916001",
          requireType: "安全规避分析",
          requestAcceptance: "已上报",
          makePlane: "已下发",
          dataProcess: "已完成",
          warningAnalysis: "已处理",
          productGenerate: "已完成",
          productAudit: "已审核",
          productSend: "已发布"

        },
        {
          number: 2,
          businessMonitoringNumber: "YHJCXQ20210916051",
          userRequireNumber: "GD20210916001",
          requireType: "发射碰撞预警",
          requestAcceptance: "已上报",
          makePlane: "已下发",
          dataProcess: "已完成",
          warningAnalysis: "已处理",
          productGenerate: "已完成",
          productAudit: "未审核",
          productSend: "未发布"
        },
        {
          number: 3,
          businessMonitoringNumber: "YHJCXQ20210916051",
          userRequireNumber: "GD20210916001",
          requireType: "安全规避分析",
          requestAcceptance: "已上报",
          makePlane: "已下发",
          dataProcess: "已完成",
          warningAnalysis: "已处理",
          productGenerate: "已完成",
          productAudit: "已审核",
          productSend: "未发布"
        },
        {
          number: 4,
          businessMonitoringNumber: "YHJCXQ20210916051",
          userRequireNumber: "GD20210916001",
          requireType: "发射碰撞预警",
          requestAcceptance: "已上报",
          makePlane: "已下发",
          dataProcess: "已完成",
          warningAnalysis: "已处理",
          productGenerate: "已完成",
          productAudit: "已审核",
          productSend: "已发布"
        },
        {
          number: 5,
          businessMonitoringNumber: "YHJCXQ20210916051",
          userRequireNumber: "GD20210916001",
          requireType: "发射碰撞预警",
          requestAcceptance: "已上报",
          makePlane: "已下发",
          dataProcess: "已完成",
          warningAnalysis: "已处理",
          productGenerate: "已完成",
          productAudit: "未审核",
          productSend: "未发布"
        },
        {
          number: 6,
          businessMonitoringNumber: "YHJCXQ20210916051",
          userRequireNumber: "GD20210916001",
          requireType: "安全规避分析",
          requestAcceptance: "已上报",
          makePlane: "已下发",
          dataProcess: "已完成",
          warningAnalysis: "已处理",
          productGenerate: "已完成",
          productAudit: "已审核",
          productSend: "已发布"
        },
        {
          number: 7,
          businessMonitoringNumber: "YHJCXQ20210916051",
          userRequireNumber: "GD20210916001",
          requireType: "发射碰撞预警",
          requestAcceptance: "已上报",
          makePlane: "已下发",
          dataProcess: "已完成",
          warningAnalysis: "已处理",
          productGenerate: "已完成",
          productAudit: "已审核",
          productSend: "未发布"
        },
        {
          number: 8,
          businessMonitoringNumber: "YHJCXQ20210916051",
          userRequireNumber: "GD20210916001",
          requireType: "安全规避分析",
          requestAcceptance: "已上报",
          makePlane: "已下发",
          dataProcess: "已完成",
          warningAnalysis: "已处理",
          productGenerate: "已完成",
          productAudit: "未审核",
          productSend: "未发布"
        },
        {
          number: 9,
          businessMonitoringNumber: "YHJCXQ20210916051",
          userRequireNumber: "GD20210916001",
          requireType: "安全规避分析",
          requestAcceptance: "已上报",
          makePlane: "已下发",
          dataProcess: "已完成",
          warningAnalysis: "已处理",
          productGenerate: "已完成",
          productAudit: "已审核",
          productSend: "未发布"
        },
        {
          number: 10,
          businessMonitoringNumber: "YHJCXQ20210916051",
          userRequireNumber: "GD20210916001",
          requireType: "安全规避分析",
          requestAcceptance: "已上报",
          makePlane: "已下发",
          dataProcess: "已完成",
          warningAnalysis: "已处理",
          productGenerate: "已完成",
          productAudit: "已审核",
          productSend: "已发布"
        },
      ],
      isModal: false,
    };
  },
  methods: {
    // 导出按钮方法
    exportExcel() {
      this.$refs.selection.exportCsv({
        filename: "数据导出统计",
      });
    },
    //新建弹出框
    addOrgniazation() {
      this.isModal = true;
    },
    cancel() {
      this.isModal = false;
    },
    join() { },
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
</style>