import React, { useState, useEffect } from "react";
import { StyleSheet, Linking, Platform, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import {
  Container,
  Header,
  HeaderInformation,
  MessageButton,
  TagContainer,
  ProfileImage,
  PhotoContainer,
  ProfileInformation,
  InformationTable,
  InformationColumn,
  InformationRow,
  SocialInformation,
  SocialRow,
  SocialButton,
  Buttom,
  ButtomContainer,
  ChoosePhotoButton,
} from "./styles";

import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import HeaderWithLogo from "../../components/HeaderWithLogo";
import Snackbar from "../../components/Snackbar";
import HeaderWithMenu from "../../components/HeaderWithMenu";
import Paragraph from "../../components/Paragraph";
// import Divider from '../../components/Divider';
// import ProfileAlbum from '../../components/ProfileAlbum';
import PhotoCarousel from "../../components/PhotoCarousel";
import ArtistProfileHeader from "../../components/ArtistProfileHeader";
import { Tag } from "../../components/TagGroup";

import { useAuth } from "../../contexts/auth";
import { theme } from "../../constants/theme";
import { calcAge } from "../../helpers";

import { getArtist, getBriefingArtist } from "../../providers/artist";
import { ScrollView, Text, VStack, Link, HStack, Divider } from "native-base";
import LinearGradient from "react-native-linear-gradient";

const ArtistProfile = ({ route, navigation }) => {
  const { user } = useAuth();
  const { t } = useTranslation("artistProfile");

  const hideName = route.params ? route.params.hideName : false;
  const showArtistHeader = route.name === "Profile" && user.type === "Artista";
  const [photos, setPhotos] = useState([]);
  const [artist, setArtist] = useState(
    user ? (user.type === "Artista" ? user : null) : null
  );
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [rejected, setRejected] = useState();
  const [number, setNumber] = useState();
if(user){
  useEffect(() => {
    setImage(user.image);
  }, [user.image]);
  
  useEffect(() => {
    if (showArtistHeader) {
      setImage(user.image);
      console.log(user);
    }
  }, [showArtistHeader, user]);
}

  useEffect(() => {
    if (route.params) {
      console.log('Params ' + JSON.stringify(route.params));
      setNumber(route.params.number);
      if (route.params.profile) {
        setArtist(route.params.profile);
        let artistImage = route.params.profile.image;
        setImage(artistImage);
        setRejected(route.params.rejected);
      } else {
        setArtist(user ? (user.type === "Artista" ? user : null) : null);
      }
    }
  }, [route]);

  useEffect(() => {
    if (user && user.type === "Artista") {
      setPhotos(user.photos);
    } else {
      if (artist) {
        getArtistPhotos();
      }
    }
  }, [artist]);

  const getArtistPhotos = async () => {
    try {
      let result;
      if (user && user.token) {
        result = await getArtist(artist.id, user.token);
      } else {
        result = await getBriefingArtist(artist.id);
      }
      console.log('fotos =>'+ result.photos[0].image);
      setPhotos(result.photos);
    } catch (err) {
      return Snackbar.show({
        text: t("photoError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const dialCall = (phoneNumber) => {
    if (Platform.OS === "android") {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(phoneNumber);
  };

  const openInstagram = (instaUser) => {
    const insta = instaUser.replace("@", "");
    Linking.openURL(`instagram://user?username=${insta}`).catch(() => {
      Linking.openURL(`https://www.instagram.com/${insta}`);
    });
  };

  const openMail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };
  const handleChooseProfilePhoto = () => {
    return navigation.navigate("ProfilePhoto");
  };

  const customGoBack = () => {
    setPhotos([]);
    setArtist(null);
    navigation.goBack();
  };
  const select = (accept) => {
    if (accept) {
      route.params.acceptArtist();
      navigation.goBack()
    } else {
      route.params.declineArtist();
      navigation.goBack()
    }
  };
  return (
    <Container>
      {!showArtistHeader ? (
        <HeaderWithMenu customGoBack={customGoBack} style={styles.header} />
      ) : (
        <HeaderWithMenu style={styles.header} />
      )}
      {artist && (
        <VStack flex={1}>
          {showArtistHeader ? (
            <PhotoContainer>
              <ProfileImage source={{ uri: `${image}?${new Date()}` }} />
              <ChoosePhotoButton onPress={handleChooseProfilePhoto}>
                <Ionicons
                  name="camera"
                  size={28}
                  color={theme.primaryTextColor}
                />
              </ChoosePhotoButton>
            </PhotoContainer>
          ) : (
            <PhotoContainer>
              <ProfileImage source={{ uri: image }} resizeMode="cover" />
            </PhotoContainer>
          )}
        <VStack backgroundColor={"#232131"}
            flex={1}
            borderTopLeftRadius={16}
            borderTopRightRadius={16}>
          <ScrollView
            marginTop={20}
            borderTopLeftRadius={16}
            borderTopRightRadius={16}
          >
            
              <Header>
                <HeaderInformation>
                  <MessageButton
                    >
                    {!hideName && user.type == "Cliente" &&
                    <LinearGradient
                      colors={["#60FFB2", "#21A64E"]}
                      useAngle={true}
                      angle={220}
                      //angleCenter
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Link href={`https://wa.me/${number}?text=Oi`}>
                        <FontAwesome
                          name="whatsapp"
                          size={22}
                          color={theme.tagText}
                        />
                      </Link>
                    </LinearGradient>
                  }
                  </MessageButton>
                  <VStack alignItems={"center"} pt={"2.5%"}>
                    <Text
                      color={theme.tagText}
                      style={styles.name}
                      fontSize={16}
                      fontWeight="bold"
                      alignment="center"
                    >
                      {hideName
                        ? `${t("model")} - ${
                            artist.nick_name ? artist.nick_name : ""
                          }`
                        : artist.name}
                    </Text>
                    {!hideName && (
                      <Text
                        color={theme.tagText}
                        style={styles.model}
                        fontSize={12}
                        alignment="center"
                      >
                        {t("model")} -{" "}
                        {artist.nick_name ? artist.nick_name : ""}
                      </Text>
                    )}
                  </VStack>
                  <MessageButton></MessageButton>

                  {false && (
                    <TagContainer>
                      <Tag style={styles.tag} textStyle={styles.tagText}>
                        Pontual
                      </Tag>
                      <Tag style={styles.tag} textStyle={styles.tagText}>
                        Comprometido
                      </Tag>
                    </TagContainer>
                  )}
                </HeaderInformation>
              </Header>
            
            <VStack pb={"40%"} pt="5%">
              <VStack h={300}>
                <PhotoCarousel photos={photos} />
              </VStack>

              {!hideName && (
                <SocialInformation>
                  <SocialRow>
                    <SocialButton onPress={() => openMail(artist.email)}>
                      <Ionicons
                        style={styles.socialIcon}
                        name="mail"
                        color={theme.inputBorderColor}
                        size={12}
                      />

                      <Text color="#34B899">
                        {user && user.type === "Artista"
                          ? user.email
                          : artist.email}
                      </Text>
                    </SocialButton>

                    <SocialButton
                      rigth
                      onPress={() =>
                        dialCall(
                          user && user.type === "Artista"
                            ? user.phone
                            : artist.phone
                        )
                      }
                    >
                      <Ionicons
                        style={styles.socialIcon}
                        name="logo-whatsapp"
                        color={theme.inputBorderColor}
                        size={12}
                      />

                      <Text color="#34B899">
                        {
                          user && user.type === "Artista"
                            ? user.phone_prefix
                            : artist.phone_prefix
                        }{" "}
                        {user && user.type === "Artista"
                          ? user.phone
                              .replace("(", "")
                              .replace(")", "")
                              .replace(" ", "")
                              .replace("-", "")
                          : artist.phone
                              .replace("(", "")
                              .replace(")", "")
                              .replace(" ", "")
                              .replace("-", "")}
                      </Text>
                    </SocialButton>
                  </SocialRow>
                  <SocialRow>
                    <SocialButton
                      onPress={() => openInstagram(artist.instagram)}
                    >
                      <Ionicons
                        style={styles.socialIcon}
                        name="logo-instagram"
                        color={theme.inputBorderColor}
                        size={12}
                      />
                      <Text color="#34B899">
                        {user && user.type === "Artista"
                          ? user.instagram
                          : artist.instagram}
                      </Text>
                    </SocialButton>
                    <SocialButton rigth>
                      <Ionicons
                        style={styles.socialIcon}
                        name="location-outline"
                        color={theme.inputBorderColor}
                        size={12}
                      />
                      <Text color="#34B899">
                        {user && user.type === "Artista"
                          ? user.address_city
                          : artist.address_city}
                      </Text>
                    </SocialButton>
                  </SocialRow>
                  {user.type === "Artista" && (
                    <SocialRow>
                      <SocialButton>
                        <FontAwesome
                          style={styles.socialIcon}
                          name="dollar"
                          color={theme.inputBorderColor}
                          size={12}
                        />
                        <Text color="#34B899">{user.monthly_fee}</Text>
                      </SocialButton>
                      <SocialButton rigth>
                        <Ionicons
                          style={styles.socialIcon}
                          name="time-outline"
                          color={theme.inputBorderColor}
                          size={12}
                        />
                        <Text color="#34B899">
                          {user.expiration_date
                            ? format(
                                new Date(user.expiration_date),
                                "dd/MM/yyyy"
                              )
                            : ""}
                        </Text>
                      </SocialButton>
                    </SocialRow>
                  )}
                </SocialInformation>
              )}

              <ProfileInformation>
                <InformationTable>
                  <InformationColumn>
                    <InformationRow>
                      <Text color={"#fff"} style={styles.bold}>
                        {t("height")}
                      </Text>
                      <Text color={"#fff"}>
                        {user && user.type === "Artista"
                          ? user.stature
                          : artist.stature}
                      </Text>
                    </InformationRow>

                    <InformationRow striped>
                      <Text color={"#fff"} style={styles.bold}>
                        {t("gender")}
                      </Text>
                      <Text color={"#fff"}>
                        {user && user.type === "Artista"
                          ? t(user.gender)
                          : t(artist.gender)}
                      </Text>
                    </InformationRow>
                    <InformationRow>
                      <Text color={"#fff"} style={styles.bold}>
                        {t("hair")}
                      </Text>
                      <Text color={"#fff"}>
                        {user && user.type === "Artista"
                          ? t(user.hair)
                          : t(artist.hair)}
                      </Text>
                    </InformationRow>
                    <InformationRow striped>
                      <Text color={"#fff"} style={styles.bold}>
                        {t("eye")}
                      </Text>
                      <Text color={"#fff"}>
                        {user && user.type === "Artista"
                          ? t(user.eye)
                          : t(artist.eye)}
                      </Text>
                    </InformationRow>
                    
                  </InformationColumn>
                  <Divider orientation="vertical"/>
                  <InformationColumn>
                    <InformationRow striped>
                      <Text color={"#fff"} style={styles.bold}>
                        {t("skin")}
                      </Text>
                      <Text color={"#fff"}>
                        {user && user.type === "Artista"
                          ? t(user.skin)
                          : t(artist.skin)}
                      </Text>
                    </InformationRow>
                    <InformationRow>
                      <Text color={"#fff"} style={styles.bold}>
                        {t("waist")}
                      </Text>
                      <Text color={"#fff"}>
                        {user && user.type === "Artista"
                          ? user.waist
                          : artist.waist}
                      </Text>
                    </InformationRow>
                    <InformationRow>
                      <Text color={"#fff"} style={styles.bold}>
                        {t("hip")}
                      </Text>
                      <Text color={"#fff"}>
                        {user && user.type === "Artista"
                          ? user.hip
                          : artist.hip}
                      </Text>
                    </InformationRow>
                    <InformationRow>
                      <Text color={"#fff"} style={styles.bold}>
                        {t("bust")}
                      </Text>
                      <Text color={"#fff"}>
                        {user && user.type === "Artista"
                          ? user.bust
                          : artist.bust}
                      </Text>
                    </InformationRow>
                    <InformationRow />
                    
                  </InformationColumn>
                </InformationTable>
              </ProfileInformation>
              {rejected && (
                <ButtomContainer>
                  <Buttom colors={["#21AF90", "#7EF092"]}>
                    <TouchableOpacity
                      style={{
                        width: "100%",
                        height: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => select(true)}
                    >
                      <VStack style={styles.buttomIcon}>
                        <MaterialIcons
                          name="done"
                          size={22}
                          color={theme.tagText}
                        />
                      </VStack>
                      <Text color={theme.tagText} fontSize={16}>
                      {t("select")}
                      </Text>
                    </TouchableOpacity>
                  </Buttom>
                  <Buttom colors={["#E14D79", "#FFA6B5"]}>
                    <TouchableOpacity
                      style={{
                        width: "100%",
                        height: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => select(false)}
                    >
                      <VStack style={styles.buttomIcon}>
                        <AntDesign
                          name="close"
                          size={22}
                          color={theme.tagText}
                        />
                      </VStack>
                      <Text color={theme.tagText} fontSize={16}>
                      {t("decline")}
                      </Text>
                    </TouchableOpacity>
                  </Buttom>
                </ButtomContainer>
              )}
            </VStack>
          </ScrollView>
          </VStack>
        </VStack>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: -50,
    zIndex: 10,
    marginTop: 36,
    paddingHorizontal: 0,
  },
  name: {
    marginBottom: 3,
  },
  tag: {
    marginRight: 4,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
  },
  informations: {
    marginLeft: 16,
    marginBottom: 2,
  },
  socialIcon: {
    marginRight: 4,
  },
  buttomIcon: {
    position: "absolute",
    left: "2.5%",
    backgroundColor: "#00000040",
    padding: 5,
    borderRadius: 25,
  },
});

export default ArtistProfile;
