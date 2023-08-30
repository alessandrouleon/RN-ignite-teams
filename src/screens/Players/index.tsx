import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute, useNavigation } from "@react-navigation/native";
import { playerMessage } from "@utils/MessageErro";
import { AppErro } from "@utils/AppErros";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/groups/groupRemoveByName";
import { Loading } from "@components/Loading";

interface Props {
  group: string;
}

export function Players() {
  const [isLoading, setLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const navigation = useNavigation();

  const route = useRoute();
  const { group } = route.params as Props;

  const playerNameRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim() === "") {
      return Alert.alert("Nova Pessoa", playerMessage.PLAYER_EMPT);
    }
    const newPlayer = {
      id: new Date().getTime(),
      name: newPlayerName,
      team,
    };
    try {
      await playerAddByGroup(newPlayer, group);
      playerNameRef.current?.blur();
      setNewPlayerName("");
      fetchPlayerByTeam();
    } catch (error) {
      if (error instanceof AppErro) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova Pessoa", playerMessage.PLAYER_CHECK_ADM);
      }
    }
  }

  async function fetchPlayerByTeam() {
    try {
      setLoading(true);
      const playerByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playerByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert("Pessoas", playerMessage.PLAYER_ERROR_LIST);
    } finally {
      setLoading(false);
    }
  }

  async function hanldePlayerRemove(playerName: string) {
    try {
      Alert.alert(
        "Remover Participante",
        `Deseja remover o participante: ${playerName}`,
        [
          { text: "Não", style: "cancel" },
          {
            text: "Sim",
            onPress: async () => {
              await playerRemoveByGroup(playerName, group);
              fetchPlayerByTeam();
            },
          },
        ]
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Remover pessoas", playerMessage.PLAYER_REMOVER);
    }
  }

  async function handleRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover turma", playerMessage.PLAYER_GROUP_REMOVER);
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      "Remover turma",
      `${playerMessage.PLAYER_REMOVE_GROUP_CONFIRME} ${group}`,
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: () => handleRemove() },
      ]
    );
  }

  useEffect(() => {
    fetchPlayerByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adiciona a galera e separe os times" />
      <Form>
        <Input
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          inputRef={playerNameRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B", "Time C"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      {isLoading ? <Loading /> : 
      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            icon="person"
            name={item.name}
            onRemove={() => hanldePlayerRemove(item.name)}
          />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há participante no time!" />
        )}
        showsVerticalScrollIndicator={false}
      />
      }
      <Button
        type="SECONDARY"
        title="Remover turma"
        onPress={handleGroupRemove}
      />
   
    </Container>
  );
}
