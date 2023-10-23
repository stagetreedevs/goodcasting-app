import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  Container,
  ArtistButton,
  ArtistImage,
  SelectContainer,
} from "./styles";
import LoadingImage from "../../../assets/images/loader.gif";
import Paragraph from "../Paragraph";

import { theme } from "../../constants/theme";
import { Text } from "native-base";
import { getBriefingArtist } from "../../providers/artist";

const ArtistSelector = ({
  artist: { id, name, selected, image: artistImage },
  onSelectChange,
  onImagePress,
  ...props
}) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setImage(artistImage);
  }, []);
  
  async function getFail() {
    const artist = await getBriefingArtist(id)
    const photos = artist.photos.sort(() => Math.random() - 0.5)
    setImage(photos[0].image)
    console.log('visgula', photos[0].image);
  }
  return (
    <Container {...props}>
      <ArtistButton onPress={onImagePress}>
        <ArtistImage
          source={
            loading
              ? require("../../../assets/images/loader.gif")
              : { uri: image }
          }
          onError={getFail}
          onLoad={() => setLoading(false)}
          resizeMode={loading ? "contain" : "cover"}
        />
      </ArtistButton>
      <SelectContainer onPress={() => onSelectChange(id)}>
        <MaterialCommunityIcons
          style={styles.checkbox}
          name={selected ? "checkbox-marked" : "checkbox-blank-outline"}
          color={theme.primaryColor}
          size={20}
        />
        <Text
          fontFamily={"Karla-Regular"}
          fontSize={12}
          color={"#fff"}
          type="label"
          style={styles.label}
        >
          Modelo {name}
        </Text>
      </SelectContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  checkbox: {},
  label: {
    marginLeft: 5,
  },
});

export default ArtistSelector;
