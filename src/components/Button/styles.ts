import { TouchableOpacity } from "react-native";
import { styled, css } from "styled-components/native";

export type ButtonStylesProps = "PRIMARY" | "SECONDARY";

interface Props {
  type: ButtonStylesProps;
}

export const Container = styled(TouchableOpacity)<Props>`
  flex: 1;
  max-height: 56px;
  min-height: 56px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${({ theme, type }) =>
    type === "PRIMARY" ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
`;

export const Title = styled.Text`
  /* text-transform: uppercase; */

  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `}
`;
