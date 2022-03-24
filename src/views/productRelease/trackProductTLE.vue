<template>
  <div class="pie-tb-content">
    <pie-card>
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span class="title">目标编号</span>
              <Input v-model="targetNumber" class="input-style" />
            </div>
            <div class="tb-header-item">
              <span class="title">目标名称</span>
              <Input v-model="targetName" class="input-style" />
            </div>
            <div class="tb-header-item">
              <span class="title">来源</span>
              <Input v-model="source" class="input-style" />
            </div>
            <div class="tb-header-item">
              <span class="title">倾角(度)</span>
              <Input v-model="dipAngleStart" class="input-else-style" />
              <span class="text">至</span>
              <Input v-model="dipAngleEnd" class="input-else-style" />
            </div>
            <div class="tb-header-item">
              <span class="title">入轨时间</span>
              <DatePicker
                type="date"
                placeholder="开始时间"
                class="input-else-style"
              ></DatePicker>
              <span class="text">至</span>
              <DatePicker
                type="date"
                placeholder="结束时间"
                class="input-else-style"
              ></DatePicker>
            </div>
            <div class="tb-header-item">
              <span class="title">偏心率</span>
              <Input v-model="eccentricityStart" class="input-else-style" />
              <span class="text">至</span>
              <Input v-model="eccentricityEnd" class="input-else-style" />
            </div>
            <div class="tb-header-item">
              <span class="title">半长轴（千米）</span>
              <Input v-model="semiMajorStart" class="input-else-style" />
              <span class="text">至</span>
              <Input v-model="semiMajorEnd" class="input-else-style" />
            </div>
            <div class="tb-header-item">
              <span class="title">远地点高度（千米）</span>
              <Input v-model="farHeightStart" class="input-else-style" />
              <span class="text">至</span>
              <Input v-model="farHeightEnd" class="input-else-style" />
            </div>
            <div class="tb-header-item">
              <span class="title">近地点高度（千米）</span>
              <Input v-model="nearHeightStart" class="input-else-style" />
              <span class="text">至</span>
              <Input v-model="nearHeightEnd" class="input-else-style" />
            </div>
            <div class="tb-header-item">
              <span class="title">格式类型</span>
              <Select v-model="type" class="input-else-style">
                <Option
                  v-for="item in typeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
              <export-btn title="数据查询" class="btn-style"></export-btn>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <div slot="footer">
        <div class="pie-tb-footer">
          <my-table
            border
            width="1560"
            ref="selection"
            :columns="list"
            :data="dataList"
            @on-selection-change="multiSelect"
            disabled-hover
            max-height="300"
          >
          </my-table>
          <export-btn title="打包下载" class="download"></export-btn>
        </div>
      </div>
    </pie-card>
  </div>
