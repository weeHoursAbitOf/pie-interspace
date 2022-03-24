<template>
  <video
    autoplay
    controls
    width="100%"
    height="100%"
    ref="videoElement"
  ></video>
</template>

<script>
import flv from "flv.js";
export default {
  name: "httpflv",
  props: {
    playId: {
      type: String,
    },
    flvSrc: {
      type: String,
      // default: "http://10.0.0.191:1900/live?app=demo&stream=video5", //视频流
      // default: "http://10.0.0.191:1900/video/video_poc_5.mp4", //格式MP4
    },
  },
  data() {
    return {
      flvPlayer: null,
    };
  },
  watch: {
    playId(id) {
      this.flvPlayer.play(id);
    },
  },
  created() {
    this.setFlv();
  },
  mounted() {
    this.getFlv();
  },
  methods: {
    setFlv() {
      // 如果视频地址后缀名不是MP4，播放格式未flv 已流的形式播放视频
      if (this.flvSrc.match(/\.([^\.]+)$/)[0] != ".mp4") {
        if (flv.isSupported()) {
          this.flvPlayer = flv.createPlayer({
            type: "flv", //播放格式
            url: this.flvSrc, //播放地址
            hasAudio: false,
            isLive: true, //直播流
            enableWorker: true,
            hasVideo: true,
          });
        }
      } else {
        // 如果视频地址后缀名是MP4,就播放MP4格式视频
        if (flv.isSupported()) {
          this.flvPlayer = flv.createPlayer({
            type: "mp4", //播放格式
            url: this.flvSrc, //播放地址
            hasAudio: false,
            isLive: true,
            enableWorker: true,
            hasVideo: true,
          });
        }
      }
    },
    getFlv() {
      let video = this.$refs.videoElement;
      this.flvPlayer.attachMediaElement(video);
      this.flvPlayer.load();
      this.flvPlayer.play();
      this.flvPlayer.start();
    },
  },
  // 销毁
  destroyed() {
    // 销毁flv.js
    this.flvPlayer = null;
  },
};
</script>

<style lang="less" scoped>
</style>