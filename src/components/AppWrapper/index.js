/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Wrapper } from './styles';
// import { useLocation } from 'react-router';

const AppWrapper = (props) => {
  // const location = useLocation();

  return (
    <>
      <Wrapper>
        <Container>
          {props.children}
        </Container>
      </Wrapper>
    </>
  );
};

export default AppWrapper;