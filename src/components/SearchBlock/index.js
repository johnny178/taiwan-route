import React, { useState } from 'react';
import { BtnGrid, ModeCont, Icon, Input, ModeBtn, NumCont, Position, RouteBtn, RouteBtnCont, SearchBar, Wrapper, PositionBtn, ClearBtn, InputCont } from './styles';
import FilterModal from '../FilterModal';

import { Mode, searchBlockData } from '../../constants';
import LocalIconSmall from '../../images/locol icon.png';
import LocalIconMedium from '../../images/locol icon@2x.png';
import { ReactComponent as Close } from '../../images/svg/ico-shut-down.svg';

const SearchBlock = ({ mode, setMode, searchValue, setSearchValue, region, setRegion }) => {
  const [isFilterPressed, setIsFilterPressed] = useState(false);

  const pressFavorite = () => {
    mode !== Mode.FAVORITE ? setMode(Mode.FAVORITE) : setMode(Mode.SEARCH);
  };

  const pressMode = () => {
    setSearchValue(prevSeachValue => prevSeachValue.slice(0, -1));
    setMode(Mode.SEARCH);
  };

  const pressRoute = e => {
    setSearchValue(prevSeachValue => prevSeachValue + e.target.innerText);
    setMode(Mode.SEARCH);
  };

  return (
    <Wrapper>
      {isFilterPressed && <FilterModal region={region} setRegion={setRegion} setIsFilterPressed={setIsFilterPressed} />}
      <SearchBar>
        <PositionBtn onClick={() => setIsFilterPressed(prevIsFilterPressed => !prevIsFilterPressed)}>
          <Icon src={LocalIconSmall} srcSet={`${LocalIconSmall} 1x, ${LocalIconMedium} 2x`} />
          <Position>{region}</Position>
        </PositionBtn>
        <InputCont>
          <Input
            placeholder={'要搭哪輛公車呢？'}
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
          <ClearBtn onClick={() => setSearchValue('')}>
            <Close />
          </ClearBtn>
        </InputCont>
        <ModeBtn onClick={pressMode}>倒退</ModeBtn>
      </SearchBar>
      <BtnGrid>
        {searchBlockData[0].map((item, index) => (
          <RouteBtnCont key={index}>
            <RouteBtn onClick={e => pressRoute(e)}>{item}</RouteBtn>
          </RouteBtnCont>
        ))}
      </BtnGrid>

      <NumCont>
        <BtnGrid hasNum={true}>
          {searchBlockData[1].map((item, index) => (
            <RouteBtnCont key={index}>
              <RouteBtn onClick={e => pressRoute(e)}>{item}</RouteBtn>
            </RouteBtnCont>
          ))}
        </BtnGrid>
        <ModeCont>
          <ModeBtn isFlex={true} onClick={() => setIsFilterPressed(prevIsFilterPressed => !prevIsFilterPressed)}>縣市篩選</ModeBtn>
          <ModeBtn isFlex={true} onClick={pressFavorite} isActive={mode === Mode.FAVORITE}>我的收藏</ModeBtn>
        </ModeCont>
      </NumCont>
    </Wrapper >
  );
};

export default SearchBlock;