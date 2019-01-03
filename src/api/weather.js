import axios from 'axios'

export function getWeather(adcode) {
  const key = '62c2e8780239eefccf49901093726fbf';
  const extensions = 'base';
  /*可选值：base/all

    base:返回实况天气

    all:返回预报天气*/
  const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${adcode}&extensions=${extensions}`;
  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  });
}
