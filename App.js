import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import {
  useFonts as useNunito,
  Nunito_400Regular,
} from "@expo-google-fonts/nunito";
import {
  useFonts as useRoboto,
  RobotoMono_700Bold,
} from "@expo-google-fonts/roboto-mono";

import { theme } from "./index";
import { Navigator } from "./src/navigators";
import { AuthenticationContextProvider } from "./src/services/authentication.context";

export default function App() {
  const [nunitoLoaded] = useNunito({
    Nunito_400Regular,
  });
  const [robotoLoaded] = useRoboto({
    RobotoMono_700Bold,
  });
  if (!nunitoLoaded || !robotoLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigator />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
