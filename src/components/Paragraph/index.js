import React from 'react';
import {Container, Required} from './styles';

const fontSizes = {
  title: '28px',
  label: '14px',
  subtitle: '18px',
  normal: '16px',
  small: '12px',
  mini: '10px',
};

const fontWeights = {
  title: 'bold',
  label: '400',
  subtitle: '500',
  normal: '400',
  small: '300',
  mini: '300',
};

const Paragraph = ({
  children,
  type = 'normal',
  alignment = 'left',
  required,
  muted,
  ...props
}) => {
  return (
    <Container
      muted={muted}
      fontSize={fontSizes[type]}
      fontWeight={fontWeights[type]}
      alignment={alignment}
      {...props}>
      {children} {required && <Required>*</Required>}
    </Container>
  );
};

export default Paragraph;
