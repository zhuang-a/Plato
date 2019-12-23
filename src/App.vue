<template>
  <el-container id="app">
    <el-header>
      <TopNav v-bind:user="user" v-bind:active-index='activeIndex'/>
    </el-header>
    <el-main>
      <router-view></router-view>
      <jio/>
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
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
      activeIndex:'1'
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
}
</style>
