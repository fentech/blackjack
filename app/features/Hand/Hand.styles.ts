import styled from "styled-components/native";
import { Text } from "@ui-kitten/components";

export const Container = styled.View`
  ${({ $last }: { $last: boolean }) => (!$last ? "margin-bottom: 20px;" : null)}
  align-items: flex-start;
`;

export const Name = styled(Text)`
  font-size: 24px;
  line-height: 24px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const CardContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  align-self: flex-start;
  flex-wrap: wrap;
  background-color: #fff0;
  overflow: hidden;
`;
