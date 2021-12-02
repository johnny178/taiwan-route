import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  flex: 1;
  margin-top: 8%;

  @media (min-width: 996px) {
    margin-top: 0;
  }
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Text = styled.p`
  color: #E3E3E3;
  line-height: 1.3;
  letter-spacing: 0.22px;
`;

export const TextExtraSmall = styled(Text)`
  font-size: 0.6rem;
`;

export const TextSmall = styled(Text)`
  font-size: 0.8rem;
`;

export const TextMedium = styled(Text)`
  font-size: 1rem;
`;

export const TextLarge = styled(Text)`
  font-size: 1.2rem;
`;

export const Line = styled.div`
  height: 1px;
  background-color: #E3E3E3;
  margin-top: 10px;
`;

export const ResultCont = styled.div``;

export const ItemCont = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(227, 227, 227, .4);
  transition: all ease-in-out 0.2s;

  @media(hover: hover) and (pointer: fine) {
    &:hover {
      background-color: rgba(140, 113, 173, 0.22);
      border-radius: 15px;
    }
  }
`;

export const ResultItem = styled(Link)`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0 7px 3%;
`;

export const LoveBtn = styled.button`
  cursor: pointer;
`;

export const Icon = styled.img`
  object-fit: cover;
  transform: scale(0.8);
`;