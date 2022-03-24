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
          key: "description",
          width: "600",
          align: "left",
        },
        {
          title: "列序数",
          width: "100",
          key: "column",
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
          key: "example",
          width: "180",
          align: "center",
        },
      ],
      data: [
        {
          column: "",
          description: "第一行",
          example: "",
        },
        {
          column: "01–01",
          description: "行号",
          format: {
            formatValue1: "1",
          },
          example: "1",
        },
        {
          column: "03–07",
          description: "卫星编号",
          format: {
            formatValue1: "AAAAA",
          },
          example: "25544",
        },
        {
          column: "08–08",
          description:
            "卫星类别（U表示不保密，可供公众使用的；C 表示保密，仅限NORAD使用；S表示保密的，仅限NORAD使用）",
          example: "U",
          format: {
            formatValue1: "U",
          },
        },
        {
          column: "10–11",
          description: "卫星发射年份后两位",
          example: "98",
          format: {
            formatValue1: "YY",
          },
        },
        {
          column: "12–14",
          description: "当年发射顺序（例如：右侧表示卫星1998年第67次发射）",
          example: "067",
          format: {
            formatValue1: "LLL",
          },
        },
        {
          column: "15–17",
          description:
            "发射卫星个数（A表示是第一个，如果一次发射多颗卫星，使用26个英文字母排序；如果超过了26个编号，则使用两位字母，如AA、AB、AC编号）",
          example: "A",
          format: {
            formatValue1: "A",
          },
        },
        {
          column: "19–20",
          description: "TLE历时（年份后两位）",
          example: "08",
          format: {
            formatValue1: "YY",
          },
        },
        {
          column: "21–32",
          description:
            "TLE历时 (用十进制小数表示一年中的第几日和日中的小数部分)",
          example: "264.51782528",
          format: {
            formatValue1: "BBB.BBBBBBBB",
          },
        },
        {
          column: "34–43",
          description:
            "平均运动的一阶时间导数，用来计算每一天平均运动的变化带来的轨道漂移，提供给轨道计算软件预测卫星的位置。两行式轨道数据使用这个数据校准卫星的位置",
          example: "−.00002182",
          format: {
            formatValue1: ".CCCCCCCC",
          },
        },
        {
          column: "45–52",
          description:
            "平均运动的二阶时间导数，用来计算每一天平均运动的变化带来的轨道漂移，提供给轨道计算软件预测卫星的位置",
          example: "00000-0",
          format: {
            formatValue1: "DDDDD-D",
          },
        },
        {
          column: "54–61",
          description: "BSTAR拖调制系数",
          example: "-11606-4",
          format: {
            formatValue1: "EEEEE-E",
          },
        },
        {
          column: "63–63",
          description:
            "美国空军空间指挥中心内部使用的为1；美国空军空间指挥中心以外公开使用标识为0。",
          example: "0",
          format: {
            formatValue1: "0",
          },
        },
        {
          column: "65–68",
          description: "星历编号，TLE数据按新发现卫星的先后顺序的编号",
          example: "292",
          format: {
            formatValue1: "AAAAA",
          },
        },
        {
          column: "69–69",
          description:
            "校验和，指这一行的所有非数字字符，按照'字母、空格、句点、正号= 0；负号=1'的规则换算成0和1后，将这一行中原来的全部数字加起来，以10为模计算后所得的和。校验和可以检查出90%的数据存储或传送错误。按十进制加起来的个位数字的校验和，用于精确纠正误差。",
          example: "7",
          format: {
            formatValue1: "7",
          },
        },
        {
          column: "",
          description: "第二行",
          example: "",
        },
        {
          column: "01–01",
          description: "行号",
          example: "2",
          format: {
            formatValue1: "1",
          },
        },
        {
          column: "03–07",
          description: "卫星编号",
          example: "25544",
          format: {
            formatValue1: "AAA",
          },
        },
        {
          column: "09–16",
          description:
            "轨道的交角是指天体的轨道面和地球赤道面之间的夹度，用0～90°来表示顺行轨道（从地球北极上空看是逆时针运行）；用90～180°表示逆行轨道（从地球北极上空看是顺时针运行",
          example: "51.6416",
          format: {
            formatValue1: "HH.HHHH",
          },
        },
        {
          column: "18–25",
          description:
            "升交点赤经，升交点赤经是指卫星由南到北穿过地球赤道平面时，与地球赤道平面的交点",
          example: "247.4627",
          format: {
            formatValue1: "III.IIII",
          },
        },
        {
          column: "27–33",
          description:
            "轨道偏心率，轨道离心率是指卫星椭圆轨道的中心点到地球的球心点的距离（c）除以卫星轨道半长轴(a)得到的一个0（圆型）到1（抛物线）之间的小数值",
          example: "0006703",
          format: {
            formatValue1: "JJJJJJ",
          },
        },
        {
          column: "35–42",
          description: "近地点幅角",
          example: "130.5360",
          format: {
            formatValue1: "KKK.KKKKK",
          },
        },
        {
          column: "44–51",
          description: "平近点角",
          example: "325.0288",
          format: {
            formatValue1: "MMM.MMMM",
          },
        },
        {
          column: "53–63",
          description: "每天环绕地球的圈数",
          example: "15.72125391",
          format: {
            formatValue1: "NN.NNNNNNNN",
          },
        },
        {
          column: "64–68",
          description: "发射以来飞行的圈数",
          example: "56353",
          format: {
            formatValue1: "RRRRR",
          },
        },
        {
          column: "69–69",
          description: "校验和",
          example: "7",
          format: {
            formatValue1: "7",
          },
        },
      ],
    };
  },
  methods: {
    handleSpan(rowIndex, columnIndex) {
      if (rowIndex === 0 && columnIndex === 1) {
        return [1, 4];
      } else if (rowIndex === 15 && columnIndex === 1) {
        return [1, 4];
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
