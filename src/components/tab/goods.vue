<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul>
        <li v-for="(item, $index) in goods" class="menu-item" :class="{'current':currentIndex===$index}" @click="selectMenu($index,$event)">
          <span class="menu-text"><span v-show="item.type>0" class="menu-icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="foods-list food-list-hook">
          <h1 class="menu-title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="selectFood(food, $event)">
              <div class="food-icon">
                <img :src="food.icon" width="57px" height="57px">
              </div>
              <div class="food-content">
                <h2 class="food-name">{{food.name}}</h2>
                <p class="food-desc">{{food.description}}</p>
                <div class="extra">
                  <span class="food-count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now-price">¥{{food.price}}</span><span class="old-price" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods"  :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>

    <food :food="selectedFood" ref="food-detail"></food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart.vue'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import food from '../food/food.vue'
  const ERR_OK = 0

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    created () {
      this.$http.get('/api/goods').then(response => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            // 计算高度
            this._calculateHeight()
          })
        }
      }, response => {
      })
      this.classMap = ['decrease', 'discount', 'invoice', 'special', 'guarantee']
    },
    methods: {
      _initScroll () {
        // 定义一个菜品滑动scroll
        this.menuScroll = new BScroll(this.$refs['menu-wrapper'], {click: true})
        // 定义一个商品滑动scroll
        this.foodsScroll = new BScroll(this.$refs['foods-wrapper'], {probeType: 3, click: true})
        this.foodsScroll.on('scroll', (pos) => {
          // 实时获取滚动的Y值
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        // 计算高度数组
        let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          // item.clientHeight获取item的高度,html的方法
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          // 浏览器点击事件返回,不去响应(因为会响应两次)
          return
        }
        // 获取List
        let foodList = this.$refs['foods-wrapper'].getElementsByClassName('food-list-hook')
        // 获取item
        let el = foodList[index]
        // 指定滑动的位置及时间
        this.foodsScroll.scrollToElement(el, 300)
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        this.$refs['food-detail'].show()
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          // 获取当前区间高度
          let height1 = this.listHeight[i]
          // 获取下一个区间的高度
          let height2 = this.listHeight[i + 1]
          // 如果返回当钱区间的位置,则返回当前区间的索引
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        // 计算当前购物车的所选的商品
        let selFoods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            // 如果有选择商品，则加入到购物车中
            if (food.count) {
              selFoods.push(food)
            }
          })
        })
        return selFoods
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  }
</script>

<style>

  .decrease {
    background-image: url("decrease_3@2x.png");
  }

  .discount {
    background-image: url("discount_3@2x.png");
  }

  .guarantee {
    background-image: url("guarantee_3@2x.png");
  }

  .invoice {
    background-image: url("invoice_3@2x.png");
  }

  .special {
    background-image: url("special_3@2x.png");
  }

  .goods {
    display: flex;
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
  }

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }

  .foods-wrapper {
    flex:1;
  }

  .menu-item {
    display: table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    padding: 0 12px;
  }

  .menu-text {
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size: 12px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .menu-icon {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }

  .menu-title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background: #f3f5f7;
  }

  .food-item {
    display: flex;
    margin: 18px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .food-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  .food-icon {
    flex: 0 0 57px;
    background-repeat: no-repeat;
    background-size: 57px 57px;
    margin-right: 10px;
  }

  .food-content {
    flex:1;
  }

  .food-name {
    font-size: 14px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    margin: 2px 0 8px 0;
    height: 14px;
  }

  .food-desc {
    margin-bottom: 8px;
    font-size: 10px;
    line-height: 10px;
    color: rgb(147, 153, 159);
  }

  .extra {
    margin-bottom: 5px;
    line-height: 10px;
    color: rgb(147, 153, 159);
    font-size: 10px;
  }

  .food-count {
    margin-right: 12px;
  }

  .price {
    font-weight: 700;
    line-height: 24px;
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

  .current {
    background: #FFFFFF;
    position: relative;
    margin-top: -1px;
    z-index: 10;
    font-weight: 700;
  }

  .cartcontrol-wrapper {
    position: absolute;
    right: 0px;
    text-align: center;
  }
</style>
