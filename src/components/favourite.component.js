import { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FavouritesContext } from "../data/favourites.context";
import { FavouriteButton } from "../theme/styles";
export const FavouriteComponent = ({ vet }) => {
  const favouritesContext = useContext(FavouritesContext);
  const isFavourite = favouritesContext.favourites.find(
    (v) => v.placeId === vet.placeId,
  );
  return (
    <FavouriteButton
      onPress={() =>
        !isFavourite
          ? favouritesContext.add(vet)
          : favouritesContext.remove(vet)
      }
    >
      <AntDesign
        name={isFavourite ? "heart" : "hearto"}
        size={25}
        color={isFavourite ? "red" : "white"}
      />
    </FavouriteButton>
  );
};
