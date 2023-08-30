import { playerGetByGroup } from "./playerGetBayGroup";

export async function playerGetByGroupAndTeam( group: string, team: string ) {
  try {
    const storage = await playerGetByGroup(group);
    const players = storage.filter((player) => player.team === team);
    players.sort((first, last) => last.id - first.id);
    
    return players;
  } catch (error) {
    throw { error };
  }
}
