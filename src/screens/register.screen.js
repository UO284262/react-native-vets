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

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
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
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            secureTextEntry
            autoCapitalize="none"
            secure
            onChangeText={(p) => setRepeatedPassword(p)}
          />
          <ErrorContainer>
            <Text variant="error">{authenticationContext.error}</Text>
          </ErrorContainer>
          <AuthButton
            icon="account-plus"
            mode="contained"
            onPress={() =>
              authenticationContext.onRegister(
                email,
                password,
                repeatedPassword,
              )
            }
          >
            REGISTER
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
