import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ArtistProfile from "../screens/ArtistProfile";
import ArtistProfilePhoto from "../screens/ArtistProfilePhoto";
import ArtistCarousel from "../screens/ArtistCarousel";
import ArtistsOnJob from "../screens/ArtistsOnJob";
import ToEvaluate from "../screens/ToEvaluate";
import Evaluation from "../screens/Evaluation";
import Jobs from "../screens/Jobs";
import Home from "../screens/Home";
import Inbox from "../screens/Inbox";
import ChatJobs from "../screens/ChatJobs";
import Chat from "../screens/Chat";
import Terms from "../screens/Terms";
import Politics from "../screens/Politics";
import Notifications from "../screens/Notifications";
import Contact from "../screens/Contact";
import ChoosePayment from "../screens/ChoosePayment";
import Settings from "../screens/Settings";
import Exit from "../screens/Exit";
import ConfirmCode from "../screens/ConfirmCode";
import TabBar from "../components/TabBar";
import CustomDrawer from "../components/Drawer";

import BriefingCategorySelector from "../screens/Briefing/CategorySelector";
import BriefingJobRegister from "../screens/Briefing/JobRegister";
import BriefingToSendProfiles from "../screens/Briefing/ToSendProfiles";
import BriefingGender from "../screens/Briefing/Gender";
import BriefingSelectProfile from "../screens/Briefing/SelectProfile";
import BriefingCharacteristicsTags from "../screens/Briefing/Characteristics/Tags";
import BriefingCharacteristicsSliders from "../screens/Briefing/Characteristics/Sliders";
import BriefingSelectArtist from "../screens/Briefing/SelectArtist";

import { useAuth } from "../contexts/auth";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const SafeArea = ({ Component, ...props }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Component {...props} />
    </SafeAreaView>
  );
};

const HomeRoutes = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ArtistsOnJob" component={ArtistsOnJob} />
      <Stack.Screen name="ToEvaluate" component={ToEvaluate} />
      <Stack.Screen name="Evaluation" component={Evaluation} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};
const HomeTemp = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={() => <Home tab={3}/>} />
      <Stack.Screen name="ArtistsOnJob" component={ArtistsOnJob} />
      <Stack.Screen name="ToEvaluate" component={ToEvaluate} />
      <Stack.Screen name="Evaluation" component={Evaluation} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

const JobRoutes = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Jobs" component={Jobs} />
      <Stack.Screen name="ArtistsOnJob" component={ArtistsOnJob} />
      <Stack.Screen name="ToEvaluate" component={ToEvaluate} />
      <Stack.Screen name="Evaluation" component={Evaluation} />
      <Stack.Screen
        name="BriefingCategorySelector"
        component={BriefingCategorySelector}
      />
      <Stack.Screen
        name="BriefingJobRegister"
        component={BriefingJobRegister}
      />
      <Stack.Screen
        name="BriefingToSendProfiles"
        component={BriefingToSendProfiles}
      />
      <Stack.Screen name="BriefingGender" component={BriefingGender} />
      <Stack.Screen
        name="BriefingSelectProfile"
        component={BriefingSelectProfile}
      />
      <Stack.Screen
        name="BriefingCharacteristicsTags"
        component={BriefingCharacteristicsTags}
      />
      <Stack.Screen
        name="BriefingCharacteristicsSliders"
        component={BriefingCharacteristicsSliders}
      />
      <Stack.Screen
        name="BriefingSelectArtist"
        component={BriefingSelectArtist}
      />
    </Stack.Navigator>
  );
};

const ChatRoutes = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Chats" component={Inbox} />
      <Stack.Screen name="ChatJobs" component={ChatJobs} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

const ProfileRoutes = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Profile" component={ArtistProfile} />
      <Stack.Screen name="ProfilePhoto" component={ArtistProfilePhoto} />
    </Stack.Navigator>
  );
};

const TabRoutes = () => {
  const { user } = useAuth();

  return (
    <Tab.Navigator tabBar={(props) => <TabBar user={user} {...props} />}>
      <Tab.Screen name="Home" component={HomeRoutes} />
      <Tab.Screen name="Jobs" component={JobRoutes} />
      <Tab.Screen name="Plus" component={HomeRoutes} />
      {/* <Tab.Screen name="Chats" component={ChatRoutes} /> TEMPORARIO*/}
      <Tab.Screen name="Chats" component={HomeTemp} />
      <Tab.Screen name="Notifications" component={Notifications} />
      {user.type === "Artista" && (
        <Tab.Screen name="Profile" component={ProfileRoutes} />
      )}
    </Tab.Navigator>
  );
};

const MainRoutes = () => {
  return (
    <Drawer.Navigator
      StackStyle={{ backgroundColor: "transparent" }}
      headerMode="none"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Tab">
        {(props) => <SafeArea Component={TabRoutes} {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="ArtistProfile">
        {(props) => <SafeArea Component={ArtistProfile} {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="ArtistCarousel">
        {(props) => <SafeArea Component={ArtistCarousel} {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Contact">
        {(props) => <SafeArea Component={Contact} {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="ChoosePayment">
        {(props) => <SafeArea Component={ChoosePayment} {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Settings">
        {(props) => <SafeArea Component={Settings} {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Exit" component={Exit} />
    </Drawer.Navigator>
  );
};

const FirstLoginRoute = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ConfirmCode" component={ConfirmCode} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="Politics" component={Politics} />
    </Stack.Navigator>
  );
};

const AuthRoutes = () => {
  const { user } = useAuth();

  return (
    <>
      {user.hasOwnProperty("first_login") ? (
        !user.first_login ? (
          <SafeAreaView style={styles.container}>
            <FirstLoginRoute />
          </SafeAreaView>
        ) : (
          <MainRoutes />
        )
      ) : (
        <MainRoutes />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AuthRoutes;
