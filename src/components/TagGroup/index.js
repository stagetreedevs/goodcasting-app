import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {Container, TagsContainer, TagContainer, TagText} from './styles';
import { Text } from 'native-base';
import Paragraph from '../Paragraph';
import Divider from '../Divider';

export const Tag = ({selected, textStyle, children, ...props}) => {
  return (
    <TagContainer selected={selected} {...props}>
      <TagText style={textStyle} selected={selected}>
        {children}
      </TagText>
    </TagContainer>
  );
};

const TagGroup = ({group, onChange, ...props}) => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    setTags(group.tags);
    setSelectedTag(group.selected);
  }, [group]);

  const isTagSelected = id => {
    if (selectedTag === id) {
      return true;
    }

    return false;
  };

  const handleSelectTag = id => {
    if (selectedTag === id) {
      setSelectedTag(null);
      onChange(null);
    } else {
      setSelectedTag(id);
      onChange(id);
    }
  };

  return (
    <Container {...props}>
      <Text type="subtitle" fontFamily={'Karla-Bold'} style={styles.subtitle}>
        {group.title}
      </Text>
      <Divider style={styles.divider} />
      <TagsContainer>
        {tags.map(tag => (
          <Tag
            onPress={() => handleSelectTag(tag.id)}
            style={styles.tag}
            key={tag.id}
            selected={isTagSelected(tag.id)}>
            {tag.value}
          </Tag>
        ))}
      </TagsContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    marginBottom: 4,
    color: '#fff'
  },
  divider: {
    marginBottom: 15,
  },
  tag: {
    marginRight: 8,
    marginBottom: 10,
  },
});

export default TagGroup;
