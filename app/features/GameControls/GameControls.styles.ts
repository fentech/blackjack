import { Platform, TouchableHighlight, TouchableOpacity } from 'react-native';
import styled from "styled-components/native";

const OS = Platform.OS;

const ButtonBase = OS === "android" ? TouchableOpacity : TouchableHighlight;
export const Button = styled(ButtonBase)`
  padding: 20px;
  background-color: ${({ disabled }) => (disabled ? "#ddd" : "#e89")};
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;
