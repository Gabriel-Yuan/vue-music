import jsonp from '../common/js/jsonp'
import {commonParams, options, searchUrl,hotKeyUrl} from "@/api/config";
import axios from 'axios'


export function getHotKey() {
  /*
  * 获取热门搜索数据
  * */
  const url = hotKeyUrl;
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  });
  return jsonp(url, data, options)
}

export function search(query,page,zhida,perpage) {
  const url='/api/search';
  const data=Object.assign({},commonParams,{
    w: query,
    p: page,
    perpage,
    n: perpage,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5',
    format:'json'
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    //成功后返回
    return Promise.resolve(res.data)
  })
}
