<template>
  <div>
    <div class="amap-wrapper">
      <el-amap class="amap-box" vid="amap-vue" :plugin="plugins" :zoom="zoom" :center="center"></el-amap>
    </div>
    <div class="weather">
      {{lives}}
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
        center: [113.53343, 34.82062],
        adcode: '',
        lives:[],
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
                  vm.adcode = result.addressComponent.adcode;
                  vm.center = [result.position.lng, result.position.lat];
                  getWeather(vm.adcode).then((res) => {
                    vm.lives=res.lives
                    console.log(res.lives)
                  });
                });
              }
            }
          }
        ]
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .amap-wrapper
    width 100%
    height 200px
  .weather
    color white
    text-align center

</style>
