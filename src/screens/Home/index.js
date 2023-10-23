/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  RefreshControl,
  View,
  Platform,
  FlatList,
  BackHandler,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Image as Profile } from "react-native"
import { useIsFocused } from "@react-navigation/native";
import Snackbar from "../../components/Snackbar";
import { useTranslation } from "react-i18next";
import { StatusBar, Text, Image, VStack, HStack } from "native-base";
import {
  Container,
  Content,
  Header,
  LastNotification,
  TabContentContainer,
  VerticalBar,
} from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ScrollView } from "native-base";
import HeaderWithMenu from "../../components/HeaderWithMenu";
import ScreenTabs from "../../components/ScreenTabs";
import JobCard from "../../components/JobCard";
import avatar from "../../../assets/images/avatar.png";
import ArtistCard from "../../components/ArtistCard";
import VideoCard from "../../components/VideoCard";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { theme } from "../../constants/theme";

import { useAuth } from "../../contexts/auth";
import { useModal } from "../../contexts/modal";
import { getClasses } from "../../providers/classes";
import { getLastNotification } from "../../providers/notification";
import { getJobs, getJobsByClient } from "../../providers/jobs";
import { checkNotificationTranslation } from "../../helpers";
import VideoAndroidComponent from "./VideoAndroid";
import LoadingSpinner from "../../components/LoadingSpinner";
import LinearGradient from "react-native-linear-gradient";
import bg from "../../../assets/images/bgnot.png";
import bloco from "../../../assets/images/bloco.png";
import movie from "../../../assets/images/monitor.png";
import model from "../../../assets/images/search.png";

const NotificationCard = ({ navigation, lastNotification, onClose }) => {
  const { t } = useTranslation("notifications");

  const _renderText = (message) => {
    if (checkNotificationTranslation(message)) {
      return t(message);
    } else {
      return message;
    }
  };

  return (
    <LastNotification onPress={() => navigation.navigate("Notifications")}>
      <ImageBackground
        source={bg}
        alt=""
        style={{ width: `100%`, height: `100%`, borderRadius: 25 }}
      >
        <View style={styles.notificationInfo}>
          <Text
            style={[
              styles.lastNotificationTitle,
              {
                fontFamily: "ClashDisplay-Bold",
              },
            ]}
          >
            {/* {_renderText("Ultima notificação")} */}
            {_renderText(lastNotification.title)}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.close}>
        <LinearGradient
          colors={["#F260FF", "#7622FF"]}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 40,
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onClose}
          >
            <Ionicons name={"close"} size={24} color={theme.tagText} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </LastNotification>
  );
};

