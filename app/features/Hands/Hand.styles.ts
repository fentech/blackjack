import styled from "styled-components/native";
import { Text } from "@ui-kitten/components";

export const Container = styled.View`
  margin-bottom: 30px;
`;

export const Name = styled(Text)`
  font-size: 24px;
  line-height: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const CardContainer = styled.View`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
`;
