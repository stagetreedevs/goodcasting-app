/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, Platform, View } from "react-native";
import { useTranslation } from "react-i18next";
import Snackbar from "../../../components/Snackbar";
import { compareAsc, isBefore } from "date-fns";
import { HStack, Text } from "native-base";
import { Container, Body } from "./styles";

import HeaderWithMenu from "../../../components/HeaderWithMenu";
import Button from "../../../components/Button";
import Paragraph from "../../../components/Paragraph";
import InputGroup from "../../../components/InputGroup";
import Input from "../../../components/Input";

import { useModal } from "../../../contexts/modal";

const JobRegister = ({ route, navigation }) => {
  const { t } = useTranslation("jobRegister");
  const { openModal } = useModal();
  const { custom, category: categorySelected } = route.params;
  const [category, setCategory] = useState("");
  const [date, setDate] = useState();
  const [payload, setPayload] = useState({
    description: "",
    time: "",
    date: "",
    location: "",
    value: "",
  });
  const [continueDisabled, setContinueDisabled] = useState(false);

  useEffect(() => {
    if (!custom) {
      if (categorySelected) {
        setCategory(categorySelected.name);
      }
    }

    checkIfContinueIsDisabled();
  }, [payload]);

  const handleChangeValue = (field, value) => {
    if (field == "date") {
      setPayload({ ...payload, [field]: value });
      let BrDate = value.split("/");
      let month = BrDate[1];
      BrDate.unshift(month);
      BrDate.splice(2, 1);
      let str = BrDate.toString();
      let str2 = str.replace(",", "/");
      const dateString = str2.replace(",", "/");
      console.log(dateString);
      setPayload({ ...payload, [field]: dateString });

      return setDate(value);
    } else {
      return setPayload({ ...payload, [field]: value });
    }
  };

  const checkIfContinueIsDisabled = () => {
    let disabled = false;

    for (let field of Object.keys(payload)) {
      if (payload[field].trim().length <= 0) {
        disabled = true;
        break;
      }
    }

    if (category.trim().length <= 0) disabled = true;

    return setContinueDisabled(disabled);
  };

  const checkTime = () => {
    const time = payload.time.split(":");
    if (time.length < 2) return false;
    if (parseInt(time[0]) > 23) return false;
    if (parseInt(time[1]) > 59) return false;
    return true;
  };

  const checkDate = () => {
    let dateString = payload.date;
    console.log(dateString);

    try {
      const date = new Date(dateString);
      //console.log(date);
      const today = new Date();
      today.setDate(today.getDate() - 1);
      const compareWithToday = compareAsc(date, today);

      if (compareWithToday === 1) {
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  };

  const handleGoToToSendProfiles = () => {
    if (!continueDisabled) {
      if (!checkTime()) {
        return Snackbar.show({
          text: t("timeError"),
          duration: Snackbar.LENGTH_LONG,
        });
      }

      if (!checkDate()) {
        return Snackbar.show({
          text: t("dateError"),
          duration: Snackbar.LENGTH_LONG,
        });
      }
      return navigation.navigate("BriefingToSendProfiles", {
        ...payload,
        category,
      });
    } else {
      return openModal("notification", { notification: {title: 'Aviso',message: 'Preencha todos os campos'} })
    }
  };

  return (
    <Body>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        style={{
          flex: 1,
        }}
      >
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
            paddingBottom: "7.5%",
            backgroundColor: "#232131",
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
          }}
        >
          <Container>
            {custom && (
              <Input
                style={styles.firstInput}
                label={t("category")}
                placeholder={t("categoryPlaceholder")}
                value={category}
                onChangeText={(text) => setCategory(text)}
                required
              />
            )}
            <Input
              style={styles.firstInput}
              label={t("description")}
              placeholder={t("descriptionPlaceholder")}
              value={payload.description}
              onChangeText={(text) => handleChangeValue("description", text)}
              multiline
              required
            />
            <InputGroup style={styles.inputGroup}>
              <Input
                group
                type="mask"
                mask={"datetime"}
                options={{
                  format: "HH:mm",
                }}
                keyboardType="number-pad"
                label={t("time")}
                placeholder="00:00"
                value={payload.time}
                onChangeText={(text) => handleChangeValue("time", text)}
                required
              />
              <Input
                group
                type="mask"
                mask={"datetime"}
                options={{
                  format: "DD/MM/YYYY",
                }}
                label={t("date")}
                placeholder="DD/MM/AAAA"
                value={date}
                onChangeText={(text) => handleChangeValue("date", text)}
                required
              />
            </InputGroup>
            <Input
              style={styles.input}
              label={t("location")}
              placeholder={t("locationPlaceholder")}
              value={payload.location}
              onChangeText={(text) => handleChangeValue("location", text)}
              required
            />
            <Input
              style={styles.lastInput}
              label={t("value")}
              type={"mask"}
              mask={"money"}
              options={{
                precision: 2,
                separator: ".",
                delimiter: ",",
                unit: "",
                suffixUnit: "",
              }}
              placeholder="6.000 €"
              value={payload.value}
              onChangeText={(text) => handleChangeValue("value", text)}
              required
            />
            <Button
              style={styles.continueButton}
              onPress={handleGoToToSendProfiles}
            >
              {t("continueLabel")}
            </Button>
          </Container>
        </View>
      </KeyboardAvoidingView>
    </Body>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 14,
  },
  title: {
    marginBottom: 31,
  },
  firstInput: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  lastInput: {
    marginBottom: 32,
  },
  continueButton: {
    marginBottom: 72,
  },
});

export default JobRegister;
