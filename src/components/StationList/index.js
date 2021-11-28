/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Container, DirectionBtn, Header, StationCell, HeaderText, TextMedium, Time, TimeCont, BusPosition } from './styles';

const StationList = ({ departureDestination, stopOrderData, stopsData }) => {
  const [direction, setDirection] = useState(0);//0去程 1返程
  console.log(stopsData[0]);
  // console.log(stopOrderData)

  const parseIsoDatetime = dtstr => {
    if (!dtstr) return;

    let dt = dtstr.split(/[: T-]/).map(parseFloat);
    return `${dt[3]}:${dt[4]}`;
  };

  const renderStopsList = () => {
    return (
      stopOrderData[direction]?.Stops.map(item => {
        const {
          Stopstatus,
          EstimateTime,
          NextBusTime
        } = stopsData[direction][item.StopID];
        const estimateTime = Math.floor(EstimateTime / 60) > 1 ? Math.floor(EstimateTime / 60) : '進站中';
        const nextBusTime = parseIsoDatetime(NextBusTime);

        const timeText = () => {
          if (Stopstatus !== 0 || Stopstatus === undefined) {
            if (estimateTime) return estimateTime;
            if (nextBusTime) return nextBusTime;

            switch (Stopstatus) {
              case 1:
                return '尚未發車';
              case 2:
                return '交管不停靠';
              case 3:
                return '末班車已過';
              case 4:
                return '今日未營運';
              default:
                return '尚未發車';
            }
          } else {
            return (estimateTime || nextBusTime) ?? '無資料';
          }
        };

        return (
          <StationCell key={item.StopID}>
            <TextMedium color={'#E3E3E3'}>{item.StopName.Zh_tw}</TextMedium>
            <TimeCont>
              <Time isShowMinText={Number.isInteger(timeText())}>{timeText()}</Time>
              <BusPosition />
            </TimeCont>
          </StationCell>
        );
      })
    );
  };

  return (
    <Container>
      <Header>
        <DirectionBtn onClick={() => setDirection(0)} isActive={0 === direction}>{departureDestination[0]}</DirectionBtn>
        <HeaderText color={'#E3E3E3'}>5秒後刷新</HeaderText>
        <DirectionBtn onClick={() => setDirection(1)} isActive={1 === direction}>{departureDestination[1]}</DirectionBtn>
      </Header>
      {renderStopsList()}
    </Container>
  );
};

export default StationList;