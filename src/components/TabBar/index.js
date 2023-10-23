import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { useAuth } from "../../contexts/auth";
import axios from "axios";
import { theme } from "../../constants/theme";
import LinearGradient from "react-native-linear-gradient";

function TabBar({ state, descriptors, navigation, user }) {
  const { signOut } = useAuth();
  const handleGoToBriefingCategorySelector = async () => {
    await navigation.navigate("Jobs");
    return navigation.navigate("BriefingCategorySelector");
  };
  const [height, setHeight] = useState();
  useEffect(() => {
    if (user.type === "Artista") {
      setHeight("10%");
    } else {
      setHeight("15%");
    }
  }, []);
  return (
    <SafeAreaView
      style={{
        position: "absolute",
        bottom: -1,
        width: "100%",
        height: height,
        justifyContent: "flex-end",
        backgroundColor: "transparent",
      }}
    >
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          let iconName;
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Jobs") {
            iconName = "bookmark-outline";
          } else if (route.name === "Chats") {
            //iconName = "chatbox-ellipses-outline"; TEMPORARIO
            iconName = "tv-outline"
          } else if (route.name === "Notifications") {
            iconName = "notifications-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          } else if (route.name === "Plus") {
            iconName = "plus";
          }

          const isFocused = state.index === index;

          const onPress = () => {
            //console.log(route.name);
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              console.log(route.name);
              navigation.navigate(route.name);
            }
          };
          const chatPress = () => {
            Linking.openURL("https://wa.me/351936537633?text=Olá, pode me ajudar?");
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };
          if (route.name === "Plus") {
            if (user.type === "Artista") {
              return;
            }
            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                key={index}
                onPress={handleGoToBriefingCategorySelector}
                onLongPress={onLongPress}
                style={[
                  { transform: [{ rotate: "-90deg" }] },
                  styles.customButton,
                ]}
              >
                <LinearGradient
                  colors={["#8AF8FF", "#5B73F4"]}
                  useAngle={true}
                  angle={270}
                  angleCenter={{ x: 0.5, y: 0.55 }}
                  style={
                    {
                      width: "100%",
                      height: "100%",
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      borderColor: "#232131",
                      borderWidth: 6,
                      borderStyle: "solid",
                    }
                  }
                >
                  <Entypo name={iconName} size={38} color={theme.tagText} />
                </LinearGradient>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[isFocused ? styles.buttonFocused : styles.button]}
            >
              <Ionicons
                name={iconName}
                size={25}
                color={isFocused ? theme.primaryColor : theme.tagText}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 60,
    paddingHorizontal: "2%",
    backgroundColor: "#365A7C",
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  customButton: {
    backgroundColor: "transparent",
    width: 90,
    height: 90,
    borderRadius: 50,
    top: -35,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
  },
  buttonFocused: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;
