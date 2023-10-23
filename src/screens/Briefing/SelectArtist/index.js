/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useTranslation } from "react-i18next";
import Snackbar from "../../../components/Snackbar";
import { format } from "date-fns";
import { Text, HStack, VStack, ScrollView } from "native-base";
import {
  Container,
  Header,
  ArtistsScroll,
  ArtistsContainer,
  Body,
  Label,
} from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";

import HeaderWithMenu from "../../../components/HeaderWithMenu";
import Button from "../../../components/Button";
import Paragraph from "../../../components/Paragraph";
import ArtistSelector from "../../../components/ArtistSelector";
import SelectAll from "../../../components/SelectAll";
import { TouchableOpacity } from "react-native";

import { getArtists } from "../../../providers/briefing";
import { useAuth } from "../../../contexts/auth";
import { useModal } from "../../../contexts/modal";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { theme } from "../../../constants/theme";

const SelectArtists = ({ route, navigation }) => {
  const { openModal } = useModal();
  const { signed, user, createClientJob, setJob } = useAuth();
  const { t } = useTranslation("selectArtist");
  const { toSearch, sendToAll = false } = route.params;

  const [artists, setArtists] = useState([]);
  const [selectAll, setSelectAll] = useState(sendToAll);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    if (toSearch) {
      getFilteredArtists(toSearch);
    } else {
      getFilteredArtists({
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
    }
  }, []);

  useEffect(() => {
    checkIfDisabled();
    setSelected(artists.filter((artist) => artist.selected == true));
  }, [artists]);

  const getFilteredArtists = async (param) => {
    try {
      setLoading(true);
      const result = await getArtists(param);
      setLoading(false);
      const treatedArtists = result.map((artist) => {
        //console.log('art => ',artist);
        return {
          id: artist.id,
          name: artist.nick_name,
          selected: sendToAll,
          image: artist.image,
          photos: artist.photos,
          profile: artist,
        };
      });
      setArtists(treatedArtists.sort(() => Math.random() - 0.5));
    } catch (err) {
      setLoading(false);
      return Snackbar.show({
        text: "Nenhum artista encontrado",
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const handleSelectChange = (id) => {
    const newArtists = artists.map((artist) => {
      if (artist.id === id) {
        return { ...artist, selected: !artist.selected };
      }
      return artist;
    });

    setSelectAll(false);
    return setArtists(newArtists);
  };

  const handleSelectAll = () => {
    const newArtists = artists.map((artist) => {
      if (selectAll === false) {
        return { ...artist, selected: true };
      } else {
        return { ...artist, selected: false };
      }
    });

    setSelectAll(!selectAll);
    return setArtists(newArtists);
  };

  const handleSubmit = () => {
    const selectedArtists = artists.filter((artist) => artist.selected);
    const invites = selectedArtists.map((artist) => {
      return { id: artist.id };
    });
    let value = route.params.jobInfo.value.replace(".", "").replace(",", ".");

    const payload = {
      ...route.params.jobInfo,
      value: parseFloat(value),
      date: format(new Date(route.params.jobInfo.date), "yyyy-MM-dd"),
      full_address: route.params.jobInfo.location,
      invites,
    };

    if (signed) {
      const jobCreated = createClientJob(user, { ...payload, client: user.id });

      if (jobCreated) {
        return navigation.navigate("Jobs");
      }
    } else {
      setJob(payload);
      return navigation.navigate("BriefingLogin");
    }
  };

  const checkIfDisabled = () => {
    let disabled = true;

    for (const artist of artists) {
      if (artist.selected) {
        disabled = false;
        break;
      }
    }

    setSubmitDisabled(disabled);
  };

  const goToProfile = (artist) => {
    return navigation.navigate("ArtistProfile", {
      hideName: true,
      profile: artist,
    });
  };

  return (
    <Body>
      <HeaderWithMenu withGoBack style={styles.header} />
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
            width: "50%",
            opacity: 0.8,
          }}
        ></View>
      </HStack>
      <View
        style={{
          flex: 1,
          paddingTop: ".5%",
          backgroundColor: "#232131",
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
        }}
      >
        <Container>
          <Header>
            <HStack
              h={30}
              w="100%"
              alignItems="flex-start"
              justifyContent={"space-between"}
            >
              <SelectAll
                style={styles.selectAll}
                selected={selectAll}
                artistCount={artists.length}
                onSelectAll={handleSelectAll}
              />
              <Label>
                <Text fontSize={12}>{selected.length} Selecionados</Text>
              </Label>

              {/* <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  width: "25%",
                  height: "40%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#86FFFA",
                  borderRadius: 25,
                }}
              >
                <Text fontSize={14} fontFamily={"ClashDisplay-Bold"}>
                  {t("continueLabel")}
                </Text>
              </TouchableOpacity> */}
            </HStack>
          </Header>
          {loading ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <LoadingSpinner size="large" />
            </View>
          ) : artists.length === 0 ? (
            <ScrollView contentContainerStyle={styles.scrollView}>
              <AntDesign name="user" color={theme.primaryColor} style={{
                marginTop: 50
              }} size={82} />
              <Text style={styles.paragrah}>{t("empty")}</Text>
            </ScrollView>
          ) : (
            <FlatList
              style={{
                width: "100%",
                paddingHorizontal: 36,
                paddingTop: 16,
              }}
              data={artists}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-between",
              }}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) =>{ 
                //console.log(item);
                return (
                <ArtistSelector
                  style={styles.select}
                  artist={item}
                  onImagePress={() => goToProfile(item.profile)}
                  onSelectChange={handleSelectChange}
                />
              )}}
              ListFooterComponent={() => <VStack height={300} />}
            />
          )}

          {artists.length !== 0 && (
            <Button
              disabled={submitDisabled}
              onPress={handleSubmit}
              style={styles.button}
            >
              <Text
                fontSize={20}
                color="#232131"
                fontFamily={"ClashDisplay-Bold"}
                mr={2}
              >
                {t("continueLabel")}
              </Text>
            </Button>
          )}
        </Container>
      </View>
    </Body>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 14,
  },
  selectAll: {
    color: "#fff",
  },
  title: {
    marginBottom: 10,
  },
  divider: {
    marginBottom: 20,
  },
  select: {
    marginBottom: 15,
  },
  button: {
    position: "absolute",
    bottom: 115,
  },
  scrollView: {
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 12
  },
  paragrah: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    color: "#fff",
  },
});

export default SelectArtists;
