import { createStackNavigator } from "@react-navigation/stack";
import { SettingsScreen } from "../screens/settings.screen";
import { CameraScreen } from "../screens/camera.screen";
import { FavouritesScreen } from "../screens/favourites.screen";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = () => (
  <SettingsStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
    <SettingsStack.Screen
      name="FavouritesScreen"
      component={FavouritesScreen}
    />
    <SettingsStack.Screen name="CameraScreen" component={CameraScreen} />
  </SettingsStack.Navigator>
);
