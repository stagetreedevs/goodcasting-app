import React from "react";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Choose, Container } from "./styles";

import HeaderWithLogo from "../../components/HeaderWithLogo";
import ProfileAlbum from "../../components/ProfileAlbum";
import Paragraph from "../../components/Paragraph";

import { useAuth } from "../../contexts/auth";
import { useModal } from "../../contexts/modal";
import HeaderWithMenu from "../../components/HeaderWithMenu";
import { ScrollView } from "native-base";
import { theme } from "../../constants/theme";

const ArtistProfilePhoto = ({ navigation }) => {
  const { user, updateArtistUser } = useAuth();
  const { t } = useTranslation("artistProfilePhoto");
  const { photos } = user;
  const { openModal } = useModal();

  const handleNewPhoto = () => {
    return navigation.pop();
  };

  const handleOpenModal = (image) => {
    return openModal("profilePhoto", {
      image,
      user,
      updateArtistUser,
      confirmOption: t('confirm'),
      rejectOption: t('cancel'),
      onConfirm: handleNewPhoto,
    });
  };

  return (
    <Container>
      <HeaderWithMenu withGoBack style={{
        marginBottom: 15,
      }}/>
      <Choose>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Paragraph style={styles.text} type="title">
            {t("choose")}
          </Paragraph>
          <ProfileAlbum
            photos={photos}
            customCallback={(photo) => handleOpenModal(photo)}
          />
        </ScrollView>
      </Choose>
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 19,
    color: theme.tagText
  },
  button: {
    marginTop: 32,
  },
});

export default ArtistProfilePhoto;
