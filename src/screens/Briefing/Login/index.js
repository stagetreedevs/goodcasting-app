/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Snackbar from "../../../components/Snackbar";
import { StyleSheet, Image, Dimensions, View, Linking } from "react-native";
import { useTranslation } from "react-i18next";

import { Container, Header } from "./styles";

import HeaderWithLogo from "../../../components/HeaderWithLogo";
import Button from "../../../components/Button";
import Paragraph from "../../../components/Paragraph";
import Divider from "../../../components/Divider";
import Input from "../../../components/Input";

import { useAuth } from "../../../contexts/auth";
import { useModal } from "../../../contexts/modal";
import { isEmailValid } from "../../../helpers/validation/email";
import HeaderWithMenu from "../../../components/HeaderWithMenu";
import { KeyboardAvoidingView, ScrollView, Text, VStack } from "native-base";
import { baseURL } from "../../../providers/config";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const Login = ({ navigation }) => {
  const { t } = useTranslation("briefingLogin");
  const { openModal } = useModal();

  const { signIn } = useAuth();

  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleChangeValue = (field, value) =>
    setPayload({ ...payload, [field]: value });

  const handleSubmit = () => {
    setLoadingSubmit(true);
    if (!isEmailValid(payload.username)) {
      setLoadingSubmit(false);
      return Snackbar.show({
        text: t("emailError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    if (payload.password.trim().length < 8) {
      setLoadingSubmit(false);
      return Snackbar.show({
        text: t("passwordError"),
        duraction: Snackbar.LENGTH_LONG,
      });
    }

    setLoadingSubmit(false);
    return signIn(
      { username: payload.username.toLowerCase(), password: payload.password },
      "Cliente"
    );
  };

  const goToRegister = () => navigation.navigate("BriefingRegisterFirstStep");

  return (
    <Container>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : ""}
      >
        <HeaderWithMenu style={styles.header} />
        <Header>
          <Text
            fontSize={20}
            color="#fff"
            fontFamily={"ClashDisplay-Bold"}
            mr={2}
          >
            {t("title")}
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#62D9FF",
              borderStyle: "solid",
              width: "55%",
              opacity: 0.8,
            }}
          ></View>
        </Header>
        <VStack style={styles.container}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={{
                flex: 1,
                width: "100%",
                heigh: "100%",
              }}
            >
              <Text style={styles.subtitle}>{t("subtitle")}</Text>
              <Divider style={styles.divider} />
              <Input
                style={styles.firstInput}
                keyboardType="email-address"
                placeholder={t("typeEmail")}
                value={payload.username}
                onChangeText={(text) => handleChangeValue("username", text)}
              />
              <Input
                style={styles.forgotPasswordButton}
                secureTextEntry={!showPassword}
                withEye
                showEye={showPassword}
                onChangeEye={() => setShowPassword(!showPassword)}
                placeholder={t("typePassword")}
                value={payload.password}
                onChangeText={(text) => handleChangeValue("password", text)}
              />
              <Button type="link" onPress={() => Linking.openURL(`${baseURL}/accounts/password_reset/`)} style={styles.forgotPasswordButton}>
                {t("forgot")}
              </Button>
              <Button
                disabled={loadingSubmit}
                onPress={handleSubmit}
                style={styles.button}
              >
                {t("enter")}
              </Button>
              <Button onPress={goToRegister} style={styles.secondButton}>
                {t("register")}
              </Button>
            </View>
          </ScrollView>
        </VStack>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 34,
  },
  subtitle: {
    marginBottom: 4,
    color: "#fff",
    textAlign: "center",
  },
  divider: {
    marginBottom: 30,
  },
  firstInput: {
    marginBottom: 30,
  },
  secondInput: {
    marginBottom: 10,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
  secondButton: {
    height: 55,
    marginBottom: 10,
  },
  bottomImage: {
    width: "100%",
    height: screenHeight * 0.4,
    marginTop: 10,
    // transform: [{
    //   rotate: '-43deg'
    // }]
  },
  container: {
    // height: 260,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#232131",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: "7.5%",
    paddingBottom: 0,
  },
});

export default Login;
