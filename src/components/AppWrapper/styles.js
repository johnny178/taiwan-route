import styled from 'styled-components/macro';
import BackgroundImagePC from '../../images/[PC]公車-公車查詢_背景.png';
import BackgroundImageLaptop from '../../images/[平板]公車-附近站牌_背景.png';

export const Wrapper = styled.div`
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${BackgroundImageLaptop});
  background-size: contain;
  min-height: 100vh;

  @media (min-width: 600px) {
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${BackgroundImagePC});    
  }  
`;

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 3% 0;
  overflow: hidden;

  @media (max-width: 1512px){
    padding: 3% 5%;
  }
`;