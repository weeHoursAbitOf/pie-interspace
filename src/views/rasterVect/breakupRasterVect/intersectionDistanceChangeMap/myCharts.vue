<template>
  <div ref="test" id="myCharts"></div>
</template>
<script>
export default {
  data() {
    return {
      option: {
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
          name: "交会时间",
          nameLocation: "middle",
          nameGap: 40,
          nameTextStyle: {
            color: "#c9e1ff",
            fontSize: 15,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#c9e1ff",
              width: "1",
            },
          },
          data: [
            "2022-01",
            "2022-02",
            "2022-03",
            "2022-04",
            "2022-05",
            "2022-06",
            "2022-07",
            "2022-08",
            "2022-09",
            "2022-10",
            "2022-11",
            "2022-12",
          ],
        },
        yAxis: {
          name: "交会距离（km）",
          nameLocation: "middle",
          nameGap: 60,
          nameTextStyle: {
            color: "#c9e1ff",
            fontSize: 15,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#c9e1ff",
              width: "1",
            },
          },
        },
        series: [
          {
            name: "line",
            type: "line",
            datasetIndex: 1,
            sybolSize: 0.1,
            symbol: "circle",
            label: {
              show: true,
              fontSize: 16,
            },
            labelLayout: {
              dx: -20,
            },
            encode: {
              label: 2,
              tooltip: 1,
            },
          },
          {
            name: "",
            type: "scatter",
            itemStyle: {
              color: "rgb(255, 41, 41)",
              borderWinth: 0,
              borderColor: "rgb(255, 41, 41)",
            },
            data: [
              [1, 13],
              [2, 16],
              [3, 18],
              [4, 12],
              [5, 11],
              [6, 17],
              [7, 13],
              [8, 12],
              [9, 17],
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
