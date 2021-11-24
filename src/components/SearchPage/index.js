import React, { useState } from 'react';
import ResultList from '../ResultList';
import SearchBlock from '../SearchBlock';

import { countryDic, Mode } from '../../constants';
import { getCityBusRoutes } from '../../api';

const SearchPage = () => {
  const [mode, setMode] = useState(Mode.NEARBY);
  const [routeData, setRouteData] = useState([]);

  const searchRoutes = async (searchValue) => {
    // let filterName = '';
    let searchParam = new URLSearchParams([
      // ['$top', PAGE_NUM],
      // ['$filter', `Picture/PictureUrl1 ne null${filterName}`],
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
    <>
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
    </>
  );
};

export default SearchPage;
