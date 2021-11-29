/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { arrCountryName } from '../../constants';
import { BackBtn, ColorWrapper, Container, OptionCont, RadioBtn, RadioCont, RegionName, Wrapper } from './styles';

const FilterModal = ({ region, setRegion, setIsFilterPressed }) => {
  const [searchRegion, setSearchRegion] = useState(region);

  const onBtnPressed = () => {
    setIsFilterPressed(prevIsFilterPressed => !prevIsFilterPressed);
    setRegion(searchRegion);
  };

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
                      checked={searchRegion === item}
                      onChange={e => setSearchRegion(e.target.value)}
                    />
                    <RegionName htmlFor={item}>{item}</RegionName>
                  </OptionCont>
                );
              })
            }
          </RadioCont>
          <BackBtn onClick={onBtnPressed}>確定</BackBtn>
        </Wrapper>
      </Container>
    </ColorWrapper>
    , document.getElementById('modal')
  );
};

export default FilterModal;