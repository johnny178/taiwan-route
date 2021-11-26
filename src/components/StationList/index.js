/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Container, DirectionBtn, Header, StationCell, HeaderText, TextMedium, Time, TimeCont, BusPosition } from './styles';

const StationList = ({ departureDestination, stopOrderData }) => {
  const [direction, setDirection] = useState(0);//0去程 1返程

  const renderStopsList = () => {
    return (
      stopOrderData[direction]?.Stops.map(item => (
        <StationCell key={item.StopID}>
          <TextMedium color={'#E3E3E3'}>{item.StopName.Zh_tw}</TextMedium>
          <TimeCont>
            <Time>20</Time>
            <BusPosition />
          </TimeCont>
        </StationCell>
      ))
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