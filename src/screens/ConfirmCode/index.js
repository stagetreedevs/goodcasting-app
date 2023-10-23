import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
// import Snackbar from 'react-native-snackbar';

import { Container, Header } from "./styles";

import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import Input from "../../components/Input";
import LoginLogo from "../../components/LoginLogo";
import Checkbox from "../../components/Checkbox";

import { useAuth } from "../../contexts/auth";
import { theme } from "../../constants/theme";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import HeaderWithMenu from "../../components/HeaderWithMenu";

const ConfirmCode = ({ route, navigation }) => {
  const { updateFirstLogin } = useAuth();
  const { t } = useTranslation("confirmCode");

  const [payload, setPayload] = useState({
    code: "",
  });
  const [termsConfirmed, setTermsConfirmed] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleChangeValue = (field, value) => {
    return setPayload({ ...payload, [field]: value });
  };

  const goToTerms = () => {
    return navigation.navigate("Terms");
  };

  const handleSelectTerms = () => setTermsConfirmed(!termsConfirmed);

  const handleSubmit = () => {
    updateFirstLogin(payload);
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : ""}
      >
        <HeaderWithMenu style={{ marginBottom: 20 }} />
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
              marginLeft: 8,
              borderBottomColor: "#62D9FF",
              borderStyle: "solid",
              flex: 1,
              opacity: 0.8,
            }}
          ></View>
        </Header>
        <VStack style={styles.container}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Paragraph style={styles.text} type="title">
              {t("thanks")}
            </Paragraph>
            <VStack px={2}>
              <Paragraph style={styles.text}>{t("instructions")}</Paragraph>
              <Input
                style={styles.firstInput}
                placeholder={t("typeCode")}
                value={payload.code}
                onChangeText={(text) => handleChangeValue("code", text)}
              />
              <Checkbox
                style={styles.checkbox}
                selected={termsConfirmed}
                onChangeSelected={handleSelectTerms}
              >
                <TouchableOpacity
                  onPress={goToTerms}
                  style={styles.termsButton}
                >
                  <Paragraph
                    style={{
                      color: "white",
                    }}
                    type="small"
                  >
                    {t("agreeWith")}
                    <Paragraph style={styles.label} type="small">
                      {t("terms")}
                    </Paragraph>
                  </Paragraph>
                </TouchableOpacity>
              </Checkbox>
              <Button
                style={styles.button}
                disabled={!termsConfirmed || loadingSubmit}
                onPress={handleSubmit}
              >
                {t("buttonLabel")}
              </Button>
            </VStack>
          </ScrollView>
        </VStack>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    marginBottom: 32,
  },
  text: {
    marginBottom: 16,
    color: "white",
  },
  firstInput: {
    marginBottom: 16,
  },
  checkbox: {
    marginBottom: 32,
    alignItems: "center",
  },
  termsButton: {
    width: "80%",
  },
  label: {
    color: theme.primaryColor,
  },
  button: {
    marginBottom: 64,
  },
  container: {
    // height: 260,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#232131",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: '4%',
    paddingTop: "7.5%",
    paddingBottom: 0,
  },
});

export default ConfirmCode;
