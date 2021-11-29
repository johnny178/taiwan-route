import React, { useState } from 'react';
import { Block, Container, Line, Section, NearbyStationBtn, RefreshBtn, RefreshIcon, Triangle, ResultCont, ResultItem, DirectionCont, Busdirection, BusStateText, TextMedium, TextSmall, TextLarge, TextExtraSmall, LoveBtn, Icon } from './styles';

import { Mode, countryDic } from '../../constants';

import RefreshSmall from '../../images/重新整理icon.png';
import RefreshMedium from '../../images/重新整理icon@2x.png';
// import LoveSmall from '../../images/我的收藏icon.png';
// import LoveMediium from '../../images/我的收藏icon@2x.png';


const ResultList = ({ data, mode, region }) => {
  const [isPressed, setIsPressed] = useState(false);

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
          data.map(item => {
            return (
              <React.Fragment key={item.StationID}>
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

  const renderStation = () => {
    return (
      <ResultCont>
        {
          data.map(item => {
            return (
              <ResultItem
                key={item.RouteID}
                to={{
                  pathname: `/${item.RouteName.Zh_tw}}`,
                  search: `?region=${countryDic[region]}`,
                }}
                state={item}
              >
                <Block>
                  <TextLarge>{item.RouteName.Zh_tw}</TextLarge>
                  <TextMedium>{`${item.DepartureStopNameZh} - ${item.DestinationStopNameZh}`}</TextMedium>
                </Block>
                <LoveBtn>
                  <Icon />
                </LoveBtn>
              </ResultItem>
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
      {mode === Mode.NEARBY ? renderNearbyStation() : renderStation()}
    </Container>
  );
};

export default ResultList;