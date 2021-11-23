import React from 'react';
import { BackgroundImage, Container, Wrapper } from './styles';
import BackgroundImageSmall from '../images/[PC]公車-公車查詢_背景.png';
import BackgroundImageMedium from '../images/[PC]公車-公車查詢_背景@2x.png';
// import { useLocation } from 'react-router';

const AppWrapper = (props) => {
  // const location = useLocation();

  return (
    <>
      <BackgroundImage src={BackgroundImageSmall} srcSet={`${BackgroundImageSmall} 1x, ${BackgroundImageMedium} 2x`} />
      <Wrapper>
        <Container>
          {props.children}
        </Container>
      </Wrapper>
    </>
  );
};

export default AppWrapper;