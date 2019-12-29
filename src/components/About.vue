<template>
    <div style="background-color: black;color: white;padding-top: 32px">
        <div style="font-size: 72px;margin-bottom: 72px">关于</div>
        <p>访问量</p>
        <person-num/>
        <p>已经有201个国家，40个不同地区的人接受过专业心理测量</p>
        <div id="map" style="width: 100%;height: 100vh;"/>
        <div style="width: 80%;margin: auto;background: white;padding-top: 64px;color: black">
            <el-row type="flex" justify="space-around" style="width: 60%;color: black;margin: auto">
                <el-col v-for="comment in comments" :key="comment" span="8">
                    <div style="background-color: white">
                        <div :style="{backgroundImage:'url('+comment.get('avatar').get('url')+')'}"
                             style="width: 100%;height: 0;padding-bottom: 100%;background-size: cover"/>
                        <div style="padding: 32px">
                            <h1>{{comment.get('name')}}</h1>
                            <p>{{comment.get('work')}}</p>
                            <p>{{comment.get('comment')}}</p>
                            <el-divider/>
                            <el-button type="primary" round>了解更多</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <p class="big-title">--------我们涉及的范围---------</p>
            <el-row type="flex" justify="space-around" style="width: 80%;margin: auto">
                <el-col v-for="range in ranges" :key="range" span="6" style="padding: 32px">
                    <h1 style="margin-bottom: 32px">{{range.title}}</h1>
                    <p>{{range.des}}</p>
                </el-col>
            </el-row>
            <p class="big-title">我们的价值观</p>
            <img src="../img/home.png" alt="">
            <p class="big-title">联系我们</p>
            <div style="max-width: 60%;margin: auto;margin-bottom: 32px">
                <el-row>
                    <el-col span="8">
                        <div style="margin-bottom: 16px">
                            <span>业务联系： </span>
                            <span>联系电话0754-88889999</span>
                        </div>
                        <div style="margin-bottom: 16px">
                            <span>内容修订： </span>
                            <span>联系电话0754-88889999</span>
                        </div>
                        <div style="margin-bottom: 16px">
                            <span>投诉： </span>
                            <span>联系电话0754-123456789</span>
                        </div>
                    </el-col>
                    <el-col span="8"></el-col>
                    <el-col span="8"></el-col>
                </el-row>
            </div>
            <div style="max-width: 60%;margin: auto">
                <div style="margin-left: 0;text-align: left">也可以直接给我们留言</div>
                <el-input
                        style="height: 128px"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="text">
                </el-input>
            </div>

        </div>

    </div>
</template>

<script>
    import PersonNum from "@/components/PersonNum";
    const AV=require('leancloud-storage');

    export default {
        name: "About",
        components:{
            PersonNum
        },
        data(){
            return{
                comments:[],
                ranges:[
                    {title:'专业心理测量',des:'心理学在国内属于新兴学科，相对而言资讯较散，还未有统筹平台。在这里，我们收录最新国外心理学资讯，国内最新心理学领域动态，让“墙”不再强。'},
                    {title:'心理资讯',des:'本网站依托2017交狐创新实验室，专业团队打造一套创新工具套装，让你从发现创新力，学会创造力，到最后运用创造力有理可依，有具可用。'},
                    {title:'交流平台',des:'覆盖创造力、人格、潜质等方面，全部收集为国外最新修订版或国内最新本土化修订版，力求做到行业内最全、最新、最专业。'},
                    {title: '创新实验室',des:'我们为广大用户提供讨论平台，在这里，你可以对我们最新收录的心理测量和资讯提出意见，提出质疑和提出意见，相互交流把并且共同学习，这里是你的交流平台，同时也是你的秘密花园。'}
                ],
                text:''
            }
        },
        methods:{
            drawMap() {
                let world = require('echarts/map/json/world');
                this.$eCharts.registerMap('world', world);
                let chart = this.$eCharts.init(document.getElementById('map'));
                let data = [
                    {name: '洛杉矶', value: 9},
                    {name: '北京', value: 12},
                    {name: '马德里', value: 10}
                ];
                let geoCoordMap = {
                    '洛杉矶': [121.2, 54.2],
                    '北京': [12, 45],
                    '马德里': [52, 40]
                };
                let convertData = function (data) {
                    let res = [];
                    for (let i = 0; i < data.length; i++) {
                        let geoCoord = geoCoordMap[data[i].name];
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value)
                            })
                        }
                    }
                    return res;
                };
                let option = {
                    geo: {
                        map: 'world',
                        slient: true,
                        itemStyle: {
                            borderWidth: 0,
                            emphasis: {
                                color: '#eee',
                            }
                        },
                        label: {
                            emphasis: {
                                show: false
                            }
                        }
                    },
                    series: [
                        {
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: convertData(data),
                            itemStyle: {normal: {color: "#5544d2",}}
                        }
                    ]
                };
                chart.setOption(option);
                window.addEventListener('resize',chart.resize)
            },
        },
        mounted(){
            this.drawMap()
        },
        created:function(){
            let vm=this
            let query=new AV.Query('Comment')
            query.find().then(function (comments) {
                vm.comments = comments;
                // eslint-disable-next-line no-console
            })
        }
    }
</script>

<style scoped>
    .big-title{
        font-size: 72px
    }

</style>