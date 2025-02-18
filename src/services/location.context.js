import { useState, createContext, useEffect } from "react";

import { locationRequest } from "./location.service";

export const LocationContext = createContext();

export const LocationsContextProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("Oviedo");

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    if (!keyword) {
      return;
    }
    locationRequest(keyword.toLowerCase())
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        location,
        isLoading,
        error,
        onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
