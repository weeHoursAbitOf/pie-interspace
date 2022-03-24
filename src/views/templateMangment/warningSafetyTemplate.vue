<template>
  <div class="systemHome-content">
    <div
      class="track-content"
      v-for="(item, index) in systemList"
      :key="index"
      @click="trackDetails(index)"
    >
      <span class="track-back">
        <!-- <p class="icon-system">{{ item.title }}</p> -->
        <Icon class="icon-system" :type="item.icon" />
      </span>
      <ul>
        <li>
          <p>{{ item.templateName }}：</p>
          <span>{{ item.templateNameContent }}</span>
        </li>
        <li>
          <p>{{ item.creationTime }}：</p>
          <span>{{ item.creationTimeContent }}</span>
        </li>
        <li>
          <p>{{ item.templateIntroduce }}：</p>
          <span>{{ item.templateIntroduceContent }}</span>
        </li>
        <li>
          <p>{{ item.templateScope }}：</p>
          <span>{{ item.templateScopeContent }}</span>
        </li>
      </ul>
    </div>
    <my-modal
      width="60"
      height=""
      :title="title"
      v-model="isShowModal"
      :resetBtn="false"
      :close="false"
      :cancelBtn="false"
      @cancel="cancel"
      @confirm="confirm"
    >
      <div slot="operateItem">
        <my-table
          border
          :span-method="handleSpan"
          ref="selection"
          :columns="columns"
          :data="data"
        >
        </my-table>
      </div>
    </my-modal>
  </div>
</template>

