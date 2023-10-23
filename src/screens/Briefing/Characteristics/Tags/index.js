/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Text, HStack } from "native-base";

import { Container, Body } from "./styles";

import HeaderWithMenu from "../../../../components/HeaderWithMenu";
import Button from "../../../../components/Button";
import Paragraph from "../../../../components/Paragraph";
import TagGroup from "../../../../components/TagGroup";

const Characteristics = ({ route, navigation }) => {
  const { t } = useTranslation("tags");
  const { profile } = route.params;

  const [tagGroups, setTagGroups] = useState([
    {
      id: 1,
      title: t("firstCategory"),
      selected: null,
      tags: [
        {
          id: 1,
          value: t("firstCategoryFirstOption"),
        },
        {
          id: 2,
          value: t("firstCategorySecondOption"),
        },
        {
          id: 3,
          value: t("firstCategoryThirdOption"),
        },
        {
          id: 4,
          value: t("firstCategoryFourthOption"),
        },
        {
          id: 5,
          value: t("firstCategoryFifthOption"),
        },
        {
          id: 6,
          value: t("firstCategorySixthOption"),
        },
        {
          id: 7,
          value: t("firstCategorySeventhOption"),
        },
        {
          id: 8,
          value: t("firstCategoryEigthOption"),
        },
        {
          id: 9,
          value: t("firstCategoryNinethOption"),
        },
      ],
    },
    {
      id: 2,
      title: t("secondCategory"),
      selected: null,
      tags: [
        {
          id: 1,
          value: t("secondCategoryFirstOption"),
        },
        {
          id: 2,
          value: t("secondCategorySecondOption"),
        },
        {
          id: 3,
          value: t("secondCategoryThirdOption"),
        },
        {
          id: 4,
          value: t("secondCategoryFourthOption"),
        },
        {
          id: 5,
          value: t("secondCategoryFifthOption"),
        },
      ],
    },
    {
      id: 3,
      title: t("thirdCategory"),
      selected: null,
      tags: [
        {
          id: 1,
          value: t("thirdCategoryFirstOption"),
        },
        {
          id: 2,
          value: t("thirdCategorySecondOption"),
        },
        {
          id: 3,
          value: t("thirdCategoryThirdOption"),
        },
        {
          id: 5,
          value: t("thirdCategoryFifthOption"),
        },
        {
          id: 6,
          value: t("thirdCategorySixthOption"),
        },
        {
          id: 7,
          value: t("thirdCategorySeventhOption"),
        },
        {
          id: 9,
          value: t("thirdCategoryNinthOption"),
        },
      ],
    },
  ]);

  useEffect(() => {
    if (profile) {
      let newTagGroups = tagGroups.map((tagGroup) => {
        if (tagGroup.id === 1) {
          let selected = null;
          switch (profile.hair) {
            case "Castanho Escuro":
              selected = 1;
              break;
            case "Loiro":
              selected = 2;
              break;
            case "Ruivo":
              selected = 3;
              break;
            case "Grisalho":
              selected = 4;
              break;
            case "Castanho Claro":
              selected = 5;
              break;
            case "Colorido":
              selected = 6;
              break;
            case "Careca":
              selected = 6;
              break;
            case "Preto":
              selected = 6;
              break;
            case "Todos":
              selected = 7;
              break;
            default:
              break;
          }

          return { ...tagGroup, selected };
        }

        if (tagGroup.id === 2) {
          let selected = null;
          switch (profile.eye) {
            case "Castanho Escuro":
              selected = 1;
              break;
            case "Verde":
              selected = 2;
              break;
            case "Azul":
              selected = 3;
              break;
            case "Castanho Claro":
              selected = 4;
              break;
            case "Todos":
              selected = 5;
              break;
            default:
              break;
          }

          return { ...tagGroup, selected };
        }

        if (tagGroup.id === 3) {
          let selected = null;
          switch (profile.skin) {
            case "Branca":
              selected = 1;
              break;
            case "Negra":
              selected = 2;
              break;
            case "Morena":
              selected = 3;
              break;
            case "Indígena":
              selected = 5;
              break;
            case "Asiática":
              selected = 6;
              break;
            case "Sul Asiática - Índia, Paquistão, etc.":
              selected = 7;
              break;
            case "Todos":
              selected = 9;
              break;
            default:
              break;
          }

          return { ...tagGroup, selected };
        }
      });
      setTagGroups(newTagGroups);
    }
  }, []);

  const handleTagGroupChange = (id, tag) => {
    const newTagGroups = tagGroups.map((tagGroup) => {
      if (tagGroup.id === id) {
        return { ...tagGroup, selected: tag };
      }

      return tagGroup;
    });

    setTagGroups(newTagGroups);
  };

  const checkIfContinueDisabled = () => {
    if (
      tagGroups[0].selected === null ||
      tagGroups[1].selected === null ||
      tagGroups[2].selected === null
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleGoToSelectProfile = () => {
    let hair;
    let eye;
    let skin;

    switch (tagGroups[0].selected) {
      case 1:
        hair = "Castanho Escuro";
        break;
      case 2:
        hair = "Loiro";
        break;
      case 3:
        hair = "Ruivo";
        break;
      case 4:
        hair = "Grisalho";
        break;
      case 5:
        hair = "Castanho Claro";
        break;
      case 6:
        hair = "Colorido";
        break;
      case 7:
        hair = "Careca";
        break;
      case 8:
        hair = "Preto";
        break;
      default:
        hair = "Todos";
        break;
    }

    switch (tagGroups[1].selected) {
      case 1:
        eye = "Castanho Escuro";
        break;
      case 2:
        eye = "Verde";
        break;
      case 3:
        eye = "Azul";
        break;
      case 4:
        eye = "Castanho Claro";
        break;
      default:
        eye = "Todos";
        break;
    }

    switch (tagGroups[2].selected) {
      case 1:
        skin = "Branca";
        break;
      case 2:
        skin = "Negra";
        break;
      case 3:
        skin = "Morena";
        break;
      case 5:
        skin = "Indígena";
        break;
      case 6:
        skin = "Asiática";
        break;
      case 7:
        skin = "Sul Asiática - Índia, Paquistão, etc.";
        break;
      case 8:
        skin = "Paquistão";
        break;
      default:
        skin = "Todos";
        break;
    }

    return navigation.navigate("BriefingCharacteristicsSliders", {
      ...route.params,
      toSearch: {
        hair,
        eye,
        skin,
      },
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
          {tagGroups.map((tagGroup) => (
            <TagGroup
              key={tagGroup.id}
              onChange={(tag) => handleTagGroupChange(tagGroup.id, tag)}
              style={styles.tagGroup}
              group={tagGroup}
            />
          ))}
          <Button
            onPress={handleGoToSelectProfile}
            disabled={checkIfContinueDisabled()}
            style={styles.button}
          >
            <Text fontFamily={"ClashDisplay-Bold"} fontSize={18}>
              {t("continueLabel")}
            </Text>
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
  tagGroup: {
    marginBottom: 20,
  },
  button: {
    marginTop: 8,
    marginBottom: 140,
  },
});

export default Characteristics;
