import { createStackNavigator } from "@react-navigation/stack";

import { AccountScreen } from "../screens/account.screen";
import { LoginScreen } from "../screens/login.screen";
import { RegisterScreen } from "../screens/register.screen";

const AccountStack = createStackNavigator();

export const AccountNavigator = () => (
  <AccountStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AccountStack.Screen name="MainScreen" component={AccountScreen} />
    <AccountStack.Screen name="LoginScreen" component={LoginScreen} />
    <AccountStack.Screen name="RegisterScreen" component={RegisterScreen} />
  </AccountStack.Navigator>
);
