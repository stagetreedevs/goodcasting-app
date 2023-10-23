import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { Container, TermsContainer, Header } from "./styles";

import Paragraph from "../../components/Paragraph";
import HeaderWithLogo from "../../components/HeaderWithLogo";
import HeaderWithMenu from "../../components/HeaderWithMenu";
import { ScrollView, Text, View } from "native-base";
import { theme } from "../../constants/theme";

const Terms = ({ navigation }) => {
  const { t } = useTranslation("terms");

  const goToPolitics = () => navigation.navigate("Politics");

  return (
    <Container>
      <HeaderWithMenu withGoBack style={styles.header} />
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
            width: "40%",
            opacity: 0.8,
          }}
        ></View>
      </Header>
      <TermsContainer>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Paragraph style={styles.text}>
            <Paragraph style={styles.bold}>{t("notice")}:</Paragraph>
            {t("noticeContent")}
          </Paragraph>
          <Paragraph style={[styles.text, styles.bold]}>{t("first")}</Paragraph>
          <Paragraph style={[styles.text, styles.bold]}>
            {t("firstSub")}
          </Paragraph>
          <Paragraph style={styles.text}>
            <Paragraph style={styles.bold}>
              {t("firstSubContent.firstPoint")}:
            </Paragraph>{" "}
            {t("firstSubContent.firstPointContent")}
          </Paragraph>
          <Paragraph style={styles.text}>
            <Paragraph style={styles.bold}>
              {t("firstSubContent.secondPoint")}:
            </Paragraph>
            {t("firstSubContent.secondPointContent")}
          </Paragraph>
          <Paragraph style={styles.text}>
            <Paragraph style={styles.bold}>
              {t("firstSubContent.thirdPoint")}:
            </Paragraph>{" "}
            {t("firstSubContent.thirdPointContent")}
          </Paragraph>
          <Paragraph style={styles.text}>
            <Paragraph style={styles.bold}>
              {t("firstSubContent.fourthPoint")}:
            </Paragraph>
            {t("firstSubContent.fourthPointContent")}
          </Paragraph>
          <Paragraph style={styles.text}>
            <Paragraph style={styles.bold}>
              {t("firstSubContent.fifthPoint")}:
            </Paragraph>
            {t("firstSubContent.fifthPointContent")}
          </Paragraph>
          <Paragraph style={styles.text}>
            <Paragraph style={styles.bold}>
              {t("firstSubContent.sixthPoint")}:
            </Paragraph>
            {t("firstSubContent.sixthPointContent")}
          </Paragraph>
          <Paragraph style={styles.text}>
            <Paragraph style={styles.bold}>
              {t("firstSubContent.seventhPoint")}:
            </Paragraph>
            {t("firstSubContent.seventhPointContent")}
          </Paragraph>
          <Paragraph style={styles.text}>
            <Paragraph style={styles.bold}>
              {t("firstSubContent.eighthPoint")}:
            </Paragraph>
            {t("firstSubContent.eighthPointContent")}
          </Paragraph>
          <Paragraph style={styles.text}>
            <Paragraph style={styles.bold}>
              {t("firstSubContent.ninethPoint")}:
            </Paragraph>
            {t("firstSubContent.ninethPointContent")}
          </Paragraph>
          <Paragraph style={[styles.text, styles.bold]}>
            {t("secondSub")}
          </Paragraph>
          <Paragraph style={styles.text}>{t("secondSubContent.1.1")}</Paragraph>
          <Paragraph style={styles.text}>{t("secondSubContent.1.2")}</Paragraph>
          <Paragraph style={styles.text}>{t("secondSubContent.1.3")}</Paragraph>
          <Paragraph style={styles.text}>{t("secondSubContent.1.4")}</Paragraph>
          <Paragraph style={styles.text}>{t("secondSubContent.1.5")}</Paragraph>
          <Paragraph style={styles.text}>{t("secondSubContent.1.6")}</Paragraph>
          <Paragraph style={styles.text}>{t("secondSubContent.1.7")}</Paragraph>
          <Paragraph style={styles.text}>{t("secondSubContent.1.8")}</Paragraph>
          <Paragraph style={styles.text}>{t("secondSubContent.1.9")}</Paragraph>
          <Paragraph style={styles.text}>
            {t("secondSubContent.1.10")}
          </Paragraph>
          <Paragraph style={styles.text}>
            {t("secondSubContent.1.11")}
          </Paragraph>
          <Paragraph style={styles.text}>
            {t("secondSubContent.1.12")}
          </Paragraph>
          <Paragraph style={styles.text}>
            {t("secondSubContent.1.13")}
          </Paragraph>
          <Paragraph style={styles.text}>
            {t("secondSubContent.1.14")}
          </Paragraph>
          <Paragraph style={styles.text}>
            {t("secondSubContent.1.15")}
          </Paragraph>
          <Paragraph style={styles.text}>
            {t("secondSubContent.1.16")}
          </Paragraph>
          <TouchableOpacity onPress={goToPolitics}>
            <Paragraph style={[styles.text, styles.bold]}>
              {t("second")}
            </Paragraph>
          </TouchableOpacity>
          <Paragraph style={styles.text}>{t("secondContent")}</Paragraph>
          <Paragraph style={[styles.text, styles.bold]}>{t("third")}</Paragraph>
          <Paragraph style={styles.text}>{t("thirdContent.3.1")}</Paragraph>
          <Paragraph style={styles.text}>{t("thirdContent.3.2")}</Paragraph>
          <Paragraph style={styles.text}>{t("thirdContent.3.3")}</Paragraph>
          <Paragraph style={styles.text}>{t("thirdContent.3.4")}</Paragraph>
          <Paragraph style={styles.text}>{t("thirdContent.3.5")}</Paragraph>
          <Paragraph style={styles.text}>{t("thirdContent.3.6")}</Paragraph>
          <Paragraph style={styles.text}>{t("thirdContent.3.7")}</Paragraph>
          <Paragraph style={[styles.text, styles.bold]}>
            {t("fourth")}
          </Paragraph>
          <Paragraph style={styles.text}>{t("fourthContent.4.1")}</Paragraph>
          <Paragraph style={styles.text}>{t("fourthContent.4.1.1")}</Paragraph>
          <Paragraph style={styles.text}>{t("fourthContent.4.1.2")}</Paragraph>
          <Paragraph style={styles.text}>{t("fourthContent.4.1.3")}</Paragraph>
          <Paragraph style={styles.text}>{t("fourthContent.4.1.4")}</Paragraph>
          <Paragraph style={styles.text}>{t("fourthContent.4.1.5")}</Paragraph>
          <Paragraph style={styles.text}>{t("fourthContent.4.1.6")}</Paragraph>
          <Paragraph style={styles.text}>{t("fourthContent.4.1.7")}</Paragraph>
          <Paragraph style={[styles.text, styles.bold]}>{t("fifth")}</Paragraph>
          <Paragraph style={styles.text}>{t("fifthContent.5.1")}</Paragraph>
          <Paragraph style={styles.text}>{t("fifthContent.5.2")}</Paragraph>
          <Paragraph style={styles.text}>{t("fifthContent.5.3")}</Paragraph>
          <Paragraph style={[styles.text, styles.bold]}>{t("sixth")}</Paragraph>
          <Paragraph style={styles.text}>{t("sixthContent")}</Paragraph>
          <Paragraph style={[styles.text, styles.bold]}>
            {t("seventh")}
          </Paragraph>
          <Paragraph style={styles.text}>{t("seventhContent.7.1")}</Paragraph>
          <Paragraph style={styles.text}>{t("seventhContent.7.2")}</Paragraph>
          <Paragraph style={[styles.text, styles.bold]}>
            {t("eighth")}
          </Paragraph>
          <Paragraph style={styles.text}>
            {t("eighthContent.8.1.content")}
          </Paragraph>
          <Paragraph style={styles.text}>{t("eighthContent.8.1.a")}</Paragraph>
          <Paragraph style={styles.text}>{t("eighthContent.8.1.b")}</Paragraph>
          <Paragraph style={styles.text}>{t("eighthContent.8.1.c")}</Paragraph>
          <Paragraph style={styles.text}>{t("eighthContent.8.1.d")}</Paragraph>
          <Paragraph style={styles.text}>{t("eighthContent.8.1.e")}</Paragraph>
          <Paragraph style={styles.text}>{t("eighthContent.8.2")}</Paragraph>
          <Paragraph style={styles.text}>{t("eighthContent.8.3")}</Paragraph>
          <Paragraph style={styles.text}>{t("eighthContent.8.4")}</Paragraph>
          <Paragraph style={styles.text}>{t("eighthContent.8.5")}</Paragraph>
          <Paragraph style={[styles.text, styles.bold]}>
            {t("nineth")}
          </Paragraph>
          <Paragraph style={styles.text}>{t("ninethContent.9.1")}</Paragraph>
          <Paragraph style={styles.text}>{t("ninethContent.9.2")}</Paragraph>
          <Paragraph style={styles.text}>{t("ninethContent.9.3")}</Paragraph>
          <Paragraph style={styles.text}>{t("ninethContent.9.4")}</Paragraph>
          <Paragraph style={styles.text}>{t("ninethContent.9.5")}</Paragraph>
        </ScrollView>
      </TermsContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 15,
  },
  title: {
    marginBottom: 40,
  },
  subtitle: {
    marginBottom: 24,
  },
  text: {
    marginBottom: 20,
    color: theme.tagText,
  },
  bold: {
    fontWeight: "bold",
    color: theme.tagText,
  },
});

export default Terms;
