import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Container, Header } from "./styles";

import Gdd from "../../../assets/images/gdd.jpg";
import Arrow from "../../../assets/images/arrow.jpg";
import Menu from "../../../assets/images/menu.png";
import Bell from "../../../assets/images/bell.jpg";

import Button from "../Button";

import LogoImage from "../../../assets/images/logo.png";

import { theme } from "../../constants/theme";

const HeaderWithMenu = ({
  Route,
  customGoBack,
  withNotification = false,
  ...props
}) => {
  const navigation = useNavigation();

  const handleOpenMenu = () => {
    return navigation.toggleDrawer();
  };
  return (
    <Header {...props}>
      {Route ? (
        Route === "Home" ? (
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={() => {
              handleOpenMenu();
            }}
          >
            <Image
              source={Menu}
              resizeMode="cover"
              style={styles.headerButtonsIcons}
            />
          </TouchableOpacity>
        ) : (
          <Text
            style={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        )
      ) : (
        <TouchableOpacity
          style={styles.headerButtons}
          onPress={() => {
            if (customGoBack) {
              customGoBack();
            } else {
              navigation.goBack();
            }
          }}
        >
          <Image
            source={Arrow}
            resizeMode="cover"
            style={styles.headerButtonsIcons}
          />
        </TouchableOpacity>
      )}
      <Image source={Gdd} resizeMode="cover" style={styles.gdd} />
      {withNotification ? (
        <TouchableOpacity
          style={styles.headerButtons}
          onPress={() => {
            navigation.navigate("Notifications");
          }}
        >
          <Image
            source={Bell}
            resizeMode="cover"
            style={styles.headerButtonsIcons}
          />
        </TouchableOpacity>
      ) : (
        <Text
          style={{
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      )}
    </Header>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    height: 36,
  },
  gdd: {
    width: 90,
    height: "75%",
  },
  headerButtons: {
    width: 50,
    height: 50,
    borderColor: "#f1f1f140",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
  },
  headerButtonsIcons: {
    width: "50%",
    height: "50%",
  },
});

export default HeaderWithMenu;
