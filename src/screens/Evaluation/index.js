import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import Snackbar from "../../components/Snackbar";
import { Container, JobTitle, JobUser, TextBold, Header } from "./styles";

import HeaderWithLogo from "../../components/HeaderWithLogo";
import Paragraph from "../../components/Paragraph";
import Input from "../../components/Input";
import Button from "../../components/Button";
import EvaluationStars from "../../components/EvaluationStars";
import EvaluationTags from "../../components/EvaluationTags";

import { evaluateArtist, evaluateClient } from "../../providers/jobs";
import { useAuth } from "../../contexts/auth";
import { useModal } from "../../contexts/modal";
import HeaderWithMenu from "../../components/HeaderWithMenu";
import { Image, Text } from "native-base";

const Evaluation = ({ route, navigation }) => {
  const [screen, setScreen] = useState(Dimensions.get("screen"));
  const { user } = useAuth();
  const { openModal } = useModal();
  const { t } = useTranslation("evaluation");
  const { toEvaluate } = route.params;

  const [payload, setPayload] = useState({
    stars: 0,
    compliments: [],
    commentary: "",
  });
useEffect(() => {
  console.log(toEvaluate.userToEvaluate);
}, [])

  const handleChangePayload = (field, value) =>
    setPayload({ ...payload, [field]: value });

  const handleSubmit = async () => {
    const evaluation = {
      invite: toEvaluate.invite,
      evaluator: user.id,
      rated: toEvaluate.userToEvaluate.id,
      grade: payload.stars,
      description: payload.commentary,
      tag: payload.compliments,
    };

    try {
      if (user.type === "Cliente") {
        await evaluateArtist(evaluation, user.token);
      } else {
        await evaluateClient(evaluation, user.token);
      }

      return navigation.pop(1);
    } catch (err) {
      return Snackbar.show({
        text: t("evaluationError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  return (
    <Container>
      <HeaderWithMenu style={{
        marginBottom: 32
      }}/>
       <Image source={{
        uri: toEvaluate.userToEvaluate.image
      }} w={75} h={75} position="absolute" left={screen.width*.5 - 37.5} top="20%" zIndex={2} borderRadius={37.5}/>
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
            width: "60%",
            opacity: 0.8,
          }}
        ></View>
      </Header>
      <View
        style={{
          flex: 1,
          backgroundColor: "#232131",
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          padding: "5%",
          paddingTop: "12.5%",
        }}
      >
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          <JobTitle>{toEvaluate.job.name}</JobTitle>
          <JobUser>
            {user.type === "Cliente" ? (
              <>
                {t("model")}:{" "}
                <TextBold>{toEvaluate.userToEvaluate.name}</TextBold>
              </>
            ) : (
              <>
                {t("client")}:{" "}
                <TextBold>{toEvaluate.userToEvaluate.name}</TextBold>
              </>
            )}
          </JobUser>
          <Paragraph style={styles.text} type="small">
            {t("description")}
            {user.type === "Cliente" ? t("theArtist") : t("theClient")}:
          </Paragraph>
          <EvaluationStars
            style={styles.stars}
            stars={payload.stars}
            handleChangeStars={(value) => handleChangePayload("stars", value)}
          />
          <EvaluationTags
            style={styles.tags}
            selectedTags={payload.compliments}
            handleChangeValue={(value) =>
              handleChangePayload("compliments", value)
            }
          />
          <Input
            multiline
            maxLength={140}
            style={styles.textarea}
            placeholder={t("typeEvaluation")}
            value={payload.commentary}
            onChangeText={(text) => handleChangePayload("commentary", text)}
          />
          <Button
            onPress={handleSubmit}
            style={styles.firstButton}
            type="primary"
          >
            {t("sendLabel")}
          </Button>
        </ScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 19,
    marginBottom: 16,
  },
  text: {
    fontWeight: "500",
    marginVertical: 8,
    color: "white",
  },
  stars: {
    marginBottom: 8,
  },
  tags: {
    marginBottom: 8,
  },
  textarea: {
    marginBottom: 16,
    minHeight: 100,
  },
  firstButton: {
    marginBottom: 64,
  },
});

export default Evaluation;
