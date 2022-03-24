<template>
  <div class="details-container">
    <my-table border ref="selection" :columns="columns" :data="data" disabled-hover height="500"></my-table>
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
</template>

<script>
import myTable from "@/components/table/my-table.vue";
import page from "@/components/page/page.vue";
export default {
  props: {
    dataItem: {
      type: Object,
    },
  },
  data() {
    return {
      pageTotal: 10,
      pageSize: 10,
      pageNum: 1,
      createTime: "",
      endTime: "",
      serialNumber: "",
      columns: [
        {
          title: "序号",
          width: 80,
          type: "index",
          align: "center",
        },
        {
          title: "目标编号",
          key: "sId",

          align: "center",
        },
        {
          title: "目标名称",
          key: "sName",

          align: "center",
        },
        {
          title: "背景编号",
          key: "dId",

          align: "center",
        },
        {
          title: "背景名称",
          key: "dName",

          align: "center",
        },
        {
          title: "交会时间",
          key: "intersectTime",

          align: "center",
        },
        {
          title: "交会概率",
          key: "probaility",

          align: "center",
        },
        {
          title: "交会速度",
          key: "intersectVelocity",

          align: "center",
        },
        {
          title: "交会角",
          key: "intersectAngle",

          align: "center",
        },
        {
          title: "计算时间",
          key: "inTime",
          width: 250,
          align: "center",
        },
      ],
      data: [
        // {
        //   id: 0,
        //   sId: "123",
        //   sName: "SSAD",
        //   dId: "123",
        //   dName: "SFDS",
        //   intersectTime: 3213123.3123,
        //   intersectDistance: 21331.321,
        //   probaility: 0,
        //   intersectVelocity: 21.2312,
        //   intersectAngle: 0,
        //   inTime: "2021-02-03 00:00:00",
        //   beforeSpecialId: 0,
        //   beforeSpecialStatus: 0,
        //   afterSpecialId: 0,
        //   afterSpecialStatus: 0
        // }
      ],
    };
  },
  components: {
    myTable,
    page,
  },
  watch: {
    dataItem(item) {
      this.getUsvEwBreakTimeById(item.id);
    },
  },
  methods: {
    // 获取详情列表
    getUsvEwBreakTimeById(id) {
      let params = {
        ewId: id,
        page: this.pageNum,
        size: this.pageSize,
      };
      this.$api.advanced.getUsvEwTimeById(params).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          this.data = res.data.msg;
          this.setResetParameter();
        }
      });
    },
    // 页数
    pageChange(num) {
      this.pageNum = num;
      this.getUsvEwBreakTimeById(this.dataItem.id);
    },
    // 条数
    pageSizeChange(size) {
      this.pageSize = size;
      this.getUsvEwBreakTimeById(this.dataItem.id);
    },
    // 开始时间
    createTimeChange(time) {
      this.createTime = time;
    },
    // 结束时间
    endTimeChange(time) {
      this.endTime = time;
    },
    // 搜索
    search() {
      this.getUsvEwBreakTimeById(this.dataItem.id);
    },
    // 重置参数
    setResetParameter() {
      this.createTime = "";
      this.endTime = "";
      this.serialNumber = "";
    },
  },
};
</script>

<style lang="less" scoped>
.publish-module-message {
  display: flex;
  align-items: center;
  position: relative;
  padding: 7px 0;
  span {
    padding: 0 10px;
  }
}
.publish-module-btn {
  display: flex;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 1;
}

.btn-right {
  margin-right: 20px;
}
</style>