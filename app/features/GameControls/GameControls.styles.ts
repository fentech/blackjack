import styled from "styled-components/native";
import { Button as KittenButton } from "@ui-kitten/components";

export const Container = styled.View`
  margin-bottom: 30px;
`;

export const Button = styled(KittenButton)`
  margin-bottom: ${(props: { $last?: boolean }) => (props.$last ? 0 : 20)}px;
  min-width: 200px;
`;
