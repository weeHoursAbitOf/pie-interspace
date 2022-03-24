<template>
  <div class="timed-task-content">
    <div class="pie-tb-footer task-name-top">
      {{ data[0].taskGroupName }} - {{ data[0].taskName }}
    </div>
    <pie-card :slotHeader="false">
      <div slot="header"></div>
      <div slot="iscontent">
        <Table border disabled-hover :columns="columns" :data="data"></Table>
      </div>
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
  </div>
</template>

<script>
import page from "@/components/page/page.vue";
export default {
  components: {
    page,
  },
  data() {
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center",
        },
        // {
        //   title: "任务名称",
        //   key: "taskName",
        //   width: 100,
        //   ellipsis: true,
        //   align: "center",
        // },
        // {
        //   title: "任务组名称",
        //   key: "taskGroupName",
        //   width: 150,
        //   ellipsis: true,
        //   align: "center",
        // },
        {
          title: "Cron表达式",
          key: "cronWhile",
          ellipsis: true,
          align: "center",
        },
        {
          title: "IP地址",
          key: "IPsite",
          width: 300,
          ellipsis: true,
          align: "center",
        },
        {
          title: "请求参数",
          key: "JSONParams",
          width: 200,
          ellipsis: true,
          align: "center",
        },
      ],
      data: [
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
        {
          taskName: "定时",
          taskGroupName: "基础产品",
          cronWhile: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
          IPsite: "http://localhost:8080/#/fallRasterVect",
          requestType: "POST",
          JSONParams: "text:定时任务",
        },
      ],
    };
  },
  methods: {
    // 页数
    changePage(num) {
      this.pageNum = num;
    },
    // 条数
    handlePageSizeChange(size) {
      this.pageSize = size;
    },
  },
};
</script>

<style lang="less" scoped>
.timed-task-content {
  font-size: @lable-font-size;
  color: @lable-font-color;
}
</style>
