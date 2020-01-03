<template>
    <div>
        <div v-show="!SelectComplete&&!submit" class="full-page">
            <el-card class="card" style="position: relative;">
                <el-button v-show="current!==0" @click="current--" circle class="el-button last" icon="el-icon-arrow-left"/>
                <p class="order">{{items[current].get('order')}}</p>
                <h1 ref="title" style="max-width: 80%;margin: 16px auto;">{{items[current].get('title')}}</h1>
                <div>
                    <el-radio-group v-model="answers[current]"
                                    style="width: 60%;margin: 0 auto; display: flex;justify-content: space-around;padding: 32px" @change="setAnswer">
                        <el-radio class="radio-green" label=0 border>同意</el-radio>
                        <el-radio class="radio-yellow" label=1 border>不确定</el-radio>
                        <el-radio class="radio-red" label=2 border>不同意</el-radio>
                    </el-radio-group>
                    <img :src="items[current].get('pic').get('url')" style="height: 40vh" alt=""/>
                </div>
                <el-button v-show="current!==48" @click="current++" circle class="el-button next" icon="el-icon-arrow-right"/>
                <div style="position: absolute;bottom: 32px;width: 90%;left: 50%;transform: translateX(-50%);transition: transform .5s">
                    <svg class="icon" :style="{position:'relative',left:TailPosition}">
                        <use xlink:href="#el-icon-xinli-tail" />
                    </svg>
                    <el-progress color="#9F3E00" :show-text="false" :percentage="Percentage"/>
                </div>
            </el-card>
        </div>
        <div v-if="SelectComplete&&!submit" class="full-page">
            <el-card class="card">
                <p class="order">50</p>
                <h1 style="margin: 32px auto">任意选出十个最能说明你性格的词</h1>
                <el-checkbox-group class="group" v-model="checkList" style="text-align: left;width: 80%;margin: 32px auto" max="10">
                    <el-checkbox
                            :label="item.key" :border="true"
                            v-for="item in question50" :key="item.key">
                        {{item.text}}
                    </el-checkbox>
                </el-checkbox-group>
                <el-button @click=getResult>提交</el-button>
            </el-card>
        </div>
        <div v-show="submit">
            <div  class="result">
                <svg class="big-icon">
                    <use xlink:href="#el-icon-xinli-logo"/>
                </svg>
                <p>亲爱的朋友，请查收你的测试结果</p>
                <p>这次结果是根据尤金·劳德塞创造力测试研究进行评估，对创造力和影响创造</p>
                <p>力的细分领域进行评估，给予你生活学习上的建议。</p>
                <div style="height: 15vh;width: 4px;background: #E0663E;margin: 6px auto"/>
                <div>
                    <span @click="getResult">你的总得分为 </span>
                    <span style="color: #E0663E;font-size: 72px">{{TotalMark}}</span>
                </div>
                <el-button type="primary" @click="showMore">查看更多</el-button>
            </div>
            <div>

            </div>
            <div id="radar" ref="radar" style="height: 100vh;filter: blur(10px);"></div>
            <div v-show="seeMore" @click="nextAnalysis" style="height: 100vh;width: 100vm;background: white;overflow: hidden;position: relative">
                <div style="position: relative;left: 0;height: 40%">
                    <div style="padding: 96px 16vw">
                        <h1 ref="title" style="max-width: 80%;margin: 16px auto;">{{analysisTest[analysis]['type']}}</h1>
                        <p>{{analysisTest[analysis]['des'][0]}}</p>
                    </div>
                    <el-button circle class="el-button last" icon="el-icon-arrow-left"/>
                    <el-button circle class="el-button next" icon="el-icon-arrow-right"/>
                </div>
                <div ref="analysis" style="height: 240vmax;width: 240vmax;transform-origin: center;
            position: absolute;left:50%;transform: translateX(-50%) translateY(7%) rotate(0deg) ">
                    <div ref="circle" style="border-radius: 100%;
                height: 100%;width: 100%" :style="{background:color[analysis]}"></div>
                    <div ref="current" class="current" :style="{backgroundImage: 'url('+img[analysis]+')',
                  backgroundSize:'contain',backgroundRepeat:'no-repeat'}"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import anime from "animejs";
    const AV=require('leancloud-storage');
    AV.init({
        appId: "0mlk4YYWriC7nXwcnMEKlTzJ-gzGzoHsz",
        appKey: "jNfrPJJwfWYku9Uj5UQjXNGb",
        serverURLs:"https://0mlk4yyw.lc-cn-n1-shared.com"
    });

    export default {
        name: "QuestionCard",
        data(){
            return{
                img:[
                    require('../assets/createTest/1-13.png'),
                    require('../assets/createTest/2-13.png'),
                    require('../assets/createTest/3-13.png'),
                    require('../assets/createTest/4-13.png'),
                    require('../assets/createTest/5-13.png'),
                ],
                color:['#E0663E','#5148A4','#F797D6','#2C988E','#295BA7'],
                analysis:0,
                analysisTest:require('../assets/createTest').data,
                percentage:0,
                items:[],
                answers:[],
                seeMore:false,
                des:[],
                res:[],
                current:0,
                question50:[
                    {key: 1, text: '精神饱满的'}, {key: 2, text: '有说服力的'}, {key: 3, text: '实事求是的'}, {key: 4, text: '虚心的'}, {key: 5, text: '观察敏锐的'}, {key: 6, text: '谨慎的'}, {key: 7, text: '束手无策的'}, {key: 8, text: '足智多谋的'}, {key: 9, text: '自高自大的'}, {key: 10, text: '有主见的'},
                    {key: 11, text: '有献身精神的'}, {key: 12, text: '有独创性的'}, {key: 13, text: '性急的'}, {key: 14, text: '高效的'}, {key: 15, text: '乐意助人的'}, {key: 16, text: '坚强的'}, {key: 17, text: '老练的'}, {key: 18, text: '有克制力的'}, {key: 19, text: '热情的'}, {key: 20, text: '时髦的'},
                    {key: 21, text: '自信的'}, {key: 22, text: '不屈不挠的'}, {key: 23, text: '有远见的'}, {key: 24, text: '机灵的'}, {key: 25, text: '好奇的'}, {key: 26, text: '有组织力的'}, {key: 27, text: '铁石心肠的'}, {key: 28, text: '思路清晰的'}, {key: 29, text: '脾气温顺的'}, {key: 30, text: '爱预言的'},
                    {key: 31, text: '拘泥形式的'}, {key: 32, text: '不拘礼节的'}, {key: 33, text: '有理解力的'}, {key: 34, text: '有朝气的'}, {key: 35, text: '严于律己的'}, {key: 36, text: '精干的'}, {key: 37, text: '讲实惠的'}, {key: 38, text: '感觉灵敏的'}, {key: 39, text: '无畏的'}, {key: 40, text: '严格的'},
                    {key: 41, text: '一丝不苟的'}, {key: 42, text: '谦逊的'}, {key: 43, text:'复杂的'}, {key: 44, text: '漫不经心的'}, {key: 45, text: '柔顺的'}, {key: 46, text: '创新的'}, {key: 47, text: '泰然自若的'}, {key: 48, text: '渴求知识的'}, {key: 49, text: '实干的'}, {key: 50, text: '好交际的'},
                    {key: 51, text: '善良的'}, {key: 52, text: '孤独的'}, {key: 53, text: '不满足的'}, {key: 54, text: '易动感情的'}
                ],
                checkList:[],
                result:"aaaa",
                submit:false,
                mark:[],
                hover:false,
            }
        },
        computed:{
            /**
             * @return {int}
             */
            Percentage:function () {
                if(this.answers==null){
                    return 0;
                }
                let a=0,b=this.answers.length;
                for(let i=0;i<b;i++){
                    if(this.answers[i]!=="-1"){
                        a++;
                    }
                }
                return (a*100/b)
            },
            /**
             * @return {boolean}
             */
            SelectComplete:function () {
                if(this.answers==null){
                    return false
                }
                for(let i=0;i<this.answers.length;i++){
                    if(this.answers[i]==="-1"){
                        return false
                    }
                }
                return true
            },
            /**
             * @return{string}
             */
            TailPosition(){
                return this.Percentage-50+"%";
            },
            /**
             * @return {number}
             */
            TotalMark(){
                let res=0;
                this.answers.forEach(((value, index) => {
                    if(value!=="-1"){
                        for(let key in this.mark[index]){
                            res+=this.mark[index][key][value]
                        }
                    }
                }));
                return res
            },
            /**
             * @return {number}
             */
            NextAnalysis(){
                if(this.analysis<4){
                    return this.analysis+1;
                }else {
                    return 0;
                }
            }
        },
        created(){
            const vm=this;
            let query=new AV.Query('CreateTest');
            query.ascending('order');
            query.find().then(function (data) {
                vm.items=data;
                vm.answers=[];
                vm.mark=[];
                for(let i=0;i<data.length;i++){
                    // eslint-disable-next-line no-console
                    vm.answers.push("-1");
                    vm.mark.push(data[i].get('mark'));
                }
            })
        },
        mounted(){
            this.$store.commit('goInTest',true);
            document.documentElement.style.backgroundColor='#E0663E'
        },
        methods:{
            setAnswer(){
                let vm=this;
                if(this.answers[this.current+1]==="-1"){
                    let title=this.$refs.title;
                    title.style.opacity=0;
                    let b=anime({
                        targets:title,
                        opacity:[0,1],
                        duration:500,
                        easing:'easeInCubic',
                        autoplay:false,
                    });
                    let a=anime({
                        targets:title,
                        opacity:[1,0],
                        duration:500,
                        easing:'easeInCubic',
                        autoplay:false,
                        complete:function () {
                            b.play();
                            vm.current++;
                            // eslint-disable-next-line no-console
                        }
                    });
                    a.play();
                }
            },
            getResult(){
                let vm=this;
                let res={"1":0,"2":0,"3":0,"4":0,"5":0};
                vm.answers.forEach(((value, index) => {
                    if(value!=="-1"){
                        for(let key in vm.mark[index]){
                            res[key]=res[key]+vm.mark[index][key][value]
                        }
                    }
                }));
                vm.des=[];
                for(let i in res){
                    let d=vm.analysisTest[i-1]['divided'];
                    let a=Math.floor(res[i]/d);
                    vm.des.push(this.analysisTest[i-1]['des'][a]);
                }
                vm.submit=true;
                vm.res=res;
                setTimeout(function () {
                    vm.drawRadar();
                },1000)
            },
            showMore(){
                let vm=this;
                vm.seeMore=true;
                let radar=this.$refs.radar;
                radar.style.filter= "blur(0)"
            },
            drawRadar(){
                // eslint-disable-next-line no-console
                let data=[{
                    value:[this.res["1"],this.res["2"],this.res["3"],this.res["4"],this.res["5"]]
                }];
                let radar=this.$eCharts.init(document.getElementById('radar'));
                let option={
                    radar:[
                        {
                            indicator:[
                                {name:'批判性',max:36},
                                {name:'观察力',max:36},
                                {name:'想象力',max:30},
                                {name:'独立性',max:45},
                                {name:'意志力',max:35},
                            ],
                            splitNumber:4,
                            axisLine:{
                                lineStyle:{
                                    color:'rgba(230,230,230,0.46)'
                                }
                            },
                            splitLine:{
                                show:false
                            },
                            splitArea:{
                                areaStyle:{
                                    color:[
                                        '#FAF0EE','#FADFD4','#FCDCBE','#F8C692','#FF9B4A'
                                    ]
                                }
                            }
                        }
                    ],
                    series:[
                        {
                            type: 'radar',
                            data: data,
                            symbol: 'rect',
                            lineStyle: {
                                normal: {
                                    opacity: 0
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgba(221,107,67,0.46)'
                                }
                            },
                            areaStyle: {                // 单项区域填充样式
                                normal: {
                                    color: 'rgba(221,107,67,0.46)'       // 填充的颜色。[ default: "#000" ]
                                }
                            }
                        }
                    ],
                };
                radar.setOption(option);
            },
            nextAnalysis(){
                let vm=this;
                let analysis=this.$refs.analysis;
                let circle=this.$refs.circle;
                let index=this.analysis;
                let nextIndex=index<4?index+1:0;
                let a=anime({
                    targets:analysis,
                    rotate:[
                        {value:'-=90deg',duration:600,easing: 'easeInSine'},
                        {value: '-=180deg',duration: 0},
                        {value:'-=90deg',duration:600,easing: 'cubicBezier(.175, .885, .320, 1.275)'}
                    ],
                    autoplay:false,
                });
                let b=anime({
                    targets:circle,
                    backgroundColor:this.color[nextIndex],
                    duration:1000,
                    easing:'linear',
                    autoplay:false,
                });
                setTimeout(function () {
                    vm.analysis=nextIndex;
                },500);
                a.play();
                b.play();
            },
            lastAnalysis(){

            }
        }
    }
</script>

<style scoped>
    .full-page{
        width: 100vw;
        height: 100vh;
        padding: 5vh;
        position: relative;
    }
    .card {
        width: 100%;
        height: 100%;
    }
    .order{
        position:absolute;
        font-size: 64px;
        margin: 0;
        top:0;
        left: 6vw;
    }
    .el-button.last{
        border: none;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%) scale(2);
        left: 48px;
    }
    .el-button.next{
        border: none;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%) scale(2);
        right: 48px;
    }
    .result{
        padding: 4vh;
        background: white;
        height: 100vh;
    }
    .big-icon{
        height: 20em;
        width: 20em;
    }

    .current{
        width: 24vmax;
        height: 24vmax;
        position: absolute;
        left: 50%;
        top:0;
        transform: translateX(-50%) translateY(-72%);
        z-index: -1;
    }

</style>