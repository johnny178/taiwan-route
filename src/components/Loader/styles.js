import styled from 'styled-components/macro';

export const Container = styled.div`
  border: 12px solid #f3f3f3; /* Light grey */
  border-top: 12px solid #B2E4FF; /* Blue */
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
