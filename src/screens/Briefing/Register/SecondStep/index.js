import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
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

import { theme } from "../../../../constants/theme";
import { useModal } from "../../../../contexts/modal";
import TextInputMask from "react-native-masked-input";

const Login = ({ route, navigation }) => {
  const { openModal } = useModal();
  const { t } = useTranslation("registerSecondStep");
  const lettersRegex = new RegExp("/^[a-zA-Z]*$/");

  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    phone_prefix: "",
    fantasyName: "",
  });
  const [firstStepPayload, setFirstStepPayload] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setFirstStepPayload({
      email: route.params.payload.username.toLowerCase(),
      password: route.params.payload.password,
    });
  }, []);

  const handleGoBack = () => navigation.goBack();

  const handleChangeValue = (field, value) => {
    return setPayload({ ...payload, [field]: value });
  };

  const goToThirdStep = () => {
    if (payload.name.trim().length <= 0) {
      return Snackbar.show({
        text: t("typeNameError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    if (payload.phone.trim().length <= 0) {
      return Snackbar.show({
        text: t("typePhoneError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    if (payload.fantasyName.trim().length <= 0) {
      return Snackbar.show({
        text: t("typeFantasyNameError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    return navigation.navigate("BriefingRegisterThirdStep", {
      ...payload,
      trading_name: payload.fantasyName,
      ...firstStepPayload,
    });
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
            width: "50%",
            opacity: 0.8,
          }}
        ></View>
      </HStack>
      <View
        style={{
          flex: 1,
          paddingTop: '5%',
          backgroundColor: "#232131",
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
        }}
      >
        <Container>
          <Input
            style={styles.input}
            placeholder={t("typeName")}
            value={payload.name}
            onChangeText={(text) =>
              handleChangeValue("name", text.replace(/[^a-zA-Z_ ]+/, ""))
            }
          />
          <Input
            style={styles.input}
            placeholder={t("typeFantasyName")}
            value={payload.fantasyName}
            onChangeText={(text) => handleChangeValue("fantasyName", text)}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "25%" }}>
              <Input
                style={styles.input}
                placeholder={t("prefix")}
                value={payload.phone_prefix}
                onChangeText={(text) => handleChangeValue("phone_prefix", text)}
                keyboardType="numeric"
                type={"mask"}
                mask={"custom"}
                options={{
                  mask: "+999",
                }}
              />
            </View>
            <View style={{ width: "70%" }}>
              <Input
                style={styles.input}
                placeholder={t("typePhone")}
                value={payload.phone}
                onChangeText={(text) => handleChangeValue("phone", text)}
                keyboardType="numeric"
                type={"mask"}
                mask={"custom"}
                options={{
                  mask: "9999999999",
                }}
              />
            </View>
          </View>
          <Button style={styles.confirm} onPress={goToThirdStep}>
            {t("continueLabel")}
          </Button>
        </Container>
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
  button: {
    position: "absolute",
  },
  confirm: {
    marginTop: 8,
  },
});

export default Login;
