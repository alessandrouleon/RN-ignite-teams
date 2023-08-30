import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Groups } from "@screens/Groups";
import { NewGroups } from "@screens/NewGroups";
import { Players } from "@screens/Players";

export function AppRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="groups" component={Groups} />
      <Screen name="new" component={NewGroups} />
      <Screen name="players" component={Players} />
    </Navigator>
  );
}
