import { Platform } from 'react-native';
import styled from 'styled-components/native';

const os = Platform.OS;

export const Wrapper = styled.SafeAreaView`
  ${os === "ios" ? "margin: 0 20px;" : "padding: 0 4%;"};
  ${os === "android" ? "margin-top: 40px;" : "margin-top: 10px;"}
`;

export const Status = styled.Text`
  font-size: 28px;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 300;
  letter-spacing: 1px;
`;

export const Title = styled.Text`
  font-size: 40px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const HandContainer = styled.View`
  margin: 20px 0;
`;
