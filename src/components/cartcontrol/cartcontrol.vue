<template>
  <div class="cartcontrol">
    <div class="cart-decrease" @click="decreaseCart" transition="move">
      <!--  v-show="food.count>0" -->
      <img src="./des.png" width="20px" height="20px" v-show="food.count>0">
    </div>

    <div class="cart-count"  v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click="addCart">
      <img src="./add.png" width="20px" height="20px">
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {

    props: {
      food: {
        type: Object
      }
    },
    created () {
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          // 为food添加一个属性
          Vue.set(this.food, 'count', 1)
          this.food.count = 1
        } else {
          this.food.count += 1
        }
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count > 0) {
          this.food.count --
        } else {
          this.food.count = 0
        }
      }
    }
  }
</script>

<style>

  .cartcontrol {
  }

  .cart-decrease {
    display: inline-block;
  }

  .cart-count {
    display: inline-block;
    line-height: 12px;
    height: 48px;
    width: 24px;
    vertical-align: top;
    margin-top: 6px;
    text-align: center;
    font-size: 14px;
    color: rgb(147, 153, 159);
  }

  .cart-add {
    display: inline-block;
  }



</style>
