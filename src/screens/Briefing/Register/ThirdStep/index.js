import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Platform, View } from "react-native";
import { useTranslation } from "react-i18next";
import Snackbar from "../../../../components/Snackbar";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Text, HStack, Switch } from "native-base";
import { Container, Body } from "./styles";
import HeaderWithMenu from "../../../../components/HeaderWithMenu";

import Paragraph from "../../../../components/Paragraph";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import LoginLogo from "../../../../components/LoginLogo";

import { theme } from "../../../../constants/theme";
import {
  createClient,
  uploadClientDocument,
} from "../../../../providers/client";
import { useAuth } from "../../../../contexts/auth";
import { useModal } from "../../../../contexts/modal";

const Login = ({ route, navigation }) => {
  const { openModal } = useModal();
  const { signIn } = useAuth();
  const { t } = useTranslation("registerThirdStep");

  const [payload, setPayload] = useState({
    site: "",
    taxpayer: "",
    address_city: "",
    address_state: "",
    full_address: "",
  });
  const [photo, setPhoto] = useState(null);
  const [otherPayload, setOtherPayload] = useState(route.params);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [camera, setCamera] = useState(false);

  const handleGoBack = () => navigation.goBack();

  const handleChangeValue = (field, value) => {
    return setPayload({ ...payload, [field]: value });
  };

  const handleOpenPhoto = async () => {
    let options = {};
    if (camera) {
      return launchImageLibrary(
        {
          includeBase64: true,
        },
        handleResponsePhoto
      );
    }

    return launchCamera(
      {
        includeBase64: true,
      },
      handleResponsePhoto
    );
  };

  const handleResponsePhoto = ({ assets }) => {
    if (assets) {
      return setPhoto(assets[0]);
    }
  };

  const handleSubmit = async () => {
    //valid field required
    if (payload.taxpayer.trim().length <= 3) {
      setLoadingSubmit(false);
      return Snackbar.show({
        text: t("taxpayerError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    if (payload.full_address.trim().length <= 3) {
      setLoadingSubmit(false);
      return Snackbar.show({
        text: t("address_fullError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    if (payload.address_city.trim().length <= 2) {
      setLoadingSubmit(false);
      return Snackbar.show({
        text: t("address_cityError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    if (payload.address_state.trim().length <= 2) {
      setLoadingSubmit(false);
      return Snackbar.show({
        text: t("address_stateError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    if (photo === null) {
      setLoadingSubmit(false);
      return Snackbar.show({
        text: t("selectAPhoto"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    // start format payload for api request
    setLoadingSubmit(true);
    let clientPayload = {
      ...otherPayload,
      ...payload,
      status: "EM ANALISE",
    };

    const loginPayload = {
      username: otherPayload.email,
      password: otherPayload.password,
    };

    try {
      // const imageResponse = await uploadClientDocument(photo);
      //  console.log(imageResponse.url);
      // if(imageResponse.url) {
      //   clientPayload["image"] = imageResponse.url;
      // } else {
      //   return Snackbar.show({
      //     text: t('image_error'),
      //     duration: Snackbar.LENGTH_LONG,
      //   });
      // }
    } catch (error) {
      console.log(error);
      return Snackbar.show({
        text: t("image_error"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    try {
      await createClient(clientPayload);

      setPayload({
        site: "",
        taxpayer: "",
      });
      setPhoto(null);
      setOtherPayload({});

      setLoadingSubmit(false);
      await signIn(loginPayload, "Cliente");
      return Snackbar.show({
        text: t("congratulations"),
        duration: Snackbar.LENGTH_LONG,
      });
    } catch (err) {
      setLoadingSubmit(false);
      console.log(err.message);
      return Snackbar.show({
        text: err.message,
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  return (
    <Body>
      <HeaderWithMenu withGoBack style={styles.header} />
      <HStack
        alignItems={"center"}
        justifyContent={"space-between"}
        paddingX={4}
        marginBottom={3}
      >
        <Text
          fontSize={20}
          color="#fff"
          fontFamily={"ClashDisplay-Bold"}
          mr={2}
        >
          {t("welcome")}
        </Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#62D9FF",
            borderStyle: "solid",
            width: "65%",
            opacity: 0.8,
          }}
        ></View>
      </HStack>
      <View
        style={{
          flex: 1,
          backgroundColor: "#232131",
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
        }}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <Container>
            <Input
              style={styles.input}
              placeholder={t("typeTaxpayer")}
              value={payload.taxpayer}
              keyboardType="number-pad"
              onChangeText={(text) => handleChangeValue("taxpayer", text)}
            />
            <Input
              style={styles.input}
              placeholder={t("typeAddress")}
              value={payload.full_address}
              onChangeText={(text) => handleChangeValue("full_address", text)}
            />
            <Input
              style={styles.input}
              placeholder={t("typeCity")}
              value={payload.address}
              onChangeText={(text) => handleChangeValue("address_city", text)}
            />
            <Input
              style={styles.input}
              placeholder={t("typeDistrict")}
              value={payload.address}
              onChangeText={(text) => handleChangeValue("address_state", text)}
            />
            <Input
              style={styles.input}
              placeholder={t("typeSite")}
              value={payload.site}
              onChangeText={(text) => handleChangeValue("site", text)}
            />
            <Button
              style={
                photo ? styles.selectPhotoActive : styles.selectPhotoInactive
              }
              type="secondary"
              onPress={handleOpenPhoto}
            >
              {photo ? t("selectedPhotoLabel") : t("addPhotoLabel")}
            </Button>
            <HStack justifyContent={'center'} alignItems={'center'} w='100%' mt={4}>
              <Paragraph
                type="small"
                alignment="center"
                style={{
                  color: "#fff",
                 
                }}
              >
                Camera
              </Paragraph>
              <Switch onChange={() => setCamera(!camera)} value={camera} />
              <Paragraph
                type="small"
                alignment="center"
                style={{
                  color: "#fff",
                 
                }}
              >
                Galeria
              </Paragraph>
            </HStack>
            <Paragraph
              type="small"
              alignment="center"
              style={{
                color: "#fff",
                marginTop: 16,
              }}
            >
              {t("addPhotoSubtitle")}
            </Paragraph>
            <Button
              disabled={loadingSubmit}
              style={styles.confirm}
              onPress={handleSubmit}
            >
              {t("continueLabel")}
            </Button>
          </Container>
        </KeyboardAvoidingView>
      </View>
    </Body>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    marginBottom: 30,
  },
  title: {
    marginBottom: 40,
  },
  input: {
    marginBottom: 15,
  },
  selectorWrapper: {
    marginBottom: 15,
  },
  selector: {
    height: 55,
  },
  button: {
    position: "absolute",
  },
  confirm: {
    marginTop: 20,
    marginBottom: 64,
  },
  selectPhotoActive: {
    backgroundColor: "#aaa",
  },
  selectPhotoInactive: {},
});

export default Login;
