/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Container, SelectAllContainer, Body } from "./styles";
import { Text, HStack } from "native-base";
import HeaderWithMenu from "../../../components/HeaderWithMenu";
import Button from "../../../components/Button";
import Paragraph from "../../../components/Paragraph";
import Divider from "../../../components/Divider";
import Counter from "../../../components/Counter";
import { theme } from "../../../constants/theme";

const Gender = ({ route, navigation }) => {
  const { t } = useTranslation("gender");
  const { jobInfo } = route.params;

  const [allSelected, setAllSelected] = useState(false);
  const [counters, setCounters] = useState([
    {
      id: 1,
      label: t("masc"),
      name: "Masculino",
      check: false,
    },
    {
      id: 2,
      label: t("fem"),
      name: "Feminino",
      check: false,
    },
    {
      id: 3,
      label: t("transmasc"),
      name: "Trans Masculino",
      check: false,
    },
    {
      id: 4,
      label: t("transfem"),
      name: "Trans Feminino",
      check: false,
    },
    {
      id: 5,
      label: t("other"),
      name: "Outros",
      check: false,
    },
  ]);

  const checkAllSelected = () => {
    const _countSelect = counters.reduce((acc, item) => {
      if (item.check) {
        acc += 1;
      }
      return acc;
    }, 0);
    return _countSelect === 5 ? true : false;
  };

  const handleCounterChange = (_name) => {
    if (_name === "Todos") {
      const _newCouters = counters.map((item) => {
        return {
          ...item,
          check: checkAllSelected() ? false : true,
        };
      });
      setAllSelected(!allSelected);
      setCounters(_newCouters);
    } else {
      const _newCouters = [...counters];
      const _index = counters.findIndex((item) => item.name === _name);
      _newCouters[_index].check = !_newCouters[_index].check;
      setCounters(_newCouters);
    }
  };

  const checkIfContinueDisabled = () => {
    return counters.find((item) => item.check) ? false : true;
  };

  const handleGoToSelectProfile = () => {
    let genders = [];
    counters.forEach((counter) => {
      if (counter.check) {
        genders.push({ name: counter.name });
      }
    });

    return navigation.navigate("BriefingSelectProfile", {
      jobInfo,
      genders,
    });
  };

  const checkSelected = (value) => {
    return counters.find((item) => item.name === value).check;
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
      </HStack>
      <View
        style={{
          flex: 1,
          paddingBottom: "7.5%",
          backgroundColor: "#232131",
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
        }}
      >
        <Container>
          <Text
            color={"#fff"}
            fontFamily="Karla-Bold"
            fontSize={16}
            type="subtitle"
            style={styles.subtitle}
          >
            {t("subtitle")}
          </Text>
          <Divider style={styles.divider} />
          <SelectAllContainer onPress={() => handleCounterChange("Todos")}>
            <MaterialCommunityIcons
              name={
                checkAllSelected()
                  ? "checkbox-marked"
                  : "checkbox-blank-outline"
              }
              size={24}
              color={theme.primaryColor}
              style={styles.icon}
            />
            <Text color={"#fff"} fontFamily="Karla-Bold" fontSize={14}>
              {t("selectAll")}
            </Text>
          </SelectAllContainer>
          {counters.map((counter) => (
            <Counter
              key={counter.id}
              id={counter.id}
              style={styles.counter}
              label={counter.label}
              name={counter.name}
              selected={checkSelected(counter.name)}
              onCountChange={handleCounterChange}
            />
          ))}
          <Button
            onPress={handleGoToSelectProfile}
            disabled={checkIfContinueDisabled()}
            style={styles.button}
          >
            <Text color={'#232131'} fontFamily={'ClashDisplay-Bold'} fontSize={18}>{t("continueLabel")}</Text>
          </Button>
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
    marginBottom: 20,
  },
  counter: {
    marginBottom: 15,
  },
  button: {
    marginTop: 35,
    marginBottom: 140,
  },
  icon: {
    marginRight: 8,
  },
});

export default Gender;
