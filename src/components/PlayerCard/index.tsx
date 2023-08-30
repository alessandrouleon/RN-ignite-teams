import { MaterialIcons } from "@expo/vector-icons";
import { Container, Icon, Name } from "./styles";
import { ButtonIcon } from "@components/ButtonIcon";

interface Props {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onRemove: () => void;
}
export function PlayerCard({ name, icon, onRemove }: Props) {
  return (
    <Container>
      <Icon name={icon} />
      <Name>{name}</Name>
      <ButtonIcon icon="delete" type="SECONDARY" onPress={onRemove} />
    </Container>
  );
}
