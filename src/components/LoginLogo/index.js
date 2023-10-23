import React from 'react';

import {Container, GreenBar, Logo} from './styles';

import LogoImage from '../../../assets/images/logo.png';

const LoginLogo = ({...props}) => {
  return (
    <Container {...props}>
      <GreenBar top={0} left={0} />
      <GreenBar top={25} left={10} />
      <GreenBar top={42} left={-13} />
      <Logo source={LogoImage} />
    </Container>
  );
};

export default LoginLogo;
