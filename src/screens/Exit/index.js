import React from "react";
import { StyleSheet, Image, Dimensions, View } from "react-native";
import { Container } from "./styles";
import { Text, VStack } from "native-base";
import { useAuth } from "../../contexts/auth";
import { useTranslation } from "react-i18next";

import HeaderWithMenu from "../../components/HeaderWithMenu";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const Exit = () => {
  const { t } = useTranslation("exit");
  const { signOut, user } = useAuth();

  return (
    <Container>
      <HeaderWithMenu
        withNotification={false}
        style={{
          marginBottom: "15%",
        }}
      />
      <VStack
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "#232131",
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          padding: "5%",
        }}
      >
        <VStack w="100%" h={'20%'}>
          <Text style={styles.title}>
           {t('confirm')}
          </Text>
          <Button onPress={async () => await signOut()}>{t('exit')}</Button>
        </VStack>
      </VStack>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 48,
    color: "white",
    textAlign: "center",
    fontSize: 22,
    fontFamily: 'ClashDisplay-Regular'
  },
  bottomImage: {
    height: screenHeight * 0.4,
    backgroundColor: "transparent",
    marginBottom: '-12.5%'
  },
});

export default Exit;
