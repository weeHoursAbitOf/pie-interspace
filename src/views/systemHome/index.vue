<template>
  <div class="systemHome-container">
    <pie-card :slotHeader="false" :slotFooter="false">
      <div slot="iscontent">
        <div class="systemHome-content">
          <div v-for="(item, index) in systemList" :key="index">
            <!-- <router-link :to="item.url" :name="item.url"> -->
            <span><Icon class="icon-system" :type="item.icon" /></span>
            <p>{{ item.title }}</p>
            <!-- </router-link> -->
          </div>
        </div>
      </div>
    </pie-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      systemList: [
        {
          id: 0,
          title: "用户管理",
          icon: "md-contacts",
          url: "",
        },
        {
          id: 1,
          title: "需求处理管理",
          icon: "md-stats",
          url: "",
        },
        {
          id: 2,
          title: "产品发布管理",
          icon: "ios-paper-plane",
          url: "",
        },
        {
          id: 3,
          title: "产品模板管理",
          icon: "ios-clipboard",
          url: "",
        },
        {
          id: 4,
          title: "视频管理",
          icon: "md-videocam",
          url: "",
        },
        {
          id: 5,
          title: "专项任务请求管理",
          icon: "ios-list-box",
          url: "",
        },
        {
          id: 6,
          title: "数据导入导出管理",
          icon: "md-repeat",
          url: "",
        },
        {
          id: 7,
          title: "数据同步管理",
          icon: "md-resize",
          url: "",
        },
        {
          id: 8,
          title: "相关法规管理",
          icon: "ios-construct",
          url: "",
        },
        {
          id: 9,
          title: "公告公示管理",
          icon: "md-megaphone",
          url: "",
        },
        {
          id: 10,
          title: "软件下载管理",
          icon: "md-archive",
          url: "",
        },
        {
          id: 11,
          title: "用户留言管理",
          icon: "md-text",
          url: "",
        },
        {
          id: 12,
          title: "数据统计",
          icon: "md-list",
          url: "",
        },
      ],
    };
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
  div:extend(.border) {
    padding: 60px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:nth-child(11),
    &:nth-child(12),
    &:nth-child(13) {
      padding: 60px 177px;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 200px;
      background-image: url("../../assets/public/semicircle.png");
      background-size: 110% 110%;
      background-position: -8px -8px;
      .icon-system {
        font-size: 50px;
        color: @main-font-color;
      }
    }
    p {
      //   width: 100%;
      //   text-align: center;
      font-size: @template-font-size;
      color: #fff;
    }
  }
}
</style>