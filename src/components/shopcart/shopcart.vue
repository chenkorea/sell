<template>
  <div class="shopcart">
    <div class="shop-content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <img class="logo-icon" src="./qmp.png" width="40px" height="40px" :class="{'highlight' : totalCount>0}">
          </div>
          <div class="food-num" v-show="totalPrice>0">{{totalCount}}</div>
        </div>
        <div class="all-price" :class="{'allPrice-highlight' : totalCount>0}">¥{{totalPrice}}</div>
        <div class="shop-desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="toPay">
        <div class="pay" :class="{'pay-highlight' : totalPrice >= minPrice}">
          {{diffPrice}}
        </div>
      </div>

      <!-- 购物车详细页 -->
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="list-title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="list-content">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="food-name">{{food.name}}</span>
              <div class="food-preice">
                <span>¥{{food.count * food.price}}</span>
              </div>
              <div class="list-cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </div>
  </div>
</template>

<script>
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import BScroll from 'better-scroll'
  export default {
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default () {
          return [
            {
              price: 20,
              count: 1
            }
          ]
        }
      }
    },
    data () {
      return {
        fold: true
      }
    },
    methods: {
      toggleList () {
        if (!this.totalCount) {
          return
        } else {
          this.fold = !this.fold
        }
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      hideList () {
        this.fold = false
      },
      toPay () {
        if (this.totalPrice < this.minPrice) {
          return
        } else {
          // 去结算
          alert('去结算')
        }
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        if (this.selectFoods.length === 0) {
          total = 0
        }
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        if (this.selectFoods.length === 0) {
          count = 0
        }
        return count
      },
      diffPrice () {
        let diffPrice = 0
        this.selectFoods.forEach((food) => {
          diffPrice += food.price * food.count
        })
        if (diffPrice >= this.minPrice) {
          return '去结算'
        } else if (diffPrice === 0) {
          return `${this.minPrice}元起送`
        } else if (diffPrice < this.minPrice) {
          let dmif = 0
          dmif = this.minPrice - diffPrice
          return `还差${dmif}元起送`
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        // BScroll初始化
        if (show) {
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs['list-content'], {click: true})
          })
        } else {
          this.scroll.refresh()
        }
        return show
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style>
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
  }

  .shop-content {
    display: flex;
    background: #141d27;
    font-size: 0;
  }

  .content-left {
    flex: 1;
  }

  .logo-wrapper {
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background: #141d27;
  }

  .all-price {
    display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    line-height: 24px;
    box-sizing: border-box;
    padding-right: 12px;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 16px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
  }

  .shop-desc {
    display: inline-block;
    vertical-align: top;
    margin: 12px 0 0 12px;
    line-height: 24px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
  }

  .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b343c;
    text-align: center;
  }

  .logo-icon {
    background-size: 40px 40px;
    background-repeat: no-repeat;
  }

  .content-right {
    flex:0 0 105px;
    width: 105px;
  }

  .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 700;
    background: #2b333b;
  }

  .food-num {
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    height: 16px;
    width: 24px;
    line-height: 16px;
    font-size: 9px;
    font-weight: 700;
    color: white;
    background: red;
    border-radius: 16px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  }

  .highlight {
    background-image: url("./qmq.png");
  }

  .logo-highlight {
    background: #ffffff;
  }

  .allPrice-highlight {
    color: #FFFFFF;
  }

  .pay-highlight {
    background: #43CD80;
    color: #ffffff;
  }

  .shopcart-list {
    position: absolute;
    bottom: 48px;
    left: 0;
    z-index: -1;
    width: 100%;
  }

  .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 2px solid rgba(7, 17, 27, 0.1);
  }

  .list-title {
    float: left;
    font-size: 17px;
    color: rgb(7, 17, 27);
  }

  .empty {
    float: right;
    font-size: 12px;
    color: rgb(0, 160, 220);
  }

  .list-content {
    overflow: hidden;
    padding: 0 18px;
    max-height: 217px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    background: #FFFFFF;
  }

  .food {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .food-name {
    line-height: 24px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .food-preice {
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
  }

  .list-cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: -17px;
  }

  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background: rgba(0, 0, 0, 0.5);
  }

</style>
