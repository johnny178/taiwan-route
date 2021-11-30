import React, { useState } from 'react';
import { Block, Container, Line, Section, NearbyStationBtn, RefreshBtn, RefreshIcon, Triangle, ResultCont, ResultItem, DirectionCont, Busdirection, BusStateText, TextMedium, TextSmall, TextLarge, TextExtraSmall, LoveBtn, Icon, ItemCont } from './styles';

import { Mode, countryDic } from '../../constants';

import RefreshSmall from '../../images/重新整理icon.png';
import RefreshMedium from '../../images/重新整理icon@2x.png';
import LoveSmall from '../../images/我的收藏icon.png';
import LoveMediium from '../../images/我的收藏icon@2x.png';
import unLoveSmall from '../../images/愛心(未選).png';
import unLoveMedium from '../../images/愛心(未選)@2x.png';

const ResultList = ({ routeData, nearbyStationData, mode }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [favoriteRoutesData, setFavoriteRoutesData] = useState(localStorage['favoriteRoutes'] ? JSON.parse(localStorage['favoriteRoutes']) : {});

  const pressFavoriteBtn = e => {
    let storedData = Object.assign({}, favoriteRoutesData);
    delete storedData[e.target.id];
    localStorage['favoriteRoutes'] = JSON.stringify(storedData);
    setFavoriteRoutesData(storedData);
  };

  const pressLoveBtn = e => {
    let routeData = routeData[e.target.id];
    let storedData = Object.assign({}, favoriteRoutesData);

    if (storedData[routeData.RouteUID]) {
      //如果已儲存過，則移除
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

  const renderNeabyHeader = () => {
    return (
      <Section>
        <Block>
          <TextMedium>{'附近站牌 搜尋'}</TextMedium>
          <TextSmall>{'目前位置：臺北市內湖區新明路321巷3弄'}</TextSmall>
        </Block>
        <Block>
          <TextSmall>{'5秒前刷新'}</TextSmall>
          <RefreshBtn>
            <RefreshIcon src={RefreshSmall} srcSet={`${RefreshSmall} 1x,${RefreshMedium} 2x`} />
          </RefreshBtn>
        </Block>
      </Section>
    );
  };

  const renderNearbyStation = () => {
    return (
      <ResultCont>
        {
          nearbyStationData.map((item, index) => {
            if (!item.StationAddress) return;
            return (
              <React.Fragment key={index}>
                <NearbyStationBtn onClick={() => setIsPressed(prevIsPressed => !prevIsPressed)} >
                  {item.StationAddress}
                  <Triangle isPressed={isPressed} />
                </NearbyStationBtn>
                {
                  isPressed && item.Stops.map((item) => {
                    return (
                      <ResultItem to={'/'} key={item.RouteID}>
                        <Block>
                          <TextLarge>{item.RouteName.Zh_tw}</TextLarge>
                          <TextMedium>{`${item.DepartureStopNameZh} - ${item.DestinationStopNameZh}`}</TextMedium>
                        </Block>
                        <DirectionCont>
                          <Busdirection bkgColor={'#A645B5'}>
                            <TextExtraSmall>{'往'}</TextExtraSmall>
                            <TextSmall>{'國父紀念館'}</TextSmall>
                            <BusStateText>未發車</BusStateText>
                          </Busdirection>

                          <Busdirection bkgColor={'#53C332FA'}>
                            <TextExtraSmall>{'往'}</TextExtraSmall>
                            <TextSmall>{'東湖'}</TextSmall>
                            <BusStateText>未發車</BusStateText>
                          </Busdirection>
                        </DirectionCont>
                      </ResultItem>
                    );
                  })
                }
              </React.Fragment>
            );
          })
        }
      </ResultCont >
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
          routeData.map((item, index) => {
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
      {mode === Mode.NEARBY ? renderNeabyHeader() : renderSearchHeader()}
      <Line />
      {mode === Mode.NEARBY ? renderNearbyStation() : (mode === Mode.FAVORITE ? renderFabvoriteStation() : renderStation())}
    </Container>
  );
};

export default ResultList;