import { useState, useContext } from "react";
import { AuthenticationContext } from "../services/authentication.context";

import {
  AccountBackground,
  AccountBackgroundFilter,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Loading,
  LoadingContainer,
  Title,
} from "../theme/styles";
import { Text } from "../theme/typography";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authenticationContext = useContext(AuthenticationContext);
  return (
    <AccountBackground>
      <AccountBackgroundFilter>
        <Title>Findvet</Title>
        <AccountContainer>
          <AuthInput
            label="E-mail"
            value={email}
            autoCapitalize="none"
            onChangeText={(u) => setEmail(u)}
          />
          <AuthInput
            label="Password"
            value={password}
            secureTextEntry
            autoCapitalize="none"
            secure
            onChangeText={(p) => setPassword(p)}
          />
          <ErrorContainer>
            <Text variant="error">{authenticationContext.error}</Text>
          </ErrorContainer>
          <AuthButton
            icon="login"
            mode="contained"
            onPress={() => authenticationContext.onLogin(email, password)}
          >
            LOGIN
          </AuthButton>
        </AccountContainer>
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
        {authenticationContext.isLoading && (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        )}
      </AccountBackgroundFilter>
    </AccountBackground>
  );
};
