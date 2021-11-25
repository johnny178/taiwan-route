import React, { useState } from 'react';
import { BtnGrid, ModeCont, Icon, Input, ModeBtn, NumCont, Position, RouteBtn, RouteBtnCont, SearchBar, Wrapper } from './styles';
import LocalIconSmall from '../../images/locol icon.png';
import LocalIconMedium from '../../images/locol icon@2x.png';
import { Mode } from '../../constants';
import FilterModal from '../FilterModal';

const SearchBlock = ({ mode, setMode, searchValue, setSearchValue, region, setRegion }) => {
  let route = ['紅', '橘', '黃', '綠', '藍', '棕', '幹線', '先導', '市民', '夜間', '貓空', '跳蛙', '內科', '南軟'];
  let route2 = ['小', 'F', 'R', 'T', '其他', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  const [isFilterPressed, setIsFilterPressed] = useState(false);

  const pressFavorite = () => {
    setMode(Mode.FAVORITE);
  };

  const pressNearby = () => {
    setMode(Mode.NEARBY);
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
        <Icon src={LocalIconSmall} srcSet={`${LocalIconSmall} 1x, ${LocalIconMedium} 2x`} />
        <Position>{region}</Position>
        <Input
          placeholder={'要搭哪輛公車呢？'}
          inputMode={'none'}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <ModeBtn onClick={pressMode}>倒退</ModeBtn>
      </SearchBar>
      <BtnGrid>
        {route.map((item, index) => (
          <RouteBtnCont key={index}>
            <RouteBtn onClick={e => pressRoute(e)}>{item}</RouteBtn>
          </RouteBtnCont>
        ))}
      </BtnGrid>

      <NumCont>
        <BtnGrid hasNum={true}>
          {route2.map((item, index) => (
            <RouteBtnCont key={index}>
              <RouteBtn onClick={e => pressRoute(e)}>{item}</RouteBtn>
            </RouteBtnCont>
          ))}
        </BtnGrid>
        <ModeCont>
          <ModeBtn onClick={() => setIsFilterPressed(prevIsFilterPressed => !prevIsFilterPressed)}>篩選</ModeBtn>
          <ModeBtn onClick={pressFavorite} isActive={mode === Mode.FAVORITE}>我的收藏</ModeBtn>
          <ModeBtn onClick={pressNearby} isActive={mode === Mode.NEARBY}>附近站牌</ModeBtn>
        </ModeCont>
      </NumCont>
    </Wrapper >
  );
};

export default SearchBlock;