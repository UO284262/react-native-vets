import { createStackNavigator } from "@react-navigation/stack";
import { VetsScreen } from "../screens/vets.screen";
import { VetDetailScreen } from "../screens/vet-detail.screen";

const VetsStack = createStackNavigator();
export const VetsNavigator = () => (
  <VetsStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <VetsStack.Screen name="VetsScreen" component={VetsScreen} />
    <VetsStack.Screen name="VetDetailScreen" component={VetDetailScreen} />
  </VetsStack.Navigator>
);
