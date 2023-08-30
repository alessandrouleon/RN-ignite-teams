import { TouchableOpacityProps } from "react-native";
import { Container, Title, ButtonStylesProps } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
  type?: ButtonStylesProps;
}
export function Button({title, type = 'PRIMARY', ...rest}: Props) {
 
  return(
  <Container
   type={type}
   {...rest}
   >
  <Title>{title}</Title>
  </Container>
  );
}