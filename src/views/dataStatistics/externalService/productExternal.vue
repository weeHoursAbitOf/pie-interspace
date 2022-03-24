<template>
  <div class="pie-tb-content">
    <pie-card :slotFooter="false">
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
            <div class="filter-condition">
            <div class="filter-item">
              <label>产品</label>
              <Select v-model="product" class="filter-item-select">
                <Option
                  v-for="item in productList"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.label }}
                </Option>
              </Select>
            </div>
          </div>
          <div class="filter-condition">
            <div class="filter-item">
              <label>统计时间</label>
              <Select v-model="statisticalTime" class="filter-item-select">
                <Option
                  v-for="item in timeList"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.label }}
                </Option>
              </Select>
            </div>
          </div>
          <div class="filter-condition">
            <div class="filter-item">
              <label>统计间隔</label>
              <Select v-model="statisticalInterval" class="filter-item-select">
                <Option
                  v-for="item in intervalList"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.label }}
                </Option>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <!-- 表体 -->
      <div slot="iscontent">
        <div class="pie-table"> 
          <div
            ref="test"
            id="myCharts"
          ></div>
        </div>
      </div>
    </pie-card>
  </div>
</template>
<script>
import pieCard from "@/components/pie-card/pie-card.vue";
import searchBtn from "@/components/button/search-btn.vue";
import editor from "@/components/editor/wang-editor";
export default {
  components: {
    pieCard,
    searchBtn,
    editor,
  },
  data () {
    return {
        statisticalTime:"",  //统计时间
        statisticalInterval:"",  //统计间隔
        product:"", //产品
        productList:[
            {
                label:"轨道产品",
                value:"1"
            },
            {
                label:"编目产品",
                value:"2"
            },
            {
                label:"发射产品",
                value:"3"
            },
            {
                label:"预警产品",
                value:"4"
            }
        ],
        timeList:[
            {
                label:"本月",
                value:"1"
            },
            {
                label:"本季度",
                value:"2"
            },
            {
                label:"本年度",
                value:"3"
            }
        ],
        intervalList:[
            {
                label:"天",
                value:"1"
            },
            {
                label:"周",
                value:"2"
            },
            {
                label:"月",
                value:"3"
            }
        ],
        option: {
            color: ["#3EBB81", "#DD7866", "#A91270", "#05AFC9"],
            title: {
                left: "center",
                text: "对外服务产品统计",
                textStyle: {
                    color: "#c9e1ff",
                    fontSize: 15,
                },
            },
            tooltip: {
                trigger: "axis",
                },
            legend: {
                show: true,
                data: ["轨道产品", "编目产品", "发射产品", "预警产品"],
                top: "bottom",
                textStyle: {
                    color: "#c9e1ff",
                },
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: { show: true },
                },
            },
            calculable: true,
            xAxis: [
            {
                type: "category",
                data: [1, 2, 3, 4, 5, 6, 7],
                axisLabel: {
                textStyle: {
                    color: "#c9e1ff",
                },
                },
                axisLine: {
                lineStyle: {
                    type: "solid",
                    color: "#1d3870", //左边线的颜色
                    width: "1", //坐标线的宽度
                },
                },
            },
            ],
            yAxis: [
            {
                type: "value",
                data: [0, 10, 20, 30, 40, 50, 60],
                axisLabel: {
                    textStyle: {
                        color: "#c9e1ff",
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        color: "#1d3870",
                        width: "1",
                    },
                }, //去除网格线
                axisLine: {
                    lineStyle: {
                        type: "solid",
                        color: "#1d3870",
                        width: "1",
                    },
                },
            },
            ],
            series: [
            {
                name: "轨道产品",
                type: "bar",
                barCategoryGap:"50%",
                barGap:"50%",
                roundCap: true,
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 8,
                    },
                    normal: {
                        barBorderRadius: [20, 20, 20, 20],
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
                },
                data: [20, 30, 50, 60, 30, 50, 60],
            },
            {
                name: "编目产品",
                type: "bar",
                roundCap: true,
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 5,
                    },
                    normal: {
                        barBorderRadius: [20, 20, 20, 20],
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: "#7ea8ee",
                            },
                            {
                                offset: 1,
                                color: "#1209C3",
                            },
                        ]),
                    },
                },
                data: [10, 20, 30, 40, 20, 22, 11],
            },
            {
                name: "发射产品",
                type: "bar",
                roundCap: true,
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 5,
                    },
                    normal: {
                        barBorderRadius: [20, 20, 20, 20],
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: "#735dfa",
                            },
                            {
                                offset: 1,
                                color: "#1c05ae",
                            },
                        ]),
                    },
                },
                data: [5, 15, 20, 20, 15, 33, 42],
            },
            {
                name: "预警产品",
                type: "bar",
                roundCap: true,
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 5,
                    },
                    normal: {
                        barBorderRadius: [20, 20, 20, 20],
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: "#1077f5",
                            },
                            {
                                offset: 1,
                                color: "#042667",
                            },
                        ]),
                    },
                },
                data: [25, 5, 10, 5, 3, 13, 26],
            },
            ],
        },
    }

  },
  methods: {
  },
  mounted () {

    this.$nextTick(function () {
      // let test = (this.$refs.test);
      let myChart = this.$echarts.init(document.getElementById('myCharts'));

      // let chart = echarts.init(test);
      myChart.setOption(this.option)
    })



  },
};
</script>
<style lang="less" scoped>
.pie-tb-header {
    display: flex;
    max-width: 100%;
    font-size: @lable-font-size;
    flex-wrap: wrap;

    .filter-condition{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: @lable-font-color;
        margin-right: 80px;

        .filter-item-select{
            width: 280px;
            margin-left: @search-lable-space;
        }
    } 
}
.pie-table{
    display: flex;
    justify-content: center;
}
#myCharts{
    width: 1200px;
    height: 500px;
    margin-top: @table-top-space;
}

</style>