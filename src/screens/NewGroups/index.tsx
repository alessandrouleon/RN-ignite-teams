import { useNavigation } from "@react-navigation/native";
import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useState } from "react";
import { groupCreate } from "@storage/groups/groupCreate";
import { AppErro } from "@utils/AppErros";
import { Alert } from "react-native";
import { groupMessage } from "@utils/MessageErro";

export function NewGroups() {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  async function handleNew() {
    try {
      if(group.trim().length === 0){
       return Alert.alert("Nova turma", groupMessage.GROUP_EMPT);
      }
      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if(error instanceof AppErro){
      Alert.alert("Nova turma", error.message);
      }else {
        Alert.alert("Nova turma", groupMessage.GROUP_CHECK_ADM)
      }
      console.error(error);
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova Turma"
          subtitle="crie a turma para adicionar novas pessoas"
        />
        <Input placeholder="Nome da Turma" onChangeText={setGroup} />
        <Button title="Criar" onPress={handleNew} />
      </Content>
    </Container>
  );
}
