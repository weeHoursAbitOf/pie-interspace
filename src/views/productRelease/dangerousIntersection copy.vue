<template>
  <!-- 危险交会 -->
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span class="pronum">产品编号</span>
              <Input v-model="productNumber" placeholder="请输入产品编号" class="input-style" />
            </div>
            <div class="tb-header-item">
              <span>时间范围</span>
              <!-- <DatePicker type="daterange" split-panels placeholder="开始时间          至          结束时间" class="date-range"></DatePicker> -->
              <DatePicker type="date" placeholder="开始时间 " class="date"></DatePicker>
              <span style="margin: 0 10px">至</span>
              <DatePicker type="date" placeholder="结束时间"></DatePicker>
            </div>
          </div>
          <div class="tb-header-content2">
            <div class="tb-header-item">
              <span>关键字查询</span>
              <Input v-model="keywordSelect" placeholder="请输入关键字查询" class="input-style" />
            </div>
            <div class="tb-header-item">
              <span>期刊号</span>
              <Input v-model="journalNumber" placeholder="请输入期刊号" class="input-style" />
              <search-btn class="search-btn"></search-btn>
            </div>
            <div class="tb-header-button">
              <batch-delete-btn class="right-btn-item"></batch-delete-btn>
              <!-- <delete-btn class="right-btn-item"></delete-btn> -->
              <export-btn class="right-btn-item" @click="exportExcel()"></export-btn>
            </div>
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
            :data="data"
            disabled-hover
            max-height="500"
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
//import deleteBtn from '@/components/button/delete-btn.vue';
import page from "@/components/page/page.vue";
export default {
  components: {
    pieCard,
    batchDeleteBtn,
    exportBtn,
    searchBtn,
    //deleteBtn,
    page,
  },
  data() {
    return {
      dataSource: "",
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      productNumber: "",
      keywordSelect: "",
      journalNumber: "",
      list: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "序号",
          width: 70,
          key: "number",
          align: "center",
        },
        {
          title: "数据来源",
          key: "dataSource",
          align: "center",
          ellipsis: true,
        },
        {
          title: "产品编号",
          key: "productNum",
          align: "center",
        },
        {
          title: "产品类型",
          key: "productType",
          align: "center",
          sortable: true,
        },
        {
          title: "生成时间",
          key: "createTime",
          align: "center",
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  style: {
                    marginRight: "15px",
                  },
                  on: {
                    click: () => {
                      // this.showDetail(params.row.uuid);
                    },
                  },
                },
                "查看"
              ),
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "warning",
              //       size: "small",
              //     },
              //     on: {
              //       click: () => {
              //         // this.showDelete(params.row.uuid, params.row.ruleName);
              //       },
              //     },
              //   },
              //   "删除"
              // ),
              h(
                "Button",
                {
                  props: { type: "warning", size: "small" },
                },
                [
                  h(
                    "Poptip",
                    {
                      props: {
                        confirm: true,
                        transfer: true,
                        placement: "left-end",
                        title: "确定要删除吗！",
                        type: "error",
                        size: "small",
                        width: "200",
                      },
                      on: {
                        "on-ok": () => {
                      
                          this.$Notice.success({
                            title: "删除成功",
                            top: 50,
                            duration: 5,
                          });
                        },
                        "on-cancel": function () {
                          this.$Notice.error({
                            title: "点击了取消",
                            top: 50,
                            duration: 5,
                          });
                        },
                      },
                    },
                    "删除"
                  ),
                ]
              ),
            ]);
          },
        },
      ],
      data: [
        // {
        //   number: 1,
        //   dataSource: "3e自动",
        //   productNum: "BM2021-250",
        //   productType: "危险交会",
        //   createTime: "2016-10-03",
        // },
        // {
        //   number: 2,
        //   dataSource: "fe自动",
        //   productNum: "BM2021-249",
        //   productType: "危险交会",
        //   createTime: "2016-10-03",
        // },
        // {
        //   number: 3,
        //   dataSource: "xdc自动",
        //   productNum: "BM2021-248",
        //   productType: "危险交会",
        //   createTime: "2016-10-05",
        // },
        // {
        //   number: 4,
        //   dataSource: "e3自动",
        //   productNum: "BM2021-247",
        //   productType: "危险交会",
        //   createTime: "2016-10-22",
        // },
        // {
        //   number: 5,
        //   dataSource: "we自动",
        //   productNum: "BM2021-246",
        //   productType: "危险交会",
        //   createTime: "2016-10-03",
        // },
        // {
        //   number: 6,
        //   dataSource: "w自动",
        //   productNum: "BM2021-245",
        //   productType: "危险交会",
        //   createTime: "2016-10-06",
        // },
        // {
        //   number: 7,
        //   dataSource: "s自动",
        //   productNum: "BM2021-244",
        //   productType: "危险交会",
        //   createTime: "2016-10-03",
        // },
        // {
        //   number: 8,
        //   dataSource: "cv自动",
        //   productNum: "BM2021-243",
        //   productType: "危险交会",
        //   createTime: "2016-10-09",
        // },
        // {
        //   number: 9,
        //   dataSource: "nh自动",
        //   productNum: "BM2021-242",
        //   productType: "危险交会",
        //   createTime: "2016-10-03",
        // },
        // {
        //   number: 10,
        //   dataSource: "bb自动",
        //   productNum: "BM2021-241",
        //   productType: "危险交会",
        //   createTime: "2016-10-03",
        // },
      ],
    };
  },
  methods: {
    // 导出按钮方法
    exportExcel() {
      this.$refs.selection.exportCsv({
        filename: "数据导出统计",
        columns: this.list.filter((col, index) => index < 6),
      });
    },
  },
};
</script>
<style lang="less" scoped>
.pie-tb-header {
  display: flex;
  justify-content: space-between;
  padding: 0 @table-padding @table-padding @table-padding;
  font-size: @lable-font-size;
  flex-wrap: wrap;

  .tb-header-content {
    display: flex;
    margin-bottom: @table-input-space;
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
    margin-right: 158px;
    color: @lable-font-color;

    .input-style {
      margin-left: @table-lable-space;
      width: 300px;
    }
    .date {
      margin-left: @table-lable-space;
    }
  }
}

.pie-tb-iscontent {
  padding: @table-top-space @table-padding @table-padding @table-padding;
  max-width: 100%;

  .tb-style {
    max-width: 100%;
  }
}
.pronum {
  width: 81px;
  text-align: right;
}
</style>