/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, RefreshControl, View } from "react-native";
import { useTranslation } from "react-i18next";
import Snackbar from "../../components/Snackbar";
import { Container, Header } from "./styles";

import Paragraph from "../../components/Paragraph";
import HeaderWithMenu from "../../components/HeaderWithMenu";
import EvaluationCard from "../../components/EvaluationCard";

import { useAuth } from "../../contexts/auth";
import { useModal } from "../../contexts/modal";
import { getJobs } from "../../providers/jobs";
import { ScrollView, Text } from "native-base";

const ToEvaluate = ({ route }) => {
  const { user } = useAuth();
  const { openModal } = useModal();
  const { t } = useTranslation("toEvaluate");
  const { id } = route.params;

  const [usersToEvaluate, setUsersToEvaluate] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getUsersJob();

    setRefreshing(false);
  }, []);

  const getUsersJob = async () => {
    if (user.type === "Cliente") {
      try {
        const result = await getJobs(
          {
            job: id,
            job__status: "AVALIAR",
            artist_status: "CONFIRMADO",
            client_status: "CONFIRMADO",
          },
          user.token
        );
        const treatArtists = result.map((invite) => {
          return {
            has_been_evaluated: invite.artist_evaluated,
            invite: invite.id,
            job: {
              name: invite.job.category,
              description: invite.job.description,
              location: invite.job.full_address,
              date: invite.job.date,
              time: invite.job.time,
            },
            user: {
              id: invite.artist.id,
              name: invite.artist.name,
              image: invite.artist.image,
            },
          };
        });
        setUsersToEvaluate(treatArtists);
      } catch (err) {
        return Snackbar.show({
          text: t("artistError"),
          duration: Snackbar.LENGTH_LONG,
        });
      }
    } else {
      try {
        const result = await getJobs(
          {
            job: id,
            artist: user.id,
          },
          user.token
        );

        const userToEvaluate = {
          has_been_evaluated: result[0].client_evaluated,
          invite: result[0].id,
          job: {
            name: result[0].job.category,
            description: result[0].job.description,
            location: result[0].job.full_address,
            date: result[0].job.date,
            time: result[0].job.time,
          },
          user: {
            id: result[0].job.client.id,
            name: result[0].job.client.name,
          },
        };

        setUsersToEvaluate([userToEvaluate]);
      } catch (err) {
        return Snackbar.show({
          text: t("clientError"),
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }
  };

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HeaderWithMenu
        style={{
          marginBottom: 12,
        }}
      />
      <Header>
        <Text
          fontSize={20}
          color="#fff"
          fontFamily={"ClashDisplay-Bold"}
          mr={2}
        >
          {user.type === "Cliente" ? t("clientTitle") : t("artistTitle")}
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
        }}
      >
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          {usersToEvaluate.map((toEvaluate, index) => (
            <EvaluationCard
              key={index}
              style={
                index === usersToEvaluate.length - 1
                  ? styles.lastCard
                  : styles.card
              }
              toEvaluate={toEvaluate}
            />
          ))}
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
  card: {
    marginBottom: 8,
  },
  lastCard: {
    marginBottom: 64,
  },
});

export default ToEvaluate;
