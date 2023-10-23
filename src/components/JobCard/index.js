import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Snackbar from "../Snackbar";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as dateFns from "date-fns";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { format } from "date-fns";
import {
  Container,
  InformationContainer,
  TagContainer,
  TagText,
  ActionContainer,
  ActionButton,
  ClientActionContainer,
  InformationContainerBody,
} from "./styles";

import Paragraph from "../Paragraph";

const statusTypes = {
  pendente: "pending",
  "em andamento": "inProgress",
  finalizado: "finished",
  cancelado: "canceled",
  avaliar: "evaluate",
};

import { useModal } from "../../contexts/modal";
import { useAuth } from "../../contexts/auth";
import { theme } from "../../constants/theme";

import { updateJob, updateClientJob } from "../../providers/jobs";
import { checkNotificationTranslation } from "../../helpers";
import LinearGradient from "react-native-linear-gradient";
import { Text, VStack } from "native-base";
import Button from "../Button";

const JobCard = ({
  job,
  selectedTab,
  artistInJob = null,
  artistSelected = null,
  afterUpdate = null,
  routeJobs = false,
  tab,
  ...props
}) => {
  const navigation = useNavigation();
  const { t } = useTranslation(["jobCard", "notifications"]);
  const {
    id,
    job: {
      id: jobId,
      title,
      category,
      description,
      full_address,
      date,
      time,
      artist_count,
      status = "em andamento",
    },
  } = job;
  const { openModal, setDisplay } = useModal();
  const [dateJob, setDateJob] = useState(new Date(date));
  const { user } = useAuth();

  const evaluate =
    user.type === "Artista" &&
    job.client_status === "CONFIRMADO" &&
    job.artist_status === "CONFIRMADO" &&
    job.client_evaluated === false &&
    job.artist_evaluated === true;

  const acceptJob = async () => {
    if (user.type !== "Artista") return;
    if (user.status !== "PAUSADO") {
      try {
        await updateJob(id, { artist_status: "CONFIRMADO" }, user.token);
        afterUpdate();
      } catch (err) {
        return Snackbar.show({
          text: t("jobCard:acceptJobError"),
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }
  };
  const rejectJob = async () => {
    if (user.type !== "Artista") return;

    try {
      await updateJob(id, { artist_status: "REJEITADO" }, user.token);
      afterUpdate();
    } catch (err) {
      return Snackbar.show({
        text: t("jobCard:rejectJobError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const finishJob = async () => {
    if (user.type !== "Cliente") return;
    try {
      const response = await updateClientJob(
        id,
        { status: "AVALIAR" },
        user.token
      );
      afterUpdate(response.status);
    } catch (err) {
      return Snackbar.show({
        text: t("jobCard:finishJobError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const cancelJob = async () => {
    if (user.type !== "Cliente") return;

    try {
      const response = await updateClientJob(
        id,
        { status: "CANCELADO" },
        user.token
      );
      afterUpdate(response.status);
    } catch (err) {
      return Snackbar.show({
        text: t("jobCard:cancelJobError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const goToArtistsOnJob = () => {
    return navigation.navigate("ArtistsOnJob", {
      id: jobId,
      job: job.job,
      category: category,
    });
  };

  const goToEvaluation = () => {
    return navigation.navigate("ToEvaluate", {
      id: jobId,
    });
  };

  const _renderText = (message) => {
    if (checkNotificationTranslation(message)) {
      return t(`notifications:${message}`);
    } else {
      return message;
    }
  };

  const checkWidth = () => {
    return routeJobs ? "100%" : tab === 0 ? "100%" : "100%";
  };
  return (
    <Container
      {...props}
      client={user.type === "Cliente"}
      artistInJob={artistInJob}
      artistSelected={artistSelected}
    >
      <LinearGradient
        colors={["#353C46", "#151515"]}
        useAngle={true}
        angle={120}
        angleCenter={{ x: 1.0, y: 0.5 }}
        style={{
          borderRadius: 12,
          padding: 6,
          paddingBottom: 0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <LinearGradient
          colors={["#71E5EC", "#296AA7"]}
          style={{
            height: "100%",
            width: "2%",
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
            position: "absolute",
            zIndex: 2,
          }}
        ></LinearGradient>
        <InformationContainer
          width={
            user.type === "Artista"
              ? checkWidth()
              : artistSelected
              ? "100%"
              : "100%"
          }
          onPress={() => {
            // console.log(job);
            openModal("job", {
              job,
              navigation,
              user,
              onConfirm: acceptJob,
              onReject: rejectJob,
              artistInJob,
              artistSelected,
            });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <InformationContainerBody
              width={
                user.type === "Artista"
                  ? checkWidth()
                  : artistSelected
                  ? "100%"
                  : "70%"
              }
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                }}
              >
                <Paragraph
                  style={[
                    styles.margin,
                    { flexWrap: "wrap", flex: 1, color: "#fff" },
                  ]}
                  type="label"
                >
                  {_renderText(category)}
                </Paragraph>
                {user.type === "Artista" && (selectedTab === 1 || routeJobs) && job.client_status !== 'ENCERRADO' ? (
                  <View
                    style={[
                      styles.margin,
                      {
                        backgroundColor: "gray",
                        // backgroundColor:
                        //   job.client_status === "CONFIRMADO"
                        //     ? "green"
                        //     : job.client_status === "REJEITADO"
                        //     ? "#ba2b2b"
                        //     : "gray",
                        textAlign: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        color: "#fff",
                        borderRadius: 6,
                        height: 18,
                        paddingLeft: 6,
                        paddingRight: 6,
                        fontSize: 11,
                      },
                    ]}
                  >
                    <Paragraph
                      style={[
                        {
                          textAlign: "center",
                          color: "#fff",
                          fontSize: 11,
                        },
                      ]}
                      type="label"
                      ellipsizeMode="tail"
                    >
                      
                      {t(`jobCard:${job.client_status}`)}
                    </Paragraph>
                  </View>
                ) : null}
              </View>
              {user.type === "Artista" && routeJobs && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 10,
                  }}
                >
                  <Paragraph
                    style={[styles.margin, { color: "#fff" }]}
                    type="small"
                    numberOfLines={3}
                    ellipsizeMode="tail"
                  >
                    {t(`jobCard:${status}`)}
                  </Paragraph>
                  {evaluate && (
                    <ClientActionContainer style={{ height: 30, left: 6 }}>
                      <TagContainer
                        onPress={() => goToEvaluation()}
                        status={statusTypes["avaliar"]}
                      >
                        <TagText status={statusTypes["avaliar"]}>
                          {t("jobCard:AVALIAR")}
                        </TagText>
                      </TagContainer>
                    </ClientActionContainer>
                  )}
                </View>
              )}
              <Paragraph
                style={[
                  styles.margin,
                  { color: "#fff", paddingHorizontal: 10 },
                ]}
                type="small"
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {description}
              </Paragraph>
            </InformationContainerBody>
            {user.type === "Cliente" && !artistSelected && (
              <ClientActionContainer twoOptions={artist_count > 0}>
                <LinearGradient
                  colors={["#71E5EC", "#296AA7"]}
                  useAngle
                  angle={70}
                  angleCenter={{ x: 0.65, y: 0.5 }}
                  style={{
                    width: `100%`,
                    borderRadius: 4,
                  }}
                >
                  <TagContainer
                    style={{
                      backgroundColor: `transparent`,
                    }}
                    onPress={
                      status === "PENDENTE"
                        ? () => {}
                        : status === "AVALIAR"
                        ? () => goToEvaluation()
                        : status === "EM ANDAMENTO"
                        ? () =>
                            openModal("confirm", {
                              title: t("jobCard:changeJobStatus"),
                              confirmOption: t("jobCard:finishJob"),
                              rejectOption: t("jobCard:cancelJob"),
                              onConfirm: finishJob,
                              onReject: cancelJob,
                            })
                        : () => {}
                    }
                    status={statusTypes[status.toLowerCase()]}
                  >
                    <TagText status={statusTypes[status.toLowerCase()]}>
                      {t(`jobCard:${status}`)}
                    </TagText>
                  </TagContainer>
                </LinearGradient>
                {artist_count > 0 && (
                  <LinearGradient
                    colors={["#71E5EC", "#296AA7"]}
                    useAngle
                    angle={70}
                    angleCenter={{ x: 0.65, y: 0.5 }}
                    style={{
                      width: `100%`,
                      borderRadius: 4,
                    }}
                  >
                    <TagContainer
                      onPress={goToArtistsOnJob}
                      status="evaluate"
                      style={{
                        backgroundColor: `transparent`,
                      }}
                    >
                      <TagText status="evaluate">
                        {t("jobCard:seeArtists")}
                      </TagText>
                    </TagContainer>
                  </LinearGradient>
                )}
              </ClientActionContainer>
            )}
          </View>
          {user.type === "Artista" && !artistInJob && !artistSelected && (
            <ActionContainer>
              <Button
                onPress={() =>
                  openModal("job", {
                    job,
                    navigation,
                    user,
                    onConfirm: acceptJob,
                    onReject: rejectJob,
                    artistInJob,
                    artistSelected,
                  })
                }
                style={{
                  width: "45%",
                  height: 30,
                  margintop: 2,
                  marginBottom: 8,
                }}
              >
                <Text
                  fontFamily={"Karla-Regular"}
                  fontWeight="bold"
                  fontSize={12}
                  color="#253535"
                >
                  {t("seeMore")}
                </Text>
              </Button>
            </ActionContainer>
          )}

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#282636",
              paddingHorizontal: 14,
              paddingVertical: 4,
              borderBottomRightRadius: 12,
            }}
          >
            <Paragraph
              type="mini"
              style={[{ color: "#fff", maxWidth: "35%", alignItems: "center" }]}
            >
              <MaterialIcons name="pin-drop" color={"#fff"} />
              {full_address}
            </Paragraph>
            <VStack
              style={[{ color: "#fff", width: "40%", alignItems: "center" }]}
            >
              <Paragraph
                style={[{ color: "#fff", marginBottom: 2 }]}
                type="mini"
              >
                {t("date")}
              </Paragraph>
              <Paragraph style={[{ color: "#fff" }]} type="mini">
                {date ? format(new Date(dateJob), "dd/MM/yyyy") : ""}
              </Paragraph>
            </VStack>
            <Paragraph
              type="mini"
              style={[{ color: "#fff", width: "20%", alignItems: "center" }]}
            >
              {time ? time.substring(0, 5) : ""}
            </Paragraph>
          </View>
        </InformationContainer>
      </LinearGradient>
    </Container>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginBottom: 8,
    marginLeft: 2,
  },
});

export default JobCard;
