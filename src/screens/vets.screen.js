import { useContext, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";

import { VetsContext } from "../services/vets.context";
import { VetInfoCardComponent } from "../components/vet-info-card.component";
import {
  LoadingContainer,
  Loading,
  NumericFilter,
  StringFilter,
  SelectionFilter,
} from "../theme/styles";
import { FadeInAnimation } from "../animations/fade-in.animation";
import { FavouritesBarComponent } from "../components/favourites-bar.component";
import { FavouritesContext } from "../data/favourites.context";
import { SearchComponent } from "../components/search.component";
import { FilterComponent } from "../components/filter.component";

export const VetsScreen = ({ navigation }) => {
  const vetsContext = useContext(VetsContext);
  const [vets, setVets] = useState(null);
  const favouritesContext = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);

  const filterStyle = {
    backgroundColor: "white",
    padding: 16,
  };

  const buttonStyle = {
    marginBottom: 10,
  };

  return (
    <>
      {vetsContext.isLoading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
      <SearchComponent
        from="vets"
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      <FilterComponent
        colection={vetsContext.vets}
        setFilterColection={setVets}
        style={filterStyle}
        buttonStyle={buttonStyle}
        filters={[
          ["name", "string", "contains"],
          ["rating", "numeric", "gte"],
          ["avgPrice", "numeric", "lte"],
          ["type", "selection", ["public", "private"]],
        ]}
      />
      {isToggled && (
        <FavouritesBarComponent
          favourites={favouritesContext.favourites}
          onNavigate={navigation.navigate}
        />
      )}

      <FlatList
        data={vets == null ? vetsContext.vets : vets}
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
