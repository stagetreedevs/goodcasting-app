import React, {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Container, PhotoContainer, Photo} from './styles';

import HeaderWithLogo from '../../components/HeaderWithLogo';
import Paragraph from '../../components/Paragraph';

import {theme} from '../../constants/theme';

const ArtistCarousel = ({route}) => {
  const {initialIndex, photos, artist} = route.params;
  const {name, nick_name, id} = artist;
  const {t} = useTranslation('artistProfile');
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => {
    const artistImages = photos.map(photo => (
      <Photo source={{uri: photo.image}} />
    ));

    setImages(artistImages);
    setCurrentIndex(initialIndex ? initialIndex : 0);
  };

  const currentImage = () => images[currentIndex];

  const handleGoBack = () => {
    if (currentIndex - 1 < 0) {
      return setCurrentIndex(images.length - 1);
    } else {
      return setCurrentIndex(currentIndex - 1);
    }
  };

  const handleGoForward = () => {
    if (currentIndex + 1 > images.length - 1) {
      return setCurrentIndex(0);
    } else {
      return setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <Container>
      <HeaderWithLogo withGoBack />
      <Paragraph type="title">{name}</Paragraph>
      <Paragraph>
        {t('model')} - {nick_name || id}
      </Paragraph>
      <PhotoContainer>
        <TouchableOpacity onPress={handleGoBack} style={styles.button}>
          <MaterialIcons
            name="arrow-back-ios"
            color={theme.inputBorderColor}
            size={40}
          />
        </TouchableOpacity>
        {currentImage()}
        <TouchableOpacity onPress={handleGoForward} style={styles.button}>
          <MaterialIcons
            name="arrow-forward-ios"
            color={theme.inputBorderColor}
            size={40}
          />
        </TouchableOpacity>
      </PhotoContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
  },
});

export default ArtistCarousel;
