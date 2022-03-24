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
          show: true,
          // nameLocation: "middle",
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "#c9e1ff",
              width: "1",
            },
          },
          boundaryGap: true,
        },
        yAxis: {
          type: "value",
          show: true,
          // nameLocation: "middle",
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
            name: "解体前",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 10,
            radius: "50%",
            showBackground: true,
            lineStyle: {
              width: 5,
              type: "solid",
            },
            data: [
              [1, 6000],
              [2, 4000],
              [3, 1000],
              [4, 2000],
              [5, 5000],
              [6, 4000],
              [7, 2000],
              [8, 2000],
              [9, 4000],
            ],
          },
          {
            name: "解体前后",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 10,
            radius: "50%",
            showBackground: true,
            lineStyle: {
              width: 5,
              type: "solid",
            },
            data: [
              [1, 2000],
              [2, 5000],
              [3, 3000],
              [4, 1000],
              [5, 2000],
              [6, 6000],
              [7, 3000],
              [8, 4000],
              [9, 2000],
            ],
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
