<template>
  <!-- 模板管理吧列表组件 -->
  <div class="template-item">
    <img :src="listItem.thumbnail" class="template-item-img" />
    <div class="template-item-text">
      <div class="text-item">模板名称：{{ listItem.name }}</div>
      <div class="text-item">创建时间：{{ listItem.createTime }}</div>
      <div class="text-item">适用范围：{{ listItem.scope }}</div>
      <div class="text-item">
        模板介绍：<span class="ellipsis">{{ listItem.description }}</span>
      </div>
    </div>
    <div class="handle-button-list">
      <button
        class="button look-btn"
        v-if="lookBtn"
        @click="lookOver(listItem)"
      >
        查看
      </button>
      <button class="button update-btn" v-if="upBtn" @click="update(listItem)">
        修改
      </button>
      <button
        class="button del-btn"
        v-if="delBtn"
        @click="deleteOperation(listItem)"
      >
        删除
      </button>
    </div>
    <view-details
      :item="currentItem"
      @lookOver="lookOK"
      :isModal="isShowModal"
      :isShowTanle="isShowTanle"
    ></view-details>
  </div>
</template>
<script>
import viewDetails from "@/components/templateMangment/view-details.vue";

export default {
  components: {
    viewDetails,
  },
  props: {
    listItem: {
      type: Object,
      default: () => {},
    },
    lookBtn: {
      //控制查看按钮是否显示
      type: Boolean,
      default: true,
    },
    upBtn: {
      //控制修改按钮是否显示
      type: Boolean,
      default: true,
    },
    delBtn: {
      //控制删除按钮是否显示
      type: Boolean,
      default: true,
    },
    isShowTanle:{
      //查看详情是否显示表格
      type: Boolean,
      default: true,
    }
    // templateName: { //模块名称
    //   type: String,
    //   default: "ELE"
    // },
    // createTime: {
    //   type: String,
    //   default: "2020-11-15"
    // },
    // scope: {
    //   type: String,
    //   default: "国家天文台自定义格式"
    // },
    // introduce: {
    //   type: String,
    //   default: "国家天文台自定义格式01"
    // }
  },
  data() {
    return {
      currentItem: {},
      isShowModal: false,
    };
  },
  methods: {
    //查看按钮
    lookOver(item) {
      this.currentItem = item;
      this.$emit("lookOver");
      this.isShowModal = true;
    },
    //完成查看
    lookOK() {
      this.isShowModal = false;
    },
    //修改
    update(item) {
      this.$emit("update", item);
    },
    //删除
    deleteOperation(item) {
      this.$emit("deleteOperation", item);
    },
  },
};
</script>
<style lang="less" scoped>
.template-item {
  display: flex;
  align-items: center;
  color: @table-text-color;
  padding: 20px 50px;
  border-bottom: 1px solid @content-border-color;

  // &:nth-child(1) {
  //   padding-top: 0px !important;
  // }

  .template-item-img {
    width: 232px;
    height: 158px;
    // margin-left: 40px;
  }

  .template-item-text {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    height: inherit;
    margin-left: 30px;
    font-size: @template-font-size;
    font-weight: 400;
    font-style: normal;

    .text-item {
      display: flex;
      padding: 4px 0;
      flex: 1;
      max-width: 600px;
      white-space: nowrap;
    }
  }

  .handle-button-list {
    font-size: @template-font-size;

    .button {
      padding: 8px 30px;
      margin-left: 30px;
      color: #ffffff;
      border: none;
      cursor: pointer;
    }

    .look-btn {
      background-color: rgb(0, 174, 255);
    }

    .update-btn {
      background-color: rgb(250, 182, 0);
    }

    .del-btn {
      background-color: rgb(206, 2, 7);
    }
  }
}
</style>