import React, { useCallback } from "react";
import { View, Image, TouchableOpacity, FlatList } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

import Paragraph from "../../components/Paragraph";

const VideoAndroidComponent = ({ listVideos, headerComponent }) => {
  const formatUrl = (uri) => {
    if (uri.includes("youtube")) {
      const index = uri.indexOf("v=");
      const id = uri.substring(index + 2);
      return id;
    } else if (uri.includes("youtu.be")) {
      const url = uri.split("/");
      return url;
    } else {
      let url = `?v=${uri}`;

      let regex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
      while ((match = regex.exec(url))) {
        params[match[1]] = match[2];
      }
      return params.v;
    }
  };

  const _renderVideoCard = (item, index) => {
    const { title, subtitle, link } = item;
    return (
      <View
        style={{
          width: "100%",
        }}
      >
        <View
          style={{
            marginLeft: 18,
            marginBottom: 8
          }}
        >
          <Paragraph
            style={{
              color: "#fff",
            }}
          >
            {title}
          </Paragraph>
          <Paragraph
            type="small"
            style={{
              color: "#fff",
            }}
          >
            {subtitle ? subtitle : ""}
          </Paragraph>
        </View>
        <YoutubePlayer
        height={300}
        videoId={formatUrl(link)}
      />
      </View>
    );
  };

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <FlatList
        data={listVideos}
        keyExtractor={keyExtractor}
        renderItem={({ item, index }) => _renderVideoCard(item, index)}
        ListHeaderComponent={headerComponent}
        ListHeaderComponentStyle={{
          width: "100%",
        }}
      />
    </View>
  );
};

export default VideoAndroidComponent;

const styles = {
  title: {
    marginLeft: 12,
  },
};
