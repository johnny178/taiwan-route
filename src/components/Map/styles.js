import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #707070;
  border-radius: 10px;
  padding: 2.5% 1%;
  background-color: white;

  @media (min-width: 996px) {
    padding: 1% 0.8%;
    margin-left: 3%;
  }
`;

export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 61%;
`;

export const ItemCont = styled.div`
  display: flex;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  margin-right: 25px;
`;

export const Image = styled.img`
  object-fit: contain;
  max-height: 100%;
  width: ${({ width }) => width};
  margin-right: 5px;
`;

export const Text = styled.p`
  font-size: 1rem;
  color: #5D4F6E;
  font-weight: 500;
`;