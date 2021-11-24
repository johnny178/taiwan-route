import React, { useState } from 'react';
import ResultList from '../ResultList';
import SearchBlock from '../SearchBlock';

import { countryDic, Mode } from '../../constants';
import { getCityBusRoutes } from '../../api';
import { Container } from './styles';

const SearchPage = () => {
  const [mode, setMode] = useState(Mode.NEARBY);
  const [routeData, setRouteData] = useState([]);

  const searchRoutes = async (searchValue) => {
    let searchParam = new URLSearchParams([
      // ['$filter', `Picture/PictureUrl1 ne null${filterName}`],
      ['$orderby', 'RouteName/Zh_tw'],
      ['$format', 'JSON'],
    ]);

    try {
      let resp = await getCityBusRoutes(countryDic['臺北市'], searchValue, searchParam);
      setRouteData(resp.data);
      console.log(resp.data)
    } catch (error) {
      console.log('get bus routes error', error);
    }
  };

  const searchNeabyRoutes = () => {

  };

  return (
    <Container>
      <SearchBlock
        mode={mode}
        setMode={mode => setMode(mode)}
        searchRoutes={(searchValue) => searchRoutes(searchValue)}
        searchNearbyRoutes={() => searchNeabyRoutes()}
      />
      <ResultList
        data={routeData}
        mode={mode}
      />
    </Container>
  );
};

export default SearchPage;
