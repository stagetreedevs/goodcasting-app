import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  Linking,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Animated
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  BackgroundContainer,
  Background,
  Container,
  ButtonContainer,
  Header,
} from "./styles";
import Button from "../../components/Button";
import { isEmailValid } from "../../helpers/validation/email";
import VideoBackground from "../../components/VideoBackground";
import { useAuth } from "../../contexts/auth";
import { theme } from "../../constants/theme";

const ChooseProfile = ({ navigation }) => {
  const { t } = useTranslation("chooseProfile");
  const isFocused = useIsFocused();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { signIn } = useAuth();

  const [showVideo, setShowVideo] = useState(true);
  const [user, setUser] = useState("");
  const [pinLenght, setPinLenght] = useState(1);
  const [showOverlay, setShowOverlay] = useState(1);
  const windowWidth = Dimensions.get("window").width;
  useEffect(() => {
    if (isFocused) {
      setShowVideo(true);
    } else {
      setTimeout(() => {
        setShowVideo(false);
      }, 1500);
    }
  }, [isFocused]);
  useEffect(() => {
    const backAction = () => {
      setShowOverlay(1);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleGoToLogin = (type) => {
    return navigation.push("Login", type);
  };

  const handleGoToBriefingCategorySelector = () => {
    return navigation.push("BriefingCategorySelector");
  };
  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (payload.password.length <= 13) {
      setPinLenght(payload.password.length + 1);
    } else {
      setPinLenght(14);
    }
  }, [payload.password]);
  const handleSubmit = async (type) => {
    setLoadingSubmit(true);
    if (!isEmailValid(payload.username)) {
      setLoadingSubmit(false);
      return Snackbar.show({
        text: t("emailError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    if (payload.password.trim().length < 8) {
      setLoadingSubmit(false);
      return Snackbar.show({
        text: t("passwordError"),
        duraction: Snackbar.LENGTH_LONG,
      });
    }
    await signIn(
      { username: payload.username.toLowerCase(), password: payload.password },
      type
    );
    setLoadingSubmit(false);
  };
  const goToRegister = () => navigation.navigate("BriefingRegisterFirstStep");

  const overlay1 = (
    <>
      <Button
        onPress={handleGoToBriefingCategorySelector}
        style={styles.button}
      >
        {t("register")}
      </Button>
      <Button
        onPress={() => {
          handleGoToLogin("Cliente");
        }}
        style={styles.button}
      >
        {t("goToClient")}
      </Button>
      <Button
        onPress={() => {
          handleGoToLogin("Artista");
        }}
        style={styles.button}
      >
        {t("goToArtist")}
      </Button>
    </>
  );

  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : ""}
      keyboardVerticalOffset={40}
    >
      <Container>
        <BackgroundContainer>
          {/* <Background source={bg} /> */}
        </BackgroundContainer>
        {showVideo && <VideoBackground />}
        <ButtonContainer>
          <View style={styles.view}>
            {showOverlay == 1 && overlay1}
          </View>
        </ButtonContainer>
        <StatusBar backgroundColor="#004353" />
      </Container>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  button: {
    height: "20%",
    color: "#000",
  },
  image: {
    width: "100%",
    height: "100%",
    top: 0,
    position: "absolute",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    opacity: 0.85
  },
  view: {
    paddingTop: 38,
    padding: 32,
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  gdd: {
    width: 125,
    height: "100%",
  },
  headerButtons: {
    width: 50,
    height: 50,
    borderColor: "#00000010",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
  },
  headerButtonsIcons: {
    width: "50%",
    height: "50%",
    color: "#000",
  },
  Text: {
    color: "#000",
    fontSize: 16,
  },
  userIcon: {
    width: 75,
    height: 75,
    position: "absolute",
    top: -37.5,
  },
});

export default ChooseProfile;
