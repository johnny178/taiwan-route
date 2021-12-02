import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 996px) {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 2%;
  }
`;

