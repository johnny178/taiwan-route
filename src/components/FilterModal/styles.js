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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${BackgroundImageSmall});
  background-size: contain;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 1440px;
  width: 100vw;
  overflow: hidden;
  padding: 3% 5%;
`;

export const RightCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const RadioCont = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-row-gap: 20px;
  grid-column-gap: 15vw;
  margin-right: 10px;

  @media (min-width: 768px) {
    grid-column-gap: 10vw;
  }
`;

export const OptionCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const RegionName = styled.label`
  font-size: 1rem;
  color: #E3E3E3;
  margin-left: 5px;
  cursor: pointer;
  white-space: nowrap;
`;

export const RadioBtn = styled.input`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  
  &:checked {
    &::after {
      content: "";
      display: block;
      height: 6px;
      width: 6px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: black;
      transition: 0.2s ease-in all;
    }
  }
`;

export const BackBtn = styled.button`
  width: 68px;
  height: 48px;
  border: 1px solid #E3E3E3;
  border-radius: 15px;
  color: #E3E3E3;
  font-size: 1rem;
  margin-top: 100px;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
  
  @media(hover: hover) and (pointer: fine) {
    &:hover {
      background-color: rgba(227, 227, 227, .31);
      border: none;
    }
  }
`;

export const TaiwanImage = styled.img`
  object-fit: cover;
  width: 30vw;
  margin-right: 7%;

  @media (max-width: 768px) {
    display: none;
  }
`;