<script>
import myTable from "@/components/table/my-table.vue";
import myModal from "@/components/modals/modal.vue";
export default {
  components: {
    myTable,
    myModal,
  },
  data() {
    return {
      title: "自主轨道根数表",
      isShowModal: false,
      systemList: [
        {
          id: 0,
          icon: "md-git-merge",
          title: "规避模板",
          templateName: "模板名称",
          templateIntroduce: "模板介绍",
          templateScope: "适用范围",
          creationTime: "创建时间",
          creationTimeContent: "2022-01-01",
          templateNameContent: "规避模板",
          templateIntroduceContent: "适用于规避模板",
          templateScopeContent: "关于规避模板一的介绍",
        },
        {
          id: 1,
          icon: "ios-flower-outline",
          title: "机动模板",
          templateName: "模板名称",
          templateIntroduce: "模板介绍",
          templateScope: "适用范围",
          creationTime: "创建时间",
          creationTimeContent: "2022-01-01",
          templateNameContent: "机动模板",
          templateIntroduceContent: "适用于机动模板",
          templateScopeContent: "关于机动模板二的介绍",
        },
      ],
      columns: [],
      data: [],
    };
  },
  methods: {
    trackDetails(index) {
      // if (index == 0) {
      //   this.title = "ELE轨道根数格式";
      //   this.isShowModal = true;
      //   this.columns = [
      //     {
      //       title: "序号",
      //       type: "index",
      //       width: "80",
      //       align: "center",
      //     },
      //     {
      //       title: "内容",
      //       width: "250",
      //       key: "content",
      //       align: "left",
      //     },
      //     {
      //       title: "列序数",
      //       key: "columnOrdinal",
      //       width: "100",
      //       align: "center",
      //     },
      //     {
      //       title: "格式",
      //       // width: "650",
      //       key: "format",
      //       align: "center",
      //       render: (h, params) => {
      //         return h("div", [
      //           h(
      //             "div",
      //             {
      //               style: {
      //                 // display: "inline-biock",
      //                 // width: "100%",
      //                 textAlign: "left",
      //                 // padding: "5px 0px",
      //               },
      //             },
      //             params.row.format.formatValue1
      //           ),
      //           h(
      //             "div",
      //             {
      //               style: {
      //                 // display: "inline-biock",
      //                 // width: "100%",
      //                 textAlign: "left",
      //                 // padding: "5px 0px",
      //               },
      //             },
      //             params.row.format.formatValue2
      //           ),
      //           h(
      //             "div",
      //             {
      //               style: {
      //                 // display: "inline",
      //                 // width: "100%",
      //                 textAlign: "left",
      //                 // padding: "5px 0px",
      //               },
      //             },
      //             params.row.format.formatValue3
      //           ),
      //           h(
      //             "div",
      //             {
      //               style: {
      //                 //  display: "inline",
      //                 // width: "100%",
      //                 textAlign: "left",
      //                 // padding: "5px 0px",
      //               },
      //             },
      //             params.row.format.formatValue4
      //           ),
      //           h(
      //             "div",
      //             {
      //               style: {
      //                 // display: "inline",
      //                 // width: "100%",
      //                 textAlign: "left",
      //                 // padding: "5px 0px",
      //               },
      //             },
      //             params.row.format.formatValue5
      //           ),
      //         ]);
      //       },
      //     },
      //     {
      //       title: "实例",
      //       key: "examples",
      //       width: "180",
      //       align: "center",
      //     },
      //   ];
      //   this.data = [
      //     {
      //       content: "第一行",
      //       columnOrdinal: "",
      //       format: "",
      //       examples: "",
      //     },
      //     {
      //       content: "根数历元的年",
      //       columnOrdinal: "1-4",
      //       examples: "2013",
      //       format: {
      //         formatValue1: "格式：YYYY",
      //       },
      //     },
      //     {
      //       content: "根数历元的月",
      //       columnOrdinal: "6-7",
      //       examples: "05",
      //       format: {
      //         formatValue1: "格式：MM",
      //       },
      //     },
      //     {
      //       content: "根数历元的日",
      //       columnOrdinal: "9-10",
      //       examples: "02",
      //       format: {
      //         formatValue1: "格式：DD",
      //       },
      //     },
      //     {
      //       content: "根数历元的时",
      //       columnOrdinal: "12-13",
      //       examples: "07",
      //       format: {
      //         formatValue1: "格式：hh",
      //       },
      //     },
      //     {
      //       content: "根数历元的分",
      //       columnOrdinal: "15-16",
      //       examples: "12",
      //       format: {
      //         formatValue1: "格式：mm",
      //       },
      //     },
      //     {
      //       content: "根数历元的秒",
      //       columnOrdinal: "18-24",
      //       examples: "02.6500",
      //       format: {
      //         formatValue1: "格式：ss.ssss",
      //       },
      //     },
      //     {
      //       content: "根数历元的年内积日",
      //       columnOrdinal: "26-39",
      //       examples: "300.9999999900",
      //       format: {
      //         formatValue1: "格式：YJD.DDDDDDDDDD",
      //       },
      //     },
      //     {
      //       content: "空间目标的编号（国防编号）",
      //       columnOrdinal: "41-46",
      //       examples: "033312",
      //       format: {
      //         formatValue1: "nnnnnn,不足高位补0",
      //       },
      //     },
      //     {
      //       content: "平均运行角速度的二阶变化率",
      //       columnOrdinal: "48-60",
      //       examples: "-0.0000003835",
      //       format: {
      //         formatValue1: "格式：±N.NNNNNNNNNN",
      //         formatValue2: "其中，人卫时间单位用分钟表示（13.44688）",
      //         formatValue3: "单位：弧度/人卫时间单位",
      //       },
      //     },
      //     {
      //       content: "第二行",
      //       columnOrdinal: "",
      //       format: "",
      //       examples: "",
      //     },
      //     {
      //       content: "轨道半长轴",
      //       columnOrdinal: "1-14",
      //       examples: "00017002.14500",
      //       format: {
      //         formatValue1: "格式：NNNNNNNN.NNNNN",
      //         formatValue2: "不足高位补0",
      //         formatValue3: "单位：米",
      //       },
      //     },
      //     {
      //       content: "轨道偏心率",
      //       columnOrdinal: "16-24",
      //       examples: "0.0535990",
      //       format: {
      //         formatValue1: "格式：N.NNNNNNN",
      //         formatValue2: "",
      //         formatValue3: "",
      //       },
      //     },
      //     {
      //       content: "轨道倾角",
      //       columnOrdinal: "26-33",
      //       examples: "097.9125",
      //       format: {
      //         formatValue1: "格式：NNN.NNNN",
      //         formatValue2: "不足高位补0",
      //         formatValue3: "单位：度",
      //       },
      //     },
      //     {
      //       content: "升交点赤经",
      //       columnOrdinal: "35-42",
      //       examples: "234.2318",
      //       format: {
      //         formatValue1: "格式：NNN.NNNN",
      //         formatValue2: "不足高位补0",
      //         formatValue3: "单位：度",
      //       },
      //     },
      //     {
      //       content: "近地点幅角",
      //       columnOrdinal: "44-51",
      //       examples: "082.5739",
      //       format: {
      //         formatValue1: "格式：NNN.NNNN",
      //         formatValue2: "不足高位补0",
      //         formatValue3: "单位：度",
      //       },
      //     },
      //     {
      //       content: "平近点角",
      //       columnOrdinal: "53-60",
      //       examples: "277.4260",
      //       format: {
      //         formatValue1: "格式：NNN.NNNN",
      //         formatValue2: "不足高位补0",
      //         formatValue3: "单位：度",
      //       },
      //     },
      //     {
      //       content: "第三行",
      //       columnOrdinal: "",
      //       format: "",
      //       examples: "",
      //     },
      //     {
      //       content: "平均运行角速度的一阶变化率",
      //       columnOrdinal: "1-13",
      //       examples: "-0.0000003835",
      //       format: {
      //         formatValue1: "格式：±N.NNNNNNNNNN",
      //         formatValue2: "其中，人卫时间单位用分钟表示（13.44688）",
      //         formatValue3: "单位：弧度/人卫时间单位",
      //       },
      //     },
      //     {
      //       content: "大气阻力等效面质比",
      //       columnOrdinal: "15-25",
      //       examples: "-000.006814",
      //       format: {
      //         formatValue1: "格式：±NNN:NNNNN，等符号位缺省时为正值",
      //         formatValue2: "单位：M2/kg",
      //         formatValue3: "",
      //       },
      //     },
      //     {
      //       content: "大气阻尼系数",
      //       columnOrdinal: "27-29",
      //       examples: "2.2",
      //       format: {
      //         formatValue1: "格式：N.N，当符号位缺省时为正值",
      //         formatValue2: "",
      //         formatValue3: "",
      //       },
      //     },
      //     {
      //       content: "太阳光压等效面质比",
      //       columnOrdinal: "31-41",
      //       examples: "-000.006814",
      //       format: {
      //         formatValue1: "格式：±NNN.NNNNNN,当符号位缺省值为正值",
      //         formatValue2: "单位：M2/kg",
      //         formatValue3: "",
      //       },
      //     },
      //     {
      //       content: "反射系数",
      //       columnOrdinal: "43-46",
      //       examples: "1.44",
      //       format: {
      //         formatValue1: "格式：N.NN",
      //         formatValue2:
      //           "值域[0 2],其中0表示全透射，1表示圈吸收，2表示全反射",
      //         formatValue3: "",
      //       },
      //     },
      //     {
      //       content: "F10.7太阳辐射流量",
      //       columnOrdinal: "48-50",
      //       examples: "151",
      //       format: {
      //         formatValue1: "格式XXX,不足高位补0",
      //         formatValue2: "",
      //         formatValue3: "",
      //       },
      //     },
      //     {
      //       content: "AP地磁指数",
      //       columnOrdinal: "52-54",
      //       examples: "013",
      //       format: {
      //         formatValue1: "格式XXX,不足高位补0",
      //         formatValue2: "",
      //         formatValue3: "",
      //       },
      //     },
      //     {
      //       content: "定轨方法标识",
      //       columnOrdinal: "56",
      //       examples: "1",
      //       format: {
      //         formatValue1: "1.采用数值法定轨得到的结果",
      //         formatValue2: "2.采用分析法定轨得到的瞬时根数结果",
      //         formatValue3: "3.采用分析法定轨得到的拟平均跟数结果",
      //         formatValue4: "4.采用数值法手动进行定轨得到的结果",
      //         formatValue5: "5.采用分析法手动进行定轨得到的结果",
      //       },
      //     },
      //   ];
      //   this.handleSpan = function ({ rowIndex, columnIndex }) {
      //     if (rowIndex === 0 && columnIndex === 1) {
      //       return [1, 4];
      //     } else if (rowIndex === 10 && columnIndex === 1) {
      //       return [1, 4];
      //     } else if (rowIndex === 17 && columnIndex === 1) {
      //       return [1, 4];
      //     }
      //   };
      // } else if (index == 1) {
      //   this.title = "TLE轨道根数格式";
      //   this.isShowModal = true;
      //   this.columns = [
      //     {
      //       title: "序号",
      //       type: "index",
      //       width: "80",
      //       align: "center",
      //     },
      //     {
      //       title: "内容",
      //       key: "description",
      //       width: "600",
      //       align: "left",
      //     },
      //     {
      //       title: "列序数",
      //       width: "100",
      //       key: "column",
      //       align: "center",
      //     },
      //     {
      //       title: "格式",
      //       // width: "650",
      //       key: "format",
      //       align: "center",
      //       render: (h, params) => {
      //         return h("div", [
      //           h(
      //             "div",
      //             {
      //               style: {
      //                 // display: "inline-biock",
      //                 // width: "100%",
      //                 textAlign: "left",
      //                 // padding: "5px 0px",
      //               },
      //             },
      //             params.row.format.formatValue1
      //           ),
      //           h(
      //             "div",
      //             {
      //               style: {
      //                 // display: "inline-biock",
      //                 // width: "100%",
      //                 textAlign: "left",
      //                 // padding: "5px 0px",
      //               },
      //             },
      //             params.row.format.formatValue2
      //           ),
      //           h(
      //             "div",
      //             {
      //               style: {
      //                 // display: "inline",
      //                 // width: "100%",
      //                 textAlign: "left",
      //                 // padding: "5px 0px",
      //               },
      //             },
      //             params.row.format.formatValue3
      //           ),
      //           h(
      //             "div",
      //             {
      //               style: {
      //                 //  display: "inline",
      //                 // width: "100%",
      //                 textAlign: "left",
      //                 // padding: "5px 0px",
      //               },
      //             },
      //             params.row.format.formatValue4
      //           ),
      //           h(
      //             "div",
      //             {
      //               style: {
      //                 // display: "inline",
      //                 // width: "100%",
      //                 textAlign: "left",
      //                 // padding: "5px 0px",
      //               },
      //             },
      //             params.row.format.formatValue5
      //           ),
      //         ]);
      //       },
      //     },
      //     {
      //       title: "实例",
      //       key: "example",
      //       width: "180",
      //       align: "center",
      //     },
      //   ];
      //   this.data = [
      //     {
      //       column: "",
      //       description: "第一行",
      //       example: "",
      //     },
      //     {
      //       column: "01–01",
      //       description: "行号",
      //       format: {
      //         formatValue1: "1",
      //       },
      //       example: "1",
      //     },
      //     {
      //       column: "03–07",
      //       description: "卫星编号",
      //       format: {
      //         formatValue1: "AAAAA",
      //       },
      //       example: "25544",
      //     },
      //     {
      //       column: "08–08",
      //       description:
      //         "卫星类别（U表示不保密，可供公众使用的；C 表示保密，仅限NORAD使用；S表示保密的，仅限NORAD使用）",
      //       example: "U",
      //       format: {
      //         formatValue1: "U",
      //       },
      //     },
      //     {
      //       column: "10–11",
      //       description: "卫星发射年份后两位",
      //       example: "98",
      //       format: {
      //         formatValue1: "YY",
      //       },
      //     },
      //     {
      //       column: "12–14",
      //       description: "当年发射顺序（例如：右侧表示卫星1998年第67次发射）",
      //       example: "067",
      //       format: {
      //         formatValue1: "LLL",
      //       },
      //     },
      //     {
      //       column: "15–17",
      //       description:
      //         "发射卫星个数（A表示是第一个，如果一次发射多颗卫星，使用26个英文字母排序；如果超过了26个编号，则使用两位字母，如AA、AB、AC编号）",
      //       example: "A",
      //       format: {
      //         formatValue1: "A",
      //       },
      //     },
      //     {
      //       column: "19–20",
      //       description: "TLE历时（年份后两位）",
      //       example: "08",
      //       format: {
      //         formatValue1: "YY",
      //       },
      //     },
      //     {
      //       column: "21–32",
      //       description:
      //         "TLE历时 (用十进制小数表示一年中的第几日和日中的小数部分)",
      //       example: "264.51782528",
      //       format: {
      //         formatValue1: "BBB.BBBBBBBB",
      //       },
      //     },
      //     {
      //       column: "34–43",
      //       description:
      //         "平均运动的一阶时间导数，用来计算每一天平均运动的变化带来的轨道漂移，提供给轨道计算软件预测卫星的位置。两行式轨道数据使用这个数据校准卫星的位置",
      //       example: "−.00002182",
      //       format: {
      //         formatValue1: ".CCCCCCCC",
      //       },
      //     },
      //     {
      //       column: "45–52",
      //       description:
      //         "平均运动的二阶时间导数，用来计算每一天平均运动的变化带来的轨道漂移，提供给轨道计算软件预测卫星的位置",
      //       example: "00000-0",
      //       format: {
      //         formatValue1: "DDDDD-D",
      //       },
      //     },
      //     {
      //       column: "54–61",
      //       description: "BSTAR拖调制系数",
      //       example: "-11606-4",
      //       format: {
      //         formatValue1: "EEEEE-E",
      //       },
      //     },
      //     {
      //       column: "63–63",
      //       description:
      //         "美国空军空间指挥中心内部使用的为1；美国空军空间指挥中心以外公开使用标识为0。",
      //       example: "0",
      //       format: {
      //         formatValue1: "0",
      //       },
      //     },
      //     {
      //       column: "65–68",
      //       description: "星历编号，TLE数据按新发现卫星的先后顺序的编号",
      //       example: "292",
      //       format: {
      //         formatValue1: "AAAAA",
      //       },
      //     },
      //     {
      //       column: "69–69",
      //       description:
      //         "校验和，指这一行的所有非数字字符，按照'字母、空格、句点、正号= 0；负号=1'的规则换算成0和1后，将这一行中原来的全部数字加起来，以10为模计算后所得的和。校验和可以检查出90%的数据存储或传送错误。按十进制加起来的个位数字的校验和，用于精确纠正误差。",
      //       example: "7",
      //       format: {
      //         formatValue1: "7",
      //       },
      //     },
      //     {
      //       column: "",
      //       description: "第二行",
      //       example: "",
      //     },
      //     {
      //       column: "01–01",
      //       description: "行号",
      //       example: "2",
      //       format: {
      //         formatValue1: "1",
      //       },
      //     },
      //     {
      //       column: "03–07",
      //       description: "卫星编号",
      //       example: "25544",
      //       format: {
      //         formatValue1: "AAA",
      //       },
      //     },
      //     {
      //       column: "09–16",
      //       description:
      //         "轨道的交角是指天体的轨道面和地球赤道面之间的夹度，用0～90°来表示顺行轨道（从地球北极上空看是逆时针运行）；用90～180°表示逆行轨道（从地球北极上空看是顺时针运行",
      //       example: "51.6416",
      //       format: {
      //         formatValue1: "HH.HHHH",
      //       },
      //     },
      //     {
      //       column: "18–25",
      //       description:
      //         "升交点赤经，升交点赤经是指卫星由南到北穿过地球赤道平面时，与地球赤道平面的交点",
      //       example: "247.4627",
      //       format: {
      //         formatValue1: "III.IIII",
      //       },
      //     },
      //     {
      //       column: "27–33",
      //       description:
      //         "轨道偏心率，轨道离心率是指卫星椭圆轨道的中心点到地球的球心点的距离（c）除以卫星轨道半长轴(a)得到的一个0（圆型）到1（抛物线）之间的小数值",
      //       example: "0006703",
      //       format: {
      //         formatValue1: "JJJJJJ",
      //       },
      //     },
      //     {
      //       column: "35–42",
      //       description: "近地点幅角",
      //       example: "130.5360",
      //       format: {
      //         formatValue1: "KKK.KKKKK",
      //       },
      //     },
      //     {
      //       column: "44–51",
      //       description: "平近点角",
      //       example: "325.0288",
      //       format: {
      //         formatValue1: "MMM.MMMM",
      //       },
      //     },
      //     {
      //       column: "53–63",
      //       description: "每天环绕地球的圈数",
      //       example: "15.72125391",
      //       format: {
      //         formatValue1: "NN.NNNNNNNN",
      //       },
      //     },
      //     {
      //       column: "64–68",
      //       description: "发射以来飞行的圈数",
      //       example: "56353",
      //       format: {
      //         formatValue1: "RRRRR",
      //       },
      //     },
      //     {
      //       column: "69–69",
      //       description: "校验和",
      //       example: "7",
      //       format: {
      //         formatValue1: "7",
      //       },
      //     },
      //   ];
      //   this.handleSpan = function ({ row, column, rowIndex, columnIndex }) {
      //     // column.textAlign = "center";
      //     if (rowIndex === 0 && columnIndex === 1) {
      //       return [1, 4];
      //     } else if (rowIndex === 15 && columnIndex === 1) {
      //       // column.align = "center";
      //       return [1, 4];
      //     }
      //   };
      // } else {
      //   this.isShowModal = true;
      //   this.columns = [
      //     {
      //       title: "index",
      //       type: "index",
      //       width: "90",
      //       align: "center",
      //     },
      //     {
      //       title: "Column",
      //       width: "100",
      //       key: "column",
      //       align: "center",
      //     },
      //     {
      //       title: "Description",
      //       key: "description",
      //       // width: "400",
      //       align: "center",
      //     },
      //     {
      //       title: "说明",
      //       key: "explain",
      //       // width: "200",
      //       align: "center",
      //     },
      //   ];
      //   this.data = [
      //     {
      //       column: "Line 1:",
      //       description: "",
      //       explain: "",
      //     },
      //     {
      //       column: "01",
      //       description: "Line Number of Element Data",
      //       explain: "TLE行号",
      //     },
      //     {
      //       column: "03-07",
      //       description: "Satellite Number",
      //       explain: "卫星编号",
      //     },
      //     {
      //       column: "08",
      //       description: "Classification (U=Unclassified)",
      //       explain: "是否保密",
      //     },
      //     {
      //       column: "10-11",
      //       description:
      //         "International Designator (Last two digits of launch year)",
      //       explain: "国际编号（年份）",
      //     },
      //     {
      //       column: "12-14",
      //       description: "International Designator (Launch number of the year)",
      //       explain: "发射次数",
      //     },
      //     {
      //       column: "15-17",
      //       description: "International Designator (Piece of the launch)",
      //       explain: "发射物体编号",
      //     },
      //     {
      //       column: "19-20",
      //       description: "Epoch Year (Last two digits of year)",
      //       explain: "时间（年份）",
      //     },
      //     {
      //       column: "21-32",
      //       description:
      //         "Epoch (Day of the year and fractional portion of the day)",
      //       explain: "年积日和当天时刻",
      //     },
      //     {
      //       column: "34-43",
      //       description: "First Time Derivative of the Mean Motion",
      //       explain: "",
      //     },
      //     {
      //       column: "45-52",
      //       description:
      //         "Second Time Derivative of Mean Motion (decimal point assumed)",
      //       explain: "",
      //     },
      //     {
      //       column: "54-61",
      //       description: "BSTAR drag term (decimal point assumed)",
      //       explain: "BSTAR 阻力系数",
      //     },
      //     {
      //       column: "63",
      //       description: "Ephemeris type",
      //       explain: "轨道模型",
      //     },
      //     {
      //       column: "65-68",
      //       description: "Element number",
      //       explain: "目标第几组TLE",
      //     },
      //     {
      //       column: "69",
      //       description: "Checksum (modulo 10)",
      //       explain: "校验位",
      //     },
      //     {
      //       column: "",
      //       description:
      //         "(Letters, blanks, periods, plus signs=0; minus signs=1)",
      //       explain: "",
      //     },
      //     {
      //       column: "Line 2:",
      //       description: "",
      //       explain: "",
      //     },
      //     {
      //       column: "01",
      //       description: "Line Number of Element Data",
      //       explain: "TLE行号",
      //     },
      //     {
      //       column: "03-07",
      //       description: "Satellite Number",
      //       explain: "卫星编号",
      //     },
      //     {
      //       column: "09-16",
      //       description: "Inclination (degrees)",
      //       explain: "轨道倾角",
      //     },
      //     {
      //       column: "18-25",
      //       description: "Right Ascension of the Ascending Node (degrees)",
      //       explain: "升交点赤经",
      //     },
      //     {
      //       column: "27-33",
      //       description: "Eccentricity (decimal point assumed)",
      //       explain: "轨道偏心率",
      //     },
      //     {
      //       column: "35-42",
      //       description: "Argument of Perigee (degrees)",
      //       explain: "近地点幅角",
      //     },
      //     {
      //       column: "44-51",
      //       description: "Mean Anomaly (degrees)",
      //       explain: "平近点角",
      //     },
      //     {
      //       column: "53-63",
      //       description: "Mean Motion (perigees per day)",
      //       explain: "每天环绕地球的圈数",
      //     },
      //     {
      //       column: "64-68",
      //       description: "Revolution number at epoch (revs)",
      //       explain: "发射以来飞行的圈数",
      //     },
      //     {
      //       column: "69",
      //       description: "Checksum (modulo 10)",
      //       explain: "校验位",
      //     },
      //   ];
      //   this.handleSpan = function ({ rowIndex, columnIndex }) {
      //     if (rowIndex === 0 && columnIndex === 1) {
      //       return [1, 3];
      //     } else if (rowIndex === 16 && columnIndex === 1) {
      //       return [1, 3];
      //     }
      //   };
      // }
    },
    cancel() {
      this.isShowModal = false;
      this.data = [];
    },
    confirm() {
      this.isShowModal = false;
      this.data = [];
    },
    handleSpan({ rowIndex, columnIndex }) {
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


<style lang="less" scoped>
.systemHome-content {
  height: 730px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  padding: @table-padding;
  overflow: auto;
  .track-content:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
  .track-content:extend(.border) {
    padding: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .track-back {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 260px;
      height: 260px;
      background-image: url("../../assets/public/semicircle.png");
      background-size: 110% 110%;
      background-position: -11px -13px;
      .icon-system {
        font-size: 50px;
        color: @main-font-color;
      }
    }
    p {
      font-size: @template-font-size;
      color: @main-font-color;
    }
  }
}
ul {
  li {
    list-style: none;
    display: flex;
    margin-top: 10px;
    span {
      // width: 100%;
      display: block;
      // text-align: center;
      margin-left: 10px;
      font-size: @template-font-size;
      color: @main-font-color;
    }
  }
}
/deep/ .my-modal .operate-item {
  margin-bottom: 90px;
}
/deep/ .my-modal .header {
  margin-top: 20px;
}
</style>