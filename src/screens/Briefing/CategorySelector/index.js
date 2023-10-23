/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { useTranslation } from "react-i18next";
import Snackbar from "../../../components/Snackbar";
import { Text, HStack } from "native-base";
import { Container, ActionContainer, Body } from "./styles";
import HeaderWithMenu from "../../../components/HeaderWithMenu";

import HeaderWithLogo from "../../../components/HeaderWithLogo";
import Button from "../../../components/Button";
import Paragraph from "../../../components/Paragraph";
import CategorySelect from "../../../components/CategorySelect";

import { getCategories } from "../../../providers/briefing";
import { useModal } from "../../../contexts/modal";

const CategorySelector = ({ navigation }) => {
  const { t } = useTranslation("categorySelector");
  const { openModal } = useModal();
  const [categories, setCategories] = useState([]);
  const [continueDisabled, setContinueDisabled] = useState(true);

  useEffect(() => {
    getBriefingCategories();
  }, []);
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return null;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const getBriefingCategories = async () => {
    try {
      const result = await getCategories();

      const treatedCategories = result.map((category) => {
        return {
          id: category.id,
          name: category.name,
          image: category.image,
          selected: false,
        };
      });

      setCategories(treatedCategories);
      console.log(result);
    } catch (err) {
      return Snackbar.show({
        text: "Ocorreu um erro ao buscar as categorias",
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const handleSelectCategory = (id) => {
    const newCategories = categories.map((category) => {
      if (category.id === id) {
        return { ...category, selected: !category.selected };
      }

      return { ...category, selected: false };
    });
    checkIfContinueIsDisabled(newCategories);
    return setCategories(newCategories);
  };

  const checkIfContinueIsDisabled = (newCategories) => {
    const categoriesSelected = newCategories.filter(
      (category) => category.selected === true
    );

    if (categoriesSelected.length > 0) {
      return setContinueDisabled(false);
    }

    return setContinueDisabled(true);
  };

  const handleGoToBriefingJobRegister = (custom = false) => {
    const categorySelected = categories.filter(
      (category) => category.selected
    )[0];
    return navigation.navigate("BriefingJobRegister", {
      category: categorySelected,
      custom,
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
        <Container contentContainerStyle={{ paddingBottom: 240 }}>
          <Text
            color="#fff"
            fontSize={24}
            textAlign="center"
            fontFamily={"Karla-Bold"}
            style={styles.label}
            required
          >
            {t("subtitle")}
          </Text>
          {categories.map((category) => {
            console.log("Categorias =>", category);
            return (
              <CategorySelect
                style={styles.select}
                onPress={() => handleSelectCategory(category.id)}
                key={category.id}
                category={category}
              />
            );
          })}
          {/* <Button
              type="secondary"
              onPress={() => handleGoToBriefingJobRegister(true)}
            >
              <Text
                fontSize={20}
                fontFamily={"ClashDisplay-Bold"}
                textAlign='center'
              >
                {t("customJob")}
              </Text>
            </Button>
            <Text
              color="#fff"
              fontFamily={"Karla-Bold"}
              type="small"
              textAlign="center"
              style={styles.hintText}
            >
              {t("chooseCustomJob")}
            </Text> */}
        </Container>
        <ActionContainer>
          <Button
            style={{
              width: "75%",
            }}
            onPress={() => {
              if (continueDisabled) {
                handleGoToBriefingJobRegister(true);
              } else {
                handleGoToBriefingJobRegister(false);
              }
            }}
          >
            <Text fontSize={20} fontFamily={"ClashDisplay-Bold"}>
              {t("continueLabel")}
            </Text>
          </Button>
        </ActionContainer>
      </View>
    </Body>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: "5%",
  },
  title: {
    marginBottom: 31,
  },
  label: {
    marginBottom: 30,
  },
  select: {
    marginBottom: 30,
  },
  hintText: {
    marginBottom: 20,
  },
});

export default CategorySelector;
