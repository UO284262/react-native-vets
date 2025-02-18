import { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { List, Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../services/authentication.context";

import { Text } from "../theme/typography";
import {
  AvatarContainer,
  AvatarIcon,
  AvatarImage,
  SettingsItem,
} from "../theme/styles";

export const SettingsScreen = ({ navigation }) => {
  const authenticationContext = useContext(AuthenticationContext);
  const [picture, setPicture] = useState(null);

  useFocusEffect(() => {
    AsyncStorage.getItem(`@picture-${authenticationContext.user.uid}`)
      .then((p) => {
        setPicture(p);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const iconHeart = () => <List.Icon color="green" icon="heart" />;
  const iconDoor = () => <List.Icon color="green" icon="door" />;

  return (
    <>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
          {!picture && <AvatarIcon icon="human" />}
          {picture && <AvatarImage source={{ uri: picture }} />}
        </TouchableOpacity>
        <Text variant="label">{authenticationContext.user.email}</Text>
      </AvatarContainer>

      <Divider />
      <List.Section>
        <SettingsItem
          title="Favourites"
          description="View your favourites"
          left={iconHeart}
          onPress={() => navigation.navigate("FavouritesScreen")}
        />
        <Divider />
        <SettingsItem
          title="Logout"
          left={iconDoor}
          onPress={authenticationContext.onLogout}
        />
      </List.Section>
      <Divider />
    </>
  );
};
