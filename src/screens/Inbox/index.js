/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTranslation } from "react-i18next";
import Snackbar from "../../components/Snackbar";
import { Container } from "./styles";

import Paragraph from "../../components/Paragraph";
import HeaderWithMenu from "../../components/HeaderWithMenu";
import InboxCard from "../../components/InboxCard";
import Input from "../../components/Input";
import { VStack, Text, HStack } from "native-base";
import { useAuth } from "../../contexts/auth";
import { useModal } from "../../contexts/modal";
import { getChats } from "../../providers/chat";
import {
  getChatInvite,
  getGroupChats,
  getJobInvite,
} from "../../providers/jobs";
import { enterRoom } from "../../providers/socket";

import { theme } from "../../constants/theme";

const Inbox = ({ route, navigation }) => {
  const { openModal } = useModal();
  const { t } = useTranslation("inbox");
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setChats([]);
      getUserChats();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    if (route.params) {
      if (route.params.goToChat) {
        enterRoom(route.params.chatInfo.room_id);
        return navigation.navigate("Chat", {
          ...route.params.chatInfo,
        });
      }
    }
  }, []);

  const getUserChats = async () => {
    console.log("chamou", user.status);
    setChats([]);
    try {
      setLoading(true);
      const { chatList } = await getChats(user.id);

      const list_invite = chatList.map((c) => c.solicitation_id);
      const response = await getGroupChats(list_invite, user.token, user.type);
      setChats(response.group_chats);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      // return Snackbar.show({
      //   text: t("chatError"),
      //   duration: Snackbar.LENGTH_LONG,
      // });
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getUserChats();

    setRefreshing(false);
  }, []);

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HeaderWithMenu
        style={{
          marginBottom: 25,
        }}
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
          {t("yourchats")}
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
      <VStack
        backgroundColor={"#232131"}
        flex={1}
        borderTopLeftRadius={25}
        borderTopRightRadius={25}
        padding={4}
      >
        <Input
          style={{ marginBottom: 16 }}
          placeholder="Search..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        {user.status === "PAUSADO" ? (
          <View style={styles.pausedContainer}>
            <AntDesign name="tago" color={theme.primaryColor} size={82} />
            <Text style={styles.pausedText}>{t("pausedProfile")}</Text>
          </View>
        ) : (
          <>
            {loading && (
              <View style={styles.loading}>
                <ActivityIndicator color={theme.primaryColor} size="large" />
                <Text
                  style={{ marginTop: 8, color: theme.tagText }}
                  type="small"
                >
                  {t("loadChats")}
                </Text>
              </View>
            )}
            {chats.map((chat, index) => (
              <InboxCard
                style={
                  index === chats.length - 1 ? styles.lastCard : styles.card
                }
                key={index}
                chat={chat}
              />
            ))}
          </>
        )}
      </VStack>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 19,
    color: theme.tagText,
  },
  card: {
    marginBottom: 16,
  },
  lastCard: {
    marginBottom: 64,
  },
  loading: {
    alignItems: "center",
  },
  pausedContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  pausedText: {
    textAlign: "center",
    marginTop: 12,
    fontStyle: "italic",
    fontWeight: "400",
    color: theme.tagText
  },
});

export default Inbox;
