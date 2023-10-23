/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  StyleSheet,
  RefreshControl,
  FlatList,
  View,
  ScrollView,
  BackHandler
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Snackbar from "../../components/Snackbar";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";

import { Container, Header } from "./styles";
import { theme } from "../../constants/theme";
import { Text, VStack } from "native-base";
import { Button as ButtonTop } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import JobCard from "../../components/JobCard";
import HeaderWithMenu from "../../components/HeaderWithMenu";

import { useAuth } from "../../contexts/auth";
import { useModal } from "../../contexts/modal";
import { getJobsByClient, getJobs } from "../../providers/jobs";
import LoadingSpinner from "../../components/LoadingSpinner";
import LinearGradient from "react-native-linear-gradient";

const Jobs = ({ route, navigation }) => {
  const { user } = useAuth();
  const { setDisplay } = useModal();
  const { t } = useTranslation("myjobs");
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [ref, setRef] = useState(useRef());

  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    onRefresh(currentPage + 1)
  }, [])
  
  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);
  const onRefresh = async (page) => {
    if (user.type === "Artista") await getArtistJobs(page);
    if (user.type === "Cliente") await getClientJobs(page);
  };

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  async function getArtistJobs(page = 1) {
    if (page <= totalPages && !refreshing) {
      try {
        setRefreshing(true);
        const response = await getJobs(
          {
            artist: user.id,
            artist_status: "CONFIRMADO",
            page: page,
            // client_status: 'CONFIRMADO',
          },
          user.token
        );
       // console.log(response);
        const { results, count } = response;
        const _totalPages = Math.ceil(count / 5);

        setTotalPages(_totalPages === 0 ? 1 : _totalPages);
        setCurrentPage(page);
        setJobs((oldValue) => {
          if (page === 1) {
            return [...results];
          } else {
            return [...oldValue, ...results];
          }
        });
        setRefreshing(false);
      } catch (err) {
        setRefreshing(false);
        return Snackbar.show({
          text: t("jobError"),
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }
  }

  const refNull = () => {
    ref.current.scrollToOffset({ animated: true, offset: 0 });
  };

  async function getClientJobs(page = 1) {
    if (page <= totalPages && !refreshing) {
      setRefreshing(true);
      try {
        const response = await getJobsByClient(
          {
            client: user.id,
            page: page,
          },
          user.token
        );

        const { results, count } = response;
        const _totalPages = Math.ceil(count / 5);
        const result = results.filter(result => result.status)
        //const result = results.filter(result => result.status !== 'EM ANDAMENTO')

        setTotalPages(_totalPages);
        setCurrentPage(page);
        setJobs((oldValue) => {
          if (page === 1) {
            return [...result];
          } else {
            return [...oldValue, ...result];
          }
        });
        setRefreshing(false);
      } catch (err) {
        setRefreshing(false);
        return Snackbar.show({
          text: t("jobError"),
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }
  }

  function handleJobStatusChange(status, index) {
    const newJobsList = [...jobs];
    newJobsList[index].status = status;
    setJobs(newJobsList);
  }

  function goToBriefing() {
    return navigation.navigate("BriefingCategorySelector");
  }

  function _renderHeader() {
    return (
      <>
        {user.type === "Cliente" && (
          <Button onPress={goToBriefing} style={styles.button}>
            {t("create")}
          </Button>
        )}
      </>
    );
  }

  function _renderFooter() {
    if (refreshing) {
      return <LoadingSpinner size="large" />;
    }
    return null;
  }

  return (
    <Container>
      <HeaderWithMenu style={styles.header} />
      <Header>
        <Text
          fontSize={20}
          color="#fff"
          fontFamily={"ClashDisplay-Bold"}
          mr={2}
        >
           {t("myjobs")}
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
      <VStack style={styles.container}>
        {!refreshing && jobs.length === 0 ? (
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {_renderHeader()}
            <AntDesign name="tago" color={theme.primaryColor} size={82} />
            <Text style={styles.paragrah}>{t("empty")}</Text>
          </ScrollView>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={jobs}
            ref={ref}
            keyExtractor={keyExtractor}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            onEndReached={() => onRefresh(currentPage + 1)}
            renderItem={({ item, index }) => (
              <View
               style={
                index === jobs.length - 1
                  ? styles.lastJobCard
                  : styles.jobCard
              }>
                {/* <VStack
                style={{
                  height: '100%',
                  width: '2%',
                  backgroundColor: '#71E5EC',
                }}></VStack> */}
                <JobCard
                  key={index}
                  style={{backgroundColor: '#00000000'}}
                  artistInJob={user.type === "Artista"}
                  job={
                    user.type === "Cliente" ? { id: item.id, job: item } : item
                  }
                  afterUpdate={(status) => handleJobStatusChange(status, index)}
                  routeJobs={true}
                />
              </View>
            )}
            ListFooterComponent={_renderFooter}
          />
        )}
         {ref && (
            <ButtonTop
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
            </ButtonTop>
          )}
      </VStack>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: "8%",
  },
  title: {
    marginBottom: 13,
    color: "#fff",
  },
  button: {
    marginBottom: 25,
    color: "#fff",
  },
  jobCard: {
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: "#282636",
    borderRadius: 25,
  },
  lastJobCard: {
    marginBottom: 64,
    flexDirection: 'row',
    backgroundColor: "#282636",
    borderRadius: 25,
  },
  container: {
    // height: 260,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#232131",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: "5%",
  },
  paragrah: {
    marginTop: 10,
    fontStyle: "italic",
    textAlign: "center",
    color: "#fff",
  },
  scrollView: {
    alignItems: "center",
    paddingTop: 12,
  },
});

export default Jobs;
