import { useState, useContext, createContext, useEffect } from "react";

import { LocationContext } from "./location.context";
import { vetsRequest, vetsTransform } from "./vets.service";

export const VetsContext = createContext();

export const VetsContextProvider = ({ children }) => {
  const [vets, setVets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const locationContext = useContext(LocationContext);

  const retrieveVets = (location) => {
    setIsLoading(true);
    setVets([]);

    vetsRequest(location)
      .then((result) => vetsTransform(result))
      .then((transformedResults) => {
        setIsLoading(false);
        setVets(transformedResults);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    if (locationContext.location) {
      const locationString = `${locationContext.location.lat},${locationContext.location.lng}`;
      retrieveVets(locationString);
    }
  }, [locationContext.location]);

  return (
    <VetsContext.Provider
      value={{
        vets,
        isLoading,
        error,
      }}
    >
      {children}
    </VetsContext.Provider>
  );
};
