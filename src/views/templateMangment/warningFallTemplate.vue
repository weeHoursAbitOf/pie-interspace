<template>
  <div class="systemHome-content">
    <div
      class="track-content"
      v-for="(item, index) in systemList"
      :key="index"
      @click="trackDetails"
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
      width="40"
      height
      :title="title"
      v-model="isShowModal"
      :resetBtn="false"
      :close="false"
      :cancelBtn="false"
      @cancel="cancel"
      @confirm="confirm"
    >
      <div slot="operateItem">
        <my-table border :span-method="handleSpan" ref="selection" :columns="columns" :data="data"></my-table>
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
          icon: "md-globe",
          title: "陨落模板",
          templateName: "模板名称",
          templateIntroduce: "模板介绍",
          templateScope: "适用范围",
          creationTime: "创建时间",
          creationTimeContent: "2022-07-01",
          templateNameContent: "陨落模板",
          templateIntroduceContent: "适用于陨落模板",
          templateScopeContent: "关于陨落状况模板的介绍",
        },
      ],
      columns: [
        {
          title: "序号",
          type: "index",
          width: "80",
          align: "center",
        },
        {
          title: "字段名称",
          key: "name",
          align: "center",
        },
        {
          title: "字段类型",
          width: "200",
          key: "content",
          align: "center",
        },
        {
          title: "实例",
          key: "type",
          align: "center",
        },
      ],
      data: [
        {
          name: "目标编号",
          type: "41900",
          content: "",
        },
        {
          name: "目标名称",
          type: "云海一号",
          content: "",
        },
        {
          name: "国际编号",
          type: "2008-030D",
          content: "",
        },
        {
          name: "国别",
          type: "美国",
          content: "",
        },
        // {
        //   name: "发射时间（UTC）",
        //   type: "1995/3/27",
        //   content: "",
        // },
        {
          name: "预计陨落时间（UTC）",
          type: "2020/3/27",
          content: "",
        },
        {
          name: "RCS",
          type: "LARGE",
          content: "",
        },
        {
          name: "计算时间",
          type: "2020/3/27 14:26:00.89",
          content: "",
        },
      ],
    };
  },
  mounted() {
    this.$api.templateManage.sudden().then((res) => {
      if (res.success == true) {
        this.data = res.data;
      } else {
        this.$Notice.error({
          title: res.message,
          top: 50,
          duration: 5,
        });

      }
    });
  },
  methods: {
    trackDetails() {
      this.title = "陨落模板";
      this.isShowModal = true;
    },
    cancel() {
      this.isShowModal = false;
    },
    confirm() {
      this.isShowModal = false;
    },
    getSudden() {
      this.$api.templateManage.sudden().then((res) => {
        if (res.success == true) {
          this.fieldDataList = res.data;
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
  },
};
</script>


<style lang="less" scoped>
.systemHome-content {
  height: 730px;
  display: flex;
  justify-content: space-between;
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
        font-size: 60px;
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
      display: block;
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