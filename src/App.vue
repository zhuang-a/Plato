<template>
  <div id="app">
    <TopNav v-show="!inTest" v-bind:user="user" v-bind:active-index='activeIndex' style="width: 100%"/>
    <router-view/>
    <jio/>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav";
import Jio from "@/components/Jio";

const AV=require('leancloud-storage');
export default {
  name: 'app',
  components: {
    Jio,
    TopNav
  },
  data:function () {
    return{
      user:AV.User.current(),
      activeIndex:'1',
    }
  },
  computed:{
    inTest:function () {
      return this.$store.getters.getTest;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
}
</style>
