<template>
    <el-row style="background: white;display: flex;align-items: center" ref="topNav">
        <el-col span="1">
            <svg class="top-nav-icon icon">
                <use xlink:href="#el-icon-xinli-logo"/>
            </svg>
        </el-col>
        <el-col span="16">
            <el-menu :default-active="activeIndex" style="border-bottom: none"
                     class="el-menu-demo" mode="horizontal" router=true>
                <el-menu-item index="/">首页</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">测试</template>
                    <el-menu-item index="/test">分类测试</el-menu-item>
                    <el-menu-item index="2-2">全部测试</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">资讯</template>
                    <el-menu-item index="2-1">理论学习</el-menu-item>
                    <el-menu-item index="2-2">新闻资讯</el-menu-item>
                    <el-menu-item index="2-3">俱乐部信息</el-menu-item>
                </el-submenu>
                <el-menu-item index="/find">
                    发现
                </el-menu-item>
<!--                <el-submenu index="/find">-->
<!--                    <template slot="title" >发现</template>-->
<!--                    <el-menu-item index="/find">创新小游戏</el-menu-item>-->
<!--                    <el-menu-item index="3-2">VR体验</el-menu-item>-->
<!--                </el-submenu>-->
                <el-submenu index="5">
                    <template slot="title">更多</template>
                    <el-menu-item index="/about">关于我们</el-menu-item>
                    <el-menu-item index="3-2">团队简介</el-menu-item>
                    <el-menu-item index="3-2">业务领域</el-menu-item>
                    <el-menu-item index="3-2">联系方式</el-menu-item>
                    <el-menu-item index="3-2">更多产品</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
        <el-col span="7" style="justify-content: end">
            <el-autocomplete
                style="margin-right: 32px"
                :placeholder="searchWorld"
                 v-model="searchWorld"
                :fetch-suggestions="search">
                <template slot-scope="{item}">
                    <div>{{item.get('title')}}</div>
                </template>
            </el-autocomplete>
            <template v-if="user == null">
                <el-button @click="loginDialogVisible = true" type="primary">登录</el-button>
                <el-dialog
                        title="登录"
                        :visiable.sync= loginDialogVisible
                        width="30%">
                    <el-form>
                        <el-input v-model="username" placeholder="用户名/手机号/邮箱"/>
                        <el-input placeholder="密码" v-model='passwd' show-password/>
                    </el-form>
                </el-dialog>
            </template>
            <template v-if="user!=null">
                <div class="block">
                    <el-avatar :size=50 src="../img/3.png"/></div>
            </template>
        </el-col>
    </el-row>
</template>

<script>
    import {Row,Col,Menu,Button,Input,Dialog,MenuItem,Avatar,Form,Submenu} from 'element-ui'
    const AV=require('leancloud-storage');
    export default {
        components:{
            'el-row':Row,
            'el-col':Col,
            'el-menu':Menu,
            'el-button':Button,
            'el-input':Input,
            'el-dialog':Dialog,
            'el-menu-item':MenuItem,
            'el-avatar':Avatar,
            'el-form':Form,
            'el-submenu':Submenu
        },
        name: "TopNav",
        data(){
            return{
                searchWorld:this.$store.state.searchWorld
            }
        },
        methods:{
          search(world,cb){
              let query=new AV.Query('CreateTest');
              query.contains('title',world);
              query.find().then(function (data) {
                  // eslint-disable-next-line no-console
                  console.log(data);
                  cb(data);
              });

              let a=this.searchWorld;
              this.$store.commit('setSearchWorld',a);
          }
        },
        props:['user','activeIndex']
    }
</script>

<style scoped>

</style>