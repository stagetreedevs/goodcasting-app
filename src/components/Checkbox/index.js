import React from 'react';

import {Container, Box} from './styles';

const Checkbox = ({children, selected, onChangeSelected, ...props}) => {
  return (
    <Container {...props}>
      <Box selected={selected} onPress={onChangeSelected} />
      {children}
    </Container>
  );
};

export default Checkbox;
