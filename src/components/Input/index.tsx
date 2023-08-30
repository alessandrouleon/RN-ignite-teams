import { useTheme } from "styled-components/native";
import { Container } from "./styles";
import { TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  inputRef?: React.RefObject<TextInput>;
}

export function Input({ inputRef, ...rest }: Props) {
  const { COLORS } = useTheme();

  return <Container ref={inputRef} placeholderTextColor={COLORS.GRAY_200} {...rest} />;
}
