/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

import { Text, HStack } from "native-base";

import { Container, Body } from "./styles";

import HeaderWithMenu from "../../../../components/HeaderWithMenu";
import Button from "../../../../components/Button";
import Paragraph from "../../../../components/Paragraph";
import Slider from "../../../../components/Slider";

const Sliders = ({ route, navigation }) => {
  const { t } = useTranslation("sliders");
  const { profile } = route.params;

  const firstSliders = [
    {
      id: 1,
      title: t("firstSlider"),
      range: [0, 100],
    },
    {
      id: 2,
      title: t("secondSlider"),
      range: [50, 250],
      suffixToRange: "cm",
    },
    {
      id: 3,
      title: t("thirdSlider"),
      range: [20, 200],
      suffixToRange: "cm",
    },
  ];

  const [firstSlidersSelected, setFirstSlidersSelected] = useState([
    [0, 100],
    [0, 250],
    [0, 200],
  ]);

  const secondSliders = [
    {
      id: 1,
      title: t("fourthSlider"),
      range: [20, 200],
      suffixToRange: "cm",
    },
    {
      id: 2,
      title: t("fifthSlider"),
      range: [20, 200],
      suffixToRange: "cm",
    },
  ];

  const [secondSlidersSelected, setSecondSlidersSelected] = useState([
    [0, 200],
    [0, 200],
  ]);

  useEffect(() => {
    if (profile) {
      const age = [
        profile.age,
        profile.age_max <= profile.age ? profile.age + 1 : profile.age_max,
      ];
      const height = [
        profile.stature,
        profile.stature_max <= profile.stature
          ? profile.stature + 1
          : profile.stature_max,
      ];
      const waist = [
        profile.waist,
        profile.waist_max <= profile.waist
          ? profile.waist + 1
          : profile.waist_max,
      ];

      setFirstSlidersSelected([age, height, waist]);

      const hip = [
        profile.hip,
        profile.hip_max <= profile.hip ? profile.hip + 1 : profile.hip_max,
      ];
      const bust = [
        profile.bust,
        profile.bust_max <= profile.bust ? profile.bust + 1 : profile.bust_max,
      ];

      setSecondSlidersSelected([hip, bust]);
    }
  }, []);

  const [activeComponent, setActiveComponent] = useState(0);

  const handleSliderChange = (sliders, callback, position, newValue) => {
    const newSlidersValues = sliders.map((value, index) => {
      if (index === position) return newValue;
      return value;
    });

    callback(newSlidersValues);
  };

  const handleContinue = () => {
    if (activeComponent === 0) return setActiveComponent(1);

    const payload = {
      age: firstSlidersSelected[0][0],
      age_max: firstSlidersSelected[0][1],
      stature: firstSlidersSelected[1][0],
      stature_max: firstSlidersSelected[1][1],
      waist: firstSlidersSelected[2][0],
      waist_max: firstSlidersSelected[2][1],
      hip: secondSlidersSelected[0][0],
      hip_max: secondSlidersSelected[0][1],
      bust: secondSlidersSelected[1][0],
      bust_max: secondSlidersSelected[1][1],
    };

    return navigation.navigate("BriefingSelectArtist", {
      ...route.params,
      toSearch: {
        ...route.params.toSearch,
        ...payload,
        gender: route.params.genders,
        sendToAll: route.params.sendToAll
      },
    });
  };

  return (
    <Body>
      <HeaderWithMenu
        withGoBack
        customGoBack={
          activeComponent === 1 ? () => setActiveComponent(0) : null
        }
        style={styles.header}
      />
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
          {activeComponent === 0 &&
            firstSliders.map((slider, index) => (
              <Slider
                key={slider.id}
                style={styles.slider}
                slider={slider}
                selected={firstSlidersSelected[index]}
                suffixToRange={slider.suffixToRange}
                onValueChange={(newValue) =>
                  handleSliderChange(
                    firstSlidersSelected,
                    setFirstSlidersSelected,
                    index,
                    newValue
                  )
                }
              />
            ))}
          {activeComponent === 1 &&
            secondSliders.map((slider, index) => (
              <Slider
                key={slider.id}
                style={styles.slider}
                slider={slider}
                selected={secondSlidersSelected[index]}
                suffixToRange={slider.suffixToRange}
                onValueChange={(newValue) =>
                  handleSliderChange(
                    secondSlidersSelected,
                    setSecondSlidersSelected,
                    index,
                    newValue
                  )
                }
              />
            ))}
          <Button onPress={handleContinue} style={styles.button}>
              <Text
                fontSize={20}
                fontFamily={"ClashDisplay-Bold"}
                mr={2}
              >
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
    marginTop: 35,
    marginBottom: 72,
  },
  slider: {
    marginBottom: 30,
  },
});

export default Sliders;
