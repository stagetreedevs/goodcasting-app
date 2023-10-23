import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChooseProfile from '../screens/ChooseProfile';
import Login from '../screens/Login';
import Terms from '../screens/Terms';
import Politics from '../screens/Politics';
import BriefingCategorySelector from '../screens/Briefing/CategorySelector';
import BriefingJobRegister from '../screens/Briefing/JobRegister';
import BriefingToSendProfiles from '../screens/Briefing/ToSendProfiles';
import BriefingGender from '../screens/Briefing/Gender';
import BriefingSelectProfile from '../screens/Briefing/SelectProfile';
import BriefingCharacteristicsTags from '../screens/Briefing/Characteristics/Tags';
import BriefingCharacteristicsSliders from '../screens/Briefing/Characteristics/Sliders';
import BriefingSelectArtist from '../screens/Briefing/SelectArtist';
import ArtistProfile from '../screens/ArtistProfile';
import ArtistCarousel from '../screens/ArtistCarousel';
import BriefingLogin from '../screens/Briefing/Login';
import BriefingRegisterFirstStep from '../screens/Briefing/Register/FirstStep';
import BriefingRegisterSecondStep from '../screens/Briefing/Register/SecondStep';
import BriefingRegisterThirdStep from '../screens/Briefing/Register/ThirdStep';

const Stack = createStackNavigator();

const UnauthRoutes = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ChooseProfile" component={ChooseProfile} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="Politics" component={Politics} />
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
      <Stack.Screen name="ArtistProfile" component={ArtistProfile} />
      <Stack.Screen name="ArtistCarousel" component={ArtistCarousel} />
      <Stack.Screen name="BriefingLogin" component={BriefingLogin} />
      <Stack.Screen
        name="BriefingRegisterFirstStep"
        component={BriefingRegisterFirstStep}
      />
      <Stack.Screen
        name="BriefingRegisterSecondStep"
        component={BriefingRegisterSecondStep}
      />
      <Stack.Screen
        name="BriefingRegisterThirdStep"
        component={BriefingRegisterThirdStep}
      />
    </Stack.Navigator>
  );
};

export default UnauthRoutes;
