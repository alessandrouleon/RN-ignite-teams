import { TouchableOpacityProps } from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
import { ButtonIconStypesProps, Container, Icon } from "./styles";

interface Props extends TouchableOpacityProps {
icon: keyof typeof MaterialIcons.glyphMap;
type?: ButtonIconStypesProps;
}
export function ButtonIcon({icon, type = 'PRIMARY', ...rest}: Props){
  return (
    <Container {...rest}>
     <Icon name={icon} type={type} />
    </Container>
  );
}