import { useContext, useState } from "react";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "../services/location.context";
import { SearchContainer } from "../theme/styles";
export const SearchComponent = ({
  from,
  isFavouritesToggled,
  onFavouritesToggle,
}) => {
  const context = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(context.searchKeyword);
  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a location"
        icon={
          from === "map"
            ? "map"
            : isFavouritesToggled
              ? "heart"
              : "heart-outline"
        }
        onIconPress={onFavouritesToggle}
        value={searchKeyword}
        onSubmitEditing={() => {
          context.onSearch(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
