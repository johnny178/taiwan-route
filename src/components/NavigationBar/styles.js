import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(NavLink)``;

export const Icon = styled.img`
  object-fit: cover;
  width: 30vw;
  
  @media (min-width: 600px) {
    width: 100%;
  }
`;

export const LoveBtn = styled.button`
  cursor: pointer;
`;

export const LoveIcon = styled.img`
  object-fit: cover;
  transform: scale(0.8);
`;

export const Text = styled.p`
  display: flex;
  align-items: center;
  position: absolute;
  color: #e3e3e3;
  font-size: 1rem;
  left: 45%;
  height: 100%;
  font-weight: 700;
`;