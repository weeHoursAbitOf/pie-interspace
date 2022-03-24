<template>
  <div class="public-software-content">
    <div class="public-software-top">
      <div id="software-status" v-if="dataItem.windows != undefined">
        <tooltip :content="content" placement="top">
          <!-- <Icon type="md-radio-button-on" /> -->
          <div
            class="icons"
            :class="
              dataItem.windows.isPublish == 0
                ? 'publish-color-red'
                : 'publish-color-yellow'
            "
          ></div>
          <template slot="content">
            {{ dataItem.windows.isPublish == 0 ? "未发布" : "已发布" }}
          </template>
        </tooltip>
      </div>
      <div id="software-status" v-else>
        <tooltip :content="content" placement="top">
          <!-- <Icon type="md-radio-button-on" /> -->
          <div
            class="icons"
            :class="
              dataItem.linux.isPublish == 0
                ? 'publish-color-red'
                : 'publish-color-yellow'
            "
          ></div>
          <template slot="content">
            {{ dataItem.linux.isPublish == 0 ? "未发布" : "已发布" }}
          </template>
        </tooltip>
      </div>
      <div class="software-name">
        <!-- <p>软件名称 :</p> -->
        <span
          v-if="dataItem.windows != undefined"
          :class="dataItem.windows.isPublish == 0 ? '' : ''"
          >{{ dataItem.windows.name }}</span
        >
        <span v-else :class="dataItem.linux.isPublish == 0 ? '' : ''">{{
          dataItem.linux.name
        }}</span>
      </div>
      <!-- <div class="software-add-versions">
        <Button
          class="software-btn operation-event"
          v-if="dataItem.windows != undefined"
          v-show="dataItem.windows.isPublish == 0"
          @click="additionSoftwareEvent(dataItem.windows)"
          >添加软件</Button
        >
        <Button
          class="software-btn operation-event"
          v-else
          v-show="dataItem.linux.isPublish == 0"
          @click="additionSoftwareEvent(dataItem.linux)"
          >添加软件</Button
        >
      </div> -->
    </div>
    <div class="public-software-image">
      <img
        v-if="dataItem.windows != undefined"
        :src="dataItem.windows.icon"
        alt=""
      />
      <img v-else :src="dataItem.linux.icon" alt="" />
    </div>
    <div class="public-software-message">
      <div class="software-versions">
        <p v-if="dataItem.windows != undefined">
          <span>最新版本 :</span>{{ dataItem.windows.lastversion }}
        </p>
        <p v-else><span>最新版本 :</span>{{ dataItem.linux.lastversion }}</p>
        <Button
          class="software-btn versions-manage"
          @click="versionsManageEvent(dataItem)"
          >版本管理</Button
        >
      </div>
      <div class="software-description">
        <p v-if="dataItem.windows != undefined">
          <span>软件描述 :</span>
          {{ dataItem.windows.description }}
        </p>
        <p v-else>
          <span>软件描述 :</span>
          {{ dataItem.linux.description }}
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
.public-software-content:extend(.border) {
  // width: 23.5%;
  width: 18.7%;
  height: 400px;
  margin: 20px 0 0 20px;
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
