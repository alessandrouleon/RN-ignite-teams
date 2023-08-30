import { TouchableOpacity } from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
import { styled } from "styled-components/native";

export type ButtonIconStypesProps = 'PRIMARY'| 'SECONDARY';

interface Props {
  type: ButtonIconStypesProps;
}

export const Container = styled(TouchableOpacity)`
  min-height: 56px;
  max-height: 56px;
  align-items: flex-end;
  justify-content: center;
  margin-right: 16px;
`;

export const Icon = styled(MaterialIcons).attrs<Props>(({theme, type}) => ({
  size: 24,
  color: type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK
}))``;
