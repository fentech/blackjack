import { Layout } from "@ui-kitten/components";
import styled from "styled-components/native";
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("screen").width;
const handWrapperWidth = deviceWidth * 0.8;

export const GameWrapper = styled(Layout)`
  padding: 60px 4% 0;
  flex: 1;
`;

export const HandContainer = styled.View`
  flex: 3;
  justify-content: flex-start;
  align-items: center;
`;

export const HandWrapper = styled(Layout)`
  justify-content: space-evenly;
  width: ${handWrapperWidth}px;
  padding: 30px;
  margin: 20px 0;
  border-radius: 8px;
`;
