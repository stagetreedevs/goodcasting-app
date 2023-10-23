import React, { useState } from "react";
import { StyleSheet, Image, Dimensions, Linking, KeyboardAvoidingView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import Snackbar from "../../components/Snackbar";

import { Body, Container } from "./styles";

import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import Input from "../../components/Input";
import LoginLogo from "../../components/LoginLogo";

import { theme } from "../../constants/theme";
import { useAuth } from "../../contexts/auth";
import { useModal } from "../../contexts/modal";
import { baseURL } from "../../providers/config";
import { isEmailValid } from "../../helpers/validation/email";
import HeaderWithMenu from "../../components/HeaderWithMenu";
import { ScrollView, Text, VStack } from "native-base";
import { useHeaderHeight } from "@react-navigation/stack";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const Login = ({ route, navigation }) => {
    const height = useHeaderHeight()
    const { params: type } = route;
  const { signIn } = useAuth();
  const { openModal } = useModal();
  const { t } = useTranslation("login");

  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleChangeValue = (field, value) => {
    return setPayload({ ...payload, [field]: value });
  };

  const handleGoToTerms = () => {
    return navigation.navigate("Terms");
  };

  const handleGoToNewAccount = () => {
    return navigation.navigate("BriefingRegisterFirstStep");
  };

  const handleSubmit = async () => {
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

    await signIn(
      { username: payload.username.toLowerCase(), password: payload.password },
      type
    );
    setLoadingSubmit(false);
  };

  const onClear = () => setPayload({
    ...payload,
    username: ''
  });

  return (
    <Body>
      <KeyboardAvoidingView style={{
        flex:1
      }} keyboardVerticalOffset={height + 47} behavior="" >
      <HeaderWithMenu style={{
        marginBottom: 45
      }}/>
      <Container>
        <VStack w={'100%'} h={'100%'} alignItems='center'>
        <Text style={styles.title}>
          {t("welcome")}
        </Text>
        <Input
          style={styles.firstInput}
          keyboardType="email-address"
          placeholder={t("typeEmail")}
          value={payload.username}
          onClear={onClear}
          withClear
          length={payload.username.length}
          onChangeText={(text) => handleChangeValue("username", text)}
        />
        <Input
          secureTextEntry={!showPassword}
          withEye
          showEye={showPassword}
          onChangeEye={() => setShowPassword(!showPassword)}
          style={styles.secondInput}
          placeholder={t("typePassword")}
          value={payload.password}
          onChangeText={(text) => handleChangeValue("password", text)}
        />
        <Button
          type="link"
          style={styles.forgotPasswordButton}
          onPress={() => Linking.openURL(`${baseURL}/accounts/password_reset/`)}
        >
          {t("forgot")}
        </Button>
        <Button disabled={loadingSubmit} onPress={handleSubmit}>
          {t("confirm")}
        </Button>
        {type === "Cliente" ? (
          <Button
            disabled={loadingSubmit}
            onPress={handleGoToNewAccount}
            style={{ marginTop: 12 }}
          >
            {t("createAccount")}
          </Button>
        ) : null}
        <Button
          type="link"
          style={styles.termsButton}
          onPress={handleGoToTerms}
        >
          {t("terms")}
        </Button>
        {/* <Image
          source={
            type === "Cliente"
              ? require("../../../assets/images/login.png")
              : require("../../../assets/images/login_artist.png")
          }
          resizeMode="contain"
          style={styles.bottomImage}
        /> */}
        </VStack>
      </Container>
      </KeyboardAvoidingView>
    </Body>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    marginBottom: 75,
  },
  title: {
    marginBottom: 40,
    color: "white",
    fontSize: 22,
    //fontFamily: `Karla-Bold`,
    fontWeight: "bold",
  },
  firstInput: {
    marginBottom: 30,
  },
  secondInput: {
    marginBottom: 16,
  },
  button: {
    position: "absolute",
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  termsButton: {
    alignSelf: "center",
    // marginBottom: 52,
  },
  bottomImage: {
    width: "100%",
    height: screenHeight * 0.4,
    marginBottom: 35,
    marginTop: 20,
  },
});

export default Login;
