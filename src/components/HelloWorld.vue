<template>
  <div class="hello" v-scroll="setBackground" style="">
    <div style="height:180vh;overflow: visible;margin-bottom: 20vh">
      <div >
        <transition name="show" appear appear-active-class="animated fadeIn"
        enter-active-class="animated fadeIn">
        <img src="../img/home.png">
        </transition>
        <div style="font-size: 32px">
          <vue-typer text='专业心理测量量表平台' :repeat='0'/>
        </div>
      </div>
      <Banner/>
    </div>

<!--    <PersonNum value="72000"/>-->
<!--    <el-row type="flex" justify="space-around">-->
<!--      <el-col span=16>-->
<!--        <div id="map" style="width: 100%;height: 400px;"/>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row type="flex" justify="space-around">-->
<!--      <el-col span=16>-->
<!--        <div id="zhuChart" style="width: 100%;height: 600px;"/>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <h1>专业的声音</h1>-->
<!--    <el-row type="flex" justify="space-around" v-if="false">-->
<!--      <el-col v-for="comment in comments" :key="comment.name" span=6 >-->
<!--        <el-card>-->
<!--          <el-image fit="cover" :src="comment.get('avatar').get('url')" style="width: 100%"/>-->
<!--          <h1>{{comment.get('name')}}</h1>-->
<!--          <p>{{comment.get('work')}}</p>-->
<!--          <p>{{comment.get('comment')}}</p>-->
<!--          <el-divider/>-->
<!--          <el-button type="primary" round>了解更多</el-button>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <div style='color: white;margin-bottom: 20vh' class="full-screen" >
      <el-row class="box">
        <el-col span="12">
          <div v-scroll="enterBlueText">
            <div style="font-size: 72px;width: 100%;margin-bottom: 4vh" >专业心理测量</div>
            <div style="font-size: 36px;width: 60%;max-width: 80vw;margin-bottom: 8vh">
              最全量表平台，许你内心一把量尺，则无惧世事；你看似冰冷的外表，实则隐埋炙热而有力量的内心。
            </div>
            <el-button>进入测试</el-button>
          </div>
        </el-col>
        <el-col span="12" class="box" v-scroll="enterBlueBook">
          <img class="book"  id="book" :src="book" alt="" style="max-height: 80vh;margin: auto" />
        </el-col>
      </el-row>
    </div>
    <div style="height: 100vh;margin-bottom: 30vh" class="full-screen box">
      <div style="text-align: center" v-scroll="enterRed">
        <div class="big-title">“加强社会心理服务体系建设，培育自尊自信、理性平和、积极向上的社会心态。”</div>
        <div class="big-title">习近平</div>
        <el-button>进入资讯</el-button>
      </div>
    </div>
    <div style="height:160vh;justify-content: center;text-align: center;align-items: center" class="full-screen box">
      <div class="big-title">1+1不等于2</div>
      <div class="big-title">创新变成了一种工具</div>
      <div style="width: 100%">
        <el-button >进入发现</el-button>
      </div>
      <img src="../img/rocket.png" alt="">
    </div>
    <div style="margin-bottom: 10vh" class="full-screen">
      <el-row>
        <el-col span="8" class="box">
          <div>
            <div style="font-size: 72px;width: 100%;margin-bottom: 10vh">专业心理测量</div>
            <div style="font-size: 36px;width: 60%;max-width: 80vw">
              最全量表平台，许你内心一把量尺，则无惧世事；你看似冰冷的外表，实则隐埋炙热而有力量的内心。
            </div>
          </div>
        </el-col>
        <el-col span="16" class="box" style="justify-content: right">
          <div>
            <img :src="plato" alt="" style="max-height: 80vh;width: 100%" />

          </div>
        </el-col>
      </el-row>
    </div>
    <div class="full-screen">
      <div style="" >
        <div class="big-title">"人格是生命体实际表现出来的行为的模式的总和"</div>
        <div class="big-title">柏拉图</div>
        <div style="font-size: 3em;width: 100%;margin-bottom: 8vh">
          <div>我们致力</div>
          <div>给你打造一个</div>
          <div>最完善的专业心理测量平台</div>
        </div>
        <div style="width: 100%;margin-bottom: 8vh">
          <el-button>进入测试</el-button>
        </div>
        <div style="width: 100%">
          <person-num/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Banner from "@/components/Banner";
  const AV=require('leancloud-storage');
  import PersonNum from "@/components/PersonNum";

  import anime from 'animejs/lib/anime.es.js';
  import { VueTyper} from 'vue-typer'
  export default {
    name: 'HelloWorld',
    components:{
      // eslint-disable-next-line vue/no-unused-components
      Banner,
      VueTyper,
      PersonNum
    },
    data() {
      return {
        //searchWorld:this.$store.getters.getSearchWorld,
        banner: "",
        rocket:"",
        plato:"",
        book:"",
        comments: [],
        advances:[
          {id:1,title:"专业",text:"美国国际教育联盟（AAFIE）高等教育总监，美国Loyola Marymount University研究所“系统工程”教授，长期从事航空航天领域全球项目管理。之前任美国诺斯罗普·格鲁门公司资深项目经理。 "},
          {id:1,title:"专业",text:"美国国际教育联盟（AAFIE）高等教育总监，美国Loyola Marymount University研究所“系统工程”教授，长期从事航空航天领域全球项目管理。之前任美国诺斯罗普·格鲁门公司资深项目经理。 "},
          {id:1,title:"专业",text:"美国国际教育联盟（AAFIE）高等教育总监，美国Loyola Marymount University研究所“系统工程”教授，长期从事航空航天领域全球项目管理。之前任美国诺斯罗普·格鲁门公司资深项目经理。 "},
          {id:1,title:"专业",text:"美国国际教育联盟（AAFIE）高等教育总监，美国Loyola Marymount University研究所“系统工程”教授，长期从事航空航天领域全球项目管理。之前任美国诺斯罗普·格鲁门公司资深项目经理。 "}
        ]
      }
    },
    computed:{
      searchWorld(){
        return this.$store.state.searchWorld
      }
    },
    methods: {
      drawZhuChart() {
        let chart = this.$eCharts.init(document.getElementById('zhuChart'));
        let option = {
          dataset: {
            source: [
              ['量表', '测试人数'],
              ['DISC', 1393],
              ['尤金·克劳德创造法测试', 3530],
              ['霍兰德职业兴趣自测', 2923],
              ['艾森克人格问卷', 1723],
              ['HBDI', 3792],
              ['SPM', 593],
              ['LEA', 4593],
              ['MBIT', 4593],
              ['CPI', 4593]
            ]
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: false
            }
          },
          yAxis: {
            show: false,
          },
          series: [
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: "#5544d2",
                }
              },
              barWidth: '50%'
            }
          ]
        };
        chart.setOption(option);
        window.addEventListener('resize',chart.resize)
      },

      // eslint-disable-next-line no-unused-vars
      setBackground(evt, el){

        let height=document.documentElement.scrollTop;
        // eslint-disable-next-line no-console
        console.log(height/window.innerHeight);
        let color="";
        switch (true) {
          case height<1.4*window.innerHeight:color='#fff';break;
          case height<2.3*window.innerHeight:document.getElementById('book');
                // eslint-disable-next-line no-fallthrough
          case height<2.4*window.innerHeight:color='#071D61';break;
          case height<3.6*window.innerHeight:color='#B8271E';break;
          case height<5.4*window.innerHeight:color='#FFA701';break;
          case height<6.6*window.innerHeight:color='#000000';break;
          case height<8.6*window.innerHeight:color='#E0663E';break;
          default:color='#fff'
        }
        document.documentElement.style.backgroundColor=color;
      },
      enterBlueBook(evt, el){
        let a;
        if(document.documentElement.scrollTop<1.5*window.innerHeight){
          a=anime({
            targets:el,
            translateX:'200%',
            translateY:"-65%",
            scale:0.8,
            rotateZ:'18deg',
            duration:800,
            easing:'cubicBezier(.64, .175, 0.48, 1.3)',
            autoplay:false
          });
        }else{
          a=anime({
            targets:el,
            translateX:'0%',
            translateY:"0%",
            scale:1,
            rotateZ:'0deg',
            duration:800,
            easing:'cubicBezier(.64, .175, .48, 1.3)',
            autoplay:false
          });
        }
        a.play()
      },
      enterBlueText(evt, el){
        if(document.documentElement.scrollTop>1.5*window.innerHeight){

          el.classList.add('animated');
          el.classList.add('fadeInUp');
        }
      },
      enterRed(evt, el){
        if(document.documentElement.scrollTop>2.5*window.innerHeight){
          el.classList.add('fadeInUp')
          el.classList.add('animated')
        }
      }
    },
    created: function () {
      const vm = this;
      const init=new AV.Query('Plato');
      init.get('5e00604b5620710093de0fa5').then(function (plato) {
        vm.banner=plato.get('banner').get('url');
        vm.plato=plato.get('plato').get('url');
        vm.book=plato.get('book').get('url');
      });

    },
    mounted() {
      document.documentElement.style.backgroundColor="white";
      this.drawZhuChart();
      this.drawMap();
    },

    directives:{
      scroll:{
        // eslint-disable-next-line no-unused-vars
        inserted:function (el,binding) {
          let f=function(evt){
            if(binding.value(evt,el)){
              window.removeEventListener('scroll',f)
            }
          }
          window.addEventListener('scroll',f)
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
  height: 100%;
}

  .full-screen{
    height: 100vh;
    padding: 6vh 8vw;
    color: white;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .big-title{
    font-size: 72px;
    width: 100%;
    margin-bottom: 8vh;
  }

  .image {
    position: relative;
    bottom: 5vmin;
    width: 100vw;
    height: auto;
    background-repeat: no-repeat;
  }

  .book{
    transform: rotate(0deg);
    transition-duration: .5s;
  }
</style>
