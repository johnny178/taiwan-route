/* eslint-disable no-unused-vars */
import React from 'react';
import NavigationBar from '../NavigationBar';
import { Container, Wrapper } from './styles';
// import { useLocation } from 'react-router';

const AppWrapper = (props) => {
  // const location = useLocation();

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