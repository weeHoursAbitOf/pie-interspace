<template>
  <!-- 查看模板详情 -->
  <div>
    <my-modal
      width="30"
      height="60"
      title="详情"
      @confirm="lookOver"
      v-model="isModal"
      :resetBtn="false"
      :cancelBtn="false"
      :close="false"
    >
      <div slot="operateItem" class="look">
        <template v-for="item in tableTitle">
          <div class="look-item" :key="item.key">
            <div class="look-item-title">{{ item.title }}:</div>
            <div class="look-item-dsc">{{ dataObject[item.key] }}</div>
          </div>
        </template>
      </div>
    </my-modal>
  </div>
</template>
<script>
import myModal from "@/components/modals/modal.vue";
export default {
  components: {
    myModal,
  },
  props: {
    tableTitle: {
      type: Array,
      default: () => {
        return [
          { title: "单位名称", key: "address" },
          { title: "单位名称", key: "createTime" },
          { title: "备注", key: "memo" },
        ];
      },
    },
    dataObject: {
      type: Object,
      default: () => {
        return {
          address: "朝阳",
          code: "2",
          createTime: "2020-12-07 12:18:45",
          createUser: "",
          endTime: "",
          fax: "",
          id: 8,
          lastModifierUser: "",
          lastModifyTime: "",
          memo: "朝阳",
          name: "朝阳",
          pageNum: "",
          pageSize: "",
          row: 1,
          startTime: "",
          zipcode: "110000",
          _index: 0,
          _rowKey: 210,
        };
      },
    },
    isModal: {
      //控制是否弹出框
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShow: true,
    };
  },
  watch: {
    isModal(newVal, oldVal) {
      console.log(newVal);
      this.isShow = newVal;
    },
    dataObject(obj) {
      if (obj.status == 1) {
        obj.status = "启用";
      } else {
        obj.status = "禁用";
      }
    },
  },
  methods: {
    //查看
    lookOver() {
      this.isShow = false;
      this.$emit("lookOver");
    },
  },
};
</script>

<style lang="less" scoped>
.look-item {
  display: flex;
  margin: 16px;

  .look-item-title {
    font-size: 20px;
    width: 35%;
    text-align: right;
  }

  .look-item-dsc {
    flex: 1;
    font-size: 18px;
    margin-left: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    word-break: break-all;
  }
}
</style>
