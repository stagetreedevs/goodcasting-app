import React from 'react';
import {Container, Button, Icon} from './styles';

const EvaluationStars = ({stars = 0, handleChangeStars, ...props}) => {
  return (
    <Container {...props}>
      <Button onPress={() => handleChangeStars(1)}>
        <Icon
          active={stars >= 1}
          name={stars >= 1 ? 'star' : 'staro'}
          size={28}
        />
      </Button>
      <Button onPress={() => handleChangeStars(2)}>
        <Icon
          active={stars >= 2}
          name={stars >= 2 ? 'star' : 'staro'}
          size={28}
        />
      </Button>
      <Button onPress={() => handleChangeStars(3)}>
        <Icon
          active={stars >= 3}
          name={stars >= 3 ? 'star' : 'staro'}
          size={28}
        />
      </Button>
      <Button onPress={() => handleChangeStars(4)}>
        <Icon
          active={stars >= 4}
          name={stars >= 4 ? 'star' : 'staro'}
          size={28}
        />
      </Button>
      <Button onPress={() => handleChangeStars(5)}>
        <Icon
          active={stars >= 5}
          name={stars >= 5 ? 'star' : 'staro'}
          size={28}
        />
      </Button>
    </Container>
  );
};

export default EvaluationStars;
