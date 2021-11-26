import React, { useEffect, useState } from 'react';
import ResultList from '../ResultList';
import SearchBlock from '../SearchBlock';

import { countryDic, Mode } from '../../constants';
import { getCityBusRoutes/*, getCityBusStops */ } from '../../api';
import { Container } from './styles';

const SearchPage = () => {
  const [mode, setMode] = useState(Mode.SEARCH);
  const [routeData, setRouteData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [region, setRegion] = useState('臺北市');
  // const [location, setLocation] = useState({ latitude: '', longitude: '' });

  useEffect(() => {
    switch (mode) {
      case Mode.SEARCH:
        searchRoutes(searchValue);
        break;
      case Mode.FAVORITE:
        break;
      case Mode.NEARBY:
        // searchNeabyRoutes();
        break;
      default:
        break;
    }
  }, [searchValue, mode, region]);

  const searchRoutes = async (searchValue) => {
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
  };

  /*
  const searchNeabyRoutes = async () => {
    // let nearbyRoutesData = {};

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          let searchParam = new URLSearchParams([
            ['$spatialFilter', `nearby(${position.coords.latitude}, ${position.coords.longitude},100)`],
            ['$format', 'JSON'],
          ]);

          try {
            let resp = await getCityBusStops(countryDic['臺北市'], searchParam);
            setRouteData(resp.data);
            console.log('YOYO', resp.data)

            let temp = {};
            searchParam = new URLSearchParams([
              ['$orderby', 'RouteName/Zh_tw'],
              ['$format', 'JSON'],
            ]);

            resp.data.forEach(item => {
              temp['StationAddress'] = item.StationAddress;
              temp['StationName'] = item.Zh_tw;
              temp['Stops'] = [];
              item.Stops.forEach(async (item) => {
                let stopData = {};
                // let resp = await getCityBusRoutes(countryDic['臺北市'], item.RouteName.Zh_tw, searchParam);

                stopData['routeName'] = item.RouteName.Zh_tw;
                // stopData['departureDestination'] =
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
  */

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
        data={routeData}
        mode={mode}
        region={region}
      />
    </Container>
  );
};

export default SearchPage;
