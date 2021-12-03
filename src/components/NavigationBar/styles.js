import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(NavLink)``;

export const Icon = styled.img`
  object-fit: cover;
  width: 27vw;
  
  @media (min-width: 600px) {
    width: 100%;
  }
`;

export const LoveBtn = styled.button`
  cursor: pointer;
`;

export const LoveIcon = styled.img`
  object-fit: cover;
`;

export const Text = styled.p`
  color: #e3e3e3;
  font-size: 1rem;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;