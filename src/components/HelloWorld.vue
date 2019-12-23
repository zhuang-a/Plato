<template>
  <div class="hello">
    <div>
      <h1>华南理工大学交狐专业心理测量量表平台</h1>
      <p>哔哩哔哩哔哩哔哩哔哩哔哩哔哩哔哩</p>
      <el-button type="primary" >开始测试</el-button>
    </div>
    <el-row type="flex" justify="space-around">
      <el-col span=16>
        <div id="map" style="width: 100%;height: 400px;"/>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col span=16>
        <div id="zhuChart" style="width: 100%;height: 400px;"/>
      </el-col>
    </el-row>
    <h1>专业的声音</h1>
    <el-row type="flex" justify="space-around">
      <el-col v-for="comment in comments" :key="comment.name" span=6 >
        <el-card>
          <el-image fit="cover" :src="comment.get('avatar').get('url')" style="width: 100%"/>
          <h1>{{comment.get('name')}}</h1>
          <p>{{comment.get('work')}}</p>
          <p>{{comment.get('comment')}}</p>
          <el-divider/>
          <el-button type="primary" round>了解更多</el-button>
        </el-card>
      </el-col>
    </el-row>
    <h1>我们的优势</h1>
    <el-row type="flex" justify="space-around">
      <el-col span=24 v-for="advance in advances" :key="advance.id">
        <el-card>
          <el-image :src="banner" style="border-radius: 50%;height: 100px;width: 100px"/>
          <p>{{advance.title}}</p>
          <p>{{advance.text}}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  const AV=require('leancloud-storage');

  export default {
    name: 'HelloWorld',
    data() {
      return {
        banner: "http://lc-0mlk4YYW.cn-n1.lcfile.com/e28b9234a15d32ab6b47/1.png",
        comments: [],
        advances:[
          {id:1,title:"专业",text:"美国国际教育联盟（AAFIE）高等教育总监，美国Loyola Marymount University研究所“系统工程”教授，长期从事航空航天领域全球项目管理。之前任美国诺斯罗普·格鲁门公司资深项目经理。 "},
          {id:1,title:"专业",text:"美国国际教育联盟（AAFIE）高等教育总监，美国Loyola Marymount University研究所“系统工程”教授，长期从事航空航天领域全球项目管理。之前任美国诺斯罗普·格鲁门公司资深项目经理。 "},
          {id:1,title:"专业",text:"美国国际教育联盟（AAFIE）高等教育总监，美国Loyola Marymount University研究所“系统工程”教授，长期从事航空航天领域全球项目管理。之前任美国诺斯罗普·格鲁门公司资深项目经理。 "},
          {id:1,title:"专业",text:"美国国际教育联盟（AAFIE）高等教育总监，美国Loyola Marymount University研究所“系统工程”教授，长期从事航空航天领域全球项目管理。之前任美国诺斯罗普·格鲁门公司资深项目经理。 "}
        ]
      }
    },
    methods: {
      drawZhuChart() {
        let chart = this.$echarts.init(document.getElementById('zhuChart'));
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
      drawMap() {
        let world = require('echarts/map/json/world');
        this.$echarts.registerMap('world', world);
        let chart = this.$echarts.init(document.getElementById('map'));
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
    created: function () {
      const vm = this;
      const query = new AV.Query('Comment')
      query.find().then(function (comments) {
        vm.comments = comments;
        // eslint-disable-next-line no-console
        console.log(comments[0].get('avatar').get('url'))
      })
    },
    mounted() {
      this.drawZhuChart();
      this.drawMap();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
</style>
