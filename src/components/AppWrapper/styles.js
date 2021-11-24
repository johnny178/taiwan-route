import styled from 'styled-components/macro';
import BackgroundImageSmall from '../../images/[PC]公車-公車查詢_背景.png';
// import BackgroundImageMedium from '../../images/[PC]公車-公車查詢_背景@2x.png';

export const BackgroundImage = styled.img`
  width: 100vw;
  height: 200vh;
  background-color: #403F3F;
  object-fit: cover;
  vertical-align: middle;
  filter: brightness(30%);
`;

export const Wrapper = styled.div`
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${BackgroundImageSmall});
  background-size: contain;
  min-height: 100vh;
  min-width: 100vw;
`;

export const Container = styled.div`
  max-width: 1440px;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
  padding: 3% 5%;
`;