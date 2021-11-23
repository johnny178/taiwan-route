import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3% 5%;
  background-color: rgba(255, 255, 255, .31);
  border: 1px solid #707070;
  border-radius: 10px;

  @media (min-width: 768px) {
    width: 658px;
    height: 455px;
    padding: 29px 27px;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 7vw;

  @media (min-width: 768px) {
    height: 48px;
  }
`;

export const Icon = styled.img`
  height: 1rem;
  object-fit: contain;
  margin-right: 3.5px;

  @media (min-width: 768px) {
    margin-left: 30px;
  }
`;

export const Position = styled.p`
  font-size: 1rem;
  letter-spacing: 0.26px;
  color: #E3E3E3;
  white-space: nowrap;
  

  @media (min-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const Input = styled.input`
  flex: 1;
  min-width: 10%;
  box-shadow: -1px 1px 3px #FFFFFF;
  border: 1px solid #FFFFFF;
  margin-left: 4%;
  margin-right: 3%;
  border-radius: 8px;
  height: 100%;
  font-size: 0.8rem;

  &::placeholder {
    color: #E3E3E3;
    text-indent: 5px;
  }

  @media (min-width: 768px) {
    margin-left: 51px;
    margin-right: 21px;
    width: 244px;
    flex: none;
  }
`;

export const ModeBtn = styled.button`
  /* width: 74px; */
  aspect-ratio: 74 / 25;
  height: 100%;
  background-color: #E3E3E3;
  border-radius: 8px;
  text-align: center;
  font-size: 0.8rem;
  line-height: 25px;

  &:not(:last-child) {
    margin-right: 3vw;
  }

  @media (min-width: 768px) {
    width: 157px;
    height: 49px;
    border-radius: 15px;

    &:not(:last-child) {
      margin-right: 0px;
      margin-bottom: 19px;
    }
  }
`;

export const NumCont = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const BtnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5,minmax(46px, 1fr));
  grid-gap: 3vw;
  width: 100%;
  margin-top: 15px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(7, 69px);
    grid-template-columns: ${({ hasNum }) => hasNum ? 'repeat(5, 69px)' : 'repeat(7,69px)'};
    grid-gap: 20px;
    margin-top: 19px;
  }
`;

export const RouteBtnCont = styled.div`
  position: relative;
  padding-top: 70%;

  @media (min-width: 768px) {
    padding-top: 0px;
    width: 69px;
    height: 48px;
  }
`;

export const RouteBtn = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #E3E3E3;
  border-radius: 10px;
  font-size: 1rem;
  text-align: center;
  color: #E3E3E3;

  @media (min-width: 768px) {
    border-radius: 15px;
  }
`;

export const FilterCont = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 3vw;
  height: 7vw;

  @media (min-width: 768px) {
    flex-direction: column;
    height: auto;
    margin-left: 21px;
    margin-top: 19px;
  }
`;