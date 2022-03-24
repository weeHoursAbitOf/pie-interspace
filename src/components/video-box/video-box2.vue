<template>
  <!-- 视频管理组件 -->
  <div class="template-item">
    <div class="template-item-left">
      <div class="template-item-img">
        <Icon
          class="icon-play"
          type="md-arrow-dropright-circle"
          @click="play(id)"
          title="播放"
        />
      </div>
      <div class="template-item-btn">
        <classics-btn
          class="shot-select-backColor shot-btn"
          v-if="lookBtn"
          @click="look"
          title="镜头选择"
        ></classics-btn>
        <classics-btn
          class="shot-cancel-backColor shot-btn"
          v-if="issueBtn"
          @click="issue"
          title="镜头取消"
        ></classics-btn>
        <classics-btn
          class="shot-playback-backColor shot-btn"
          v-if="playbackBtn"
          @click="playback"
          title="历史回放设置"
        ></classics-btn>
        <classics-btn
          class="shot-scriptures-backColor shot-btn"
          v-if="classicsBtn"
          @click="classics"
          title="经典镜头管理"
        ></classics-btn>
      </div>
    </div>
    <my-modal
      width=""
      height=""
      @confirm="confirm"
      :cancelBtn="false"
      title="视频播放"
      v-model="isModal"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="video-container">
              <div class="video-content">
                <video-flv :playId="playId" :flvSrc="flvSrc" />
              </div>
              <div class="video-list" v-if="videoList">
                <span
                  class="video-path"
                  v-for="(item, index) in videoDataList"
                  :key="index"
                  @click="videoPathEvent(item)"
                >
                  <Poptip trigger="hover" :content="content" placement="left">
                    <p class="video-path-overflow">{{ item.name }}</p>
                    <div slot="content">
                      {{ item.name }}
                    </div>
                  </Poptip>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
  </div>
</template>

<script>
import videoFlv from "@/components/video-box/video-flv.vue";
import lookBtn from "@/components/button/look-btn.vue";
import issueBtn from "@/components/button/issue-btn.vue";
import playBtn from "@/components/button/play-btn.vue";
import pauseBtn from "@/components/button/pause-btn.vue";
import playbackBtn from "@/components/button/playback-btn.vue";
import classicsBtn from "@/components/button/classics-btn.vue";
import myModal from "@/components/modals/modal2.vue";
export default {
  props: {
    title: {
      type: String,
      default: "1.2米口径望远镜",
    },
    lookBtn: {
      //控制查看按钮是否显示
      type: Boolean,
      default: false,
    },
    issueBtn: {
      //发布按钮是否显示
      type: Boolean,
      default: false,
    },
    playbackBtn: {
      type: Boolean,
      default: false,
    },
    classicsBtn: {
      type: Boolean,
      default: false,
    },
    // 是否显示播放列表
    videoList: {
      type: Boolean,
      default: true,
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      // flvSrc: "http://10.0.0.191:1900/live?app=demo&stream=video5",
      flvSrc: require("../../assets/mda-mgbeapqmjy7x86te.mp4"),
      isModal: false, //显示播放弹框
      playId: "",
      videoDataList: [
        {
          path: require("../../assets/mda-mgbeapqmjy7x86te.mp4"),
          name: "mda-mgbsdffdsffdsfdsfeapqmjy7x86te.mp4",
        },
        {
          path: require("../../assets/public/video.mp4"),
          name: "videdsfdsfdsfsdfsdo.mp4",
        },
      ],
    };
  },
  components: {
    lookBtn,
    issueBtn,
    playBtn,
    pauseBtn,
    playbackBtn,
    classicsBtn,
    myModal,
    videoFlv,
  },
  methods: {
    // 视频列表播放地址
    videoPathEvent(item) {
      this.flvSrc = item.path;
    },
    // ------------------------------------
    // 播放按钮
    play(id) {
      this.playId = id;
      //显示播放弹框
      this.isModal = true;
      // let video = document.getElementsByClassName("template-item-video")[id];
      // video.play();
    },

    // 视频确定按钮
    confirm() {
      this.isModal = false;
    },

    //------------------------
    // 暂停按钮
    pause(id) {
      this.id = id;
      // this.$emit("pause-video", id);
      // let video = document.getElementsByClassName("template-item-video")[id];
      // video.pause();
    },
    look() {
      this.$emit("look");
    },
    issue() {
      this.$emit("issue");
    },
    playback() {
      this.$emit("playback");
    },
    classics() {
      this.$emit("classics");
    },
  },
};
</script>
<style lang="less" scoped>
.template-item {
  display: flex;
  flex-direction: column;
  color: @table-text-color;
  .template-item-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    .template-item-img {
      width: 300px;
      height: 200px;
      background-color: @not-allowed-bg;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-play {
        font-size: 60px;
        color: rgb(75, 114, 133);
      }
    }
    .template-item-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 40px;
      .shot-btn {
        margin-top: 20px;
      }
      .shot-select-backColor {
        background-color: rgb(57, 172, 224);
      }
      .shot-cancel-backColor {
        background-color: rgb(228, 53, 9);
      }
      .shot-playback-backColor {
        background-color: rgb(22, 121, 80);
      }
      .shot-scriptures-backColor {
        background-color: rgb(106, 160, 44);
      }
    }
  }
}
.video-container {
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  .video-content:extend(.border) {
    width: 800px;
    height: 100%;
    padding: 20px;
  }
  .video-list:extend(.border) {
    width: 300px;
    padding: 20px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    font-size: 20px;

    .video-path {
      width: 100%;
      margin: 5px 0;
      overflow: hidden; /*内容超出后隐藏*/
    }
    .video-path-overflow {
      // overflow: hidden; /*内容超出后隐藏*/
      // text-overflow: ellipsis; /* 超出内容显示为省略号*/
      // white-space: nowrap; /*文本不进行换行*/
    }
  }
}
</style>
