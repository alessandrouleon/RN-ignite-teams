import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { AppErro } from "@utils/AppErros";
import { playerGetByGroup } from "./playerGetBayGroup";
import { playerMessage } from "@utils/MessageErro";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string){
 try {
  const storagePlayers = await playerGetByGroup(group);
  const playerAlreadyExists = storagePlayers.filter(player => player.name === newPlayer.name);

  if(playerAlreadyExists.length > 0){
   throw new AppErro(playerMessage.PLAYER_EXIST);
  }
  const storage = JSON.stringify([...storagePlayers, newPlayer]);

 await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);

  }catch(error) {
 throw (error)
  
 }
}