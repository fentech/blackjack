import React from "react";
import { Layout } from "@ui-kitten/components";
import styled from "styled-components/native";
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("screen").width;
const handWrapperWidth = deviceWidth * 0.8;

const HandsScrollView = styled.ScrollView`
  flex: 3;
`;

export const HandsContainer: React.FC<Testable> = ({ children, testID }) => (
  <HandsScrollView
    contentContainerStyle={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
    testID={testID}
  >
    {children}
  </HandsScrollView>
);

export const HandsWrapper = styled(Layout)`
  width: ${handWrapperWidth}px;
  padding: 30px;
  border-radius: 8px;
`;
