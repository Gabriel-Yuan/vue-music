// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import store from './store'
import VueAMap from 'vue-amap'
import "@/common/stylus/index.styl"



/* eslint-disable no-unused-vars */
// import VConsole from '@/common/js/VConsole.js'



Vue.config.productionTip = false;
fastclick.attach(document.body);
Vue.use(VueLazyLoad, {
  loading: require('@/common/image/default.png')
});
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'c4b503a6ef249df95966ce9af4ea77c8',
  plugin: [
    "AMap.Autocomplete", //输入提示插件
    "AMap.PlaceSearch", //POI搜索插件
    "AMap.Scale", //右下角缩略图插件 比例尺
    "AMap.OverView", //地图鹰眼插件
    "AMap.ToolBar", //地图工具条
    "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    "AMap.PolyEditor", //编辑 折线多，边形
    "AMap.CircleEditor", //圆形编辑器插件
    "AMap.Geolocation", //定位控件，用来获取和展示用户主机所在的经纬度位置
  ]
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
