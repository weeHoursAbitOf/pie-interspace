<template>
  <div ref="test" id="myCharts"></div>
</template>
<script>
export default {
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {
              type: "jpg",
              name: "图形",
              show: true,
            },
          },
        },
        xAxis: {
          type: "category",
          name: "空间碎片监测与应用服务系统2021年1月编目信息统计",
          nameLocation: "middle",
          nameGap: 40,
          nameTextStyle: {
            fontSize: 15,
          },
          show: true,
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "#c9e1ff",
              width: "1",
            },
          },
        },
        yAxis: {
          type: "value",
          show: true,
          axisLine: {
            show: true,
            onZero: false,
            lineStyle: {
              color: "#c9e1ff",
              width: "1",
            },
          },
          boundaryGap: false,
        },
        series: [
          {
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 10,
            radius: "50%",
            showBackground: true,
            lineStyle: {
              width: 2,
              type: "solid",
            },
            data: [100000, 200000, 3000000, 400000, 500000, 600000, 800000],
          },
        ],
      },
    };
  },

  created() {
    this.getMyCharts();
  },
  methods: {
    getMyCharts() {
      this.$nextTick(function () {
        let myChart = this.$echarts.init(document.getElementById("myCharts"));
        myChart.setOption(this.option);
      });
    },
  },
};
</script>
<style lang="less" scoped>
#myCharts {
  width: 100%;
  height: 650px;
}
</style>
