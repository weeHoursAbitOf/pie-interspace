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
        series: [],
      },
    };
  },

  created() {
    this.getMyCharts();
    let data = [
      [
        [1, 0],
        [2, 50],
        [3, 30],
        [4, 20],
        [5, 70],
        [6, 0],
        [7, 30],
        [8, 70],
        [9, 80],
        [10, 20],
        [11, 0],
        [12, 20],
      ],
      [
        [1, 20],
        [2, 30],
        [3, 40],
        [4, 50],
        [5, 0],
        [6, 60],
        [7, 30],
        [8, 20],
        [9, 50],
        [10, 30],
        [11, 12],
        [12, 0],
      ],
    ];
    data.filter((item) => {
      this.option.series.push({
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
        data: item,
      });
    });
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
