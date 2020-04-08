import styled from "styled-components/native";
import { Text } from "@ui-kitten/components";

export const HeaderContainer = styled.View`
  justify-content: space-between;
  flex: 1;
`;

export const Status = styled(Text)`
  font-size: 28px;
  line-height: 28px;
  text-align: center;
  flex: 2;
  font-weight: 300;
  letter-spacing: 1px;
`;

export const Title = styled(Text)`
  font-size: 45px;
  line-height: 45px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ChipsContainer = styled.View`
  justify-content: flex-end;
`;
