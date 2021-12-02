import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 3%;
`;

export const DirectionBtn = styled.button`
  position: relative;
  flex: ${({ isActive }) => isActive ? 1.5 : 1};
  cursor: pointer;
  color: ${({ isActive }) => isActive ? '#E3E3E3' : 'rgba(227, 227, 227, .5)'};
  font-size: 1rem;
  padding: 10px 0;
  white-space: nowrap;
  font-weight: 700;

  &::before {
    content: '往 ';
    font-size: 0.8rem;
  }

  &::after {
    position: absolute;
    content: '';
    height: 4px;
    width: 100%;
    background-color: ${({ isActive }) => isActive ? '#05F2F2' : 'rgba(5, 242, 242, .39)'};
    left: 0;
    bottom: -4px;
    border-radius: 10px;
  }
`;

//動態時刻表
export const StationCell = styled.button`
  cursor: pointer;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 3% 3%;
  border-bottom: 1px solid rgba(119, 121, 125, .4);
  transition: all 0.2s ease-in-out;
  
  @media(hover: hover) and (pointer: fine) {
    &:hover {
      background-color: rgba(140, 113, 173, 0.22);
      border-radius: 15px;
    }
  }
`;

export const TimeCont = styled.div`
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const Time = styled.p`
  font-size: 1rem;
  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 15px;
  letter-spacing: 0.32px;
  padding: 3px;
  white-space: nowrap;
  width: 80px;
  text-align: center;
  font-weight: 700;

  &::after {
    content: '${({ isShowMinText }) => isShowMinText ? ' 分' : ''}';
    font-size: 0.8rem;
  }
`;

export const BusPosition = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${({ hasBus }) => hasBus ? '#05F2F2' : '#5D4F6E'};
  border: 1px solid ${({ hasBus }) => hasBus ? '#05F2F2' : '#8C71AD'};
  border-radius: 50%;
  margin-left: 15px;
  z-index: 99;
`;

export const BusLine = styled.div`
  position: absolute;
  width: 2px;
  background-color: #5D4F6E;
  height: ${({ height }) => height};
  top: ${({ top }) => top};
  right: calc(3% + 57px);
`;

export const BusPlateNum = styled.p`
  color: #05F2F2;
  font-size: 0.8rem;
  width: 42px;
  margin-left: 10px;
  font-weight: 500;
  white-space: nowrap;
`;

//文字
export const Text = styled.p`
  color: ${({ color }) => color ? color : 'black'};
  letter-spacing: 0.3px;
  text-align: center;
  font-weight: 500;
`;

export const HeaderText = styled(Text)`
  flex : 1;
  font-size: 0.8rem;
  font-weight: 500;
`;

export const TextSmall = styled(Text)`
  font-size: 0.8rem;
`;

export const TextMedium = styled(Text)`
  text-align: left;
  font-size: 1rem;
  pointer-events: none;

  &::before {
    content: ' ${({ num }) => num}';
    margin-right: 10px;
  }
`;

export const TextLarge = styled(Text)`
  font-size: 1.2rem;
`;


