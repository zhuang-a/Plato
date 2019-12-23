<template>
    <div>
        <el-progress :text-inside="true" stroke-width="32" :percentage="Percentage"/>
        <el-row v-if="timus.length>0">
            <el-col span="2">
                <el-button :disabled="current===0" @click="current--">上一题</el-button>
            </el-col>
            <el-col span="12">
                <el-card class="card">
                    <p>{{timus[current].get('title')}}</p>
                    <el-image :src="timus[current].get('pic').get('url')" fit="contain"/>
                    <el-radio-group v-model="answers[current]">
                        <el-radio label="1" border @click="answers[current]=1">同意</el-radio>
                        <el-radio label="2" border @click="answers[current]=2">不确定</el-radio>
                        <el-radio label="3" border @click="answers[current]=3">不同意</el-radio>
                    </el-radio-group>
                </el-card>
            </el-col>
            <el-col span="2" >
                <el-button :disabled="current===timus.length-1" @click="current++">下一题</el-button>
            </el-col>
        </el-row>
        <el-row v-if="SelectComplete===false">
            <el-checkbox-group v-for="item in question50" :key="item" >
                <el-checkbox>{{item}}</el-checkbox>
            </el-checkbox-group>
        </el-row>
    </div>
</template>

<script>
    import {Card} from 'element-ui'
    const AV=require('leancloud-storage');
    AV.init({
        appId: "0mlk4YYWriC7nXwcnMEKlTzJ-gzGzoHsz",
        appKey: "jNfrPJJwfWYku9Uj5UQjXNGb",
        serverURLs:"https://0mlk4yyw.lc-cn-n1-shared.com"
    });
    const text=[
        '精神饱满的', '有说服力的', '实事求是的', '虚心的', '观察敏锐的', '谨慎的', '束手无策的', '足智多谋的', '自高自大的', '有主见的',
        '有献身精神的', '有独创性的', '性急的', '高效的', '乐意助人的', '坚强的', '老练的', '有克制力的', '热情的', '时髦的', '自信的',
        '不屈不挠的', '有远见的', '机灵的', '好奇的', '有组织力的', '铁石心肠的', '思路清晰的', '脾气温顺的', '爱预言的', '拘泥形式的',
        '不拘礼节的', '有理解力的', '有朝气的', '严于律己的', '精干的', '讲实惠的', '感觉灵敏的', '无畏的', '严格的', '一丝不苟的', '谦逊的',
        '复杂的', '漫不经心的', '柔顺的', '创新的', '泰然自若的', '渴求知识的', '实干的', '好交际的', '善良的', '孤独的', '不满足的', '易动感情的'
    ];
    export default {
        name: "QuestionCard",
        components:{
            'el-card':Card,
        },
        data(){
            return{
                percentage:0,
                timus:[],
                answers:[],
                current:0,
                question50:text
            }
        },
        computed:{
          /**
           * @return {string}
           */
          Percentage:function () {
              let a=0,b=this.answers.length;
              for(let i=0;i<this.answers.length;i++){
                  if(this.answers[i]!==0){
                      a++;
                  }
              }
              return (a*100/b).toFixed(2)
          },
          /**
           * @return {boolean}
           */
          SelectComplete:function () {
              if(this.answers.length===null){
                  return false
              }
              for(let i=0;i<this.answers.length;i++){
                  if(this.answers[i]===0){
                      return false
                  }
              }
              return true
          }
        },
        created(){
            // eslint-disable-next-line no-console
            const vm=this;
            let query=new AV.Query('CreateTest');
            query.find().then(function (timus) {

                // eslint-disable-next-line no-console
                vm.timus=timus;
                vm.answers=[];
                for(let i=0;i<timus.length;i++){
                    vm.$set(vm.answers,i,0)
                }
            })
        },
    }
</script>

<style scoped>
.card{
    padding: 0;
    width: calc(100%/2);
    margin: auto;
}
</style>