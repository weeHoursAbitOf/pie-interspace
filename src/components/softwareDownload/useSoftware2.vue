<template>
  <div class="public-software-content">
    <div class="public-software-top">
      <div id="software-status">
        <tooltip :content="content" placement="top">
          <!-- <Icon type="md-radio-button-on" /> -->
          <div
            class="icons"
            :class="
              dataItem.isPublish == 0
                ? 'publish-color-red'
                : 'publish-color-yellow'
            "
          ></div>
          <div slot="content">
            {{ dataItem.isPublish == 0 ? "未发布" : "已发布" }}
          </div>
        </tooltip>
      </div>
      <div class="software-name">
        <span :class="dataItem.isPublish == 0 ? '' : ''">{{
          dataItem.name
        }}</span>
      </div>
    </div>
    <div class="public-software-image">
      <img :src="dataItem.icon" alt="" />
    </div>
    <div class="public-software-message">
      <div class="software-versions">
        <p><span>最新版本 :</span>{{ dataItem.lastversion }}</p>
        <Button
          class="software-btn versions-manage"
          @click="versionsManageEvent(dataItem)"
        >
          {{ dataItem.isPublish != 0 ? "版本信息" : "版本管理" }}</Button
        >
      </div>
      <div class="software-description">
        <p>
          <span>软件描述 :</span>
          {{ dataItem.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataItem: {
      type: Object,
    },
  },
  methods: {
    // 版本管理
    versionsManageEvent(item) {
      this.$emit("versions-manage-event", item);
    },
  },
};
</script>

<style lang="less" scoped>
.public-software-content {
  // width: 23.5%;
  width: 100%;
  height: 100%;
  // margin: 20px 0 0 20px;
  font-size: @lable-font-size;
  color: @lable-font-color;
  // border-radius: 15px;
}
.public-software-top {
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  #software-status {
    position: absolute;
    top: 13px;
    left: 13px;
    z-index: 1;
    font-size: 16px;
  }
  .software-add-versions {
    position: absolute;
    top: 8px;
    right: 15px;
    z-index: 1;
  }
  .software-name {
    display: flex;
    span {
      margin-left: 5px;
    }
  }
}
.public-software-image {
  width: 93%;
  height: 200px;
  margin: 0 10px;
  padding: 10px;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.public-software-message {
  width: 93%;
  height: 120px;
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
  .software-versions {
    height: 50px;
    display: flex;
    align-items: center;
    position: relative;
    .versions-manage {
      position: absolute;
      top: 5px;
      right: 0;
      z-index: 1;
    }
  }
}
.software-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  word-break: break-all;
}
.software-btn {
  border: 1px solid @content-border-color;
  background-color: #151e23;
  color: @lable-font-color;
  height: 0.1875rem;
}
.publish-color-red {
  background-color: #ed4014;
}
.publish-color-yellow {
  background-color: #19be6d;
}
.icons {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
</style>
