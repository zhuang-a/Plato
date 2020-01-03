<template>
    <div>
        <h1>选择你希望测试的领域</h1>
        <el-row type="flex" justify="space-around">
            <el-col v-for="tag in tags" :key="tag.title" span=8>
                <el-image class="image" style="width: 100%" :src="tag.pic"/>
                <p>{{tag.title}}</p>
            </el-col>
        </el-row>
        <div style="background: #E0663E;padding: 8vmin">
            <div style="background: white">
                <h1>测试库</h1>
                <div>
                    <el-autocomplete
                            :placeholder="searchWorld"
                            v-model="searchWorld"
                            :fetch-suggestions="search">
                        <template slot-scope="{item}">
                            <div>{{item.get('title')}}</div>
                        </template>
                    </el-autocomplete>
                </div>
                <span>热门测试</span>
                <div style="display: flex;flex-wrap: wrap;justify-content: space-between;padding: 0 64px">
                    <div v-for="test in tests" :key="test.title"
                         style="width: calc(50% - 32px);display: flex;border:#74BD4A solid 1px;
                         margin-bottom: 64px; padding: 16px">
                        <div style="width: 30%;">
                            <img :src="test.get('pic').get('url')" alt="还没有图呢" style="height: 200px">
                        </div>
                        <div style="text-align: left;position:relative; margin-left: 16px">
                            <p style="font-size: 36px">{{test.get('name')}}</p>
                            <span>{{test.get('des')}}</span>
                            <div style="display: flex;align-items: center;position: absolute;bottom: 0">
                                <i class="el-icon-view"/>
                                <span>1232</span>
                                <i class="el-icon-chat-dot-square"/>
                                <span>132323</span>
                                <router-link to="/question">
                                    <el-button type="primary">进入测试</el-button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    const AV=require('leancloud-storage');
    export default {
        name: "Test",
        data(){
            return{
                tags:[
                    {title:'了解自我',pic:require('../img/self.png')},
                    {title:'能力挖掘',pic:require('../img/ability.png')},
                    {title: '职业规划',pic:require('../img/work.png')}
                ],
                tests:[],
                searchWorld:'233'
            }
        },
        created() {
            let query=new AV.Query('Test');
            let vm=this;
            query.find().then(function (data) {
                vm.tests=data;
            })
        },
        mounted(){
            document.documentElement.style.backgroundColor='#fff';
        }
    }
</script>

<style scoped>
    .image{
        transform-origin: center;
        transform: scale(1,1);
        transition: transform .2s;
    }
    .image:hover{
        transform: scale(1.1,1.1);
    }
    .image:hover::before{
        content: "";
        position: absolute;
        border-radius: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 50%;
        height: 50%;
        background: orange;
        z-index: -1;
    }
</style>