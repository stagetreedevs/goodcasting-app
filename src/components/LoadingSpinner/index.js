import React from 'react';
import { ActivityIndicator } from 'react-native';

import { theme } from '../../constants/theme.js';

// size types small - large

const LoadingSpinner = ({
    size='small',
    ...props
}) => {

    return (<ActivityIndicator size={size} color={theme.primaryButtonColor} {...props} />)
}

export default LoadingSpinner;