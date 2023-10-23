import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  PhotoContainer,
  Photo,
  ChoosePhotoButton,
  Information,
} from "./styles";

import Paragraph from "../Paragraph";

import { useAuth } from "../../contexts/auth";
import { theme } from "../../constants/theme";

const ArtistProfileHeader = ({ ...props }) => {
  const navigation = useNavigation();
  const {
    user: { name, image: artistImage },
  } = useAuth();
  const [image, setImage] = useState("");

  useEffect(() => {
    setImage(artistImage);
  }, [artistImage]);

  const handleChooseProfilePhoto = () => {
    return navigation.navigate("ProfilePhoto");
  };

  return (
    <Container {...props}>
      <PhotoContainer>
        <Photo source={{ uri: image }} />
        <ChoosePhotoButton onPress={handleChooseProfilePhoto}>
          <Ionicons name="camera" size={28} color={theme.primaryTextColor} />
        </ChoosePhotoButton>
      </PhotoContainer>
      <Information>
        <Paragraph type="title" style={{
          color: 'white'
        }} alignment="center">
          {name}
        </Paragraph>
      </Information>
    </Container>
  );
};

export default ArtistProfileHeader;
