/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import Snackbar from "../../../components/Snackbar";
import { format } from "date-fns";

import { Container, Body } from "./styles";
import { Text, HStack } from "native-base";
import HeaderWithMenu from "../../../components/HeaderWithMenu";
import Button from "../../../components/Button";
import Paragraph from "../../../components/Paragraph";
import Divider from "../../../components/Divider";
import Selector from "../../../components/Selector";

import { getProfiles } from "../../../providers/briefing";
import { useAuth } from "../../../contexts/auth";
import { useModal } from "../../../contexts/modal";

const SelectProfile = ({ route, navigation }) => {
  const { t } = useTranslation("selectProfile");
  const { openModal } = useModal();
  const { signed, setJob, user, createClientJob } = useAuth();

  const [profiles, setProfiles] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [selectors, setSelectors] = useState([
    // {
    //   id: 1,
    //   selected: 0,
    //   options: [
    //     {
    //       id: 0,
    //       value: t('firstSelector'),
    //     },
    //   ],
    // },
    {
      id: 2,
      selected: 0,
      options: [
        {
          id: 0,
          value: t("secondSelector"),
        },
        {
          id: 1,
          value: "Transporte por conta do contratante",
        },
        {
          id: 2,
          value: "Transporte por conta do contratado",
        },
      ],
    },
    {
      id: 3,
      selected: 0,
      options: [
        {
          id: 0,
          value: t("thirdSelector"),
        },
        {
          id: 1,
          value: "Alimentação por conta do contratante",
        },
        {
          id: 2,
          value: "Alimentação por conta do contratado",
        },
      ],
    },
    {
      id: 4,
      selected: 0,
      options: [
        {
          id: 0,
          value: t("fourthSelector"),
        },
        {
          id: 1,
          value: "6 Meses",
        },
        {
          id: 2,
          value: "1 Ano",
        },
        {
          id: 3,
          value: "2 Anos",
        },
        {
          id: 4,
          value: "Não Aplicável",
        },
      ],
    },
    {
      id: 5,
      selected: 0,
      options: [
        {
          id: 0,
          value: t("fifthSelector"),
        },
        {
          id: 1,
          value: "6 Meses",
        },
        {
          id: 2,
          value: "1 Ano",
        },
        {
          id: 3,
          value: "2 Anos",
        },
        {
          id: 4,
          value: "Não Aplicável",
        },
      ],
    },
  ]);

  useEffect(() => {
    if (route.params) {
      if (route.params.sendToAll) {
        const newSelectors = selectors.filter((selector) => selector.id !== 1);
        return setSelectors(newSelectors);
      }
    }
    // getJobProfiles();
  }, []);

  const getJobProfiles = async () => {
    try {
      const result = await getProfiles();

      setProfiles(result);

      const newSelectors = selectors.map((selector) => {
        if (selector.id === 1) {
          let options = [
            {
              id: 0,
              value: t("firstSelector"),
            },
          ];

          result.map((option, index) =>
            options.push({
              id: index + 1,
              value: option.name,
            })
          );
          return { ...selector, options };
        }

        return selector;
      });

      setSelectors(newSelectors);
    } catch (err) {
      return Snackbar.show({
        text: "Ocorreu um erro ao buscar as pre-definições de perfis",
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const handleChangeSelectorOption = (id, optionId) => {
    const newSelectors = selectors.map((selector) => {
      if (selector.id === id) {
        return { ...selector, selected: optionId };
      }

      return selector;
    });
    checkIfDisabled(newSelectors);
    return setSelectors(newSelectors);
  };

  const handleSendAllJob = (information) => {
    const jobInfo = {
      ...route.params.jobInfo,
      ...information,
    };

    if (signed) {
      return navigation.navigate("BriefingSelectArtist", {
        toSearch: false,
        jobInfo: jobInfo,
        sendToAll: route.params.sendToAll,
      });
    } else {
      setJob({
        age: 0,
        age_max: 100,
        bust: 0,
        bust_max: 200,
        eye: "Todos",
        gender: [
          { name: "Masculino" },
          { name: "Feminino" },
          { name: "Trans Masculino" },
          { name: "Trans Feminino" },
          { name: "Outros" },
        ],
        hair: "Todos",
        hip: 0,
        hip_max: 200,
        skin: "Todos",
        stature: 0,
        stature_max: 250,
        waist: 0,
        waist_max: 200,
      });
      return navigation.navigate("BriefingSelectArtist", {
        toSearch: false,
        jobInfo: jobInfo,
        sendToAll: route.params.sendToAll,
      });
    }
  };

  const handleGoToCharacteristics = () => {
    if (!submitDisabled) {
      let transport, feeding, image_right_time, campaign_broadcast;

      if (route.params) {
        if (route.params.sendToAll) {
          transport = selectors[0].options.filter(
            (option) => option.id === selectors[0].selected
          )[0].value;
          feeding = selectors[1].options.filter(
            (option) => option.id === selectors[1].selected
          )[0].value;
          image_right_time = selectors[2].options.filter(
            (option) => option.id === selectors[2].selected
          )[0].value;
          campaign_broadcast = selectors[3].options.filter(
            (option) => option.id === selectors[3].selected
          )[0].value;

          return handleSendAllJob({
            transport,
            feeding,
            image_right_time,
            campaign_broadcast,
          });
        }
      }

      transport = selectors[0].options.filter(
        (option) => option.id === selectors[0].selected
      )[0].value;
      feeding = selectors[1].options.filter(
        (option) => option.id === selectors[1].selected
      )[0].value;
      image_right_time = selectors[2].options.filter(
        (option) => option.id === selectors[2].selected
      )[0].value;
      campaign_broadcast = selectors[3].options.filter(
        (option) => option.id === selectors[3].selected
      )[0].value;

      // const profileName = selectors[0].options.filter(
      //   option => option.id === selectors[0].selected,
      // )[0].value;

      // const profile = profiles.filter(prof => prof.name === profileName)[0];

      return navigation.navigate("BriefingCharacteristicsTags", {
        jobInfo: {
          ...route.params.jobInfo,
          transport,
          feeding,
          image_right_time,
          campaign_broadcast,
        },
        genders: route.params.genders,
      });
    } else {
      return openModal("notification", { notification: {title: 'Aviso',message: 'Selecione todos os itens'} })
    }
  };

  const checkIfDisabled = (newSelectors) => {
    let disabled = false;
    for (const selector of newSelectors) {
      if (selector.id !== 1) {
        if (selector.selected === 0) {
          disabled = true;
          break;
        }
      }
    }

    return setSubmitDisabled(disabled);
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
        <Text fontSize={20} color="#fff" fontFamily={"ClashDisplay-Bold"}>
          {t("title")}
        </Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#62D9FF",
            borderStyle: "solid",
            width: "35%",
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
          <Text
            color={"#fff"}
            fontFamily={"Karla-Bold"}
            fontSize={16}
            type="subtitle"
            style={styles.subtitle}
          >
            {t("subtitle")}
          </Text>
          <Divider style={styles.divider} />
          {selectors.map((selector) => (
            <Selector
              id={selector.id}
              key={selector.id}
              style={styles.selector}
              selector={selector}
              onOptionChange={handleChangeSelectorOption}
            />
          ))}
          <Button
            onPress={handleGoToCharacteristics}
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
  subtitle: {
    marginBottom: 4,
  },
  divider: {
    marginBottom: 20,
  },
  selector: {
    marginBottom: 4,
  },
  button: {
    marginTop: 32,
    marginBottom: 72,
  },
});

export default SelectProfile;