</template>
<script>
import myTable from "@/components/table/my-table.vue";
export default {
  components: {
    myTable,
  },
  data() {
    return {
      targetNumber: "", //目标编号
      targetName: "", //目标名称
      source: "", //来源
      dipAngleStart: "", //倾角
      dipAngleEnd: "",
      eccentricityStart: "", //偏心率
      eccentricityEnd: "",
      semiMajorStart: "", //半长轴
      semiMajorEnd: "",
      farHeightStart: "", //远地点高度
      farHeightEnd: "",
      nearHeightStart: "", //近地点高度
      nearHeightEnd: "",
      type: "格式一",
      typeList: [
        {
          value: "格式一",
          label: "格式一",
        },
        {
          value: "格式二",
          label: "格式二",
        },
        {
          value: "格式三",
          label: "格式三",
        },
      ],
      selectRow: [], //选中的行
      list: [
        {
          type: "selection",
          width: 80,
          align: "center",
        },
        {
          title: "序号",
          width: 80,
          key: "number",
          align: "center",
        },
        {
          title: "标识",
          key: "",
          width: 150,
          align: "center",
        },
        {
          title: "一组tle数据",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "根数第一行",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "根数第二行",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "TLE名称",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "国际编号",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "国际代码",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "安全保密级别",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "改进后的历元时刻",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "历元时间",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "平均运动角速度一阶变化率",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "平均运动角速度二阶变化率",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "阻力参数",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "星历类型",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "要素数目",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "轨道倾角",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "升交点赤经",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "轨道偏心率",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "近地点",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "平均运动",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "已旋转圈数",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "周期",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "入库时间",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "数据来源",
          width: 150,
          key: "",
          align: "center",
        },
        {
          title: "操作",
          width: 300,
          slot: "action",
          align: "center",
        },
      ],
      dataList: [
        // {
        //   targetNumber: "30510",
        //   targetName: "FEMHYUN 1C  DEB",
        //   source: "PRC",
        //   trackType: "LEO",
        //   type: "TLE",
        //   time: "2021-09-17  14:00:00",
        // },
        // {
        //   targetNumber: "30510",
        //   targetName: "FEMHYUN 1C  DEB",
        //   source: "PRC",
        //   trackType: "HEO",
        //   type: "ELE",
        //   time: "2021-09-17  14:00:00",
        // },
        // {
        //   targetNumber: "30510",
        //   targetName: "FEMHYUN 1C  DEB",
        //   source: "PRC",
        //   trackType: "GEO",
        //   type: "自主TLE",
        //   time: "2021-09-17  14:00:00",
        // },
        // {
        //   targetNumber: "30510",
        //   targetName: "FEMHYUN 1C  DEB",
        //   source: "PRC",
        //   trackType: "HEO",
        //   type: "ELE",
        //   time: "2021-09-17  14:00:00",
        // },
        // {
        //   targetNumber: "30510",
        //   targetName: "FEMHYUN 1C  DEB",
        //   source: "PRC",
        //   trackType: "GEO",
        //   type: "自主TLE",
        //   time: "2021-09-17  14:00:00",
        // },
        // {
        //   targetNumber: "30510",
        //   targetName: "FEMHYUN 1C  DEB",
        //   source: "PRC",
        //   trackType: "LEO",
        //   type: "TLE",
        //   time: "2021-09-17  14:00:00",
        // },
        // {
        //   targetNumber: "30510",
        //   targetName: "FEMHYUN 1C  DEB",
        //   source: "PRC",
        //   trackType: "HEO",
        //   type: "ELE",
        //   time: "2021-09-17  14:00:00",
        // },
        // {
        //   targetNumber: "30510",
        //   targetName: "FEMHYUN 1C  DEB",
        //   source: "PRC",
        //   trackType: "GEO",
        //   type: "自主TLE",
        //   time: "2021-09-17  14:00:00",
        // },
      ],
    };
  },
  methods: {
    //多选
    multiSelect(selection) {
      this.selectRow = selection;
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
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    color: @lable-font-color;
    width: 100%;
    .tb-header-item {
      display: flex;
      align-items: center;
      margin: 5px 0;
      padding: 0 @table-lable-space;
      width: 50%;

      .input-style {
        width: 400px;
      }
      .input-else-style {
        width: 180px;
      }
      .text {
        margin: 12px;
      }
      .title {
        width: 200px;
        text-align: right;
        margin-right: @table-lable-space;
      }
    }
  }
}
.btn-item {
  margin-right: @table-button-space;
}
.tb-header-button {
  display: flex;
  justify-content: flex-end;
  // margin-top: @table-lable-space;
  margin: 10px 0;
}
.switch {
  margin-left: @table-lable-space;
}
//弹出框样式
.modal-content-items {
  display: flex;
  padding: 0 @table-padding @table-padding @table-padding;
  font-size: @lable-font-size;
  flex-wrap: wrap;
  color: @lable-font-color;
  .ivu-radio-wrapper {
    display: flex;
    align-items: center;
    font-size: @lable-font-size;
    margin-bottom: @table-lable-space;
  }
  .ivu-radio-group {
    width: 500px;
    height: 480px;
    overflow: scroll;
  }
}
.btn-style {
  margin-left: @table-lable-space;
}
.pie-tb-footer {
  padding: @table-padding;
  .download {
    display: flex;
    justify-content: flex-end;
    margin-top: @table-top-space;
  }
}
</style>
