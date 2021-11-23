import React from 'react';
import SearchBlock from '../SearchBlock';
import { BackgroundImage, Container, Wrapper } from './styles';
import BackgroundImageSmall from '../images/[PC]公車-公車查詢_背景.png';
import BackgroundImageMedium from '../images/[PC]公車-公車查詢_背景@2x.png';

const SearchPage = () => {
  return (
    <>
      <BackgroundImage src={BackgroundImageSmall} srcSet={`${BackgroundImageSmall} 1x, ${BackgroundImageMedium} 2x`} />
      <Wrapper>
        <Container>
          <SearchBlock />
        </Container>
      </Wrapper>
    </>
  );
};

export default SearchPage;
