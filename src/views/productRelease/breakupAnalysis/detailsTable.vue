<template>
  <div class="details-container">
    <!-- <div class="publish-module-message">
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
        <search-btn class="btn-right" @click="search"></search-btn>
      </div>
    </div>-->
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
          key: "sourceId",
          width: 150,
          align: "center",
        },
        {
          title: "目标名称",
          key: "name",
          width: 150,
          align: "center",
        },
        {
          title: "国际编号",
          key: "inteId",
          width: 150,
          align: "center",
        },
        {
          title: "国别",
          key: "nationality",
          width: 100,
          align: "center",
        },
        {
          title: "发射时间（UTC）",
          key: "lanchTime",
          width: 200,
          align: "center",
        },
        {
          title: "解体时间（UTC）",
          key: "breakupTime1",
          width: 200,
          align: "center",
        },
        {
          title: "编目碎片",
          key: "breakupDebrisSum",
          width: 150,
          align: "center",
        },
        {
          title: "在轨碎片",
          key: "orbitDebris",
          width: 150,
          align: "center",
        },
        {
          title: "远地点",
          key: "hpMax",
          width: 100,
          align: "center",
        },
        {
          title: "近地点",
          key: "haMin",
          width: 100,
          align: "center",
        },
        {
          title: "倾角",
          key: "incAve",
          width: 100,
          align: "center",
        },
        {
          title: "计算时间",
          key: "inTime",
          width: 250,
          align: "center",
        },
        {
          title: "解体原因",
          key: "breakupReason",
          width: 200,
          align: "center",
        },
      ],
      data: [
        // {
        //   sourceId: "213",
        //   name: "iresad",
        //   inteId: "2133J",
        //   nationality: "213",
        //   lanchTime: "2021-03-02 00:00:00",
        //   breakupTime1: "2021-03-02 00:00:00",
        //   breakupDebrisSum: 4,
        //   orbitDebris: "",
        //   hpMax: 321,
        //   haMin: 123,
        //   incAve: 12,
        //   inTime: "2021-03-02 00:00:00",
        //   breakupId: "",
        //   breakupReason: "1",
        // },
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
        ewBreakUpId: id,
        page: this.pageNum,
        size: this.pageSize,
        beginTime: this.createTime,
        endTime: this.endTime,
        num: this.serialNumber,
      };
      this.$api.advanced.UsvEwBreakTimeById(params).then((res) => {
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