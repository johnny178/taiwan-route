import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  /* display: flex;
  flex-direction: column; */
  margin-top: 8%;
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Text = styled.p`
  color: #E3E3E3;
  line-height: 1.3;
  letter-spacing: 0.22px;
`;

export const TextExtraSmall = styled(Text)`
  font-size: 0.375rem;
  padding-top: 3px;
`;

export const TextSmall = styled(Text)`
  font-size: 0.56rem;
`;

export const TextMedium = styled(Text)`
  font-size: 0.6875rem;
`;

export const TextLarge = styled(Text)`
  font-size: 0.8125rem;
`;

export const NearbyStationBtn = styled.button`
  color: #6ADCF7;
  letter-spacing: 0.26px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 8.5px;
`;

export const Triangle = styled.div`
  margin-left: 8px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 10px solid #45B7D2;
  transform: ${({ isPressed }) => isPressed ? 'rotate(90deg)' : 'rotate(0deg)'};
`;

// export const NeabyStationText = styled.h1``;

export const DirectionCont = styled.div`
  display: flex;
  /* height: 20px; */
`;

export const Busdirection = styled.span`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: ${({ bkgColor }) => `${bkgColor}`};
  border-radius: 10px;
  padding: 3px 0;
  width: 75px;
  margin-right: 35px;
`;

export const BusStateText = styled.p`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E3E3E3;
  border-radius: 10px;
  color: #77797D;
  padding: 5px 0;
  top: -2px;
  right: -23px;
  width: 33px;
  font-size: 0.56rem;
`;

export const RefreshBtn = styled.button`
  width: 1rem;
  cursor: pointer;
  align-self: flex-end;
`;

export const RefreshIcon = styled.img`
  object-fit: contain;
  max-width: 100%;
`;

export const Line = styled.div`
  height: 1px;
  background-color: #E3E3E3;
  margin-top: 10px;
`;


export const ResultCont = styled.div`
  
`;

export const ResultItem = styled(NavLink)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(227, 227, 227, .4);
  padding: 7px 0 7px 3%;
`;
