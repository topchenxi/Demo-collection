<template>
  <div class="home">
    <mt-header title="long long long long title">
      <router-link to="/side" slot="left">
        <mt-button icon="back">back</mt-button>
      </router-link>
      <mt-button icon="more" slot="right" @click="show()"></mt-button>
    </mt-header>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="1">
        <img slot="icon" src="../assets/account-1.png"> tab1
      </mt-tab-item>
      <mt-tab-item id="2">
        <img slot="icon" src="../assets/account-2.png"> tab2
      </mt-tab-item>
      <mt-tab-item id="3">
        <img slot="icon" src="../assets/account-3.png"> tab3
      </mt-tab-item>
      <mt-tab-item id="4">
        <img slot="icon" src="../assets/account-4.png"> tab4
      </mt-tab-item>
    </mt-tabbar>
    <mt-button type="default" v-on:click='toClick()'>default</mt-button>
    <mt-button type="primary">primary</mt-button>
    <mt-button type="danger">danger</mt-button>
    <mt-button size="small">small</mt-button>
    <mt-button size="large">large</mt-button>
    <mt-button size="normal">normal</mt-button>
    <mt-button disabled>disabled</mt-button>
    <mt-button plain>plain</mt-button>
    <mt-cell title="标题文字"></mt-cell>
    <mt-cell title="标题文字" value="说明文字"></mt-cell>
    <mt-cell title="标题文字" to="//github.com" is-link value="带链接">
    </mt-cell>
    <mt-spinner type="snake"></mt-spinner>
    <mt-spinner type="double-bounce"></mt-spinner>
    <mt-spinner type="triple-bounce"></mt-spinner>
    <mt-spinner type="fading-circle"></mt-spinner>
    <!-- accepts a 0-3 number -->
    <mt-spinner :type="0"></mt-spinner>
    <mt-spinner :type="1"></mt-spinner>
    <mt-spinner :type="2"></mt-spinner>
    <mt-spinner :type="3"></mt-spinner>
    <mt-spinner color="#26a2ff"></mt-spinner>
    <mt-spinner color="rgb(100, 100, 100)"></mt-spinner>
    <mt-spinner color="yellow"></mt-spinner>
    {{msg}}111
    <div class="clearfix">
      <div class="left"></div>
      <div class="right"></div>
    </div>
    <!-- <mt-popup v-model="popupVisible" position="bottom">
                          123
                        </mt-popup> -->
    <mt-range v-model="rangeValue" :min="10" :max="90" :step="10" :bar-height="5">
    </mt-range>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">option A 12312323
      </mt-tab-item>
      <mt-tab-item id="2">option B 123123123
      </mt-tab-item>
      <mt-tab-item id="3">
        option C 123123123213
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        123
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        456
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        789
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        popupVisible: true,
        rangeValue: 10,
        selected: 1
      }
    },
    methods: {
      show() {
        console.log(1);
      },
      toClick() {
        console.log(2);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  h1,
  h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .left,
  .right {
    border: 1px solid #eee;
    width: 200px;
    height: 200px;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
</style>
