/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import {Container, MarkerContainer, Marker} from './styles';

import Paragraph from '../Paragraph';
import Divider from '../Divider';

import {theme} from '../../constants/theme';

const Slider = ({
  slider: {range, title},
  selected,
  onValueChange,
  suffixToRange,
  ...props
}) => {

  const [screen, setScreen] = useState(Dimensions.get('screen'));

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setScreen(Dimensions.get('screen'));
    });

    return () => {
      Dimensions.removeEventListener('change');
    };
  }, []);

  const handleChangeValue = values => {
    onValueChange(values);
  };

  const handleCustomLabel = ({twoMarkerLeftPosition, twoMarkerValue, oneMarkerLeftPosition, oneMarkerValue}) => {
    let oneLeftValue = oneMarkerLeftPosition;
    let twoLeftValue = twoMarkerLeftPosition;
    let twoTopValue = 25;

    if(suffixToRange){
      if(oneLeftValue > 30){
        oneLeftValue -= 5;
      }
      if(twoLeftValue > 30){
        twoLeftValue -= 5;
      }
    }

    if(twoMarkerLeftPosition - oneMarkerLeftPosition < 25){
      twoTopValue = 35;
    }

    return (
      <>
        <Paragraph 
          style={{left:oneLeftValue, top: 37, color: '#fff'}}
          type="mini">
          {oneMarkerValue}{suffixToRange ? suffixToRange : ''}
        </Paragraph>
        <Paragraph 
          style={{left:twoLeftValue, top: twoTopValue, color: '#fff'}}
          type="mini">
          {twoMarkerValue}{suffixToRange ? suffixToRange : ''}
        </Paragraph>
      </>
    );
  };

  const calcSliderLength = () => {
    const length = screen.width - Math.floor((screen.width/10) * 2) - 10;
    return length;
  };

  return (
    <Container {...props}>
      <Paragraph type="subtitle" style={styles.subtitle}>
        {title}
      </Paragraph>
      <Divider style={styles.divider} />
      <Paragraph type="mini" style={styles.range}>{`${range[0]}${
        suffixToRange ? suffixToRange : ''
      } - ${range[1]}${suffixToRange ? suffixToRange : ''}`}</Paragraph>
      <MultiSlider
        sliderLength={calcSliderLength()}
        min={range[0]}
        max={range[1]}
        step={1}
        values={selected}
        onValuesChange={handleChangeValue}
        containerStyle={styles.sliderContainer}
        selectedStyle={styles.sliderSelected}
        customMarker={() => (
          <MarkerContainer>
            <Marker hitSlop={{top: 44, bottom: 44, left: 44, right: 44}} />
          </MarkerContainer>
        )}
        enableLabel
        customLabel={handleCustomLabel}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    marginBottom: 4,
    color: '#fff'
  },
  divider: {
    marginBottom: 4,
  },
  range: {
    marginBottom: 4,
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 8,
    height: 10,
    marginBottom: 8,
  },
  sliderSelected: {
    backgroundColor: theme.primaryColor,
  },
  markerLabel: {
    top: 25,
  },
  infoValue: {
    marginTop: 5,
  },
});

export default Slider;
