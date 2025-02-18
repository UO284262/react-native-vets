import {
  AccountBackground,
  AccountBackgroundFilter,
  AccountContainer,
  AnimatedImage,
  AuthButton,
  Title,
} from "../theme/styles";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountBackgroundFilter>
        <AnimatedImage />
        <Title>FindVet</Title>
        <AccountContainer>
          <AuthButton
            icon="login"
            mode="contained"
            onPress={() => navigation.navigate("LoginScreen")}
          >
            LOGIN
          </AuthButton>
          <AuthButton
            icon="account-plus"
            mode="contained"
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            REGISTER
          </AuthButton>
        </AccountContainer>
      </AccountBackgroundFilter>
    </AccountBackground>
  );
};
