<template>
  <div class="template-details-content">
    <div
      class="track-content"
      v-for="(item, index) in dataList"
      :key="index"
      @click="trackDetails(item)"
    >
      <span class="track-back">
        <Icon class="icon-system" :type="item.icon" />
      </span>
      <ul>
        <li>
          <p>模板名称：</p>
          <Tooltip :content="item.name" placement="top">
            <span>{{ item.name }}</span>
          </Tooltip>
        </li>
        <li>
          <p>创建时间：</p>
          <Tooltip :content="item.createTime" placement="top">
            <span>{{ item.createTime }}</span>
          </Tooltip>
        </li>
        <li>
          <p>适用范围：</p>
          <Tooltip :content="item.scope" placement="top">
            <span>{{ item.scope }}</span>
          </Tooltip>
        </li>
        <li>
          <p>模板介绍：</p>
          <Tooltip :content="item.description" placement="top">
            <span>{{ item.description }}</span>
          </Tooltip>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  watch: {
    dataList(datas) {
      datas.forEach((item) => {
        switch (parseInt(Math.random() * 10)) {
          case 0:
            item.icon = "md-tennisball";
            break;
          case 1:
            item.icon = "logo-pinterest";
            break;
          case 2:
            item.icon = "logo-playstation";
            break;
          case 3:
            item.icon = "md-ionic";
            break;
          case 4:
            item.icon = "md-globe";
            break;
          case 5:
            item.icon = "ios-globe";
            break;
          case 6:
            item.icon = "md-git-branch";
            break;
          case 7:
            item.icon = "ios-flower-outline";
            break;
          case 8:
            item.icon = "ios-compass";
            break;
          case 9:
            item.icon = "md-basketball";
            break;
          default:
            item.icon = "logo-chrome";
        }
      });
    },
  },
  methods: {
    trackDetails(item) {
      let params = {
        id: item.id,
      };
      this.$api.commonTemplate.downloadTemplate(params).then((res) => {
        this.$uyils.fileBlobDown(item.templatePath, res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.template-details-content {
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
      width: 200px;
      display: block;
      margin-left: 10px;
      font-size: @template-font-size;
      color: @main-font-color;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
/deep/ .my-modal .operate-item {
  margin-bottom: 90px;
}
/deep/ .my-modal .header {
  margin-top: 20px;
}
/deep/ .ivu-tooltip-inner {
  max-width: none !important;
  min-height: none !important;
}
</style>
