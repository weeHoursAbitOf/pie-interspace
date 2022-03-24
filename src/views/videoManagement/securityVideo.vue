<template>
  <div class="pie-tb-content">
    <div class="tb-header-content">
      <div class="tb-header-item">
        <div class="tb-header-item-title">台站</div>
        <div class="video-box">
          <template v-for="(item,index) in dataListOne">
              <video-box :videoBox="item" @look="look" @issue="issue" :title="item.title" :key="index" class="video-box-item"></video-box>
          </template>
        </div>
      </div>
      <div class="tb-header-item">
        <div class="tb-header-item-title">台站</div>
        <div class="video-box">
          <template v-for="(item,index) in dataListTwo">
              <video-box :videoBox="item" @look="look" @issue="issue" :title="item.title" :key="index" class="video-box-item"></video-box>
          </template>
        </div>
      </div>
    </div>
    <!-- 预览弹出框 -->
    <my-dialog @confirm="confirmDelete" @cancel="cancelDelete" :isModal="isLook" content="确定要预览吗?"></my-dialog>
    <!-- 发布弹出框 -->
    <my-dialog @confirm="confirmDelete" @cancel="cancelDelete" :isModal="isIssue" content="确定要发布吗?"></my-dialog>
  </div>
</template>
<script>

import VideoBox from '@/components/video-box/video-box.vue';
import MyDialog from '@/components/dialog/dialog.vue';
export default {
    components: {
      VideoBox,
      MyDialog
    },
    data(){
      return{
        title:"",
        dataListOne:[
          {
            id: 1,
            title: "A"
          },
          {
            id: 2,
            title: "威海"
          },
          {
            id: 3,
            title: "阿里"
          },
           {
            id: 4,
            title: "吉林"
          },
          {
            id: 5,
            title: "乌鲁木齐"
          },
          {
            id: 6,
            title: "Z"
          },
        ],
        dataListTwo:[
          {
            id: 1,
            title: "乌鲁木齐"
          },
          {
            id: 1,
            title: "北京"
          },
        ],
        isIssue: false,
        isLook: false
      }
    },
    methods:{
       //预览操作
      look() {
        this.isLook = true;
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
    }
}
</script>
<style lang="less" scoped>
.pie-tb-content{
  display: flex;
  width: 100%;
  padding: 20px;

  .tb-header-content{
    display: flex;
    flex-direction: column;
    width: inherit;

    .tb-header-item{
      display: flex;
      margin-bottom: 20px;
      padding: 0 30px;
      border: 1px solid @content-border-color;

      .video-box{
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        width: 100%;

        .video-box-item{
          margin-right: 10px;
        }
      }

      .tb-header-item-title{
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