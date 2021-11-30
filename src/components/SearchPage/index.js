import React, { useCallback, useEffect, useState } from 'react';
import ResultList from '../ResultList';
import SearchBlock from '../SearchBlock';

import { countryDic, Mode } from '../../constants';
import { getCityBusRoutes, getNearbyBusStation } from '../../api';
import { Container } from './styles';

const SearchPage = () => {
  const [mode, setMode] = useState(Mode.SEARCH);
  const [routeData, setRouteData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [nearbyStationData, setNearbyStationData] = useState([]);
  const [region, setRegion] = useState('高雄市');
  // const [location, setLocation] = useState({ latitude: '', longitude: '' });

  const searchRoutes = useCallback(async (searchValue) => {
    let searchParam = new URLSearchParams([
      ['$orderby', 'RouteName/Zh_tw'],
      ['$format', 'JSON'],
    ]);

    try {
      let resp = await getCityBusRoutes(countryDic[region], searchValue, searchParam);
      setRouteData(resp.data);
    } catch (error) {
      console.log('get bus routes error', error);
    }
  }, [region]
  );

  useEffect(() => {
    switch (mode) {
      case Mode.SEARCH:
        searchRoutes(searchValue);
        break;
      case Mode.FAVORITE:
        setSearchValue('');
        break;
      case Mode.NEARBY:
        setSearchValue('');
        searchNearbyStation();
        break;
      default:
        break;
    }
  }, [searchValue, mode, region, searchRoutes]);

  useEffect(() => {
    setMode(Mode.SEARCH);
  }, [region]);

  const searchNearbyStation = async () => {
    let nearbyRoutesData = [];

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          let searchParam = new URLSearchParams([
            ['$spatialFilter', `nearby(${position.coords.latitude}, ${position.coords.longitude},250)`],
            ['$format', 'JSON'],
          ]);

          try {
            let resp = await getNearbyBusStation(searchParam);
            //過濾重複的StationID
            resp.data = resp.data.filter((thing, index, self) =>
              index === self.findIndex((t) => (
                t.StationID === thing.StationID
              ))
            );
            setNearbyStationData(resp.data);
            console.log('YOYO', resp.data);

            let temp = {};
            let routeSearchParam = new URLSearchParams([
              ['$orderby', 'RouteName/Zh_tw'],
              ['$format', 'JSON'],
            ]);

            resp.data.forEach(item => {
              temp['StationAddress'] = item.StationAddress;
              temp['StationName'] = item.Zh_tw;
              temp['Stops'] = [];
              item.Stops.forEach(async (item) => {
                try {
                  let routeName = item.RouteName.Zh_tw;
                  let resp = await getCityBusRoutes('Taipei', routeName, routeSearchParam);

                  resp = resp.data.filter(item => item.RouteName.Zh_tw === routeName);
                  console.log('YOYO2', resp);

                  // temp['Stops'].push({
                  //   DepartureStopNameZh: resp[0].DepartureStopNameZh,
                  //   DestinationStopNameZh: resp[0].DestinationStopNameZh,
                  //   routeName: item.RouteName.Zh_tw,
                  // });

                  nearbyRoutesData.push(temp);
                } catch (error) {
                  console.log(error);
                }

              });
            });
          } catch (error) {
            console.log('get bus routes error', error);
          }
        }
      );
    } else {
      //Geolocation is not supported by this browser.
    }

  };

  return (
    <Container>
      <SearchBlock
        mode={mode}
        setMode={mode => setMode(mode)}
        searchValue={searchValue}
        setSearchValue={searchValue => setSearchValue(searchValue)}
        region={region}
        setRegion={setRegion}
      />
      <ResultList
        routesData={routeData}
        mode={mode}
        nearbyStationData={nearbyStationData}
      />
    </Container>
  );
};

export default SearchPage;
