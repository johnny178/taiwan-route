import React from 'react';
import ReactDOM from 'react-dom';
import { arrCountryName } from '../../constants';
import { BackBtn, ColorWrapper, Container, OptionCont, RadioBtn, RadioCont, RegionName, RightCont, TaiwanImage, Wrapper } from './styles';

import TaiwanSmall from '../../images/[PC]篩選縣市.png';
import TaiwanMedium from '../../images/[PC]篩選縣市@2x.png';

const FilterModal = ({ region, setRegion, setIsFilterPressed }) => {
  return ReactDOM.createPortal(
    <ColorWrapper>
      <Container >
        <Wrapper>
          <TaiwanImage src={TaiwanSmall} srcSet={`${TaiwanSmall} 1x,${TaiwanMedium} 2x`} />
          <RightCont>
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
          </RightCont>
        </Wrapper>
      </Container>
    </ColorWrapper>
    , document.getElementById('modal')
  );
};

export default FilterModal;