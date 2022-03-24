<template>
  <!-- 查看模板详情 -->
  <div>
    <my-modal
      width="40"
      height=""
      title="模板详细"
      @confirm="lookOver"
      v-model="isShow"
      :resetBtn="false"
      :cancelBtn="false"
    >
      <div slot="operateItem" class="look">
        <div class="look-item">
          <p>模板名称:</p>
          <span>{{ item.name }}</span>
        </div>
        <div class="look-item">
          <p>创建时间:</p>
          <span>{{ item.createTime }}</span>
        </div>
        <div class="look-item">
          <p>使用范围:</p>
          <span>{{ item.scope }}</span>
        </div>
        <div class="look-item">
          <p>模板简介:</p>
          <span>{{ item.description }}</span>
        </div>
        <div class="look-item" v-if="isShowTanle">
          <p>模板生成字段:</p>
        </div>
        <div class="look-item" v-if="isShowTanle">
          <my-table
            border
            ref="selection"
            :columns="columns"
            :data="data"
          ></my-table>
        </div>
      </div>
    </my-modal>
  </div>
</template>
<script>
import myModal from "@/components/modals/modal.vue";
import myTable from "@/components/table/my-table.vue";
export default {
  components: {
    myModal,
    myTable,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    isModal: {
      //控制是否弹出框
      type: Boolean,
      default: true,
    },
    isShowTanle: {
      //查看详情是否显示表格
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isShow: false,
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
          key: "type",
          width: "200",
          align: "center",
        },
        {
          title: "字段含义",
          key: "content",
          align: "center",
        },
        {
          title: "描述",
          key: "comment",
          align: "center",
        },
      ],
      data: [],
    };
  },
  watch: {
    isModal(newVal) {
      this.isShow = newVal;
    },
    item(it) {
      this.data = it.templateFieldList;
    },
  },
  methods: {
    //查看
    lookOver() {
      this.$emit("lookOver");
    },
  },
};
</script>

<style lang="less">
.look-item {
  font-size: 20px;
  margin: 20px;
  display: flex;
  p {
    margin-right: 10px;
  }
}
</style>