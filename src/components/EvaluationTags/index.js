import React, {useState, useEffect} from 'react';
import Snackbar from '../Snackbar';
import {Container, TagButton, TagText} from './styles';

import {useAuth} from '../../contexts/auth';
import {useModal} from '../../contexts/modal';
import {getTags} from '../../providers/jobs';

const EvaluationTags = ({selectedTags, handleChangeValue, ...props}) => {
  const {user} = useAuth();
  const {openModal} = useModal();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getEvaluationTags();
  }, []);

  const getEvaluationTags = async () => {
    try {
      const result = await getTags(user.token);
      setTags(result);
    } catch (err) {
      return Snackbar.show({
        text: 'Ocorreu um erro ao tentar buscar as tags',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const handleChange = id => {
    let newTags;
    if (selectedTags.includes(id)) {
      newTags = selectedTags.filter(tag => tag !== id);
    } else {
      newTags = [...selectedTags, id];
    }

    handleChangeValue(newTags);
  };

  return (
    <Container {...props}>
      {tags.map((tag, index) => (
        <TagButton
          onPress={() => handleChange(tag.id)}
          selected={selectedTags.includes(tag.id)}
          key={index}>
          <TagText>{tag.name}</TagText>
        </TagButton>
      ))}
    </Container>
  );
};

export default EvaluationTags;
