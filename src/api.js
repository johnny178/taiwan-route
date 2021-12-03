/* eslint-disable no-undef */
import axios from 'axios';
import jsSHA from 'jssha';

const searchParam = new URLSearchParams([
  ['$orderby', 'RouteName/Zh_tw'],
  ['$format', 'JSON'],
]);

const getAuthorizationHeader = () => {
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(process.env.REACT_APP_KEY, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  let HMAC = ShaObj.getHMAC('B64');
  // eslint-disable-next-line no-useless-escape
  let Authorization = 'hmac username=\"' + process.env.REACT_APP_ID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return { 'Authorization': Authorization, 'X-Date': GMTString };
};

//公車之路線資料
const getBusRoutes = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City',
});

//公車之站牌資料
const getBusStops = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Bus/Station/City',
});

//公車之路線站序資料
const getBusStopOrder = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City',
});

//公車之預估到站資料
const getBusEstimatedTime = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City',
});

//公車之路線線形
const getBusShape = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Bus/Shape/City',
});

//公車之動態定時資料
const getRealTimeByFrequency = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City',
});

//公車之所在站點位置
const getRealTimeNearStop = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/City',
});

//公車之路線資料
export const getCityBusRoutes = (city, routeName) => getBusRoutes.get(`/${city}/${routeName}?${searchParam}`, { headers: getAuthorizationHeader() });

//公車之站牌資料
export const getCityBusStops = (city) => getBusStops.get(`/${city}?${searchParam}`, { headers: getAuthorizationHeader() });

//公車之路線站序資料
export const getCityBusStopOrder = (city, routeName) => getBusStopOrder.get(`/${city}/${routeName}?${searchParam}`, { headers: getAuthorizationHeader() });

//公車之預估到站資料
export const getCityBusEstimatedTime = (city, routeName) => getBusEstimatedTime.get(`/${city}/${routeName}?${searchParam}`, { headers: getAuthorizationHeader() });

//公車之路線線形
export const getCityBusShape = (city, routeName) => getBusShape.get(`/${city}/${routeName}?${searchParam}`, { headers: getAuthorizationHeader() });

//公車之動態定時資料
export const getCityBusRealTimeByFrequency = (city, routeName) => getRealTimeByFrequency.get(`/${city}/${routeName}?${searchParam}`, { headers: getAuthorizationHeader() });

//公車之所在站點位置
export const getCityBusRealTimeNearStop = (city, routeName) => getRealTimeNearStop.get(`/${city}/${routeName}?${searchParam}`, { headers: getAuthorizationHeader() });