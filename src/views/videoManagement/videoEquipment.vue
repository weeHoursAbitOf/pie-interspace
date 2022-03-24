<template>
  <div class="pie-tb-content">
    <div class="tb-header-content">
      <div class="tb-header-item">
        <div class="tb-header-item-title">威海观测站</div>
        <div class="video-box">
          <template v-for="(item, index) in dataListOne">
            <video-box
              :videoBox="item"
              @look="look"
              @issue="issue"
              :title="item.title"
              :id="index"
              :videoSrc="videoSrc"
              class="video-box-item"
            ></video-box>
          </template>
        </div>
      </div>
      <div class="tb-header-item">
        <div class="tb-header-item-title">阿里观测站</div>
        <div class="video-box">
          <template v-for="(item, index) in dataListTwo">
            <video-box
              :videoBox="item"
              @look="look"
              @issue="issue"
              :title="item.title"
              :id="2"
              :videoSrc="videoSrc"
              class="video-box-item"
            ></video-box>
          </template>
        </div>
      </div>
      <div class="tb-header-item">
        <div class="tb-header-item-title">乌鲁木齐观测站</div>
        <div class="video-box">
          <template v-for="item in dataListThree">
            <video-box
              :videoBox="item"
              @look="look"
              @issue="issue"
              :title="item.title"
              :id="3"
              :videoSrc="videoSrc"
              class="video-box-item"
            ></video-box>
          </template>
        </div>
      </div>
    </div>

    <!-- 镜头选择 -->
    <my-modal
      width="20"
      height="40"
      @cancel="cancel"
      @confirm="confirm"
      v-model="isModal"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-content">
              <div class="tb-header-item">
                <RadioGroup v-model="lensList" vertical>
                  <Radio label="镜头一">
                    <span>镜头一</span>
                  </Radio>
                  <Radio label="镜头二">
                    <span>镜头二</span>
                  </Radio>
                  <Radio label="镜头三">
                    <span>镜头三</span>
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 发布弹出框 -->
    <my-dialog
      @confirm="confirmDelete"
      @cancel="cancelDelete"
      :isModal="isIssue"
      content="确定要取消吗?"
    ></my-dialog>
  </div>
</template>
<script>
import VideoBox from "@/components/video-box/video-box2.vue";
import MyDialog from "@/components/dialog/dialog.vue";
import myModal from "@/components/modals/modal2.vue";
export default {
  components: {
    VideoBox,
    MyDialog,
    myModal,
  },
  data() {
    return {
      videoSrc: "../../assets/public/video.mp4",
      title: "",
      lensList: "",
      dataListOne: [
        {
          id: 0,
          title: "1.2米口径望远镜",
        },
        {
          id: 1,
          title: "2.5米口径望远镜",
        },
      ],
      dataListTwo: [
        {
          id: 1,
          title: "1.2米口径望远镜",
        },
      ],
      dataListThree: [
        {
          id: 1,
          title: "激光测距望远镜",
        },
      ],
      isIssue: false,
      isLook: false,
      isModal: false,
    };
  },
  methods: {
    //镜头选择确认按钮
    confirm() {
      console.log(this.lensList);
      this.isModal = false;
    },
    cancel() {
      this.isModal = false;
    },
    //预览操作
    look() {
      this.isModal = true;
    },
    //发布操作
    issue() {
      this.isIssue = true;
    },
    //取消(发布)
    cancelDelete() {
      this.isLook = false;
      this.isIssue = false;
    },
    //确认（发布）
    confirmDelete() {
      this.isLook = false;
      this.isIssue = false;
    },
  },
};
</script>
<style lang="less" scoped>
.pie-tb-content {
  display: flex;
  width: 100%;
  padding: 20px;

  .tb-header-content {
    display: flex;
    flex-direction: column;
    width: inherit;

    .tb-header-item {
      display: flex;
      margin-bottom: 20px;
      padding: 0 30px;
      color: #fff;
      box-shadow: inset 0px 0px 5px 3px rgba(3, 53, 182, 0.4);
      border: 1px solid @main-border-color;

      .video-box {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        width: 100%;

        .video-box-item {
          margin-right: 10px;
        }
      }

      .tb-header-item-title {
        width: 15%;
        font-size: 24px;
        color: @table-text-color;
        height: 30px;
        margin: auto;
        margin-left: 50px;
      }
    }
  }
}
</style>
