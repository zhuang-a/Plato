import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import App from './App.vue'
import VueRouter from 'vue-router'
import HelloWorld from "@/components/HelloWorld";
import QuestionCard from "@/components/CreateTest";
import './assets/icon/iconfont';
import './assets/icon/iconfont.css';
import './assets/main.css';
import Test from "@/components/Test";
import echarts from 'echarts'

Vue.prototype.$echarts=echarts;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VCharts);
Vue.config.productionTip = false;
const routes=[
  {path:'/',component:HelloWorld},
  {path:'/question',component: QuestionCard},
  {path:'/test',component:Test}
];

const router=new VueRouter({
  routes,
  mode:'history'
});


new Vue({
  el:'#app',
  template:'<App/>',
  render: h => h(App),
  router
}).$mount('#app');
