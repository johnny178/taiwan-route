import React, { useState } from 'react';
import { Container, DirectionBtn, Header, StationCell, HeaderText, TextMedium, Time, TimeCont/*, BusPosition */ } from './styles';

const StationList = ({ departureDestination, stopOrderData, stopsData, refreshTime }) => {
  const [direction, setDirection] = useState(0);//0去程 1返程

  const parseIsoDatetime = dtstr => {
    if (!dtstr) return;

    let dt = dtstr.split(/[: T-]/).map(parseFloat);
    return `${dt[3]}:${dt[4] < 10 ? '0' : ''}${dt[4]}`;
  };

  const renderStopsList = () => {
    return (
      stopOrderData[direction]?.Stops.map(item => {
        const {
          Stopstatus,
          EstimateTime,
          NextBusTime
        } = stopsData[direction][item.StopID];
        const estimateTime = EstimateTime !== undefined && (Math.floor(EstimateTime / 60) > 0 ? Math.floor(EstimateTime / 60) : '進站中');
        const nextBusTime = parseIsoDatetime(NextBusTime);

        const busStateStyle = {
          normal: ['#77797D', '#E3E3E3'],
          close: ['#EF3232', '#FFD9D9'],
          coming: ['#FFFFFF', '#EF3232']
        };

        const getBusStateStyle = () => {
          if (estimateTime === '進站中')
            return busStateStyle.coming;
          if (estimateTime !== false && estimateTime < 3) {
            return busStateStyle.close;
          }
          return busStateStyle.normal;
        };

        // console.log(stopsData[direction][item.StopID]);
        const timeText = () => {
          if (Stopstatus !== 0 || Stopstatus === undefined) {
            if (estimateTime) return estimateTime;
            if (nextBusTime) return nextBusTime;

            switch (Stopstatus) {
              case 1:
                return '尚未發車';
              case 2:
                return '交管不停';
              case 3:
                return '末班已過';
              case 4:
                return '今未營運';
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
              <Time
                isShowMinText={Number.isInteger(timeText())}
                color={getBusStateStyle()[0]}
                backgroundColor={getBusStateStyle()[1]}
              >
                {timeText()}
              </Time>
              {/* <BusPosition /> */}
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
        <HeaderText color={'#E3E3E3'}>{`${refreshTime}秒後刷新`}</HeaderText>
        <DirectionBtn onClick={() => setDirection(1)} isActive={1 === direction}>{departureDestination[1]}</DirectionBtn>
      </Header>
      {renderStopsList()}
    </Container>
  );
};

export default StationList;