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
    </div> -->
    <my-table
      border
      ref="selection"
      :columns="columns"
      :data="data"
      disabled-hover
      height="500"
    ></my-table>
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
          width: 70,
          type: "index",
          align: "center",
        },
        {
          title: "目标编目",
          width: 150,
          key: "noradCatId",
          align: "center",
        },
        {
          title: "目标名称",
          key: "objectName",
          align: "center",
        },
        {
          title: "国际编号",
          key: "objectId",
          align: "center",
        },
        {
          title: "国别",
          key: "country",
          align: "center",
        },
        {
          title: "发射时间（UTC）",
          width: 250,
          key: "launchTime",
          align: "center",
        },
        {
          title: "预计陨落时间（UTC）",
          width: 250,
          key: "fallenTime",
          align: "center",
        },
        {
          title: "RCS",
          key: "rcsSize",
          align: "center",
        },
        {
          title: "计算时间",
          width: 250,
          key: "createTime",
          align: "center",
        },
      ],
      data: [
        // {
        //   noradCatId: "20123",
        //   objectName: "WDSF",
        //   objectId: "2130-213",
        //   country: "US",
        //   launchTime: "2021-04-01 00:00:00",
        //   rcsSize: "",
        //   fallenTime: "2021-04-01 00:00:00",
        //   createTime: "2021-04-01 00:00:00",
        //   fallTaskId: 2,
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
      this.getUsvEwFallTimeById(item.id);
    },
  },
  methods: {
    // 获取详情列表
    getUsvEwFallTimeById(id) {
      let params = {
        ewFallId: id,
        page: this.pageNum,
        size: this.pageSize,
        beginTime: this.createTime,
        endTime: this.endTime,
        num: this.serialNumber,
      };
      this.$api.advanced.UsvEwFallTimeById(params).then((res) => {
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
      this.getUsvEwFallTimeById(this.dataItem.id);
    },
    // 条数
    pageSizeChange(size) {
      this.pageSize = size;
      this.getUsvEwFallTimeById(this.dataItem.id);
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
      this.getUsvEwFallTimeById(this.dataItem.id);
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