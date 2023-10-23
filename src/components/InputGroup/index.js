import React from 'react';
import {Container} from './styles';

const InputGroup = ({children, ...props}) => {
  return <Container {...props}>{children}</Container>;
};

export default InputGroup;
