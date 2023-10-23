import React, {useState} from 'react';
import {Dimensions} from 'react-native';

import {Container, ContainerText} from './styles';

import {theme} from '../../constants/theme';

const screen = Dimensions.get('screen');

const buttonHeights = {
  link: '44px',
  primary: '63px',
  secondary: '47px',
  card: '26px',
  confirm: '48px',
};

const buttonWidths = {
  link: 'auto',
  primary: '100%',
  secondary: `${screen.width - 120}px`,
  card: '47.5%',
  confirm: '45%',
};

const buttonBackgrounds = {
  link: 'transparent',
  primary: theme.primaryButtonColor,
  secondary: theme.primaryColor,
  card: theme.primaryColor,
  confirm: theme.primaryColor,
};

const buttonBorderRadius = {
  link: '0px',
  primary: '32px',
  secondary: '32px',
  card: '5px',
  confirm: '10px',
};

const buttonAlignSelf = {
  link: 'flex-start',
  primary: 'center',
  secondary: 'center',
  card: 'center',
  confirm: 'flex-start',
};

const buttonTextColor = {
  link: theme.linkButtonColor,
  primary: theme.primaryTextColor,
  secondary: theme.primaryTextColor,
  card: theme.primaryTextColor,
  confirm: theme.primaryTextColor,
};

const buttonTextFontSize = {
  link: '14px',
  primary: '16px',
  secondary: '18px',
  card: '8px',
  confirm: '12px',
};

const buttonTextFontWeight = {
  link: '400',
  primary: '500',
  secondary: '500',
  card: '500',
  confirm: '500',
};

const buttonTextTransform = {
  link: 'none',
  primary: 'uppercase',
  secondary: 'none',
  card: 'uppercase',
  confirm: 'uppercase',
};

const Button = ({
  children,
  type = 'primary',
  icon = null,
  disabled,
  ...props
}) => {
  const [activeColor, setActiveColor] = useState(buttonBackgrounds[type]);

  return (
    <Container
      onPressIn={
        type === 'primary' ? () => setActiveColor(theme.primaryColor) : () => {}
      }
      onPressOut={
        type === 'primary'
          ? () => setActiveColor(theme.primaryButtonColor)
          : () => {}
      }
      activeOpacity={type === 'primary' ? 1 : 0.2}
      height={buttonHeights[type]}
      width={buttonWidths[type]}
      background={type === 'primary' ? activeColor : buttonBackgrounds[type]}
      borderRadius={buttonBorderRadius[type]}
      alignSelf={buttonAlignSelf[type]}
      disabled={disabled}
      {...props}>
      {icon && icon}
      {!icon && (
        <ContainerText
          disabled={disabled}
          color={buttonTextColor[type]}
          fontSize={buttonTextFontSize[type]}
          fontWeight={buttonTextFontWeight[type]}
          textTransform={buttonTextTransform[type]}>
          {children}
        </ContainerText>
      )}
    </Container>
  );
};

export default Button;
