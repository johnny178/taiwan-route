import React from 'react';
import ReactDOM from 'react-dom';
import { arrCountryName } from '../../constants';
import { ColorWrapper, Container, RadioBtn, RadioCont, RegionName, Wrapper } from './styles';

const FilterModal = () => {
  return ReactDOM.createPortal(
    <ColorWrapper>
      <Container >
        <Wrapper>
          <RadioCont>
            {
              arrCountryName.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <RadioBtn type='radio' id={item} name={item} value={item} />
                    <RegionName for={item} >{item}</RegionName>
                  </React.Fragment>
                );
              })
            }
          </RadioCont>
        </Wrapper>
      </Container>
    </ColorWrapper>
    , document.getElementById('modal')
  );
};

export default FilterModal;