import React, { useCallback, useEffect, useState } from 'react';
import ResultList from '../ResultList';
import SearchBlock from '../SearchBlock';

import { countryDic, Mode } from '../../constants';
import { getCityBusRoutes } from '../../api';
import { Container } from './styles';

const SearchPage = () => {
  const [mode, setMode] = useState(Mode.SEARCH);
  const [routeData, setRouteData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [region, setRegion] = useState('臺北市');

  const searchRoutes = useCallback(async (searchValue) => {
    try {
      let resp = await getCityBusRoutes(countryDic[region], searchValue);
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
      default:
        setSearchValue('');
        break;
    }
  }, [searchValue, mode, region, searchRoutes]);

  useEffect(() => {
    setMode(Mode.SEARCH);
  }, [region]);

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
      />
    </Container>
  );
};

export default SearchPage;
