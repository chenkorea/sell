<template>
  <transition name="move">
    <div v-show="showFlag" class="food-wrapper" ref="food-wrapper">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" class="food-image">
          <img src="./nnv.png" class="back-btn" width="30px" height="30px" @click="closeWind">
        </div>

        <!-- 销售情况 -->
        <div class="main-content">
          <h1 class="food-title">{{food.name}}</h1>
          <div class="detail-view">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="sell-ratings">好评率{{food.rating}}%</span>
          </div>
          <div class="price-view">
            <span class="now-price">¥{{food.price}}</span> <span class="old-price" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
        </div>
        <div class="cartcontrolfood-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div class="buy" @click="addFist($event)" v-show="!food.count || food.count === 0">加入购物车</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      show () {
        this.showFlag = true
        if (!this.scrollView) {
          this.scrollview = new BScroll(this.$refs['food-wrapper'], {click: true})
        } else {
          this.scrollView.refresh()
        }
      },
      closeWind () {
        this.showFlag = false
      },
      addFist (event) {
        if (!event._constructed) {
          return
        }
        // 第一次先设置Count属性,因为原来数据中没有改属性
        Vue.set(this.food, 'count', 1)
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style>

  .food-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #FFFFFF;
  }

  .move-enter-active {
    transition: all .2s linear;
    transform: translate3d(0, 0, 0);
  }

  .move-enter, .move-leave {
    transition: all .2s linear;
    transform: translate3d(100%, 0, 0);
  }

  .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }

  .food-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .back-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background-size: 30px 30px;
  }

  .main-content {
    padding: 18px;
  }

  .food-title {
    line-height: 14px;
    height: 14px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(7, 17, 27);
  }

  .detail-view {
    margin-bottom: 8px;
    line-height: 10px;
    height: 10px;
    font-size: 0;
  }

  .sell-count, .sell-ratings {
    display: inline-block;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .sell-count {
    margin-right: 12px;
  }

  .now-price {
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
    font-weight: bold;
  }

  .old-price {
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147, 153, 159);
    font-weight: bold;
  }

  .cartcontrolfood-wrapper {
    position: absolute;
    right: 18px;
    bottom: 12px;
  }

  .buy {
    position: absolute;
    right: 18px;
    bottom: 12px;
    z-index: 10;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    box-sizing: border-box;
    font-size: 10px;
    color: white;
    background: rgb(0, 160, 220);
    border-radius: 12px;
  }

</style>
