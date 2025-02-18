import { ScrollView, TouchableOpacity } from "react-native";

import { VetInfoCompactComponent } from "./vet-info-compact.component";
import { FavouritesWrapper } from "../theme/styles";

export const FavouritesBarComponent = ({ favourites, onNavigate }) => {
  if (!favourites.length) {
    return null;
  }
  return (
    <FavouritesWrapper>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((vet) => {
          return (
            <TouchableOpacity
              key={vet.name}
              onPress={() =>
                onNavigate("VetDetailScreen", {
                  vet,
                })
              }
            >
              <VetInfoCompactComponent vet={vet} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </FavouritesWrapper>
  );
};
