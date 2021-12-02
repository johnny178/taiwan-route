import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 92vh;
  margin-top: 3%;

  @media (min-width: 996px) {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 2%;
    height: 78vh;
  }
`;

