import { createContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://localhost:8000";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    authenticated: null,
  });

  useEffect(()=>{
    const loadToken = async() =>{

      const token = SecureStore.getItemAsync(TOKEN_KEY);

      if(token){
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        setAuth({
          token: token,
          authenticated: true,
        });
      }

    }

    loadToken();
  },[])

  const register = async (username, email, password) => {
    try {
      return await axios.post(`${API_URL}/api/v1/auth/register/`, {
        username,
        email,
        password,
      });
    } catch (error) {
      console.log(`${e.message}:`, error);
    }
  };

  const login = async (email, password) => {
    try {
      const result = await axios.post(`${API_URL}/api/v1/auth/login/`, {
        email,
        password,
      });

      setAuth({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
    } catch (error) {
      console.log(`${e.message}:`, error);
    }
  };

  const logout = async (username, email, password) => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
      console.log(`${e.message}:`, error);
    }

    axios.defaults.headers.common["Authorization"] = "";
    setAuth({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    auth
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
