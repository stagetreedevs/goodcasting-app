import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  BackHandler,
  ScrollView,
} from "react-native";
import {
  Wrapper,
  Container,
  Header,
  HeaderButton,
  Content,
  ContentRow,
  Field,
  ButtomContainer,
  Buttom,
} from "./styles";
import * as dateFns from "date-fns";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";

import { theme } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { checkNotificationTranslation, toReal } from "../../helpers";
import { Image, Text, VStack } from "native-base";
import { useAuth } from "../../contexts/auth";
import { useModal } from "../../contexts/modal";
const JobModal = ({
  handleClose,
  job,
  navigation,
  user,
  onConfirm,
  onReject,
  artistInJob,
  artistSelected,
  ...props
}) => {
  // const navigation = useNavigation()

  const { t } = useTranslation(["jobModal", "notifications"]);
  const { openModal } = useModal();

  const {
    job: {
      artist_status,
      title,
      category,
      description,
      full_address,
      value: cash,
      image_right_time: imageRights,
      profile,
      feeding: food,
      transport,
      campaign_broadcast: campaign,
      date,
      time,
    },
  } = job;
  const [screen, setScreen] = useState(Dimensions.get("screen"));
  const [dateJob, setDateJob] = useState(new Date(date));
  const goToArtistsOnJob = () => {
    return navigation.navigate("ArtistsOnJob", {
      job: job.job,
      id: job.id,
      category: category,
      navigation: navigation,
    });
  };
  const handleSubmit = async (accept) => {
    openModal("confirm", {
      title: accept? t("confirm") : t('reject'),
      confirmOption: t("yes"),
      rejectOption: t("no"),
      onConfirm: async () => {
        if(accept){
          await onConfirm();
        } else {
          await onReject()
        }
        handleClose();
      },
    });
  };
  useEffect(() => {
    console.log(job.id);
    Dimensions.addEventListener("change", () => {
      setScreen(Dimensions.get("screen"));
    });
    //setDateJob(dateFns.addDays(dateJob, 1));
    return () => {
      Dimensions.removeEventListener("change");
    };
  }, []);
  useEffect(() => {
    console.log(job.status);
    const backAction = async () => {
      handleClose();
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const _renderText = (message) => {
    if (checkNotificationTranslation(message)) {
      return t(`notifications:${message}`);
    } else {
      return message;
    }
  };

  return (
    <Wrapper width={screen.width} height={screen.height}>
      <HeaderButton onPress={handleClose}>
        <Ionicons name="close-circle-outline" size={38} color={theme.tagText} />
      </HeaderButton>
      <Image
        source={{
          uri: "https://goodcasting-assets.s3.eu-west-3.amazonaws.com/docs/others/no-gender.png",
        }}
        w={75}
        h={75}
        position="absolute"
        left={screen.width * 0.5 - 37.5}
        top="24%"
        zIndex={2}
        borderRadius={37.5}
        alt="avatar"
      />
      <Container>
        <ScrollView flex={1}>
          <Header>
            <Text
              style={styles.title}
              w={"100%"}
              type="subtitle"
              alignment="center"
              fontFamily={"Karla-Bold"}
            >
              {_renderText(category)}
            </Text>
            <Text
              color={"#fff"}
              type="label"
              alignment="center"
              fontFamily={"Karla-Regular"}
              selectable={true}
            >
              {description}
            </Text>
          </Header>
          <Content>
            <Field>
              <View width={"75%"}>
                <Text
                  color={"#fff"}
                  fontFamily={"Karla-Bold"}
                  type="label"
                  style={styles.bold}
                >
                  {t("time")}
                </Text>
                <Text
                  color={"#fff"}
                  fontFamily={"Karla-Regular"}
                  fontSize={12}
                  type="label"
                >
                  Às {time.substring(0, 5)}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="clock-time-three-outline"
                size={38}
                color={"#5D628C75"}
              />
            </Field>
            <Field>
              <View width={"75%"}>
                <Text
                  color={"#fff"}
                  fontFamily={"Karla-Bold"}
                  type="label"
                  style={styles.bold}
                >
                  {t("date")}
                </Text>
                <Text
                  color={"#fff"}
                  fontFamily={"Karla-Regular"}
                  fontSize={12}
                  type="label"
                >
                  {dateFns.format(new Date(dateJob), "dd/MM/yyyy")}
                </Text>
              </View>
              <FontAwesome5
                name="calendar-check"
                size={38}
                color={"#5D628C75"}
              />
            </Field>
            <Field>
              <View width={"75%"}>
                <Text
                  color={"#fff"}
                  fontFamily={"Karla-Bold"}
                  type="label"
                  style={styles.bold}
                >
                  {t("value")}
                </Text>
                <Text
                  color={"#fff"}
                  fontFamily={"Karla-Regular"}
                  fontSize={12}
                  type="label"
                >
                  {toReal(cash)} €
                </Text>
              </View>
              <MaterialIcons
                name="attach-money"
                size={38}
                color={"#5D628C75"}
              />
            </Field>
            <Field>
              <View width={"75%"}>
                <Text
                  color={"#fff"}
                  fontFamily={"Karla-Bold"}
                  type="label"
                  style={styles.bold}
                >
                  {t("address")}
                </Text>
                <Text
                  color={"#fff"}
                  fontFamily={"Karla-Regular"}
                  fontSize={12}
                  type="label"
                >
                  {full_address}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="map-marker-radius"
                size={38}
                color={"#5D628C75"}
              />
            </Field>
            <Field>
              <View width={"75%"}>
                <Text
                  color={"#fff"}
                  fontFamily={"Karla-Bold"}
                  type="label"
                  style={styles.bold}
                >
                  {t("image_right_time")}
                </Text>
                <Text
                  color={"#fff"}
                  fontFamily={"Karla-Regular"}
                  fontSize={12}
                  type="label"
                >
                  {imageRights ? t(`jobModal:${imageRights}`) : ""}
                </Text>
              </View>
              <FontAwesome5
                name="business-time"
                size={30}
                color={"#5D628C75"}
              />
            </Field>
            <Field>
              <View width={"75%"}>
                <Text
                  color={"#fff"}
                  fontFamily={"Karla-Bold"}
                  type="label"
                  style={styles.bold}
                >
                  {t("feeding")}
                </Text>
                <Text
                  color={"#fff"}
                  fontFamily={"Karla-Regular"}
                  fontSize={12}
                  type="label"
                >
                  {food ? t(`jobModal:${food}`) : ""}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="food"
                size={38}
                color={"#5D628C75"}
              />
            </Field>
            <Field>
              <View width={"75%"}>
                <Text
                  color={"#fff"}
                  fontFamily={"Karla-Bold"}
                  type="label"
                  style={styles.bold}
                >
                  {t("transport")}
                </Text>
                <Text
                  color={"#fff"}
                  fontFamily={"Karla-Regular"}
                  fontSize={12}
                  type="label"
                >
                  {transport ? t(`jobModal:${transport}`) : ""}
                </Text>
              </View>
              <FontAwesome5 name="car" size={38} color={"#5D628C75"} />
            </Field>
            <Field>
              <View width={"75%"}>
                <Text
                  color={"#fff"}
                  fontFamily={"Karla-Bold"}
                  type="label"
                  style={styles.bold}
                >
                  {t("campaign_broadcast")}
                </Text>
                <Text
                  color={"#fff"}
                  fontFamily={"Karla-Regular"}
                  fontSize={12}
                  type="label"
                >
                  {campaign ? t(`jobModal:${campaign}`) : ""}
                </Text>
              </View>
              <Entypo name="back-in-time" size={38} color={"#5D628C75"} />
            </Field>
            {/* <Field>
            <Paragraph type="label" style={styles.bold}>
              Perfis
            </Paragraph>
            <Paragraph type="label">{profile.name}</Paragraph>
          </Field> */}
            {user.type === "Artista" && !artistInJob && !artistSelected && (
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
                    onPress={async () => {
                      await handleSubmit(true);
                    }}
                  >
                    <VStack style={styles.buttomIcon}>
                      <MaterialIcons
                        name="done"
                        size={22}
                        color={theme.tagText}
                      />
                    </VStack>
                    <Text color={theme.tagText} fontSize={16}>
                      {t("accept")}
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
                    onPress={async () => {
                      await handleSubmit(false)
                    }}
                  >
                    <VStack style={styles.buttomIcon}>
                      <AntDesign name="close" size={22} color={theme.tagText} />
                    </VStack>
                    <Text color={theme.tagText} fontSize={16}>
                      {t("decline")}
                    </Text>
                  </TouchableOpacity>
                </Buttom>
              </ButtomContainer>
            )}
            {job.client_status === "EM ANALISE" &&
              job.job.status !== "AVALIAR" &&
              job.job.status !== "FINALIZADO" &&
              artistSelected && (
                <Field
                  style={{
                    width: "70%",
                  }}
                >
                  <View width={"75%"}>
                    <Text
                      color={"#fff"}
                      fontFamily={"Karla-Bold"}
                      type="label"
                      style={styles.bold}
                    >
                      {t("status")}
                    </Text>
                    <Text
                      color={"#fff"}
                      fontFamily={"Karla-Regular"}
                      fontSize={12}
                      type="label"
                    >
                      {t(`analysis`)}
                    </Text>
                  </View>
                  <FontAwesome5 name="smile" size={38} color={"#5D628C75"} />
                </Field>
              )}
          </Content>
        </ScrollView>
      </Container>
      {user.type !== `Artista` && (
        <TouchableOpacity
          style={styles.buttom}
          onPress={() => {
            //setDisplay('none')
            handleClose();
            goToArtistsOnJob();
          }}
        >
          <LinearGradient
            style={{
              width: "100%",
              borderRadius: 25,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            colors={["#7EF0DB", "#1484EC"]}
            useAngle={true}
            angle={200}
            angleCenter={{ x: 0.25, y: 0.55 }}
          >
            <Text
              fontFamily={"ClashDisplay-Bold"}
              color={theme.tagText}
              fontSize={18}
            >
              {t("seeartist")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 25,
    marginBottom: 12,
    paddingBottom: 8,
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#4E4B6C",
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  buttom: {
    position: "absolute",
    bottom: 65,
    left: "7.5%",
    height: "7.5%",
    width: "85%",
  },
  buttomIcon: {
    position: "absolute",
    left: "2.5%",
    backgroundColor: "#00000040",
    padding: 5,
    borderRadius: 25,
  },
});

export default JobModal;
