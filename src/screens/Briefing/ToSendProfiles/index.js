/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import { StyleSheet, Image, Dimensions, View } from "react-native";
import { useTranslation } from "react-i18next";

import { Container, Body } from "./styles";
import { HStack, Text, VStack } from "native-base";
import HeaderWithMenu from "../../../components/HeaderWithMenu";
import Button from "../../../components/Button";
import Paragraph from "../../../components/Paragraph";
import Divider from "../../../components/Divider";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const ToSendProfiles = ({ route, navigation }) => {
  const payload = route.params;
  const { t } = useTranslation("toSendProfiles");
  useEffect(
    () => {
     // console.log(payload);
    },[])
  const handleGoToGender = () => {
    return navigation.navigate("BriefingGender", {
      jobInfo: payload,
    });
  };

  const handleGoToProfile = () => {
    return navigation.navigate("BriefingSelectProfile", {
      sendToAll: true,
      jobInfo: payload,
    });
  };

  return (
    <Body>
      <HeaderWithMenu style={styles.header} />
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
          {t("title")}
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
          paddingTop: "7.5%",
          backgroundColor: "#232131",
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
        }}
      >
        <Container>
          <Text fontFamily={'Karla-Bold'} fontSize={14} color='#fff' textAlign="center" style={styles.subtitle}>
            {t("subtitle")}
          </Text>
          <Divider style={styles.divider} />
          <Button onPress={handleGoToProfile} style={styles.button}>
          <Text fontFamily={'ClashDisplay-Bold'}
            style={styles.secondSmallText}
            type="small"
            textAlign="center"
          >
            {t("chooseAllLabel")}
          </Text>
          </Button>
          <Text fontFamily={'Karla-Bold'} fontSize={14} color='#fff'
            style={styles.firstSmallText}
            type="small"
            textAlign="center"
          >
            {t("chooseAllLabelHint")}
          </Text>
          <Divider style={{
            marginVertical: 25
          }}/>
          <Button style={styles.button} onPress={handleGoToGender}>
          <Text fontFamily={'ClashDisplay-Bold'}
            style={styles.secondSmallText}
            type="small"
            textAlign="center"
          >
            {t("chooseFilterLabel")}
          </Text>
          </Button>
          <Text fontFamily={'Karla-Bold'} fontSize={14} color='#fff'
            style={[styles.secondSmallText, {
              marginBottom: 175
            }]}
            type="small"
            textAlign="center"
          >
            {t("chooseFilterLabelHint")}
          </Text>
          {/* <Image
            source={require("../../../../assets/images/profile.png")}
            resizeMode="contain"
            style={styles.bottomImage}
          /> */}
        </Container>
      </View>
    </Body>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 14,
  },
  title: {
    marginBottom: 34,
  },
  subtitle: {
    marginBottom: 4,
  },
  divider: {
    marginBottom: 25,
  },
  firstSmallText: {
    marginBottom: 20,
  },
  secondSmallText: {
     //marginBottom: '50%',
  },
  button: {
    marginBottom: 5,
  },
  bottomImage: {
    width: "100%",
    height: screenHeight * 0.4,
    marginBottom: 40,
    marginTop: 0,
  },
});

export default ToSendProfiles;
