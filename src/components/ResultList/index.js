import React, { useState } from 'react';
import { Block, Container, Line, Section, NearbyStationBtn, RefreshBtn, RefreshIcon, Triangle, ResultCont, ResultItem, DirectionCont, Busdirection, BusStateText, TextMedium, TextSmall, TextLarge, TextExtraSmall } from './styles';

import { Mode } from '../../constants';

import RefreshSmall from '../../images/重新整理icon.png';
import RefreshMedium from '../../images/重新整理icon@2x.png';

const ResultList = ({ mode, data }) => {
  const [isPressed, setIsPressed] = useState(true);

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

  const renderStation = () => {
    return (
      <ResultCont>
        {
          mode === Mode.NEARBY &&
          <NearbyStationBtn onClick={() => setIsPressed(prevIsPressed => !prevIsPressed)} >
            新明路
            <Triangle isPressed={isPressed} />
          </NearbyStationBtn>
        }
        {
          isPressed &&
          data.map(item => {
            return (
              <ResultItem to={'/'} key={item.RouteID}>
                <Block>
                  <TextLarge>{item.RouteName.Zh_tw}</TextLarge>
                  <TextMedium>{`${item.DepartureStopNameZh} - ${item.DestinationStopNameZh}`}</TextMedium>
                </Block>
                {
                  mode === Mode.NEARBY ?
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
                    </DirectionCont> : null
                }

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
      {renderStation()}
    </Container>
  );
};

export default ResultList;