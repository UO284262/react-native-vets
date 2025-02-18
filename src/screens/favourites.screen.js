import { useContext } from "react";
import { TouchableOpacity, FlatList } from "react-native";

import { FavouritesContext } from "../data/favourites.context";
import { VetInfoCardComponent } from "../components/vet-info-card.component";
import { Text } from "../theme/typography";
import { NoFavouritesYet } from "../theme/styles";

export const FavouritesScreen = ({ navigation }) => {
  const favouritesContext = useContext(FavouritesContext);

  return favouritesContext.favourites.length ? (
    <>
      <FlatList
        data={favouritesContext.favourites}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("VetDetailScreen", {
                  vet: item,
                })
              }
            >
              <VetInfoCardComponent vet={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </>
  ) : (
    <NoFavouritesYet>
      <Text center>No favourites yet</Text>
    </NoFavouritesYet>
  );
};
