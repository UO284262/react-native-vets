import styled from "styled-components/native";
import {
  ActivityIndicator,
  TextInput,
  Avatar,
  Button,
  List,
  Card,
} from "react-native-paper";
import { colors } from "./colors";
import { sizes } from "./sizes";
import { ImageBackground, TouchableOpacity, Image } from "react-native";
import { WebView } from "react-native-webview";
import MapView from "react-native-maps";
import { CameraView } from "expo-camera";

export const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;
export const VetType = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;
export const Details = styled.View`
  flex-direction: row;
`;
export const Icon = styled.Image`
  width: ${(props) => props.theme.space[4]};
  height: ${(props) => props.theme.space[4]};
  margin-left: ${(props) => props.theme.space[3]};
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const IsOpened = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Loading = styled(ActivityIndicator).attrs({
  size: sizes[3],
  animating: true,
  color: colors.animation,
})`
  margin-left: -25px;
`;

export const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const VetCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.card};
  margin: ${(props) => props.theme.space[2]};
`;

export const VetCardCover = styled(Card.Cover)`
  background-color: ${(props) => props.theme.colors.card};
  padding: ${(props) => props.theme.space[3]};
`;

export const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: ${(props) => props.theme.space[4]};
  right: ${(props) => props.theme.space[4]};
  z-index: 1;
`;

export const CompactWebview = styled(WebView)`
  width: 110px;
  height: 110px;
  border-radius: 5px;
`;
export const FavouritesWrapper = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;
export const Item = styled.View`
  width: ${(props) => props.theme.space[6]};
  height: ${(props) => props.theme.space[6]};
  padding: ${(props) => props.theme.space[1]};
  margin-right: ${(props) => props.theme.space[1]};
  align-items: center;
`;

export const ButtonsSpace = styled.View`
  justify-content: center;
  flex-direction: row;
  padding: ${(props) => props.theme.space[1]};
`;
export const ContactButton = styled(Button).attrs({
  buttonColor: colors.button,
  textColor: colors.textButton,
})`
  padding: ${(props) => props.theme.space[0]};
  margin: ${(props) => props.theme.space[1]};
`;

export const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const AvatarContainer = styled.View`
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
`;
export const AvatarIcon = styled(Avatar.Icon).attrs({
  size: 180,
  backgroundColor: colors.button,
})``;
export const AvatarImage = styled(Avatar.Image).attrs({
  size: 180,
})``;
export const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

export const CameraViewer = styled(CameraView)`
  flex: 1;
`;
export const CameraContainer = styled(TouchableOpacity)`
  flex: 1;
`;
export const NoFavouritesYet = styled.View`
  align-items: center;
  justify-content: center;
`;

export const AccountBackground = styled(ImageBackground).attrs({
  source: require("../../assets/background.jpg"),
})`
  flex: 1;
`;

export const AccountBackgroundFilter = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.7);
  justify-content: center;
  align-items: center;
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin: ${(props) => props.theme.space[3]};
`;

export const AnimatedImage = styled(Image).attrs({
  source: require("../../assets/animation.gif"),
})`
  width: ${(props) => props.theme.space[9]};
  height: ${(props) => props.theme.space[7]};
  margin-bottom: ${(props) => props.theme.space[4]};
`;

export const AuthButton = styled(Button).attrs({
  buttonColor: colors.button,
})`
  width: ${(props) => props.theme.space[8]};
  padding: ${(props) => props.theme.space[2]};
  margin: ${(props) => props.theme.space[2]};
`;

export const Title = styled.Text`
  font-size: ${(props) => props.theme.sizes[2]};
  font-weight: bold;
`;

export const AuthInput = styled(TextInput)`
  width: ${(props) => props.theme.space[8]};
  margin: ${(props) => props.theme.space[2]};
`;
export const ErrorContainer = styled.View`
  height: ${(props) => props.theme.space[3]};
`;
