import styled from 'styled-components/macro';
import BackgroundImageSmall from '../../images/[PC]公車-篩選縣市_背景.png';


//篩選介面
export const ColorWrapper = styled.div`
  display: flex;
  position: fixed;
  background-color: #403F3F;
  top: 0; 
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
`;

export const Container = styled.div`
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${BackgroundImageSmall});
  background-size: contain;
`;

export const Wrapper = styled.div`
  max-width: 1440px;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
  padding: 3% 5%;
`;

export const RadioCont = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(25vw,1fr));
`;

export const RegionName = styled.label`
  font-size: 1rem;
  color: #E3E3E3;
`;

export const RadioBtn = styled.input`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
`;