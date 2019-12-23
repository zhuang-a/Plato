<template>
    <el-row>
        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <svg class="top-nav-icon">
                <use xlink:href="#el-icon-xinli-logo"></use>
            </svg>
        </el-col>
        <el-col :xs="17" :sm="18" :md="19" :lg="20" :xl="21" >
            <el-menu :default-active="activeIndex" style="float:right;" class="el-menu-demo" mode="horizontal" router=true>
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/test">测试</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">介绍</template>
                    <el-menu-item index="2-1">相关论文</el-menu-item>
                    <el-menu-item index="2-2">视频资料</el-menu-item>
                    <el-menu-item index="2-3">新闻</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">小游戏</template>
                    <el-menu-item index="3-1">创造力游戏</el-menu-item>
                    <el-menu-item index="3-2">人格游戏</el-menu-item>
                    <el-menu-item index="3-3">职业规划游戏</el-menu-item>
                </el-submenu>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>
        </el-col>
        <el-col :xs="6" :sm="5" :md="4" :lg="3" :xl="2">
            <template v-if="user == null">
                <el-button @click="loginDialogVisible = true" type="primary">登录</el-button>
                <el-button >注册</el-button>
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
        props:['user','activeIndex']
    }
</script>

<style scoped>

</style>