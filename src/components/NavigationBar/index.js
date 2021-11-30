/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

import { Container, Icon, Logo, LoveBtn, LoveIcon, Text } from './styles';
import IconSmall from '../../images/[平板]左上icon.png';
import IconMedium from '../../images/[平板]左上icon@2x.png';
import LoveSmall from '../../images/我的收藏icon.png';
import LoveMediium from '../../images/我的收藏icon@2x.png';
import unLoveSmall from '../../images/愛心(未選).png';
import unLoveMedium from '../../images/愛心(未選)@2x.png';
import { getCityBusRoutes } from '../../api';

const NavigationBar = () => {
  let storedData = localStorage['favoriteRoutes'] ? JSON.parse(localStorage['favoriteRoutes']) : {};
  const [searchParam, setSearchParam] = useSearchParams();
  const location = useLocation();
  const [favoriteRoutesData, setFavoriteRoutesData] = useState(storedData);
  const routerUID = searchParam.get('routeUID');
  let routeName = decodeURI(location.pathname).slice(1, -1);

  const searchRoutes = useCallback(async () => {
    let urlSearchParam = new URLSearchParams([
      ['$orderby', 'RouteName/Zh_tw'],
      ['$format', 'JSON'],
    ]);

    try {
      let resp = await getCityBusRoutes(searchParam.get('region'), routeName, urlSearchParam);
      return resp.data[0];
    } catch (error) {
      console.log('get bus routes error', error);
    }
  }, [routeName, searchParam]
  );

  const pressLoveBtn = () => {
    let storedData = Object.assign({}, favoriteRoutesData);
    if (storedData[routerUID]) {
      //如果已儲存過，則移除
      delete storedData[routerUID];
    } else {
      //新增最愛路線
      if (location.state) {
        storedData[routerUID] = location.state;
      } else {
        storedData[routerUID] = searchRoutes();
      }
    }
    localStorage['favoriteRoutes'] = JSON.stringify(storedData);
    setFavoriteRoutesData(storedData);
  };

  const renderLoveBtn = () => {
    if (storedData[routerUID]) {
      return (
        <LoveIcon
          src={LoveSmall}
          srcSet={`${LoveSmall} 1x, ${LoveMediium} 2x`}
          onClick={pressLoveBtn}
        />
      );
    } else {
      return (
        <LoveIcon
          src={unLoveSmall}
          srcSet={`${unLoveSmall} 1x, ${unLoveMedium} 2x`}
          onClick={pressLoveBtn}
        />
      );
    }
  };

  return (
    <Container>
      <Logo to='/'>
        <Icon src={IconSmall} srcSet={`${IconSmall} 1x, ${IconMedium} 2x`} />
      </Logo>
      <Text>{routeName}</Text>
      <LoveBtn>
        {location.pathname !== '/' && renderLoveBtn()}
      </LoveBtn>
    </Container>
  );
};

export default NavigationBar;