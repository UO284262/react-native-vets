import React, { useState, createContext } from "react";

import { loginRequest, createUserRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    setIsLoading(true);
    setError(null);
    setUser(null);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    setError(null);
    setUser(null);
    if (password !== repeatedPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    createUserRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  const onLogout = () => {
    setIsLoading(false);
    setError(null);
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
