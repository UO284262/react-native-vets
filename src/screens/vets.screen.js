import { useContext, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";

import { VetsContext } from "../services/vets.context";
import { VetInfoCardComponent } from "../components/vet-info-card.component";
import { LoadingContainer, Loading } from "../theme/styles";
import { FadeInAnimation } from "../animations/fade-in.animation";
import { FavouritesBarComponent } from "../components/favourites-bar.component";
import { FavouritesContext } from "../data/favourites.context";
import { SearchComponent } from "../components/search.component";
import { FilterComponent } from "../components/search-filter.component";

export const VetsScreen = ({ navigation }) => {
  const vetsContext = useContext(VetsContext);
  const favouritesContext = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);
  return (
    <>
      {vetsContext.isLoading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
      <FilterComponent
        colecion={vetsContext.vets}
        setFilterColection={vetsContext.setVets}
        filters={[
          ["name", "string", "contains"],
          ["rating", "numeric", "gte"],
          ["price", "numeric", "lte"],
          ["type", "selection", ["vet", "clinic"]],
        ]}
      />
      {isToggled && (
        <FavouritesBarComponent
          favourites={favouritesContext.favourites}
          onNavigate={navigation.navigate}
        />
      )}

      <FlatList
        data={vetsContext.vets}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("VetDetailScreen", {
                  vet: item,
                })
              }
            >
              <FadeInAnimation>
                <VetInfoCardComponent vet={item} />
              </FadeInAnimation>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </>
  );
};
