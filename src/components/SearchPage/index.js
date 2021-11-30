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
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    } catch (error) {
      console.log('get bus routes error', error);
    }
  }, [region]
  );

  useEffect(() => {
    switch (mode) {
      case Mode.SEARCH:
        setIsLoading(true);
        searchRoutes(searchValue);
        break;
      case Mode.FAVORITE:
        setSearchValue('');
        break;
      case Mode.NEARBY:
        setSearchValue('');
        setIsLoading(true);
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
            resp = resp.data.filter((thing, index, self) =>
              index === self.findIndex((t) => (
                t.StationID === thing.StationID
              ))
            );

            let routeSearchParam = new URLSearchParams([
              ['$orderby', 'RouteName/Zh_tw'],
              ['$format', 'JSON'],
            ]);

            resp.forEach(item => {
              let temp = {};
              if (item.StationAddress) {
                temp['StationAddress'] = item.StationAddress;
                item.Stops.forEach(async (item) => {
                  try {
                    let routeName = item.RouteName.Zh_tw;
                    let resp = await getCityBusRoutes('Taipei', routeName, routeSearchParam);

                    if (resp.data.length !== 0) {
                      resp = resp.data.filter(item => item.RouteName.Zh_tw === routeName);

                      temp['Stops'] = [];
                      temp['Stops'].push({
                        DepartureStopNameZh: resp[0].DepartureStopNameZh,
                        DestinationStopNameZh: resp[0].DestinationStopNameZh,
                        routeName: item.RouteName.Zh_tw,
                      });
                    }
                  } catch (error) {
                    console.log(error);
                  }
                });
                nearbyRoutesData.push(temp);
              }
            });
            setNearbyStationData(nearbyRoutesData);
            setIsLoading(false);
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
        isLoading={isLoading}
      />
    </Container>
  );
};

export default SearchPage;
