import styled from 'styled-components/macro';

export const BackgroundImage = styled.img`
  width: 100vw;
  height: 100vh;
  background-color: #403F3F;
  object-fit: cover;
  overflow: hidden;
  vertical-align: middle;
  filter: brightness(30%);
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Container = styled.div`
  max-width: 1280px;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
  padding: 0 5%;
`;