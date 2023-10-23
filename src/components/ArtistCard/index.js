/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Snackbar from "../Snackbar";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/core";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  Container,
  PhotoButton,
  Photo,
  InformationContainer,
  InformationContainerHeader,
  ActionContainer,
  MessageButton,
} from "./styles";
import LinearGradient from "react-native-linear-gradient";

import Paragraph from "../Paragraph";
import Button from "../Button";
import { Text, Link } from "native-base";
import { useAuth } from "../../contexts/auth";
import { useModal } from "../../contexts/modal";
import { theme } from "../../constants/theme";
import { updateJob, deleteJobInvite } from "../../providers/jobs";
import { getChat } from "../../providers/chat";
import { createChatRoom, enterRoom } from "../../providers/socket";

const ArtistCard = ({
  artist,
  alreadyInJob,
  afterUpdate = null,
  noChat,
  rejected,
  ...props
}) => {
  const { user } = useAuth();
  const { t } = useTranslation("artistCard");
  const { openModal } = useModal();
  const navigation = useNavigation();
  const {
    id,
    job,
    profile: { id: artistId, email, name, image: artistImage },
  } = artist;

  const [image, setImage] = useState(
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cbns.org.au%2Fprofiles%2Fms-manchen-zhao%2Fimg_placeholder_avatar%2F&psig=AOvVaw0I8eRV-EY88vgzuKwS3p7s&ust=1677335043295000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIi2wI2urv0CFQAAAAAdAAAAABAE"
  );
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState();

  useEffect(() => {
    setImage(artistImage);
    let str = artist.profile.phone_prefix+artist.profile.phone
    str = str.replace(')','')
    str =str.replace('(','')
    str =str.replace('-','')
    str =str.replace(' ','')
    setNumber(str.replace('+',''))
  }, []);

  const acceptArtist = async () => {
    if (user.type !== "Cliente") return;
    setLoading(true);
    try {
      const response = await updateJob(
        id,
        { client_status: "CONFIRMADO" },
        user.token
      );
      setLoading(false);
      afterUpdate(response.id);
    } catch (err) {
      setLoading(false);
      return Snackbar.show({
        text: t("selectError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const rejectArtist = async () => {
    if (user.type !== "Cliente") return;
    setLoading(true);
    try {
      const response = await updateJob(
        id,
        { client_status: "REJEITADO" },
        user.token
      );
      setLoading(false);
      afterUpdate(response.id);
    } catch (err) {
      setLoading(false);
      return Snackbar.show({
        text: t("rejectError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const deleteInvite = async () => {
    if (user.type !== "Cliente") return;

    try {
      await deleteJobInvite(id, user.token);
      afterUpdate(id);
    } catch (err) {
      return Snackbar.show({
        text: t("deleteError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const goToArtistProfile = () => {
    return navigation.navigate("ArtistProfile", {
      profile: artist.profile,
      acceptArtist: () => acceptArtist(),
      declineArtist: () => deleteInvite(),
      rejected: rejected,
      number: number,
      hideName: !noChat
    });
  };

  const handleChatRoom = async () => {
    try {
      const chat = await getChat(user.id, artistId, id);

      enterRoom(chat);
      return navigation.navigate("Chat", {
        room_info: chat,
        room: chat.room_id,
        otherUser: {
          name,
          email: artistId,
        },
        solicitation: {
          id,
        },
      });
    } catch (err) {
      if (err.message === "Error: No chat") {
        const socket_session = `${user.id}${artistId}${id}`;

        const chatParams = {
          solicitation_id: id,
          user_room: artistId,
          user_room_name: name,
          user_host_room: user.id,
          user_host_room_name: user.name,
          user_host_room_id: user.id,
          room_id: socket_session,
        };

        createChatRoom(chatParams);

        return setTimeout(() => {
          enterRoom(chatParams);
          return navigation.navigate("Chat", {
            room_info: chatParams,
            room: chatParams.room_id,
            otherUser: {
              name: name,
              email: artistId,
            },
            solicitation: {
              id,
            },
          });
        }, 1000);
      }

      return Snackbar.show({
        text: t("chatError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  return (
    <Container onPress={goToArtistProfile} {...props}>
      <PhotoButton onPress={goToArtistProfile}>
        <Photo source={{ uri: image }} key={image} />
      </PhotoButton>
      <InformationContainer>
        <InformationContainerHeader>
          <Text numberOfLines={1} style={styles.name} color={theme.tagText}>
            {name}
          </Text>
          <Text color={theme.tagText}>
            Job: {job}
          </Text>
        </InformationContainerHeader>
        {noChat && (
          <MessageButton>
            <LinearGradient
              colors={["#60FFB2", "#21A64E"]}
              useAngle={true}
              angle={220}
              //angleCenter
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link href={`https://wa.me/${number}?text=Oi`}>
                <FontAwesome name="whatsapp" size={22} color={theme.tagText} />
              </Link>
            </LinearGradient>
          </MessageButton>
        )}
        {!alreadyInJob && (
          <ActionContainer>
            <Button
              disabled={loading}
              onPress={() =>
                openModal("confirm", {
                  title: `${t("select")} ${name}?`,
                  confirmOption: t("select"),
                  rejectOption: t("cancel"),
                  onConfirm: acceptArtist,
                })
              }
              type="card"
            >
              {t("select")}
            </Button>
            <Button
              disabled={loading}
              onPress={rejectArtist}
              type="card"
              style={styles.noSelectButton}
            >
              {t("reject")}
            </Button>
          </ActionContainer>
        )}
        {rejected && (
          <ActionContainer>
            <Button
              onPress={() =>
                openModal("confirm", {
                  title: `${t("select")} ${name}?`,
                  confirmOption: t("select"),
                  rejectOption: t("cancel"),
                  onConfirm: acceptArtist,
                })
              }
              type="card"
            >
              {t("select")}
            </Button>
            <Button
              onPress={deleteInvite}
              type="card"
              style={styles.noSelectButton}
            >
              {t("delete")}
            </Button>
          </ActionContainer>
        )}
      </InformationContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  name: {
    fontWeight: "500",
  },
  noSelectButton: {
    backgroundColor: "#aaa",
  },
});

export default ArtistCard;
