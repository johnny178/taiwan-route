import React, { useState } from 'react';
import { Block, Container, Line, Section, ResultCont, ResultItem, TextMedium, TextSmall, TextLarge, LoveBtn, Icon, ItemCont } from './styles';

import { Mode, countryDic } from '../../constants';

import LoveSmall from '../../images/我的收藏icon.png';
import LoveMediium from '../../images/我的收藏icon@2x.png';
import unLoveSmall from '../../images/愛心(未選).png';
import unLoveMedium from '../../images/愛心(未選)@2x.png';

const ResultList = ({ routesData, mode }) => {
  const [favoriteRoutesData, setFavoriteRoutesData] = useState(localStorage['favoriteRoutes'] ? JSON.parse(localStorage['favoriteRoutes']) : {});

  const pressFavoriteBtn = e => {
    let storedData = Object.assign({}, favoriteRoutesData);
    delete storedData[e.target.id];
    localStorage['favoriteRoutes'] = JSON.stringify(storedData);
    setFavoriteRoutesData(storedData);
  };

  const pressLoveBtn = e => {
    let routeData = routesData[e.target.id];
    let storedData = Object.assign({}, favoriteRoutesData);

    if (storedData[routeData.RouteUID]) {
      //如果已儲存過，則移除最愛路線
      delete storedData[routeData.RouteUID];
    } else {
      //新增最愛路線
      storedData[routeData.RouteUID] = routeData;
    }
    localStorage['favoriteRoutes'] = JSON.stringify(storedData);
    setFavoriteRoutesData(storedData);
  };

  const renderSearchHeader = () => {
    let headerText = mode === Mode.SEARCH ? '搜尋結果' : '我的收藏';

    return (
      <Section>
        <Block>
          <TextMedium>{headerText}</TextMedium>
        </Block>
      </Section>
    );
  };

  const renderFabvoriteStation = () => {
    return (
      <ResultCont>
        {
          Object.values(favoriteRoutesData).map(item => {
            return (
              <ItemCont key={item.RouteUID}>
                <ResultItem
                  to={{
                    pathname: `/${item.RouteName.Zh_tw}}`,
                    search: `?region=${item.City}&routeUID=${item.RouteUID}`,
                  }}
                  state={item}
                >
                  <Block>
                    <TextLarge>{item.RouteName.Zh_tw}</TextLarge>
                    <TextMedium>{`${item.DepartureStopNameZh} - ${item.DestinationStopNameZh}`}</TextMedium>
                  </Block>
                  <Block>
                  </Block>
                </ResultItem>
                <LoveBtn>
                  <Icon
                    src={LoveSmall}
                    srcSet={`${LoveSmall} 1x, ${LoveMediium} 2x`}
                    id={item.RouteUID}
                    onClick={pressFavoriteBtn}
                  />
                  <TextSmall>{Object.keys(countryDic).find(key => countryDic[key] === item.City)}</TextSmall>
                </LoveBtn>
              </ItemCont>
            );
          })
        }
      </ResultCont >
    );
  };

  const renderStation = () => {
    return (
      <ResultCont>
        {
          routesData.map((item, index) => {
            return (
              <ItemCont key={item.RouteUID}>
                <ResultItem
                  to={{
                    pathname: `/${item.RouteName.Zh_tw}}`,
                    search: `?region=${item.City}&routeUID=${item.RouteUID}`,
                  }}
                  state={item}
                >
                  <Block>
                    <TextLarge>{item.RouteName.Zh_tw}</TextLarge>
                    <TextMedium>{`${item.DepartureStopNameZh} - ${item.DestinationStopNameZh}`}</TextMedium>
                  </Block>
                </ResultItem>

                <LoveBtn>
                  {
                    favoriteRoutesData[item.RouteUID] ?
                      <Icon
                        src={LoveSmall}
                        srcSet={`${LoveSmall} 1x, ${LoveMediium} 2x`}
                        id={index}
                        onClick={pressLoveBtn}
                      /> :
                      <Icon
                        src={unLoveSmall}
                        srcSet={`${unLoveSmall} 1x, ${unLoveMedium} 2x`}
                        id={index}
                        onClick={pressLoveBtn}
                      />
                  }
                </LoveBtn>
              </ItemCont>

            );
          })
        }
      </ResultCont >
    );
  };

  return (
    <Container>
      {renderSearchHeader()}
      <Line />
      {mode === Mode.FAVORITE ? renderFabvoriteStation() : renderStation()}
    </Container>
  );
};

export default ResultList;