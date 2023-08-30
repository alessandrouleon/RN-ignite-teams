import { Header } from "@components/Header";
import { Container } from "./styles";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { groupGetAll } from "@storage/groups/groupGetAll";
import { Loading } from "@components/Loading";

export function Groups() {
  const [isLoading, setLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new");
  }

  async function fetchGroups() {
    try {
      setLoading(true);
      const data = await groupGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Nova turma", "Não foi possivel criar a turma!");
    } finally {
      setLoading(false);
    }
  }

  function handleOpenGroups(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com sua turna" />
     { isLoading ? <Loading /> :
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} onPress={() => handleOpenGroups(item)} />}
        contentContainerStyle={
          groups.every((group) => group) ? { flex: 1 } : null
        }
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar um novo grupo!" />
        )}
      />
        }
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
