/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { getCityBusEstimatedTime, getCityBusRoutes, getCityBusStopOrder } from '../../api';
import StationList from '../StationList';
import Loader from '../Loader';
import { Container } from './styles';

const RouteDetailPage = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [urlSearchParam, setUrlSeachParam] = useSearchParams();
  const [busStopOrder, setBusStopOrder] = useState([]);
  const [departureDestination, setDepartureDestination] = useState([]);
  const [stopsData, setStopData] = useState([]);//組合過後的站牌資訊
  const [refreshTime, setRefreshTime] = useState(5);

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

    //取得預估到站資料
    try {
      let resp = await getCityBusEstimatedTime(region, routeName, searchParam);
      let bus = resp.data.filter(item => item.RouteName.Zh_tw === routeName);

      //去程
      goBus = bus.filter(item => !item.Direction);
      backBus = bus.filter(item => item.Direction);
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
  }, [location.state, region, routeName, searchRoutes]
  );

  useEffect(() => {
    refreshTime === 5 && getData();
  }, [refreshTime, getData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshTime(prevRefreshTime => prevRefreshTime === 0 ? 5 : prevRefreshTime -= 1);
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
      <StationList
        departureDestination={departureDestination}
        stopOrderData={busStopOrder}
        stopsData={stopsData}
        refreshTime={refreshTime}
      />
    </Container>
  );
};

export default RouteDetailPage;