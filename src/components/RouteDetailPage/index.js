/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { getCityBusEstimatedTime, getCityBusRoutes, getCityBusStopOrder } from '../../api';
import StationList from '../StationList';
import { Container } from './styles';

const RouteDetailPage = () => {
  const location = useLocation();
  const [urlSearchParam, setUrlSeachParam] = useSearchParams();
  const [busStopOrder, setBusStopOrder] = useState([]);
  const [departureDestination, setDepartureDestination] = useState([]);

  const region = urlSearchParam.get('region');
  let routeName = decodeURI(location.pathname).slice(1, -1);

  useEffect(() => {
    searchRoutes();
    getBusStopOrder();
    getBusEstimatedTime();
  }, []);

  //取得路線資料
  const searchRoutes = async (searchValue) => {
    let searchParam = new URLSearchParams([['$format', 'JSON']]);

    try {
      let resp = await getCityBusRoutes(region, routeName, searchParam);
      let route = resp.data.filter(item => item.RouteName.Zh_tw === routeName);
      const { DepartureStopNameZh, DestinationStopNameZh } = route[0];
      setDepartureDestination([DestinationStopNameZh, DepartureStopNameZh]);
    } catch (error) {
      console.log('get bus routes error', error);
    }
  };

  //取得路線站序資料
  const getBusStopOrder = async () => {
    let searchParam = new URLSearchParams([['$format', 'JSON']]);

    try {
      let resp = await getCityBusStopOrder(region, routeName, searchParam);
      let stops = resp.data.filter(item => item.RouteName.Zh_tw === routeName);
      setBusStopOrder(stops);
    } catch (error) {
      console.log('get bus stop order error', error);
    }
  };

  //取得預估到站資料
  const getBusEstimatedTime = async () => {
    let searchParam = new URLSearchParams([['$format', 'JSON']]);

    try {
      let resp = await getCityBusEstimatedTime(region, routeName, searchParam);
      let bus = resp.data.filter(item => item.RouteName.Zh_tw === routeName);

      //去程
      let goBus = bus.filter(item => item.Direction);
      let backBus = bus.filter(item => !item.Direction);
      console.log('yotest', goBus);
    } catch (error) {
      console.log('get bus stop order error', error);
    }
  };

  return (
    <Container>
      <StationList
        departureDestination={departureDestination}
        stopOrderData={busStopOrder}
      />
    </Container>
  );
};

export default RouteDetailPage;