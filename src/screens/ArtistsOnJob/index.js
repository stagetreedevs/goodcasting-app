import React, { useState, useEffect, useCallback } from "react";
import { RefreshControl, StyleSheet, Dimensions, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import Snackbar from "../../components/Snackbar";
import { Container, Header, CardsContainer } from "./styles";
import { Image, Text, VStack } from "native-base";

import Paragraph from "../../components/Paragraph";
import HeaderWithMenu from "../../components/HeaderWithMenu";
import ArtistCard from "../../components/ArtistCard";
import ScreenTabs from "../../components/ScreenTabs";

import { useAuth } from "../../contexts/auth";
import { useModal } from "../../contexts/modal";
import { getJobs, getArtistByJobs } from "../../providers/jobs";
import LoadingSpinner from "../../components/LoadingSpinner";
import { theme } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";

const ArtistsOnJob = ({ route }) => {
  const screen = Dimensions.get("screen");
  const { user } = useAuth();
  const { setDisplay, display } = useModal();
  const { t } = useTranslation("artistsOnJob");

  const tabs = [
    {
      id: 0,
      name: t("pending"),
    },
    {
      id: 1,
      name: t("selected"),
    },
    {
      id: 2,
      name: t("nonSelected"),
    },
  ];

  const [selectedTab, setSelectedTab] = useState(0);

  const [acceptedArtists, setAcceptedArtists] = useState([]);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [currentAcceptPage, setCurrentAcceptPage] = useState(0);
  const [totalAcceptPage, setTotalAcceptPage] = useState(1);

  const [rejectedArtists, setRejectedArtists] = useState([]);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [currentRejectPage, setCurrentRejectPage] = useState(0);
  const [totalRejectPage, setTotalRejectPage] = useState(1);

  const [currentArtistsPage, setCurrentArtistsPage] = useState(0);
  const [totalArtistsPage, setTotalArtistsPage] = useState(1);
  const [totalArtists, setTotalArtists] = useState(1);
  const [loadingPageArtist, setLoadingPageArtist] = useState(false);
  const [artists, setArtists] = useState([]);
  const job = route.params.job;
  const navigation = useNavigation();

  useEffect(() => {
    setDisplay("none");
    if (user.type === "Cliente") {
      getRejectedArtists();
      getAcceptedArtists();
      getClientArtistsByJobs();
    }
  }, [selectedTab]);

  const onRefresh = useCallback(async () => {
    console.log(selectedTab);
    if (user.type === "Cliente") {
      if (selectedTab == 0) {
        await getClientArtistsByJobs();
      } else if (selectedTab == 1) {
        await getAcceptedArtists();
      } else {
        await getRejectedArtists();
      }
    }
  }, [selectedTab]);

  const getRejectedArtists = async (page = 1) => {
    if (page <= totalRejectPage && !rejectLoading) {
      try {
        setRejectLoading(true);

        const response = await getJobs(
          {
            job: route.params.id,
            client_status: "REJEITADO",
            artist_status: "CONFIRMADO",
            page: page,
          },
          user.token
        );
        //console.log(response);
        const { results, count } = response;
        const totalPages = Math.ceil(count / 5);

        setTotalRejectPage(totalPages);
        setCurrentRejectPage(page);
        setRejectedArtists((oldValue) => {
          if (page === 1) {
            return [...results];
          } else {
            return [...oldValue, ...results];
          }
        });
        setRejectLoading(false);
      } catch (err) {
        setRejectLoading(false);
        return Snackbar.show({
          text: t("artistError"),
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }
  };

  async function getClientArtistsByJobs(page = 1) {
    if (page <= totalArtistsPage && !loadingPageArtist) {
      setLoadingPageArtist(true);
      try {
        const clientJobsArtists = await getArtistByJobs(
          {
            job__client: user.id,
            artist_status: "CONFIRMADO",
            client_status: "EM ANALISE",
            job__status: "EM ANDAMENTO",
            page: page,
            job_id: job.id,
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

  const getAcceptedArtists = async (page = 1) => {
    if (page <= totalAcceptPage && !acceptLoading) {
      try {
        setAcceptLoading(true);
        const response = await getJobs(
          {
            job: route.params.id,
            client_status: "CONFIRMADO",
            artist_status: "CONFIRMADO",
            page: page,
          },
          user.token
        );
        const { results, count } = response;
        const totalPages = Math.ceil(count / 5);

        setTotalAcceptPage(totalPages);
        setCurrentAcceptPage(page);
        setAcceptedArtists((oldValue) => {
          if (page === 1) {
            return [...results];
          } else {
            return [...oldValue, ...results];
          }
        });
        setAcceptLoading(false);
      } catch (error) {
        setAcceptLoading(false);
        return Snackbar.show({
          text: t("artistError"),
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }
  };

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const _renderHeaderComponent = () => (
    <>
      <Header>
        <Text
          fontFamily={"Karla-Bold"}
          fontSize={16}
          color={theme.tagText}
          type="title"
        >
          {route.params.category}
        </Text>
        <Text
          borderBottomWidth={1}
          borderBottomColor="#4E4B6C"
          w={"80%"}
        ></Text>
      </Header>
      {selectedTab === 0 ? (
        <Text color={theme.tagText} marginBottom={6}>
          {" "}
          {t("pending")}: {totalArtists}
        </Text>
      ) : selectedTab === 1 ? (
        <Text color={theme.tagText} marginBottom={6}>
          {" "}
          {t("selected")}: {acceptedArtists.length}
        </Text>
      ) : (
        <Text color={theme.tagText} marginBottom={6}>
          {" "}
          {t("nonSelected")}: {rejectedArtists.length}
        </Text>
      )}
      <ScreenTabs
        tabs={tabs}
        selected={selectedTab}
        onChangeTab={handleChangeTab}
      />
    </>
  );

  const _renderFooterComponent = () => {
    if (acceptLoading) {
      return <LoadingSpinner size="large" />;
    }
    return <VStack minH={20} />;
  };
  const handleArtistStatusChange = (artistId) => {
    const newArtistList = artists.filter((art) => art.id !== artistId);
    setArtists(newArtistList);
  };
  const handleSelectedArtists = () => (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={acceptLoading} onRefresh={onRefresh} />
      }
      data={acceptedArtists}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0.85}
      onEndReached={() => getAcceptedArtists(currentAcceptPage + 1)}
      ListHeaderComponent={_renderHeaderComponent}
      renderItem={({ item, index }) => {
        return (
          <ArtistCard
            key={item.id}
            style={styles.card}
            artist={{
              id: item.id,
              job: item.job.category,
              profile: item.artist,
            }}
            afterUpdate={onRefresh}
            alreadyInJob
            noChat={job.status === "EM ANDAMENTO"}
          />
        );
      }}
      ListFooterComponent={_renderFooterComponent}
      showsVerticalScrollIndicator={false}
    />
    // if(refreshing) {
    //   return <View style={{justifyContent: 'center', alignItems: 'center', height: '50%'}}>
    //       <LoadingSpinner size='large'/>
    //       <Paragraph type='small' style={{marginTop: 12, }}>{t('getArtist')}...</Paragraph>
    //     </View>
    // }
    // const cards = acceptedArtists.map((invite, index) => (
    // <ArtistCard
    //   key={invite.id}
    //   style={
    //     index === acceptedArtists.length - 1 ? styles.lastCard : styles.card
    //   }
    //   artist={{
    //     id: invite.id,
    //     job: invite.job.category,
    //     profile: invite.artist,
    //   }}
    //   afterUpdate={onRefresh}
    //   alreadyInJob
    //   noChat={false}
    // />
    // ));

    // return cards;
  );

  const handleRejectedArtists = () => (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={rejectLoading} onRefresh={onRefresh} />
      }
      data={rejectedArtists}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0.85}
      onEndReached={() => getRejectedArtists(currentRejectPage + 1)}
      ListHeaderComponent={_renderHeaderComponent}
      renderItem={({ item, index }) => {
        return (
          <ArtistCard
            key={item.id}
            style={styles.card}
            artist={{
              id: item.id,
              job: item.job.category,
              profile: item.artist,
            }}
            afterUpdate={handleConfirmArtist}
            alreadyInJob
            noChat={true}
            rejected={true}
          />
        );
      }}
      ListFooterComponent={_renderFooterComponent}
    />
    // if(refreshing) {
    //   return <View style={{justifyContent: 'center', alignItems: 'center', height: '60%'}}>
    //   <LoadingSpinner size='large'/>
    //   <Paragraph type='small' style={{marginTop: 12, }}>{t('getArtist')}...</Paragraph>
    // </View>
    // }
    // const cards = rejectedArtists.map((invite, index) => (
    //   <ArtistCard
    //     key={invite.id}
    //     style={
    //       index === rejectedArtists.length - 1 ? styles.lastCard : styles.card
    //     }
    //     artist={{
    //       id: invite.id,
    //       job: invite.job.category,
    //       profile: invite.artist,
    //     }}
    //     afterUpdate={onRefresh}
    //     alreadyInJob
    //     noChat={true}
    //     rejected={true}
    //   />
    // ));

    // return cards;
  );
  const handlePendingArtists = () => (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={rejectLoading} onRefresh={onRefresh} />
      }
      data={artists}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0.85}
      onEndReached={() => getClientArtistsByJobs(currentArtistsPage + 1)}
      ListHeaderComponent={_renderHeaderComponent}
      renderItem={({ item, index }) => (
        <ArtistCard
          key={item.id}
          style={index === item.length - 1 ? styles.lastCard : styles.card}
          artist={item}
          afterUpdate={handleArtistStatusChange}
          noChat={true}
        />
      )}
      ListFooterComponent={_renderFooterComponent}
    />
  );

  const handleChangeTab = (id) => {
    const selected = tabs.filter((tab) => tab.id === id)[0];
    if (!selected) {
      return setSelectedTab(0);
    }
    return setSelectedTab(id);
  };

  const handleConfirmArtist = (id) => {
    const newList = rejectedArtists.filter((item) => item.id !== id);
    setRejectedArtists([...newList]);
  };

  return (
    <Container>
      <HeaderWithMenu style={styles.header} />
      <Image
        source={{
          uri: "https://goodcasting.s3.sa-east-1.amazonaws.com/docs/others/no-gender.png",
        }}
        w={75}
        h={75}
        borderRadius={37.5}
        position="absolute"
        zIndex={2}
        left={screen.width * 0.5 - 37.5}
        top={"14.5%"}
        alt="profile"
      />
      <CardsContainer>
        {selectedTab === 0 ? (
          <VStack flex={1}>{handlePendingArtists()}</VStack>
        ) : selectedTab === 1 ? (
          <VStack flex={1}>{handleSelectedArtists()}</VStack>
        ) : (
          <VStack flex={1}>{handleRejectedArtists()}</VStack>
        )}
      </CardsContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: "8.5%",
  },
  card: {
    marginBottom: 16,
  },
});

export default ArtistsOnJob;
