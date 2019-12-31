import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import VueRouter from 'vue-router'
import HelloWorld from "@/components/HelloWorld";
import QuestionCard from "@/components/CreateTest";
import About from "@/components/About";
import Test from "@/components/Test";
import './assets/plato.scss';
import './assets/icon/iconfont';
import './assets/icon/iconfont.css';
import './assets/main.css';
import animated from 'animate.css'
import eCharts from 'echarts'
import Vuex from 'vuex'

Vue.prototype.$eCharts=eCharts;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(animated);
Vue.use(Vuex);

Vue.config.productionTip = false;
const routes=[
  {path:'/',name:'plato',component:HelloWorld},
  {path:'/question',name:'creatTest',component: QuestionCard},
  {path:'/test',name:'test',component:Test},
  {path:'/about',name:'about',component:About}
];

const router=new VueRouter({
  routes,
  //mode:'history'
});

const store=new Vuex.Store({
  state:{
    searchWorld:'233',
    inTest:false,
  },
  getters:{
    getSearchWorld(state){
      return state.searchWorld
    },
    getTest(state){
      return state.inTest
    }
  },
  actions:{
    // eslint-disable-next-line no-unused-vars
    goInTest({commit,state},inTest){
      commit('goInTest',inTest);
    }
  },
  mutations:{
    setSearchWorld(state,world){
      state.searchWorld=world
    },
    goInTest(state,inTest){
      state.inTest=inTest
    },
    leaveTest(state){
      state.inTest=false
    }
  },

});


new Vue({
  el:'#app',
  template:'<App/>',
  store,
  render: h => h(App),
  router
}).$mount('#app');
