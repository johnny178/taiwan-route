import React from 'react';
import { Container, Icon, Logo } from './styles';
import IconSmall from '../../images/[平板]左上icon.png';
import IconMedium from '../../images/[平板]左上icon@2x.png';

const NavigationBar = () => {
  return (
    <Container>
      <Logo to='/'>
        <Icon src={IconSmall} srcSet={`${IconSmall} 1x, ${IconMedium} 2x`} />
      </Logo>
    </Container>
  );
};

export default NavigationBar;