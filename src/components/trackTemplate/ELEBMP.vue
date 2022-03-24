<template>
  <my-table
    border
    :span-method="handleSpan"
    ref="selection"
    :columns="columns"
    :data="data"
  >
  </my-table>
</template>

<script>
import myTable from "@/components/table/my-table.vue";
export default {
  components: {
    myTable,
  },
  data() {
    return {
      columns: [
        {
          title: "序号",
          type: "index",
          width: "80",
          align: "center",
        },
        {
          title: "内容",
          width: "250",
          key: "content",
          align: "left",
        },
        {
          title: "列序数",
          key: "columnOrdinal",
          width: "100",
          align: "center",
        },
        {
          title: "格式",
          // width: "650",
          key: "format",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    // display: "inline-biock",
                    // width: "100%",
                    textAlign: "left",
                    // padding: "5px 0px",
                  },
                },
                params.row.format.formatValue1
              ),
              h(
                "div",
                {
                  style: {
                    // display: "inline-biock",
                    // width: "100%",
                    textAlign: "left",
                    // padding: "5px 0px",
                  },
                },
                params.row.format.formatValue2
              ),
              h(
                "div",
                {
                  style: {
                    // display: "inline",
                    // width: "100%",
                    textAlign: "left",
                    // padding: "5px 0px",
                  },
                },
                params.row.format.formatValue3
              ),
              h(
                "div",
                {
                  style: {
                    //  display: "inline",
                    // width: "100%",
                    textAlign: "left",
                    // padding: "5px 0px",
                  },
                },
                params.row.format.formatValue4
              ),
              h(
                "div",
                {
                  style: {
                    // display: "inline",
                    // width: "100%",
                    textAlign: "left",
                    // padding: "5px 0px",
                  },
                },
                params.row.format.formatValue5
              ),
            ]);
          },
        },
        {
          title: "实例",
          key: "examples",
          width: "180",
          align: "center",
        },
      ],
      data: [
        {
          content: "第一行",
          columnOrdinal: "",
          format: "",
          examples: "",
        },
        {
          content: "根数历元的年",
          columnOrdinal: "1-4",
          examples: "2013",
          format: {
            formatValue1: "格式：YYYY",
          },
        },
        {
          content: "根数历元的月",
          columnOrdinal: "6-7",
          examples: "05",
          format: {
            formatValue1: "格式：MM",
          },
        },
        {
          content: "根数历元的日",
          columnOrdinal: "9-10",
          examples: "02",
          format: {
            formatValue1: "格式：DD",
          },
        },
        {
          content: "根数历元的时",
          columnOrdinal: "12-13",
          examples: "07",
          format: {
            formatValue1: "格式：hh",
          },
        },
        {
          content: "根数历元的分",
          columnOrdinal: "15-16",
          examples: "12",
          format: {
            formatValue1: "格式：mm",
          },
        },
        {
          content: "根数历元的秒",
          columnOrdinal: "18-24",
          examples: "02.6500",
          format: {
            formatValue1: "格式：ss.ssss",
          },
        },
        {
          content: "根数历元的年内积日",
          columnOrdinal: "26-39",
          examples: "300.9999999900",
          format: {
            formatValue1: "格式：YJD.DDDDDDDDDD",
          },
        },
        {
          content: "空间目标的编号（国防编号）",
          columnOrdinal: "41-46",
          examples: "033312",
          format: {
            formatValue1: "nnnnnn,不足高位补0",
          },
        },
        {
          content: "平均运行角速度的二阶变化率",
          columnOrdinal: "48-60",
          examples: "-0.0000003835",
          format: {
            formatValue1: "格式：±N.NNNNNNNNNN",
            formatValue2: "其中，人卫时间单位用分钟表示（13.44688）",
            formatValue3: "单位：弧度/人卫时间单位",
          },
        },
        {
          content: "第二行",
          columnOrdinal: "",
          format: "",
          examples: "",
        },
        {
          content: "轨道半长轴",
          columnOrdinal: "1-14",
          examples: "00017002.14500",
          format: {
            formatValue1: "格式：NNNNNNNN.NNNNN",
            formatValue2: "不足高位补0",
            formatValue3: "单位：米",
          },
        },
        {
          content: "轨道偏心率",
          columnOrdinal: "16-24",
          examples: "0.0535990",
          format: {
            formatValue1: "格式：N.NNNNNNN",
            formatValue2: "",
            formatValue3: "",
          },
        },
        {
          content: "轨道倾角",
          columnOrdinal: "26-33",
          examples: "097.9125",
          format: {
            formatValue1: "格式：NNN.NNNN",
            formatValue2: "不足高位补0",
            formatValue3: "单位：度",
          },
        },
        {
          content: "升交点赤经",
          columnOrdinal: "35-42",
          examples: "234.2318",
          format: {
            formatValue1: "格式：NNN.NNNN",
            formatValue2: "不足高位补0",
            formatValue3: "单位：度",
          },
        },
        {
          content: "近地点幅角",
          columnOrdinal: "44-51",
          examples: "082.5739",
          format: {
            formatValue1: "格式：NNN.NNNN",
            formatValue2: "不足高位补0",
            formatValue3: "单位：度",
          },
        },
        {
          content: "平近点角",
          columnOrdinal: "53-60",
          examples: "277.4260",
          format: {
            formatValue1: "格式：NNN.NNNN",
            formatValue2: "不足高位补0",
            formatValue3: "单位：度",
          },
        },
        {
          content: "第三行",
          columnOrdinal: "",
          format: "",
          examples: "",
        },
        {
          content: "平均运行角速度的一阶变化率",
          columnOrdinal: "1-13",
          examples: "-0.0000003835",
          format: {
            formatValue1: "格式：±N.NNNNNNNNNN",
            formatValue2: "其中，人卫时间单位用分钟表示（13.44688）",
            formatValue3: "单位：弧度/人卫时间单位",
          },
        },
        {
          content: "大气阻力等效面质比",
          columnOrdinal: "15-25",
          examples: "-000.006814",
          format: {
            formatValue1: "格式：±NNN:NNNNN，等符号位缺省时为正值",
            formatValue2: "单位：M2/kg",
            formatValue3: "",
          },
        },
        {
          content: "大气阻尼系数",
          columnOrdinal: "27-29",
          examples: "2.2",
          format: {
            formatValue1: "格式：N.N，当符号位缺省时为正值",
            formatValue2: "",
            formatValue3: "",
          },
        },
        {
          content: "太阳光压等效面质比",
          columnOrdinal: "31-41",
          examples: "-000.006814",
          format: {
            formatValue1: "格式：±NNN.NNNNNN,当符号位缺省值为正值",
            formatValue2: "单位：M2/kg",
            formatValue3: "",
          },
        },
        {
          content: "反射系数",
          columnOrdinal: "43-46",
          examples: "1.44",
          format: {
            formatValue1: "格式：N.NN",
            formatValue2: "值域[0 2],其中0表示全透射，1表示圈吸收，2表示全反射",
            formatValue3: "",
          },
        },
        {
          content: "F10.7太阳辐射流量",
          columnOrdinal: "48-50",
          examples: "151",
          format: {
            formatValue1: "格式XXX,不足高位补0",
            formatValue2: "",
            formatValue3: "",
          },
        },
        {
          content: "AP地磁指数",
          columnOrdinal: "52-54",
          examples: "013",
          format: {
            formatValue1: "格式XXX,不足高位补0",
            formatValue2: "",
            formatValue3: "",
          },
        },
        {
          content: "定轨方法标识",
          columnOrdinal: "56",
          examples: "1",
          format: {
            formatValue1: "1.采用数值法定轨得到的结果",
            formatValue2: "2.采用分析法定轨得到的瞬时根数结果",
            formatValue3: "3.采用分析法定轨得到的拟平均跟数结果",
            formatValue4: "4.采用数值法手动进行定轨得到的结果",
            formatValue5: "5.采用分析法手动进行定轨得到的结果",
          },
        },
      ],
    };
  },
  methods: {
    handleSpan(rowIndex, columnIndex) {
      if (rowIndex === 0 && columnIndex === 1) {
        return [1, 4];
      } else if (rowIndex === 10 && columnIndex === 1) {
        return [1, 4];
      } else if (rowIndex === 17 && columnIndex === 1) {
        return [1, 4];
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
