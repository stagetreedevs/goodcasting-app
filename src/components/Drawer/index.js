import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Linking, View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import { getVersion } from 'react-native-device-info';
import {Container, Logo, OptionsContainer, Option, BottomContainer} from './styles';

import LogoImage from '../../../assets/images/logo.png';
import LogoStage from '../../../assets/images/stage.png';

import LinearGradient from 'react-native-linear-gradient';
import Divider from '../Divider';

import { theme } from '../../constants/theme';
import {useAuth} from '../../contexts/auth';
import { Text } from 'native-base';

function Drawer({navigation}) {
  const {user} = useAuth();
  const {t} = useTranslation('drawer');

  const [options, setOptions] = useState([
    {
      id: 1,
      name: t('contact'),
      component: 'Contact',
    },
    {
      id: 2,
      name: t('settings'),
      component: 'Settings',
    },
    {
      id: 3,
      name: t('signout'),
      component: 'Exit',
    },
  ]);

  useEffect(() => {
    if (user.type === 'Artista') {
      setOptions([
        {
          id: 1,
          name: t('contact'),
          component: 'Contact',
        },
        // {
        //   id: 2,
        //   name: t('payment'),
        //   component: 'ChoosePayment',
        // },
        {
          id: 3,
          name: t('settings'),
          component: 'Settings',
        },
        {
          id: 4,
          name: t('signout'),
          component: 'Exit',
        },
      ]);
    }
  }, [user]);

  const handleNavigate = route => navigation.navigate(route);

  return (
    <View style={{backgroundColor: "#232131", flex: 1}}>
      <Container>
        <LinearGradient colors={["#3AB5EA", "#34B797"]} useAngle={true} angle={90} angleCenter={{x:0.1, y:0.5}}
        style={{
          height: '27.5%',
          borderBottomRightRadius: 125,
          alignItems: 'center',
          justifyContent: 'center'
        }}>

        <Logo source={LogoImage}/>
          </LinearGradient>
        <OptionsContainer>
          {options.map(option => (
            <Option
            key={option.id}
              onPress={
                option.customFunction
                  ? () => option.customFunction()
                  : () => handleNavigate(option.component)
              }>
              <Text color={'#fff'} style={styles.buttonText} fontFamily="Karla-Bold">
                {option.name}
              </Text>
              <Divider />
            </Option>
          ))}
        </OptionsContainer>
      </Container>
      <BottomContainer>
        <Text color={'#fff'} type='normal'>
          v{getVersion()}
        </Text>
        {/* <TouchableOpacity onPress={() => Linking.openURL('https://stagetree.com.br/')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text color={'#fff'} type='small' style={{ fontSize: 14, marginRight: 8}}>
              Developed by 
            </Text>
            <Image source={LogoStage} resizeMode="contain" style={{height: 75, width: 75}} />
          </View>
        </TouchableOpacity> */}
      </BottomContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    marginBottom: 16,
  },
});

export default Drawer;
