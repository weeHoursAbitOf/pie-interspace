<template>
  <div ref="test" id="pie"></div>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      option: {
        title: {
          left: "center",
          text: "留言回复统计",
          textStyle: {
            color: "#c9e1ff",
            fontSize: 18,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "用户：{b}<br/> 回复：{c} 条 ({d}%)",
        },
        legend: {
          right: 50,
          orient: "vertical",
          y: "center",
          x: "right",
          textStyle: {
            color: "#c9e1ff",
            fontSize: 18,
          },
          data: [
            "test1",
            "test2",
            "test3",
            "test4",
            "test5",
            "test6",
            "test7",
            "test8",
            "test9",
            "test10",
            "test1",
            "test12",
            "test13",
            "test14",
            "test15",
            "test16",
            "test17",
            "test18",
            "test19",
            "test20",
            "test21",
            "test22",
            "test23",
            "test24",
            "test25",
            "test26",
            "test27",
            "test28",
            "test29",
            "test30",
            "test31",
            "test32",
            "test33",
            "test34",
            "test35",
            "test36",
            "test37",
            "test38",
            "test39",
            "test40",
            "test41",
            "test42",
            "test43",
            "test44",
            "test45",
            "test46",
            "test47",
            "test48",
            "test49",
            "test50",
          ],
        },
        series: [
          {
            name: "回复统计",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            label: {
              position: "inner",
              fontSize: 14,
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 45, name: "test45" },
              { value: 46, name: "test46" },
              { value: 47, name: "test47" },
              { value: 48, name: "test48" },
              { value: 49, name: "test49" },
              { value: 50, name: "test50", selected: true },
            ],
          },
          {
            name: "回复统计",
            type: "pie",
            radius: ["45%", "60%"],
            labelLine: {
              length: 30,
            },
            label: {
              formatter: "{a|{b}}{abg|}\n{hr|}\n 回复：{c}条 {per|{d}%}  ",
              backgroundColor: "#F6F8FC",
              borderColor: "#8C8D8E",
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: "#6E7079",
                  lineHeight: 22,
                  align: "center",
                },
                hr: {
                  borderColor: "#8C8D8E",
                  width: "100%",
                  borderWidth: 1,
                  height: 0,
                },
                b: {
                  color: "#4C5058",
                  fontSize: 14,
                  fontWeight: "bold",
                  lineHeight: 35,
                },
                per: {
                  color: "#fff",
                  backgroundColor: "#4C5058",
                  padding: [3, 4],
                  borderRadius: 4,
                  lineHeight: 35,
                },
              },
            },
            data: [
              { value: 1, name: "test1" },
              { value: 2, name: "test2" },
              { value: 3, name: "test3" },
              { value: 4, name: "test4" },
              { value: 5, name: "test5" },
              { value: 6, name: "test6" },
              { value: 7, name: "test7" },
              { value: 8, name: "test8" },
              { value: 9, name: "test9" },
              { value: 10, name: "test10" },
              { value: 11, name: "test11" },
              { value: 12, name: "test12" },
              { value: 13, name: "test13" },
              { value: 14, name: "test14" },
              { value: 15, name: "test15" },
              { value: 16, name: "test16" },
              { value: 17, name: "test17" },
              { value: 18, name: "test18" },
              { value: 19, name: "test19" },
              { value: 20, name: "test20" },
              { value: 21, name: "test21" },
              { value: 22, name: "test22" },
              { value: 23, name: "test23" },
              { value: 24, name: "test24" },
              { value: 25, name: "test25" },
              { value: 26, name: "test26" },
              { value: 27, name: "test27" },
              { value: 28, name: "test28" },
              { value: 29, name: "test29" },
              { value: 30, name: "test30" },
              { value: 31, name: "test31" },
              { value: 32, name: "test32" },
              { value: 33, name: "test33" },
              { value: 34, name: "test34" },
              { value: 35, name: "test35" },
              { value: 36, name: "test36" },
              { value: 37, name: "test37" },
              { value: 38, name: "test38" },
              { value: 39, name: "test39" },
              { value: 40, name: "test40" },
              { value: 41, name: "test41" },
              { value: 42, name: "test42" },
              { value: 43, name: "test43" },
              { value: 44, name: "test44" },
              { value: 45, name: "test45" },
              { value: 46, name: "test46" },
              { value: 47, name: "test47" },
              { value: 48, name: "test48" },
              { value: 49, name: "test49" },
              { value: 50, name: "test50" },
            ],
          },
        ],
      },
    };
  },
  watch: {
    dataList: {
      handler(data) {
        this.option.legend.data = data;
        this.option.series[0].data = data.slice(0, 5);
        this.option.series[1].data = data;
        this.getMyCharts();
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.getMyCharts();
  },
  methods: {
    getMyCharts() {
      this.$nextTick(function () {
        let myChart = this.$echarts.init(document.getElementById("pie"));
        myChart.setOption(this.option);
      });
    },
  },
};
</script>
<style lang="less" scoped>
#pie {
  width: 100%;
  height: 100%;
}
</style>
