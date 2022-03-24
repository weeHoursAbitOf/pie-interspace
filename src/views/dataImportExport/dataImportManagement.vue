<template>
  <!-- 数据导入管理-->
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>导入文件名称</span>
              <Input v-model="importFileName" placeholder="请输入导入文件名称" clearable class="input-style" />
            </div>
            <div class="tb-header-item">
              <span>时间范围</span>
              <!-- <DatePicker type="daterange" split-panels placeholder="开始时间          至          结束时间" class="date-range"></DatePicker> -->
              <DatePicker type="date" placeholder="开始时间"></DatePicker>
              <span style="margin: 0 10px">至</span>
              <DatePicker type="date" placeholder="结束时间"></DatePicker>
            </div>
            <div class="tb-header-item">
              <span>文件类型</span>
              <Select v-model="fileType" class="product-type">
                <Option v-for="item in fileTypeList" :value="item.value" :key="item.value">
                  {{ item.label }}
                </Option>
              </Select>
            </div>
            <search-btn class="search-btn"></search-btn>
          </div>
          <div class="tb-header-button">
            <batch-delete-btn class="right-btn-item"></batch-delete-btn>
            <export-btn
              class="right-btn-item"
              @click="exportExcel()"
            ></export-btn>
            <Upload action="//jsonplaceholder.typicode.com/posts/">
              <export-btn
              title="人工导入"
              class="right-btn-item"
            ></export-btn>
            </Upload>
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
            max-height="500"
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
          ></page>
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
import myTable from "@/components/table/my-table.vue";
import MyTable from '../../components/table/my-table.vue';
export default {
  components: {
    pieCard,
    batchDeleteBtn,
    exportBtn,
    searchBtn,
    //deleteBtn,
    page,
    myTable
  },
  data() {
    return {
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      importFileName:"", //文件名称
      fileType: "",  //文件类型
      timeHorizon: "",
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
          title: "导入数据名称",
          key: "importFileName",
          align: "center",
        },
        {
          title: "文件类型",
          key: "fileType",
          align: "center",
          ellipsis: true,
          filters: [
            {
              label: "文本",
              value: 1,
            },
            {
              label: "CVS",
              value: 2,
            },
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.fileType == "文本";
            }  else if (value === 2) {
              return row.fileTypele == "CVS";
            }
          },
        },
        {
          title: "任务类型",
          key: "dutyType",
          align: "center",
          ellipsis: true,
          filters: [
            {
              label: "人工",
              value: 1,
            },
            {
              label: "定时",
              value: 2,
            },
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.dutyType == "人工";
            }  else if (value === 2) {
              return row.dutyType == "定时";
            }
          },
        },
        {
          title: "导入时间",
          key: "importTime",
          align: "center",
          sortable: true,
        },
        {
          title: "导入状态",
          key: "status",
          align: "center",
          ellipsis: true,
          filters: [
            {
              label: "进行中",
              value: 1,
            },
            {
              label: "已完成",
              value: 2,
            },
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.status == "进行中";
            }  else if (value === 2) {
              return row.status == "已完成";
            }
          },
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          render: (h, params) => {
            return h("Button",{
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
            )},
        },
      ],
      data: [
        // {
        //   number: 1,
        //   importFileName: "xxx数据",
        //   fileType: "文本",
        //   dutyType: "定时",
        //   importTime: "2016-10-03",
        //   status:"已完成",
        // },
        // {
        //   number: 2,
        //   importFileName: "xxx数据",
        //   fileType: "CVS",
        //   dutyType: "定时",
        //   importTime: "2016-10-03",
        //   status:"进行中",
        // },
        // {
        //   number: 3,
        //   importFileName: "xxx数据",
        //   fileType: "文本",
        //   dutyType: "人工",
        //   importTime: "2017-10-23",
        //   status:"已完成",
        // },
        // {
        //   number: 4,
        //   importFileName: "xxx数据",
        //   fileType: "文本",
        //   dutyType: "定时",
        //   importTime: "2019-12-03",
        //   status:"已完成",
        // },
        // {
        //   number: 5,
        //   importFileName: "xxx数据",
        //   fileType: "CVS",
        //   dutyType: "定时",
        //   importTime: "2016-10-03",
        //   status:"进行中",
        // },
        // {
        //   number: 6,
        //   importFileName: "xxx数据",
        //   fileType: "CVS",
        //   dutyType: "人工",
        //   importTime: "2017-10-23",
        //   status:"已完成",
        // },
        // {
        //   number: 7,
        //   importFileName: "xxx数据",
        //   fileType: "文本",
        //   dutyType: "定时",
        //   importTime: "2016-10-03",
        //   status:"已完成",
        // },
        // {
        //   number: 8,
        //   importFileName: "xxx数据",
        //   fileType: "CVS",
        //   dutyType: "人工",
        //   importTime: "2017-10-23",
        //   status:"已完成",
        // },
        // {
        //   number: 9,
        //   importFileName: "xxx数据",
        //   fileType: "CVS",
        //   dutyType: "定时",
        //   importTime: "2017-10-23",
        //   status:"已完成",
        // },
        // {
        //   number: 10,
        //   importFileName: "xxx数据",
        //   fileType: "文本",
        //   dutyType: "人工",
        //   importTime: "2017-10-23",
        //   status:"进行中",
        // },
      ],
      fileTypeList:[
        {
          value: "0",
          label: "文本",
        },
        {
          value: "1",
          label: "CVS",
        },
      ],
    };
  },
  methods: {
    // 导出按钮方法
    exportExcel() {
      this.$refs.selection.$refs.tables.exportCsv({
        filename: "数据导出统计",
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
    justify-content: space-between;
    padding-bottom: @table-padding;
  }
  .tb-header-button {
    display: flex;
    //justify-content: flex-end;
    margin-left: 78.5%;
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
  padding: @table-top-space @table-padding @table-padding @table-padding;
  max-width: 100%;

  .tb-style {
    max-width: 100%;
  }
}
</style>