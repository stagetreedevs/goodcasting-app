import React, { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import YouTube from "react-native-youtube";
import { Container } from "./styles";

import Paragraph from "../Paragraph";
import { StyleSheet } from "react-native";
import { Text, VStack } from "native-base";

const VideoCard = ({ title, subtitle, uri, ...props }) => {
  const [videoId, setVideoId] = useState(uri);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    formatUrl();
  }, []);

  const formatUrl = () => {
    if (uri.includes("youtube")) {
      const index = uri.indexOf("v=");
      const id = uri.substring(index + 2);
      setVideoId(id);
    } else if (uri.includes("youtu.be")) {
      const url = uri.split("/");
      setVideoId(url[url.length - 1]);
    } else {
      let url = `?v=${uri}`;

      let regex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
      while ((match = regex.exec(url))) {
        params[match[1]] = match[2];
      }
      setVideoId(params.v);
    }
  };

  return (
    <Container {...props}>
      <VStack paddingLeft={6}>
        <Text
          style={{
            color: "#fff",
            marginTop: 8,
          }}
        >
          {title}
        </Text>
        <Text
          type="small"
          style={{
            color: "#fff",
            marginBottom: 8,
          }}
        >
          {subtitle ? subtitle : ""}
        </Text>
      </VStack>
      <YouTube
        apiKey="AIzaSyCItpJd2GU7l9epS2fZ9bsGMbDFy8Juw2o"
        videoId={videoId}
        play={false}
        fullscreen={false}
        loop={false}
        rel={false}
        ref={videoRef}
        onReady={() => {
          if (Platform.OS === "ios") {
            videoRef.current.reloadIframe();
          }
        }}
        style={{ aspectRatio: 16 / 9 }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    width: "100%",
    height: 100,
  },
});

export default React.memo(VideoCard);
