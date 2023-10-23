import React from 'react';
import RNSnackbar from 'react-native-snackbar';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {theme} from '../../constants/theme';

class Snackbar {
  static LENGTH_LONG = RNSnackbar.LENGTH_LONG;

  static show = ({text, duration}) => {
    return showMessage({
      message: 'Good Casting',
      description: text,
      duration: (4000+duration)
    });
  };
}

export default Snackbar;
