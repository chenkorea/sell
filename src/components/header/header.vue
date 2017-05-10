<template>
  <div class="head">
    <div class="content-wrapper">
      <div class="avatar">
        <!-- 不能直接使用src 需要使用v-bind:src才能显示图片 -->
        <img :src="seller.avatar" width="64" height="64" class="head_avatar">
      </div>

      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          <span>{{seller.description}}/{{seller.deliveryPrice}}分钟送达</span>
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>

      <div class="supports-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
      </div>
    </div>

    <!-- 公告区域 -->
    <div class="bulletin-weapper"  @click="showDetail">
      <span class="bulletin_title"></span><span class="bulletin_text">{{seller.bulletin}}</span>
      <span class="bulletin_icon"></span>
    </div>

    <div class="backgroud">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>

    <!-- 弹出层 -->
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-weapper clearfix">
          <div class="detail-main">
            <h1 class="detail-name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="ty-title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="yh-supports">
              <li class="supports-item" v-for="item in seller.supports">
                <img :class="classMap[item.type]" width="16px" height="16px" class="yh-icon">
                <span class="yh-text">{{item.description}}</span>
              </li>
            </ul>
            <div class="ty-title sj-title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin-sjcontent">
              <p class="sj-content">{{seller.bulletin}}</p>
            </div>

          </div>
        </div>
        <div class="detail-close" @click="closeDialogWin">
          <img src="./eqz.png" width="32px" height="32px" class="close-icon">
        </div>
      </div>
    </transition>



  </div>
</template>

<script>
  import star from '../star/star.vue'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail () {
        this.detailShow = true
      },
      closeDialogWin () {
        this.detailShow = false
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'invoice', 'special', 'guarantee']
    },
    components: {
      star
    }
  }
</script>

<style>

  .head {
    color: #ffffff;
    position: relative;
    background: rgba(7,17,27, 0.5);
    overflow: hidden;
  }

  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
  }

  .avatar {
    display: inline-block;
    vertical-align: top;
  }

  .head_avatar {
    border-radius: 2px;
  }
  .content {
    display: inline-block;
    font-size: 14px;
    margin-left:16px;
  }

  .title {
    margin: 2px 0 8px 0;
  }

  .brand {
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 18px;
    background-size: 30px 18px;
    background-repeat: no-repeat;
    background-image: url("brand@2x.png");
  }

  .name {
    font-size: 16px;
    margin-left: 6px;
    line-height: 18px;
    font-weight: bold;
  }

  .description {
    font-size: 12px;
    font-weight: 200;
    font-family: "PingFang SC";
    margin-bottom: 7px;
    line-height: 12px;
  }

  .icon {
    display: inline-block;
    vertical-align: top;
    height: 12px;
    width: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }

  .decrease {
    background-image: url("decrease_1@2x.png");
  }

  .discount {
    background-image: url("discount_1@2x.png");
  }

  .guarantee {
    background-image: url("guarantee_1@2x.png");
  }

  .invoice {
    background-image: url("invoice_1@2x.png");
  }

  .special {
    background-image: url("special_1@2x.png");
  }

  .text {
    line-height: 12px;
    font-size: 12px;
  }

  .supports-count {
    position: absolute;
    right: 12px;
    bottom: 18px;
    padding: 0 8px;
    height: 24px;
    width: 24px;
    line-height: 24px;
    border-radius: 14px;
    background-color: rgba(0,0,0,0.2);
    text-align: center;
  }

  .count {
    font-size: 10px;
    color: #ffffff;
    vertical-align: top;
  }


  .bulletin-weapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7, 17, 27, 0.2);
  }

  .bulletin_title {
    background-image: url("bulletin@2x.png");
    display: inline-block;
    height: 12px;
    width: 22px;
    background-size: 22px 12px;
    background-repeat: no-repeat;
    margin-top: 8px;
    vertical-align: top;
  }

  .bulletin_text {
    margin: 0 4px 0 4px;
    font-size: 14px;
    vertical-align: top;
  }

  .bulletin_icon {
    background-image: url("right_arrow.png");
    display: inline-block;
    height: 12px;
    width: 10px;
    background-size: 10px 12px;
    background-repeat: no-repeat;
    position: absolute;
    right: 12px;
    top:8px;
  }

  .backgroud {
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }

  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
    transition: all 0.5s;
    -webkit-backdrop-filter: blur(10px);
  }

  .clearfix {
    display: inline-block;
  }

  .clearfix:after {
    display: block;
    content: ".";
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }

  .detail-weapper {
    min-height: 100%;
    width: 100%;
  }

  .detail-main {
    margin-top: 64px;
    padding-bottom: 64px;
  }

  .detail-close {
    position: relative;
    height: 32px;
    width: 32px;
    margin: -64px auto 0 auto;
    clear: both;
  }

  .detail-name {
    line-height: 61px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
  }

  .star-wrapper {
    padding: 12px 0;
    text-align: center;
    margin-top: -15px;
  }

  .ty-title {
    display: flex;
    width: 80%;
    margin: 10px auto 24px auto;
  }

  .line {
    flex:1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255,255,255, 0.2);
  }

  .text {
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
  }

  .yh-supports {
    width: 80%;
    margin: 0 auto;
  }

  .supports-item {
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }

  .supports-item:last-child {
    margin-bottom: 12px;
  }

  .yh-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
  }

  .yh-text {
    font-size: 12px;
    line-height: 16px;
    color: #ffffff;
  }

  .sj-title {
    margin-top: 15px;
  }

  .bulletin-sjcontent {
    width: 80%;
    margin: 0 auto;
  }

  .sj-content {
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
  }

  .fade-transition {
    opacity: 1;
    background: rgba(7, 17, 27, 0.8);
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
    transition: opacity .5s;
  }


</style>
