import { useState, createContext, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../services/authentication.context";
export const FavouritesContext = createContext();
export const FavouritesContextProvider = ({ children }) => {
  const authenticationContext = useContext(AuthenticationContext);
  const [favourites, setFavourites] = useState([]);
  const saveFavourites = (value, uid) => {
    const jsonValue = JSON.stringify(value);
    AsyncStorage.setItem(`@favourites-${uid}`, jsonValue)
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  const loadFavourites = (uid) => {
    AsyncStorage.getItem(`@favourites-${uid}`)
      .then((value) => {
        if (value !== null) {
          setFavourites(JSON.parse(value));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const add = (vet) => {
    setFavourites([...favourites, vet]);
  };

  const remove = (vet) => {
    const newFavourites = favourites.filter((v) => v.placeId !== vet.placeId);
    setFavourites(newFavourites);
  };

  useEffect(() => {
    if (authenticationContext.user) {
      loadFavourites(authenticationContext.user.uid);
    }
  }, [authenticationContext.user]);

  useEffect(() => {
    if (authenticationContext.user) {
      saveFavourites(favourites, authenticationContext.user.uid);
    }
  }, [favourites, authenticationContext.user]);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        add,
        remove,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
