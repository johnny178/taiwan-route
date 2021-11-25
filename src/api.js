import axios from 'axios';
import jsSHA from 'jssha';

const getAuthorizationHeader = () => {
  //  填入自己 ID、KEY 開始
  let AppID = '79b1459ffeca4aabadd35e191c8fed59';
  let AppKey = 'zvSZkHtUt4JieFWkdnOyW4iGtt4';
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  let HMAC = ShaObj.getHMAC('B64');
  // eslint-disable-next-line no-useless-escape
  let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return { 'Authorization': Authorization, 'X-Date': GMTString };
};

//市區公車之路線資料
const getBusRoutes = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City',
  headers: getAuthorizationHeader(),
});

//市區公車之站牌資料
const getBusStops = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Bus/Station/City',
  headers: getAuthorizationHeader(),
});

//市區公車之路線資料
export const getCityBusRoutes = (city, routeName, searchParam = '') => getBusRoutes.get(`/${city}/${routeName}?${searchParam}`);

//市區公車之站牌資料
export const getCityBusStops = (city, searchParam = '') => getBusStops.get(`/${city}?${searchParam}`);

// //市區公車之路線資料
// export const getAllScenicSpots = searchParam => getBusRoutes.get(searchParam ? `?${searchParam}` : '');
// export const getSpecificScenicSpots = (area, searchParam = '') => getBusRoutes.get(`/${area}?${searchParam}`);
