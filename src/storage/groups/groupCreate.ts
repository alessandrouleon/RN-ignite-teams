import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";
import { AppErro } from "@utils/AppErros";
import { groupMessage } from "@utils/MessageErro";

export async function groupCreate(newGroup: string) {
  try {
    const storadGroups = await groupGetAll();
   
   const groupAlreadyExists = storadGroups.includes(newGroup);
  
   if(groupAlreadyExists){
     throw new AppErro(groupMessage.GROUP_EXIST);
   }
    const storage = JSON.stringify([...storadGroups, newGroup])
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
