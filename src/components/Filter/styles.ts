import { TouchableOpacity } from "react-native";
import { css, styled } from "styled-components/native";

export interface FilterStylesProps {
  isActive?: boolean;
}

export const Container = styled(TouchableOpacity)<FilterStylesProps>`
  width: 70px;
  height: 38px;

  align-items: center;
  justify-content: center;

  border-radius: 4px;
  margin-right: 12px;

  ${({ theme, isActive }) =>
    isActive &&
    css`
      border: 1px ${theme.COLORS.GREEN_700};
    `}
`;

export const Title = styled.Text`
  text-transform: uppercase;
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `}
`;

