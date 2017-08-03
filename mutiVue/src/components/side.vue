<template>
  <div class="side">
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="1">
        <mt-cell title="tab-container 1">112</mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell title="tab-container 2">123</mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell title="tab-container 3">222</mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
   <mt-switch v-model="value">Switch</mt-switch>
  </div>
</template>

<script>
  export default {
    name: 'side',
    data() {
      return {
        msg: 'Welcome to Your side',
        active: '2',
        items: [],
        value:true
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
