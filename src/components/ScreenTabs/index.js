import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Tab} from './styles';

import Paragraph from '../Paragraph';
import {theme} from '../../constants/theme';

const ScreenTabs = ({onChangeTab, selected, tabs}) => {
  const width = (100/tabs.length) - 2;
  return (
    <Container>
      {tabs.map(tab => (
        <Tab
          key={tab.id}
          active={selected === tab.id}
          onPress={() => onChangeTab(tab.id)}
          width={width}>
          <Paragraph style={styles.textColor} type="small">
            {tab.name}
          </Paragraph>
        </Tab>
      ))}
    </Container>
  );
};

const styles = StyleSheet.create({
  textColor: {
    color: '#4E4B6C',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default ScreenTabs;
