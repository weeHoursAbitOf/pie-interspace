<template>
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>用户留言</span>
              <Input
                v-model="searchWord"
                placeholder="请输入关键字搜索"
                class="input-style"
              />
            </div>
            <div class="tb-header-item">
              <search-btn class="search-btn"></search-btn>
            </div>
          </div>
        </div>
      </div>
      <!-- 表体 -->
      <div slot="iscontent">
        <div class="pie-table">
          <div class="filter-condition">
            <div class="filter-item">
              <Checkbox></Checkbox>
              <label>按时间统计</label>
            </div>
            <div class="filter-item">
              <label>统计时间配置</label>
              <Select v-model="selectDate" class="filter-item-select">
                <Option
                  v-for="item in dataList"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.label }}
                </Option>
              </Select>
            </div>
          </div>
          <div
            ref="test"
            id="myCharts"
            style="height: 260px; width: 940px"
          ></div>
        </div>
      </div>
      <div slot="footer">
        <div class="pie-table">
          <div class="filter-condition">
            <div class="filter-item">
              <Checkbox></Checkbox>
              <label>按角色统计</label>
            </div>
            <div class="filter-item">
              <label>统计角色配置</label>
              <Select v-model="roleList" class="filter-item-select">
                <Option
                  v-for="item in roleList"
                  :value="item.label"
                  :key="item.value"
                >
                  {{ item.label }}
                </Option>
              </Select>
            </div>
          </div>
          <div
            ref="test"
            id="myCharts2"
            style="height: 260px; width: 940px"
          ></div>
        </div>
      </div>
    </pie-card>
  </div>
