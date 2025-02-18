import { registerRootComponent } from "expo";

import App from "./App";

import { colors } from "./src/theme/colors";
import { space } from "./src/theme/spacing";
import { sizes } from "./src/theme/sizes";
import { fonts, fontWeights, fontSizes } from "./src/theme/fonts";

export const theme = {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  sizes,
  space,
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
