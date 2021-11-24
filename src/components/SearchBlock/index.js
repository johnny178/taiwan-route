import React, { useState } from 'react';
import { BtnGrid, FilterCont, Icon, Input, ModeBtn, NumCont, Position, RouteBtn, RouteBtnCont, SearchBar, Wrapper } from './styles';
import LocalIconSmall from '../../images/locol icon.png';
import LocalIconMedium from '../../images/locol icon@2x.png';
import { Mode } from '../../constants';


const SearchBlock = ({ mode, setMode, searchRoutes, searchNearbyRoutes }) => {
  const [searchValue, setSearchValue] = useState('');

  let route = ['紅', '橘', '黃', '綠', '藍', '棕', '幹線', '先導', '市民', '夜間', '貓空', '跳蛙', '內科', '南軟'];
  let route2 = ['小', 'F', 'R', 'T', '其他', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  const searchHandler = () => {
    searchRoutes(searchValue);
    setMode(Mode.SEARCH);
  };

  const pressFavorite = () => {
    setMode(Mode.FAVORITE);
  };

  const pressNearby = () => {
    searchNearbyRoutes();
    setMode(Mode.NEARBY);
  };

  return (
    <Wrapper>
      <SearchBar>
        <Icon src={LocalIconSmall} srcSet={`${LocalIconSmall} 1x, ${LocalIconMedium} 2x`} />
        <Position>台北市</Position>
        <Input
          placeholder={'要搭哪輛公車呢？'}
          inputMode={'none'}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <ModeBtn onClick={() => setSearchValue(prevSeachValue => prevSeachValue.slice(0, -1))}>倒退</ModeBtn>
      </SearchBar>
      <BtnGrid>
        {route.map((item, index) => (
          <RouteBtnCont key={index}>
            <RouteBtn onClick={e => setSearchValue(prevSeachValue => prevSeachValue + e.target.innerText)}>{item}</RouteBtn>
          </RouteBtnCont>
        ))}
      </BtnGrid>

      <NumCont>
        <BtnGrid hasNum={true}>
          {route2.map((item, index) => (
            <RouteBtnCont key={index}>
              <RouteBtn onClick={e => setSearchValue(prevSeachValue => prevSeachValue + e.target.innerText)}>{item}</RouteBtn>
            </RouteBtnCont>
          ))}
        </BtnGrid>
        <FilterCont>
          <ModeBtn onClick={searchHandler}>搜尋</ModeBtn>
          <ModeBtn onClick={pressFavorite} isActive={mode === Mode.FAVORITE}>我的收藏</ModeBtn>
          <ModeBtn onClick={pressNearby} isActive={mode === Mode.NEARBY}>附近站牌</ModeBtn>
        </FilterCont>
      </NumCont>
    </Wrapper >
  );
};

export default SearchBlock;