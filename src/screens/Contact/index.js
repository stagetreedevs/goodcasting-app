import React, { useState } from "react";
import { StyleSheet, Image, Dimensions, View } from "react-native";
import Snackbar from "../../components/Snackbar";
import { useTranslation } from "react-i18next";
import { Container, Header } from "./styles";

import { Divider, Link, ScrollView, Text } from "native-base";
import Paragraph from "../../components/Paragraph";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Button as BNative } from "native-base";
import { useAuth } from "../../contexts/auth";
import { useModal } from "../../contexts/modal";
import { createContact } from "../../providers/contact";
import HeaderWithMenu from "../../components/HeaderWithMenu";
import { VStack } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { theme } from "../../constants/theme";

const screenHeight = Dimensions.get("screen").height;

const Contact = ({ navigation }) => {
  const { user } = useAuth();
  const { openModal } = useModal();
  const { t } = useTranslation("contact");
  const [payload, setPayload] = useState({
    title: "",
    message: "",
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleChangePayload = (field, value) =>
    setPayload({ ...payload, [field]: value });

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    try {
      await createContact({ ...payload, name: user.name, email: user.email, user: user.type });

      setPayload({
        title: "",
        message: "",
      });

      setLoadingSubmit(false);
      Snackbar.show({
        text: t("contactSuccess"),
        duration: Snackbar.LENGTH_LONG,
      });
      return navigation.navigate("Tab");
    } catch (err) {
      setLoadingSubmit(false);
      return Snackbar.show({
        text: t("contactError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  return (
    <Container>
      <HeaderWithMenu
        style={{
          marginBottom: 12,
        }}
      />
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
            width: "75%",
            opacity: 0.8,
          }}
        ></View>
      </Header>
      <VStack
        style={{
          flex: 1,
          backgroundColor: "#232131",
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          padding: "5%",
          paddingBottom: 0,
        }}
      >
        <ScrollView>

        <Text fontFamily={"Karla-Bold"} color="#fff" fontSize={16} mt={8}>
          {t("subtitle")}
        </Text>
        <Input
          style={styles.input}
          placeholder={t("topicPlaceholder")}
          value={payload.title}
          onChangeText={(text) => handleChangePayload("title", text)}
        />
        <Input
          multiline
          style={styles.textArea}
          placeholder={t("messagePlaceholder")}
          value={payload.message}
          onChangeText={(text) => handleChangePayload("message", text)}
        />
        <Button
          style={styles.firstButton}
          disabled={loadingSubmit}
          onPress={handleSubmit}
          type="confirm"
          alignSelf="flex-end"
        >
          {t("submit")}
        </Button>
        <Divider marginY={8} />
        <Text fontFamily={"Karla-Bold"} color="#fff" fontSize={16}>
          {t("WhatsappText")}
        </Text>
        <BNative
          style={styles.lastButton}
          disabled={loadingSubmit}
          onPress={handleSubmit}
          type="confirm"
          alignSelf="flex-end"
        >
          <LinearGradient
            colors={["#696969", "#808080"]}
            useAngle={true}
            style={{
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              width: 150,
              height: "100%",
            }}
          >
            <Link href={`https://wa.me/${user.type === 'Cliente'? 351936537633 : 351937223931}?text=Olá, pode me ajudar?`} style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}>
              <Image style={{
              width: 25,
              height: 25,
            }} source={{uri: 'https://seeklogo.com/images/W/whatsapp-icon-logo-6E793ACECD-seeklogo.com.png'}} />
              <Text fontFamily={"Karla-Bold"} color="#fff" fontSize={16}>
                {t("WhatsappButton")}
              </Text>
            </Link>
          </LinearGradient>
        </BNative>
       {user.type === 'Artista' && <Text fontFamily={"Karla-Bold"} color="#fff" fontSize={16}>
          {t("time")}
        </Text>}
        </ScrollView>
      </VStack>
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 16,
  },
  input: {
    marginTop: 16,
    height: 40,
  },
  textArea: {
    marginTop: 16,
    maxHeight: 100,
  },
  firstButton: {
    height:50,
    width: 150,
    marginTop: 16,
  },
  lastButton: {
    marginBottom: 16,
    padding: 0,
    height:70,
    backgroundColor: "transparent",
  },
  bottomImage: {
    height: "60%",
    width: "100%",
    bottom: 0,
  },
});

export default Contact;
