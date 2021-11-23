import React from 'react';
import { BtnGrid, FilterCont, Icon, Input, ModeBtn, NumCont, Position, RouteBtn, RouteBtnCont, SearchBar, Wrapper } from './styles';
import LocalIconSmall from '../images/locol icon.png';
import LocalIconMedium from '../images/locol icon@2x.png';


const SearchBlock = () => {
  let route = ['紅', '橘', '黃', '綠', '藍', '棕', '幹線', '先導', '市民', '夜間', '貓空', '跳蛙', '內科', '南軟'];
  let route2 = ['小', 'F', 'R', 'T', '其他', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <Wrapper>
      <SearchBar>
        <Icon src={LocalIconSmall} srcSet={`${LocalIconSmall} 1x, ${LocalIconMedium} 2x`} />
        <Position>台北市</Position>
        <Input placeholder={'要搭哪輛公車呢？'} />
        <ModeBtn>倒退</ModeBtn>
      </SearchBar>
      <BtnGrid>
        {route.map((item, index) => (
          <RouteBtnCont key={index}>
            <RouteBtn>{item}</RouteBtn>
          </RouteBtnCont>
        ))}
      </BtnGrid>

      <NumCont>
        <BtnGrid hasNum={true}>
          {route2.map((item, index) => (
            <RouteBtnCont key={index}>
              <RouteBtn>{item}</RouteBtn>
            </RouteBtnCont>
          ))}
        </BtnGrid>
        <FilterCont>
          <ModeBtn>篩選</ModeBtn>
          <ModeBtn>我的收藏</ModeBtn>
          <ModeBtn>附近站牌</ModeBtn>
        </FilterCont>
      </NumCont>
    </Wrapper>
  );
};

export default SearchBlock;