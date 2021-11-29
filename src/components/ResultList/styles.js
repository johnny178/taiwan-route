import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  /* display: flex;
  flex-direction: column; */
  flex: 1;
  margin-top: 8%;

  @media (min-width: 996px) {
    margin-top: 0;
  }
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
  font-size: 0.6rem;
`;

export const TextSmall = styled(Text)`
  font-size: 0.8rem;
`;

export const TextMedium = styled(Text)`
  font-size: 1rem;
`;

export const TextLarge = styled(Text)`
  font-size: 1.2rem;
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
  flex-direction: column;
  padding: 10px 0;

  @media (min-width: 600px) {
    flex-direction: row;
  }

  @media (min-width: 996px) {
    flex-direction: column;
  }
`;

export const Busdirection = styled.span`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: ${({ bkgColor }) => `${bkgColor}`};
  border-radius: 10px;
  padding: 3px 0;
  width: 95px;
  margin-right: 50px;
  
  &:first-child{
    margin-bottom: 20px;
  }
  
  @media (min-width: 600px) {
    &:first-child{
      margin-bottom: 0;
    }
  }
  
  @media (min-width: 996px) {
    &:first-child{
      margin-bottom: 20px;
    }
  }
`;

export const BusStateText = styled.p`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: #E3E3E3;
  border-radius: 13px;
  color: #77797D;
  padding: 8px 5px;
  right: 0;
  transform: translate(75%, 0);
  font-size: 0.56rem;
  white-space: nowrap;
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


export const ResultCont = styled.div``;

export const ItemCont = styled.div`
  display: flex;
`;

export const ResultItem = styled(Link)`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(227, 227, 227, .4);
  padding: 7px 0 7px 3%;
`;

export const LoveBtn = styled.button`
  cursor: pointer;
`;

export const Icon = styled.img`
  object-fit: cover;
  transform: scale(0.8);
`;