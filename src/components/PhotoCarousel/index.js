import React, {useRef} from 'react';
import {Image, Dimensions, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {SingleImage} from 'react-native-zoom-lightbox';

const screen = Dimensions.get('screen');

const PhotoCarousel = ({photos}) => {
  const _carousel = useRef(null);
  const _photos_actived = photos
  const _renderItem = ({item, index}) => {
    return <SingleImage uri={item.image} style={styles.photo} key={item.id} />;
  };

  return (
    <Carousel
      loop
      autoplay
      ref={_carousel}
      data={_photos_actived}
      renderItem={_renderItem}
      sliderWidth={screen.width}
      itemWidth={200}
      lockScrollWhileSnapping={true}
      autoplayInterval={2000}
      style={{ overflow: 'visible' }}
    />
  );
};

const styles = StyleSheet.create({
  photo: {
    width: 200,
    height: 284,
    position: 'absolute',
    overflow: 'visible'
  },
});

export default PhotoCarousel;
