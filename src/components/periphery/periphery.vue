<template>
  <div>
    <div class="amap-wrapper">
      <el-amap class="amap-box" vid="amap-vue" :plugin="plugins" :zoom="zoom" :center="center"></el-amap>
    </div>
    <div class="weather">
      <hr>
      <span style="font-size: 20px;font-family: 幼圆;">本地天气：</span>
      <hr>
      <div class="weather-temperature">
        <div :class="weatherCls">
          <span style="font-size: 20px"> {{lives[0].weather}}</span>
          <span style="font-size: 20px"> {{lives[0].temperature}} <span class="iconfont icon-sheshidu01"></span></span>
        </div>
        <div style="padding-top: 55px;font-size: 15px"> {{lives[0].province}}{{lives[0].city}}</div>
        <div @click="_getWeather(lives[0].adcode)" class="iconfont icon-icons_reload reload">
        </div>
      </div>
      <div>
        风向描述：&nbsp;&nbsp;{{lives[0].winddirection}}
      </div>
      <div>
        风力级别：&nbsp;&nbsp;{{lives[0].windpower}}
      </div>
      <div>
        空气湿度：&nbsp;&nbsp;{{lives[0].humidity}}
      </div>
      <div>
        数据发布时间：&nbsp;&nbsp;{{lives[0].reporttime}}
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
  import {getWeather} from "../../api/weather";

  export default {
    name: "periphery",
    data() {
      let vm = this;
      return {
        zoom: 12,
        weatherCls: 'iconfont temperature ',
        weather: '',
        center: [113.53343, 34.82062],
        lives: [{
          province: '',
          city: '',
          adcode: '',
          weather: '',
          temperature: '',
          winddirection: '',
          windpower: '',
          humidity: '',
          reporttime: ''
        }],
        plugins: [
          {
            pName: 'ToolBar',//工具条插件
            noIpLocate: true,
            autoPosition: true
          },
          {
            pName: 'Scale'
          },
          {
            pName: 'Geolocation',//定位插件
            showMarker: false,
            events: {
              init(o) {
                //定位成功 自动将marker和circle移到定位点
                o.getCurrentPosition((status, result) => {
                  vm.center = [result.position.lng, result.position.lat];
                  vm._getWeather(result.addressComponent.adcode)
                });
              }
            }
          }
        ]
      }
    },
    watch: {
      weather() {
        let result = 'iconfont temperature ';
        let rrr = '';
        switch (this.lives[0].weather) {
          case '晴':
            rrr = 'icon-tianqizitiku01';
            break;
          case '多云':
            rrr = 'icon-tianqizitiku02';
            break;
          case '少云':
            rrr = 'icon-tianqizitiku03';
            break;
          case '晴间多云':
            rrr = 'icon-tianqizitiku04';
            break;
          case '阴':
            rrr = 'icon-tianqizitiku05';
            break;
          case '有风':
            rrr = 'icon-tianqizitiku06';
            break;
          case '平静':
            rrr = 'icon-tianqizitiku07';
            break;
          case '微风':
            rrr = 'icon-tianqizitiku08';
            break;
          case '和风':
            rrr = 'icon-tianqizitiku09';
            break;
          case '清风':
            rrr = 'icon-tianqizitiku10';
            break;
          case '强风/劲风':
            rrr = 'icon-tianqizitiku11';
            break;
          case '疾风':
            rrr = 'icon-tianqizitiku12';
            break;
          case '大风':
            rrr = 'icon-tianqizitiku13';
            break;
          case '烈风':
            rrr = 'icon-tianqizitiku14';
            break;
          case '风暴':
            rrr = 'icon-tianqizitiku15';
            break;
          case '狂爆风':
            rrr = 'icon-tianqizitiku16';
            break;
          case '飓风':
            rrr = 'icon-tianqizitiku17';
            break;
          case '龙卷风':
            rrr = 'icon-tianqizitiku18';
            break;
          case '热带风暴':
            rrr = 'icon-tianqizitiku19';
            break;
          case '阵雨':
            rrr = 'icon-tianqizitiku20';
            break;
          case '强阵雨':
            rrr = 'icon-tianqizitiku21';
            break;
          case '雷阵雨':
            rrr = 'icon-tianqizitiku22';
            break;
          case '强雷阵雨':
            rrr = 'icon-tianqizitiku23';
            break;
          case '雷阵雨伴有冰雹':
            rrr = 'icon-tianqizitiku24';
            break;
          case '小雨':
            rrr = 'icon-tianqizitiku25';
            break;
          case '中雨':
            rrr = 'icon-tianqizitiku26';
            break;
          case '大雨':
            rrr = 'icon-tianqizitiku27';
            break;
          case '极端降雨':
            rrr = 'icon-tianqizitiku28';
            break;
          case '毛毛雨/细雨':
            rrr = 'icon-tianqizitiku29';
            break;
          case '暴雨':
            rrr = 'icon-tianqizitiku30';
            break;
          case '大暴雨':
            rrr = 'icon-tianqizitiku31';
            break;
          case '特大暴雨':
            rrr = 'icon-tianqizitiku32';
            break;
          case '冻雨':
            rrr = 'icon-tianqizitiku33';
            break;
          case '小雪':
            rrr = 'icon-tianqizitiku34';
            break;
          case '中雪':
            rrr = 'icon-tianqizitiku35';
            break;
          case '大雪':
            rrr = 'icon-tianqizitiku36';
            break;
          case '暴雪':
            rrr = 'icon-tianqizitiku37';
            break;
          case '雨夹雪':
            rrr = 'icon-tianqizitiku38';
            break;
          case '雨雪天气':
            rrr = 'icon-tianqizitiku39';
            break;
          case '阵雨夹雪':
            rrr = 'icon-tianqizitiku40';
            break;
          case '阵雪':
            rrr = 'icon-tianqizitiku41';
            break;
          case '雾':
            rrr = 'icon-tianqizitiku43';
            break;
          case '霾':
            rrr = 'icon-tianqizitiku44';
            break;
          case '扬沙':
            rrr = 'icon-tianqizitiku45';
            break;
          case '浮尘':
            rrr = 'icon-tianqizitiku46';
            break;
          case '沙尘暴':
            rrr = 'icon-tianqizitiku47';
            break;
          case '强沙尘暴':
            rrr = 'icon-tianqizitiku48';
            break;
          case '热':
            rrr = 'icon-tianqizitiku49';
            break;
          case '冷':
            rrr = 'icon-tianqizitiku50';
            break;
          case '严重霾':
            rrr = 'icon-yanzhongmai';
            break;
          case '中度霾':
            rrr = 'icon-zhongdumai';
            break;
          case '重度霾':
            rrr = 'icon-zhongdumai1';
            break;
          case '未知':
            rrr = 'icon-tianqizitiku51';
            break;
        }
        this.weatherCls = result + rrr;
      }
    },
    methods: {
      _getWeather(adcode) {
        getWeather(adcode).then((res) => {
          this.lives = res.lives;
          this.weather = res.lives[0].weather
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .amap-wrapper
    width 100%
    height 200px

  .weather
    margin 10px
    color white

    .weather-temperature
      display flex
      font-size 20px


      .temperature
        font-size 80px
        flex 1

        .reload
          flex 1
          font-size 15px


</style>