</template>
<script>
import pieCard from "@/components/pie-card/pie-card.vue";
import searchBtn from "@/components/button/search-btn.vue";
import echarts from "echarts";
var dataAxis = [
  "01/01",
  "01/02",
  "01/03",
  "01/04",
  "01/05",
  "01/06",
  "01/07",
  "01/08",
  "01/09",
  "01/10",
  "01/11",
  "01/12",
  "01/13",
  "01/14",
  "01/15",
  "01/16",
  "01/17",
  "01/18",
  "01/19",
  "01/20",
  "01/21",
  "01/22",
  "01/23",
  "01/24",
  "01/25",
  "01/26",
  "01/27",
  "01/28",
  "01/29",
  "01/30",
  "01/31",
];
var data = [
  40,
  34,
  18,
  0,
  40,
  23,
  29,
  34,
  18,
  33,
  31,
  12,
  4,
  32,
  9,
  14,
  21,
  12,
  13,
  34,
  18,
  23,
  25,
  20,
  14,
  21,
  12,
  13,
  34,
  18,
  23,
  25,
  20,
];
export default {
  components: {
    pieCard,
    searchBtn,
  },
  data() {
    return {
      entityName: "", //单位名称
      isModal: false,
      searchWord: "",
      dataList: [
        { label: "年", value: 1 },
        { label: "月", value: 2 },
        { label: "日", value: 3 },
      ],
      roleList: [
        { label: "研发部", value: 1 },
        { label: "人力部", value: 2 },
        { label: "推广部", value: 3 },
      ],
      selectDate: "",
      option: {
        // title: {
        //   text: '特性示例',
        //   subtext: 'Feature',
        //   borderColor: 'red',                // 标题边框颜色

        // },
        tooltip: {
          show: true,
          trigger: "item", //---触发类型
          textStyle: {
            color: "#fff",
          },
          padding: 10,
          backgroundColor: "#333",
          formatter: function (params) {
            return params.name + " <br/>" + "平均温度:  " + params.value + "℃";
          },
        },
        grid: {
          show: false, //---是否显示直角坐标系网格
          top: 20, //---相对位置，top\bottom\left\right
          containLabel: false, //---grid 区域是否包含坐标轴的刻度标签

          borderColor: "#fff", // 标题边框颜色
          backgroundColor: "rgba(0,0,0,0)",
          borderWidth: 1,
        },
        xAxis: {
          splitLine: {
            show: false,
          },
          name: "日期",
          color: "#999999",
          nameLocation: "end",
          position: "bottom",
          data: dataAxis,
          axisLabel: {
            alignWithLabel: true,
            textStyle: {
              color: "#999999",
            },
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: "red",
              width: 1,
              type: "solid",
            },
          },
          axisLine: {
            show: false,
            symbol: ["none", "arrow"], //---是否显示轴线箭头
            symbolSize: [8, 8], //---箭头大小
            symbolOffset: [0, 7], //---箭头位置
            lineStyle: {
              color: "#333",
              width: 1,
              type: "solid",
            },
          },
          nameTextStyle: {
            color: "#999999",
          },
          z: 10,
        },
        yAxis: [
          {
            max: 40,
            type: "value",
            name: "GDP（亿元）",
            color: "#999999",
            splitLine: {
              show: true,
              lineStyle: {
                color: "#193850",
                width: 1,
                type: "solid",
              },
            },
            // axisTick: {
            //   show: false
            // },
            axisLabel: {
              textStyle: {
                color: "#999999",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#193850",
                width: 1,
                type: "solid",
              },
            },
          },
        ],
        dataZoom: [
          {
            type: "inside",
          },
        ],
        series: [
          {
            // For shadow
            type: "bar",
            itemStyle: {
              color: "rgba(97,165,232,1)",
            },
            barGap: "-100%",
            barCategoryGap: "45%",
            data: [],
            animation: false,
          },
          {
            type: "bar",
            itemStyle: {
              // color: 'rgba(97,165,232,1)'
              barBorderRadius: [10, 10, 10, 10],
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#2996B6",
                },
                {
                  offset: 1,
                  color: "#372fd0",
                },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: "rgba(97,165,232,1)",
                barBorderRadius: 8,
                // color: new echarts.graphic.LinearGradient(
                //   0, 0, 0, 1,
                //   [
                //     { offset: 0, color: '#2378f7' },
                //     { offset: 0.7, color: '#2378f7' },
                //     { offset: 1, color: '#83bff6' }
                //   ]
                // )
              },
            },
            data: data,
          },
        ],
      },
      pieOption: {
        title: {
          text: "",
          left: "center",
          top: 10,
          textStyle: {
            color: "#ccc",
          },
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1],
          },
        },

        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "80%",
            center: ["50%", "60%"],
            color: ["#5f98ff", "#0083FE", "#1C55BE", "#06368F", "#4F17E8"],
            data: [
              { value: 335, name: "研发部" },
              { value: 310, name: "人力部" },
              { value: 274, name: "推广部" },
              { value: 235, name: "数据部" },
              { value: 500, name: "平台部" },
            ].sort(function (a, b) {
              return b.value - a.value;
            }),
            roseType: "radius",
            label: {
              color: "rgba(255, 255, 255, 0.3)",
            },
            labelLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)",
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            // itemStyle: {
            //   color: 'red',
            //   shadowBlur: 200,
            //   shadowColor: 'rgba(0, 0, 0, 0.5)'
            // },

            animationType: "scale",
            animationEasing: "elasticOut",
            // animationDelay: function (idx) {
            //   return Math.random() * 200;
            // }
          },
        ],
      },
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
  },
  mounted() {
    this.$nextTick(function () {
      // let test = (this.$refs.test);
      let myChart = this.$echarts.init(document.getElementById("myCharts"));

      // let chart = echarts.init(test);
      myChart.setOption(this.option);

      let myChart2 = this.$echarts.init(document.getElementById("myCharts2"));

      // let chart = echarts.init(test);
      myChart2.setOption(this.pieOption);
    });
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
    /* margin-right: @table-input-space; */
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
  padding: @table-top-space @table-padding @table-padding @table-padding;
  max-width: 100%;

  .tb-style {
    max-width: 100%;
  }
}

.pie-table {
  margin-top: @table-padding;
  .filter-condition {
    display: flex;
    padding-left: @table-padding;
  }
  .filter-item {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin-right: 20px;
    .filter-item-select {
      width: 300px;
      margin-left: @table-input-space;
    }
  }
}
</style>