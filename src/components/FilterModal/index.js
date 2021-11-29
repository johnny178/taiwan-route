/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { arrCountryName } from '../../constants';
import { BackBtn, ColorWrapper, Container, OptionCont, RadioBtn, RadioCont, RegionName, Wrapper } from './styles';

const FilterModal = ({ region, setRegion, setIsFilterPressed }) => {
  return ReactDOM.createPortal(
    <ColorWrapper>
      <Container >
        <Wrapper>
          <RadioCont>
            {
              arrCountryName.map((item, index) => {
                return (
                  <OptionCont key={index}>
                    <RadioBtn
                      type='radio'
                      id={item}
                      name={item}
                      value={item}
                      checked={region === item}
                      onChange={e => setRegion(e.target.value)}
                    />
                    <RegionName htmlFor={item}>{item}</RegionName>
                  </OptionCont>
                );
              })
            }
          </RadioCont>
          <BackBtn onClick={() => setIsFilterPressed(prevIsFilterPressed => !prevIsFilterPressed)}>確定</BackBtn>
        </Wrapper>
      </Container>
    </ColorWrapper>
    , document.getElementById('modal')
  );
};

export default FilterModal;