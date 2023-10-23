import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video';

import First from '../../../assets/videos/intro_gd.mp4';
const {width, height} = Dimensions.get('window');

const VideoBackground = () => {
  const [selectedVideo, setSelectedVideo] = useState(First);

  return (
    <View style={styles.backgroundVideo}>
      <Video
        source={selectedVideo}
        style={styles.backgroundVideo}
        muted={false}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        onError={algo => console.log(algo)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
});

export default VideoBackground;