const Home = ({ tab = 2 }) => {
  const { user, retrieveUser, checkUserStatus, signOut } = useAuth();
  const { openModal } = useModal();
  const isFocused = useIsFocused();
  const { t } = useTranslation("home");
  const [selectedTab, setSelectedTab] = useState(2);
  const [jobsToAccept, setJobsToAccept] = useState([]);
  const [jobsAccepted, setJobsAccepted] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [videos, setVideos] = useState([]);
  const [lastNotification, setLastNotification] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [profileImage, setProfileImage] = useState();

  const [currentJobsPage, setCurrentJobsPage] = useState(0);
  const [totalJobsPage, setTotalJobsPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(1);
  const [loadingPageJobs, setLoadingPageJobs] = useState(false);

  const [currentArtistsPage, setCurrentArtistsPage] = useState(0);
  const [totalArtistsPage, setTotalArtistsPage] = useState(1);
  const [totalArtists, setTotalArtists] = useState(1);
  const [loadingPageArtist, setLoadingPageArtist] = useState(false);
  const [haveProfile, setHaveProfile] = useState(true);

  useEffect(() => {
    setHaveProfile(true)
  }, [user]);
  useEffect(() => {
    const backAction = () => {
      setSelectedTab(2);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  const tabs =
    user.type === "Artista"
      ? [
          {
            id: 0,
            name: t("firstTab"),
          },
          {
            id: 1,
            name: t("secondTab"),
          },
          {
            id: 2,
            name: t("thirdTab"),
          },
        ]
      : [
          {
            id: 0,
            name: t("fourthTab"),
          },
          {
            id: 1,
            name: t("fifthTab"),
          },
        ];

  useEffect(() => {
    if (user.type === "Cliente") {
      getClientJobs();
      getClientArtistsByJobs();
    }
    if (user.type === "Artista") {
      setSelectedTab(tab);
      getArtistJobsToAccept();
      getArtistJobsAccepted();
      getVideos();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getNotification();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const onRefresh = useCallback(
    async (updateData = false) => {
      setRefreshing(true);
      getNotification();
      if (user.type === "Cliente") {
        if (selectedTab === 0 && updateData) {
          await getClientJobs();
        } else if (selectedTab === 1 && updateData) {
          console.log("passou aqui");
          await getClientArtistsByJobs();
        }
        retrieveUser();
      }
      if (user.type === "Artista") {
        const resp = await checkUserStatus();
        if (resp) {
          await getArtistJobsToAccept();
          await getArtistJobsAccepted();
          await getVideos();
          retrieveUser();
        }
      }

      setRefreshing(false);
    },
    [selectedTab]
  );

  async function getNotification() {
    try {
      const response = await getLastNotification(
        {
          user: user.id,
          app: user.type === "Cliente" ? "Client" : "Artist",
        },
        user.token
      );
      setLastNotification(response);
    } catch (err) {
      return Snackbar.show({
        text: t("lastNotificationError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  async function getVideos() {
    try {
      const response = await getClasses(user.token);
      setVideos(response);
    } catch (err) {
      return Snackbar.show({
        text: t("videoError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  async function getClientJobs(page = 1) {
    if (page <= totalJobsPage && !loadingPageJobs) {
      try {
        setLoadingPageJobs(true);
        const response = await getJobsByClient(
          {
            client: user.id,
            page: page,
          },
          user.token
        );

        const { results, count } = response;
        const totalPages = Math.ceil(count / 5);
        const result = results.filter(
          (result) => result.status === "EM ANDAMENTO"
        );
        setJobs((oldValue) => {
          if (page === 1) {
            return [...result];
          } else {
            return [...oldValue, ...result];
          }
        });
        setCurrentJobsPage(page);
        setTotalJobsPage(totalPages);
        setTotalJobs(count);
        setLoadingPageJobs(false);
      } catch (err) {
        setLoadingPageJobs(false);
        return Snackbar.show({
          text: t("clientJobsError"),
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }
  }

  async function getClientArtistsByJobs(page = 1) {
    if (page <= totalArtistsPage && !loadingPageArtist) {
      setLoadingPageArtist(true);
      try {
        const clientJobsArtists = await getJobs(
          {
            job__client: user.id,
            artist_status: "CONFIRMADO",
            client_status: "EM ANALISE",
            job__status: "EM ANDAMENTO",
            page: page,
          },
          user.token
        );

        const { results, count } = clientJobsArtists;
        const totalPages = Math.ceil(count / 5);

        const artistsToConfirm = results.map((invite) => {
          return {
            id: invite.id,
            job: invite.job.category,
            client: invite.job.client,
            profile: {
              ...invite.artist,
            },
          };
        });
        setArtists((oldValue) => {
          if (page === 1) {
            return artistsToConfirm;
          }
          return [...oldValue, ...artistsToConfirm];
        });

        setCurrentArtistsPage(page);
        setTotalArtistsPage(totalPages);
        setTotalArtists(count);
        setLoadingPageArtist(false);
      } catch (error) {
        setLoadingPageArtist(false);
        return Snackbar.show({
          text: t("clientJobsError"),
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }
  }

  async function getArtistJobsToAccept() {
    try {
      const response = await getJobs(
        {
          artist: user.id,
          artist_status: "EM ANALISE",
          client_status: "EM ANALISE",
          job__status: "EM ANDAMENTO",
          is_filter_today_gte: 1
        },
        user.token
      );
      setJobsToAccept(response);
    } catch (err) {
      return Snackbar.show({
        text: t("newJobsError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  async function getArtistJobsAccepted() {
    try {
      const response = await getJobs(
        {
          artist: user.id,
          artist_status: "CONFIRMADO",
          client_status__in: "EM ANALISE, CONFIRMADO",
          job__status: "EM ANDAMENTO",
        },
        user.token
      );
      setJobsAccepted(response);
    } catch (err) {
      return Snackbar.show({
        text: t("selectedError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  // const handleChangeTab = (id) => {
  //   const selected = tabs.filter((tab) => tab.id === id)[0];
  //   if (!selected) {
  //     return setSelectedTab(0);
  //   }
  //   console.log(id);
  //   return setSelectedTab(id);
  // };

  const handleArtistTabs = () => {
    switch (selectedTab) {
      default:
        break;
      case 0:
        return jobsToAccept.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh()}
              />
            }
            data={jobsToAccept}
            showsVerticalScrollIndicator={false}
            style={{ paddingHorizontal: 8 }}
            keyExtractor={keyExtractor}
            renderItem={({ item, index }) => (
              <JobCard
                key={index}
                style={
                  index === jobsToAccept.length - 1
                    ? styles.lastCard
                    : styles.card
                }
                job={item}
                afterUpdate={onRefresh}
                tab={0}
              />
            )}
            ListFooterComponent={_renderFooterComponent}
          />
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <AntDesign name="tago" color={theme.primaryColor} size={82} />
            <Text style={styles.paragrah}>{t("emptyArt")}</Text>
          </ScrollView>
        );

      case 1:
        return jobsAccepted.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh()}
              />
            }
            data={jobsAccepted}
            showsVerticalScrollIndicator={false}
            style={{ paddingHorizontal: 12 }}
            keyExtractor={keyExtractor}
            renderItem={({ item, index }) => (
              <JobCard
                key={index}
                job={item}
                afterUpdate={onRefresh}
                artistSelected
                selectedTab={selectedTab}
              />
            )}
            ListFooterComponent={_renderFooterComponent}
          />
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <AntDesign name="tago" color={theme.primaryColor} size={82} />
            <Text style={styles.paragrah}>{t("emptyAc")}</Text>
          </ScrollView>
        );
      case 2:
        return (
          <>
            {selectedTab === 2 ? (
              <ScrollView flex={1} showsVerticalScrollIndicator={false}>
                <VStack alignItems={"center"} flex={1}>
                  {/* {lastNotification && (
                    <VStack w={"100%"} h={"21.5%"}>
                      <NotificationCard
                        navigation={navigation}
                        lastNotification={lastNotification}
                        onClose={() => setLastNotification(null)}
                      />
                    </VStack>
                  )} */}
                  <LinearGradient
                    colors={["#71B9EC", "#1C497D"]}
                    useAngle={true}
                    angle={200}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    style={styles.item}
                  >
                    <TouchableOpacity
                      style={{
                        flex: 1,
                      }}
                      onPress={() => setSelectedTab(0)}
                    >
                      <HStack
                        justifyContent={"space-between"}
                        alignItems="center"
                        h={"100%"}
                      >
                        <VStack w={"50%"}>
                          <Text
                            fontFamily={"Karla-Regular"}
                            color={theme.tagText}
                          >
                            {t("proposals")}
                          </Text>
                          <Text
                            fontFamily={"ClashDisplay-Bold"}
                            color={theme.tagText}
                            marginY={3}
                          >
                            {t("evaluate")}
                          </Text>
                          <VStack>
                            <Text
                              fontFamily={"Karla-Regular"}
                              color={theme.tagText}
                            >
                              {jobsToAccept.length}{" "}
                              {jobsToAccept.length == 1
                                ? t("available")
                                : t("availables")}
                            </Text>
                          </VStack>
                        </VStack>
                        <Image
                          source={bloco}
                          h={"60%"}
                          w={"40.5%"}
                          resizeMode="contain"
                          alt="bloco"
                        />
                        <Entypo
                          name="chevron-thin-right"
                          style={{ marginLeft: 8 }}
                          size={28}
                          color={theme.tagText}
                        />
                      </HStack>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient
                    colors={["#71B9EC", "#4FECD9"]}
                    useAngle={true}
                    angle={225}
                    angleCenter={{ x: 0.25, y: 0.5 }}
                    style={[styles.item]}
                  >
                    <TouchableOpacity
                      style={{
                        flex: 1,
                      }}
                      onPress={() => setSelectedTab(1)}
                    >
                      <HStack
                        justifyContent={"space-between"}
                        alignItems="center"
                        h={"100%"}
                      >
                        <VStack w={"50%"}>
                          <Text
                            fontFamily={"Karla-Regular"}
                            color={theme.tagText}
                          >
                            {t("proposalsAccepted")}
                          </Text>
                          <Text
                            fontFamily={"ClashDisplay-Bold"}
                            color={theme.tagText}
                            marginY={3}
                          >
                            {t("analysis")}
                          </Text>
                          <VStack>
                            <Text
                              fontFamily={"Karla-Regular"}
                              color={theme.tagText}
                            >
                              {jobsAccepted.length}{" "}
                              {jobsAccepted.length == 1
                                ? t("Ongoing")
                                : t("Ongoing")}
                            </Text>
                          </VStack>
                        </VStack>
                        <Image
                          source={model}
                          h={"60%"}
                          w={"40.5%"}
                          resizeMode="contain"
                          alt="model"
                        />
                        <Entypo
                          name="chevron-thin-right"
                          style={{ marginLeft: 8 }}
                          size={28}
                          color={theme.tagText}
                        />
                      </HStack>
                    </TouchableOpacity>
                  </LinearGradient>
                  {user.type == "Artista" && (
                    <LinearGradient
                      colors={["#4FECD9", "#1C497D"]}
                      useAngle={true}
                      angle={225}
                      angleCenter={{ x: 1.0, y: 0.5 }}
                      style={[
                        styles.item,
                        {
                          marginBottom: "25%",
                        },
                      ]}
                    >
                      <TouchableOpacity
                        style={{
                          flex: 1,
                        }}
                        onPress={() => setSelectedTab(3)}
                      >
                        <HStack
                          justifyContent={"space-between"}
                          alignItems="center"
                          h={"100%"}
                        >
                          <VStack w={"50%"}>
                            <Text
                              fontFamily={"Karla-Regular"}
                              color={theme.tagText}
                            >
                              {t("learnWithUs")}
                            </Text>
                            <Text
                              fontFamily={"ClashDisplay-Bold"}
                              color={theme.tagText}
                              marginY={3}
                            >
                              {t("class")}
                            </Text>
                            <VStack>
                              <Text
                                fontFamily={"Karla-Regular"}
                                color={theme.tagText}
                              >
                                {videos.length}{" "}
                                {videos.length == 1
                                  ? t("available")
                                  : t("availables")}
                              </Text>
                            </VStack>
                          </VStack>
                          <Image
                            source={movie}
                            h={"95%"}
                            w={"32%"}
                            resizeMode="contain"
                            alt="model"
                          />
                          <Entypo
                            name="chevron-thin-right"
                            style={{ marginLeft: 8 }}
                            size={28}
                            color={theme.tagText}
                          />
                        </HStack>
                      </TouchableOpacity>
                    </LinearGradient>
                  )}
                </VStack>
              </ScrollView>
            ) : (
              <TabContentContainer>
                {user.type === "Artista"
                  ? handleArtistTabs()
                  : handleClientTabs()}
              </TabContentContainer>
            )}
          </>
        );
      case 3:
        if (videos.length > 0) {
          if (Platform.OS === "android") {
            return (
              <VideoAndroidComponent
                style={{
                  width: "100%",
                  paddingHorizontal: 12,
                }}
                listVideos={videos}
              />
            );
          } else {
            return (
              <FlatList
                data={videos}
                style={{
                  width: "100%",
                }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => onRefresh()}
                  />
                }
                keyExtractor={keyExtractor}
                renderItem={({ item, index }) => {
                  return (
                    <VideoCard
                      key={item.id}
                      style={
                        index === videos.length - 1
                          ? styles.lastCard
                          : styles.card
                      }
                      subtitle={item.subtitle}
                      title={item.title}
                      uri={item.link}
                    />
                  );
                }}
                ListFooterComponent={_renderFooterComponent}
              />
            );
          }
        }
        break;
    }
  };

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const _renderFooterComponent = () => {
    if (loadingPageArtist || loadingPageJobs) {
      return <LoadingSpinner size="large" />;
    }
    return (
      <View
        style={{
          minHeight: 60,
        }}
      ></View>
    );
  };

  const handleJobStatusChange = (status, index) => {
    const newJobsList = [...jobs];
    newJobsList[index].status = status;
    setJobs(newJobsList);
  };

  const handleArtistStatusChange = (artistId) => {
    const newArtistList = artists.filter((art) => art.id !== artistId);
    setArtists(newArtistList);
  };

  const handleClientTabs = () => {
    switch (selectedTab) {
      default:
        break;
      case 0:
        return jobs.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh(true)}
              />
            }
            data={jobs}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, paddingHorizontal: 12, paddingBottom: 12 }}
            keyExtractor={keyExtractor}
            onEndReachedThreshold={0.8}
            onEndReached={() => getClientJobs(currentJobsPage + 1)}
            renderItem={({ item, index }) => (
              <JobCard
                key={index}
                style={styles.card}
                job={{ id: item.id, job: item }}
                afterUpdate={(status) => handleJobStatusChange(status, index)}
              />
            )}
            ListFooterComponent={_renderFooterComponent}
          />
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <AntDesign name="tago" color={theme.primaryColor} size={82} />
            <Text style={styles.paragrah}>{t("emptyJob")}</Text>
          </ScrollView>
        );
      case 1:
        return artists.length !== 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh(true)}
              />
            }
            showsVerticalScrollIndicator={false}
            data={artists}
            style={{ flex: 1, paddingHorizontal: 12 }}
            keyExtractor={keyExtractor}
            onEndReachedThreshold={0.85}
            onEndReached={() => {
              getClientArtistsByJobs(currentArtistsPage + 1);
            }}
            renderItem={({ item, index }) => (
              <ArtistCard
                key={item.id}
                style={
                  index === item.length - 1 ? styles.lastCard : styles.card
                }
                artist={item}
                afterUpdate={handleArtistStatusChange}
                noChat={true}
              />
            )}
            ListFooterComponent={_renderFooterComponent}
          />
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <AntDesign name="user" color={theme.primaryColor} size={82} />
            <Text style={styles.paragrah}>{t("empty")}</Text>
          </ScrollView>
        );
      case 2:
        return (
          <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <VStack alignItems={"center"} flex={1}>
              {/* {lastNotification && (
                <VStack w={"100%"} h={"21.5%"}>
                  <NotificationCard
                    navigation={navigation}
                    lastNotification={lastNotification}
                    onClose={setLastNotification(null)}
                  />
                </VStack>
              )} */}
              <LinearGradient
                colors={["#71B9EC", "#1C497D"]}
                useAngle={true}
                angle={200}
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={styles.item}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                  }}
                  onPress={() => setSelectedTab(0)}
                >
                  <HStack
                    justifyContent={"space-between"}
                    alignItems="center"
                    h={"100%"}
                  >
                    <VStack w={"50%"}>
                      <Text fontFamily={"Karla-Regular"} color={theme.tagText}>
                        {t("myProposals")}
                      </Text>
                      <Text
                        fontFamily={"ClashDisplay-Bold"}
                        color={theme.tagText}
                        marginY={3}
                      >
                        {t("castings")}
                      </Text>
                      <VStack>
                        <Text
                          fontFamily={"Karla-Regular"}
                          color={theme.tagText}
                        >
                          {totalJobs}{" "}
                          {totalJobs == 1 ? t("available") : t("availables")}
                        </Text>
                      </VStack>
                    </VStack>
                    <Image
                      source={bloco}
                      resizeMode="contain"
                      h={"60%"}
                      w={"40.5%"}
                      alt="bloco"
                    />
                    <Entypo
                      name="chevron-thin-right"
                      style={{ marginLeft: 8 }}
                      size={28}
                      color={theme.tagText}
                    />
                  </HStack>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                colors={["#71B9EC", "#4FECD9"]}
                useAngle={true}
                angle={225}
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={[styles.item]}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                  }}
                  onPress={() => setSelectedTab(1)}
                >
                  <HStack
                    justifyContent={"space-between"}
                    alignItems="center"
                    h={"100%"}
                  >
                    <VStack w={"50%"}>
                      <Text fontFamily={"Karla-Regular"} color={theme.tagText}>
                        {t("meet")}
                      </Text>
                      <Text
                        fontFamily={"ClashDisplay-Bold"}
                        color={theme.tagText}
                        marginY={3}
                      >
                        {t("models")}
                      </Text>
                      <VStack>
                        <Text
                          fontFamily={"Karla-Regular"}
                          color={theme.tagText}
                        >
                          {totalArtists}{" "}
                          {totalArtists == 1 ? t("available") : t("availables")}
                        </Text>
                      </VStack>
                    </VStack>
                    <Image
                      source={model}
                      h={"60%"}
                      w={"40.5%"}
                      resizeMode="contain"
                      alt="model"
                    />
                    <Entypo
                      name="chevron-thin-right"
                      style={{ marginLeft: 8 }}
                      size={28}
                      color={theme.tagText}
                    />
                  </HStack>
                </TouchableOpacity>
              </LinearGradient>
              {user.type == "Artista" && (
                <LinearGradient
                  colors={["#4FECD9", "#A09B1E"]}
                  useAngle={true}
                  angle={225}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  style={[
                    styles.item,
                    {
                      marginBottom: "25%",
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                    }}
                    onPress={() => setSelectedTab(3)}
                  >
                    <HStack
                      justifyContent={"space-between"}
                      alignItems="center"
                      h={"100%"}
                    >
                      <VStack w={"50%"}>
                        <Text
                          fontFamily={"Karla-Regular"}
                          color={theme.tagText}
                        >
                          {t("learnWithUs")}
                        </Text>
                        <Text
                          fontFamily={"ClashDisplay-Bold"}
                          color={theme.tagText}
                          marginY={3}
                        >
                          {t("class")}
                        </Text>
                        <VStack>
                          <Text
                            fontFamily={"Karla-Regular"}
                            color={theme.tagText}
                          >
                            {videos.length}{" "}
                            {videos.length == 1
                              ? t("available")
                              : t("availables")}
                          </Text>
                        </VStack>
                      </VStack>
                      <Image
                        source={movie}
                        h={"85%"}
                        w={"32%"}
                        resizeMode="contain"
                        alt="model"
                      />
                      <Entypo
                        name="chevron-thin-right"
                        style={{ marginLeft: 8 }}
                        size={28}
                        color={theme.tagText}
                      />
                    </HStack>
                  </TouchableOpacity>
                </LinearGradient>
              )}
            </VStack>
          </ScrollView>
        );
    }
  };

  return (
    <Container>
      <HeaderWithMenu
        Route={selectedTab == 2 ? "Home" : undefined}
        style={{
          marginBottom: "22.5%",
        }}
        customGoBack={() => {
          setSelectedTab(2);
        }}
      />
      <VStack
        bg={"#232131"}
        style={{
          flex: 1,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          paddingTop: "20%",
        }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Header>
          {user.type === "Artista" ? (
            <Profile
              source={{
                uri: haveProfile
                  ? `${user.image}?${new Date()}`
                  : "https://goodcasting-assets.s3.eu-west-3.amazonaws.com/docs/others/no-gender.png",
              }}
              style={styles.img}
              resizeMode="cover"
              alt="avatar"
              marginRight={10}
              borderColor="white"
              borderWidth={3}
              borderRadius={75}
              onError={() => {
                console.log("erro");
                setHaveProfile(false);
              }}
            />
          ) : (
            <Profile
              source={{
                uri: "https://goodcasting-assets.s3.eu-west-3.amazonaws.com/docs/others/no-gender.png",
              }}
              style={styles.img}
              resizeMode="cover"
              alt="avatar"
              marginRight={10}
              borderColor="white"
              borderWidth={3}
              borderRadius={75}
            />
          )}

          <VStack flex={1}>
            <Text color={"#f1f1f1"} fontFamily={"Karla-Bold"} fontSize={20}>
              {user.name}
            </Text>
            <Text
              color={"#f1f1f1"}
              fontFamily={"Karla-Regular"}
              fontSize={14}
              opacity={0.8}
            >
              {t(user.type)}
            </Text>
            <Text
              color={"#f1f1f1"}
              fontFamily={"Karla-Regular"}
              fontSize={14}
              opacity={0.8}
            >
              {t("welcome")}
            </Text>
          </VStack>
        </Header>
        {selectedTab !== 3 ? (
          <VStack flex={1} w={"100%"} padding={4}>
            {user.type === "Artista" ? handleArtistTabs() : handleClientTabs()}
          </VStack>
        ) : (
          <VStack flex={1} w={"100%"}>
            {user.type === "Artista" ? handleArtistTabs() : handleClientTabs()}
          </VStack>
        )}
      </VStack>
      <StatusBar translucent backgroundColor={"#00000000"} />
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  lastCard: {
    marginBottom: 64,
  },
  lastNotificationTitle: {
    marginBottom: 10,
    color: "white",
  },
  notificationInfo: {
    width: "90%",
    height: "100%",
    padding: 10,
  },
  img: {
    width: 100,
    height: 100,
  },
  close: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderColor: "#00000050",
    borderWidth: 5,
  },
  item: {
    marginBottom: "7.5%",
    width: "95%",
    height: 150,
    borderRadius: 16,
    paddingHorizontal: "5%",
  },
  scrollView: {
    alignItems: "center",
    paddingTop: 12,
  },
  paragrah: {
    marginTop: 10,
    fontStyle: "italic",
    textAlign: "center",
    color: "#fff",
  },
});

export default Home;
