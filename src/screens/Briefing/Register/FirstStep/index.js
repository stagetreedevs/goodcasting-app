import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import Snackbar from "../../../../components/Snackbar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text, HStack } from "native-base";
import { Container, Body } from "./styles";
import HeaderWithMenu from "../../../../components/HeaderWithMenu";
import Paragraph from "../../../../components/Paragraph";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import LoginLogo from "../../../../components/LoginLogo";
import Checkbox from "../../../../components/Checkbox";

import { useAuth } from "../../../../contexts/auth";
import { useModal } from "../../../../contexts/modal";
import { theme } from "../../../../constants/theme";

import { checkUserEmail } from "../../../../providers/auth";
import { isEmailValid } from "../../../../helpers/validation/email";

const FirstStep = ({ navigation }) => {
  const { openModal } = useModal();
  const { signIn } = useAuth();
  const { t } = useTranslation("registerFirstStep");

  const [payload, setPayload] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [termsConfirmed, setTermsConfirmed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

  const handleChangeValue = (field, value) => {
    return setPayload({ ...payload, [field]: value });
  };

  const handleSelectTerms = () => setTermsConfirmed(!termsConfirmed);

  const goToSecondStep = async () => {
    if (payload.username.trim().length <= 0) {
      return Snackbar.show({
        text: t("typeEmail"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    if (!isEmailValid(payload.username)) {
      return Snackbar.show({
        text: t("emailError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    try {
      //await checkUserEmail(payload.username);
    } catch (err) {
      return Snackbar.show({
        text: t("emailRegistered"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    if (payload.password.trim().length < 8) {
      return Snackbar.show({
        text: t("lessThan8DigitPasswordError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
    // if (payload.password.trim().length > 14) {
    //   return Snackbar.show({
    //     text: t("MoreThan14DigitPasswordError"),
    //     duration: Snackbar.LENGTH_LONG,
    //   });
    // }

    if (payload.password !== payload.confirmPassword) {
      return Snackbar.show({
        text: t("differentPasswordError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    return navigation.navigate("BriefingRegisterSecondStep", {
      payload,
    });
  };

  const handleGoBack = () => navigation.goBack();

  const goToTerms = () => navigation.navigate("Terms");

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
            width: "50%",
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
        <Container>
          <Input
            style={styles.input}
            keyboardType="email-address"
            placeholder={t("typeEmail")}
            value={payload.username}
            onChangeText={(text) => handleChangeValue("username", text)}
          />
          <Input
            style={styles.input}
            secureTextEntry={!showPassword}
            withEye
            showEye={showPassword}
            onChangeEye={() => setShowPassword(!showPassword)}
            placeholder={t("typePassword")}
            value={payload.password}
            onChangeText={(text) => handleChangeValue("password", text)}
          />
          <Input
            style={styles.input}
            secureTextEntry={!showConfirmationPassword}
            withEye
            showEye={showConfirmationPassword}
            onChangeEye={() =>
              setShowConfirmationPassword(!showConfirmationPassword)
            }
            placeholder={t("typePasswordConfirmation")}
            value={payload.confirmPassword}
            onChangeText={(text) => handleChangeValue("confirmPassword", text)}
          />
          <Checkbox
            style={styles.checkbox}
            selected={termsConfirmed}
            onChangeSelected={handleSelectTerms}
          >
            <TouchableOpacity onPress={goToTerms}>
              <Paragraph type="small" style={{
                color: '#fff'
              }}>
                Concordo com os{" "}
                <Paragraph style={styles.label} type="small">
                  termos e condições de uso
                </Paragraph>
              </Paragraph>
            </TouchableOpacity>
          </Checkbox>
          <Button
            disabled={!termsConfirmed}
            style={styles.confirm}
            onPress={goToSecondStep}
          >
          <Text
            fontSize={16}
            color="#232131"
          >
            {t("continueLabel")}
          </Text>
          </Button>
        </Container>
      </View>
    </Body>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    marginBottom: 40,
  },
  input: {
    marginBottom: 15,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 70,
  },
  termsButton: {
    alignSelf: "center",
    marginBottom: 52,
  },
  button: {
    position: "absolute",
  },
  confirm: {
    marginBottom: 64,
  },
  label: {
    color: theme.primaryColor,
  },
  checkbox: {
    marginBottom: 20,
  },
});

export default FirstStep;
