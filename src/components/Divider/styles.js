import styled from 'styled-components/native';

import {theme} from '../../constants/theme';

export const Container = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${theme.inputBorderColor};
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
`;
