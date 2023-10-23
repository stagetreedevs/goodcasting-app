/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import { Text, VStack, HStack, Button } from "native-base";
import { useTranslation } from "react-i18next";
import Snackbar from "../../components/Snackbar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Container, Body } from "./styles";

import Paragraph from "../../components/Paragraph";
import HeaderWithMenu from "../../components/HeaderWithMenu";
import NotificationCard from "../../components/NotificationCard";

import { useAuth } from "../../contexts/auth";
import {
  getNotifications,
  removeNotification,
} from "../../providers/notification";
import { useModal } from "../../contexts/modal";
import LoadingSpinner from "../../components/LoadingSpinner";
import { theme } from "../../constants/theme";

const Notifications = () => {
  const { user } = useAuth();
  const { openModal } = useModal();
  const { t } = useTranslation("notifications");

  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const ref = useRef();
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const init = async () => {
      const result = await getNotifications(
        {
          user: user.id,
          app: user.type === "Cliente" ? "Client" : "Artist",
          page: 1,
        },
        user.token
      );

      const { totalPages } = result;

      getUserNotifications(totalPages);
    };
    init();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getUserNotifications(totalPage);
    setRefreshing(false);
  }, []);
  const refNull = () => {
    ref.current.scrollToOffset({ animated: true, offset: 0 });
    setShowButton(false)
  };

  const getUserNotifications = async (page = 1) => {
    if (currentPage <= totalPage && !loading) {
      try {
        const result = await getNotifications(
          {
            user: user.id,
            app: user.type === "Cliente" ? "Client" : "Artist",
            page: page,
          },
          user.token
        );

        const { notifications, totalPages } = result;

        setCurrentPage(page);
        setTotalPage(totalPages);
        setLoading(false);
        setNotifications((oldValue) => {
          if (page === 1) {
            return [...notifications];
          }
          return [...oldValue, ...notifications];
        });
      } catch (err) {
        setLoading(false);
        return;
        // return Snackbar.show({
        //   text: t('notificationError'),
        //   duration: Snackbar.LENGTH_LONG,
        // });
      }
    }
  };

  const handleRemoveNotification = async (_notification) => {
    const _newNotificationsList = notifications.filter(
      (item) => item.id !== _notification.id
    );
    setNotifications(_newNotificationsList);
    removeNotification(_notification.id, user.token);
  };

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const _renderFooterComponent = () => {
    if (loading) {
      return <LoadingSpinner size="large" />;
    }
    return null;
  };

  return (
    <Body>
      <HeaderWithMenu
        style={{
          marginBottom: 15,
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
          {t("title")}
        </Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#62D9FF",
            borderStyle: "solid",
            width: "55%",
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
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={notifications}
            ref={ref}
            keyExtractor={keyExtractor}
            onEndReachedThreshold={0.5}
            onEndReached={() => getUserNotifications(currentPage - 1)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{ marginRight: 10, paddingTop: 15 }}
                  key={index}
                  onPress={() =>
                    openModal("notification", { notification: item })
                  }
                >
                  <NotificationCard
                    style={
                      index === notifications.length - 1
                        ? styles.lastCard
                        : styles.card
                    }
                    key={index}
                    notification={item}
                    handleRemoveNotification={handleRemoveNotification}
                  />
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={_renderFooterComponent}
          />
          {ref && (
            <Button
              backgroundColor={theme.primaryColor}
              opacity={0.75}
              onPress={() => refNull()}
              borderRadius={25}
              w={45}
              h={45}
              position="absolute"
              left={"5%"}
              bottom={"20%"}
            >
              <MaterialCommunityIcons name="arrow-up-bold" size={20}/>
            </Button>
          )}
          {/* {notifications.map((notification, index) => (
        <TouchableOpacity
        style={{marginRight: 10}}
        key={index}
        onPress={() => openModal('notification', {notification})}>
          <NotificationCard
            style={
              index === notifications.length - 1 ? styles.lastCard : styles.card
            }
            key={index}
            notification={notification}
            handleRemoveNotification={handleRemoveNotification}
            />
            </TouchableOpacity>
          ))} */}
        </Container>
      </View>
    </Body>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 19,
    marginBottom: 19,
  },
  card: {
    marginBottom: 15,
  },
  lastCard: {
    marginBottom: 64,
  },
});

export default Notifications;
