import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {Container, PhotoButton, Photo} from './styles';

const ProfileAlbum = ({photos, artist, customCallback = null}) => {
  const navigation = useNavigation();

  const goToCarousel = index => {
    return navigation.navigate('ArtistCarousel', {
      initialIndex: index,
      photos,
      artist,
    });
  };

  return (
    <Container>
      {photos.map((photo, index) => (
        <PhotoButton
          key={photo.id}
          onPress={
            customCallback
              ? () => customCallback(photo)
              : () => goToCarousel(index)
          }>
          <Photo source={{uri: photo.image}} />
        </PhotoButton>
      ))}
    </Container>
  );
};

export default ProfileAlbum;
