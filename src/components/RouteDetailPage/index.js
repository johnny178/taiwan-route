/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { getCityBusEstimatedTime, getCityBusRealTimeByFrequency, getCityBusRoutes, getCityBusShape, getCityBusStopOrder } from '../../api';
import StationList from '../StationList';
import Loader from '../Loader';
import { Container } from './styles';
import Map from '../Map';
import Wkt from 'wicket';

const RouteDetailPage = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTime, setRefreshTime] = useState(30);
  const [urlSearchParam, setUrlSeachParam] = useSearchParams();
  const [busStopOrder, setBusStopOrder] = useState([]);
  const [departureDestination, setDepartureDestination] = useState([]);
  const [stopsData, setStopData] = useState([]);//組合過後的站牌資訊
  const [direction, setDirection] = useState(0);//0去程 1返程
  const [geometry, setGeometry] = useState([]);//公車路線線形
  const [busDynamicPostionData, setBusDynamicPostionData] = useState({});

  const region = urlSearchParam.get('region');
  let routeName = decodeURI(location.pathname).slice(1, -1);

  //取得路線資料
  const searchRoutes = useCallback(async () => {
    let searchParam = new URLSearchParams([['$format', 'JSON']]);

    try {
      let resp = await getCityBusRoutes(region, routeName, searchParam);
      let route = resp.data.filter(item => item.RouteName.Zh_tw === routeName);
      const { DepartureStopNameZh, DestinationStopNameZh } = route[0];
      setDepartureDestination([DestinationStopNameZh, DepartureStopNameZh]);
    } catch (error) {
      console.log('get bus routes error', error);
    }
  }, [region, routeName]
  );

  //取得公車動態位置
  const getBusRealTimeByFrequency = useCallback(async () => {
    let searchParam = new URLSearchParams([['$format', 'JSON']]);

    try {
      let resp = await getCityBusRealTimeByFrequency(region, routeName, searchParam);
      resp = resp.data.filter(item => item.RouteName.Zh_tw === routeName);
      let goBus = resp.filter(item => !item.Direction);//去程
      let backBus = resp.filter(item => item.Direction);//回程
      setBusDynamicPostionData([goBus, backBus]);
    } catch (error) {
      console.log('get bus real time by frequency error', error);
    }
  }, [region, routeName]
  );

  //取得公車路線線形
  const getBusRouteShape = useCallback(async () => {
    let searchParam = new URLSearchParams([['$format', 'JSON']]);

    try {
      let resp = await getCityBusShape(region, routeName, searchParam);
      resp = resp.data.filter(item => item.RouteName.Zh_tw === routeName);
      const wkt = new Wkt.Wkt();
      wkt.read(resp[0].Geometry);
      const newGeoJson = wkt.toJson().coordinates.map(position => position.reverse());
      setGeometry(newGeoJson);
    } catch (error) {
      console.log('get bus routes shape error', error);
    }
  }, [region, routeName]
  );

  const getData = useCallback(async () => {
    let searchParam = new URLSearchParams([['$format', 'JSON']]);
    let goBus = [];
    let backBus = [];
    let goStopsData = {};//組合過後的站牌資訊
    let backStopsData = {};//組合過後的回程站牌資訊

    if (location.state) {
      const { DepartureStopNameZh, DestinationStopNameZh } = location.state;
      setDepartureDestination([DestinationStopNameZh, DepartureStopNameZh]);
    } else {
      await searchRoutes();
    }

    //取得路線站序資料
    try {
      let resp = await getCityBusStopOrder(region, routeName, searchParam);
      let stops = resp.data.filter(item => item.RouteName.Zh_tw === routeName);
      setBusStopOrder(stops);
    } catch (error) {
      console.log('get bus stop order error', error);
    }

    //取得公車路線線形
    await getBusRouteShape();

    //取得公車動態位置
    await getBusRealTimeByFrequency();

    //取得預估到站資料
    try {
      let resp = await getCityBusEstimatedTime(region, routeName, searchParam);
      let bus = resp.data.filter(item => item.RouteName.Zh_tw === routeName);

      goBus = bus.filter(item => !item.Direction);//去程
      backBus = bus.filter(item => item.Direction);//回程
    } catch (error) {
      console.log('get bus estimated time error', error);
    }
    //組去程站牌資訊
    goBus.forEach(item => {
      goStopsData[item.StopID] = {
        StopStatus: item.StopStatus,
        Estimate: item.Estimate,
        EstimateTime: item.EstimateTime,
        NextBusTime: item.NextBusTime,
        PlateNumb: item.PlateNumb,
      };
    });

    //組回程站牌資訊
    backBus.forEach(item => {
      backStopsData[item.StopID] = {
        StopStatus: item.StopStatus,
        Estimate: item.Estimate,
        EstimateTime: item.EstimateTime,
        NextBusTime: item.NextBusTime,
        PlateNumb: item.PlateNumb,
      };
    });

    setStopData([goStopsData, backStopsData]);
    setIsLoading(false);
  }, [getBusRealTimeByFrequency, getBusRouteShape, location.state, region, routeName, searchRoutes]
  );

  useEffect(() => {
    refreshTime === 30 && getData();
  }, [refreshTime, getData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshTime(prevRefreshTime => prevRefreshTime === 0 ? 30 : prevRefreshTime -= 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (isLoading) {
    return (<Loader />);
  }

  return (
    <Container>
      <Map
        busStopOrder={busStopOrder}
        geometry={geometry}
        direction={direction}
        busDynamicPostionData={busDynamicPostionData}
      />
      <StationList
        departureDestination={departureDestination}
        stopOrderData={busStopOrder}
        stopsData={stopsData}
        refreshTime={refreshTime}
        direction={direction}
        setDirection={setDirection}
      />
    </Container>
  );
};

export default RouteDetailPage;