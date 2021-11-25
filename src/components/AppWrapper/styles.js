import styled from 'styled-components/macro';
import BackgroundImagePC from '../../images/[PC]公車-公車查詢_背景.png';
import BackgroundImageLaptop from '../../images/[平板]公車-附近站牌_背景.png';

export const BackgroundImage = styled.img`
  width: 100vw;
  height: 200vh;
  background-color: #403F3F;
  object-fit: cover;
  vertical-align: middle;
  filter: brightness(30%);
`;

export const Wrapper = styled.div`
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${BackgroundImageLaptop});
  background-size: contain;
  min-height: 100vh;
  min-width: 100vw;

  @media (min-width: 600px) {
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${BackgroundImagePC});    
  }  
`;

export const Container = styled.div`
  max-width: 1440px;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
  padding: 3% 5%;
`;