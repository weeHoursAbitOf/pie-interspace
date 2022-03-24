<template>
  <Modal
    v-model="isShowModal"
    :title="title"
    :width="width"
    :mask-closable="maskClosable"
    :scrollable="scrollable"
    :draggable="draggable"
    :sticky="sticky"
    :sticky-distance="stickyDistance"
    :reset-drag-position="resetDragPosition"
    :footer-hide="footerHide"
    class-name
    :z-index="zIndex"
  >
    <div class="contents">
      <div>
        <slot name="content"></slot>
      </div>
    </div>
  </Modal>
</template>
<script>
export default {
  props: {
    // 显示隐藏弹框
    isShowModal: {
      type: Boolean,
      default: false,
    },
    // 标题
    title: {
      type: String,
      default: "新增",
    },
    // 宽度
    width: {
      type: String,
      default: "70",
    },
    // 是否允许点击遮罩层关闭
    maskClosable: {
      type: Boolean,
      default: false,
    },
    //页面是否可以滚动
    scrollable: {
      type: Boolean,
      default: true,
    },
    // 是否可以拖拽移动
    draggable: {
      type: Boolean,
      default: true,
    },
    // 拖拽时，是否吸附屏幕边缘
    sticky: {
      type: Boolean,
      default: false,
    },
    // 拖拽时，自动吸附屏幕边缘的临界距离
    stickyDistance: {
      type: Number,
      default: 10,
    },
    //Modal 再次打开时，是否重置拖拽的位置
    resetDragPosition: {
      type: Boolean,
      default: false,
    },
    // 	不显示底部
    footerHide: {
      type: Boolean,
      default: false,
    },
    // 	层级
    zIndex: {
      type: Number,
      default: 1000,
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.ivu-modal-content {
  box-sizing: border-box;
  border: 10px solid transparent;
  border-radius: 15px 0 15px 0;
    border-image: linear-gradient(-90deg, #FFBA33, #B3450A);
}
/deep/.ivu-modal-footer {
  display: none !important;
}
</style>
