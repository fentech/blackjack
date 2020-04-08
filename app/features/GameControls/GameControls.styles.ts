import styled from "styled-components/native";
import { Button as KittenButton } from "@ui-kitten/components";

export const Container = styled.View`
  flex: ${(props: { $flex?: number }) => props.$flex || 1};
  margin-bottom: 30px;
`;

export const Button = styled(KittenButton)`
  margin-bottom: 20px;
  min-width: 200px;
`;
