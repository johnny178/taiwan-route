import React, { useEffect } from 'react';
import NavigationBar from '../NavigationBar';
import { Container, Wrapper } from './styles';
import { useLocation } from 'react-router';

const AppWrapper = (props) => {
  const location = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Wrapper>
        <Container>
          <NavigationBar />
          {props.children}
        </Container>
      </Wrapper>
    </>
  );
};

export default AppWrapper;