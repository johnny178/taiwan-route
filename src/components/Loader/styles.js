import styled from 'styled-components/macro';

export const Container = styled.div`
  border: 12px solid rgba(140, 113, 173, 0.22);
  border-top: 12px solid rgba(140, 113, 173);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
  margin: 10% auto 0;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
