import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { privateAxios } from "../utils/axios";
import { config } from "../config/config";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    authenticated: false,
  });

  const [isBudgetExsist, setIsBudgetExist] = useState(false);
  const [isBudgetExpire, setIsBudgetExpire] = useState(true);
  const [mainLoadingVisible, setMainLoadingVisible] = useState(true);
  const [isHealthy, setIsHealthy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      setAuth({
        user: null,
        token: null,
        authenticated: false,
      });
      try {
        const token = await SecureStore.getItemAsync("TOKEN_KEY");
        const user = await SecureStore.getItemAsync("USER_DETAILS");

        if (token) {
          console.log(token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          setAuth({
            user: user,
            token: token,
            authenticated: true,
          });
          checkBugetExist(user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadToken();
  }, []);

  const register = async (user_name, email, password) => {
    return await axios.post(`${config.BASE_URL}/api/v1/auth/register/`, {
      user_name,
      email,
      password,
    });
  };

  async function checkBugetExist(user) {
    setMainLoadingVisible(true);
    try {
      if (user) {
        const result = await axios.get(
          `${config.BASE_URL}/api/v1/budget/${user}`
        );
        const givenDate = new Date(result?.data?.data?.next_budget_renew_date);

        setIsBudgetExist(true);
        //setIsBudgetExpire(true);

        if (isDateInFuture(givenDate)) {
          console.log("i am in the date check");
          setIsBudgetExpire(false);
        }

        setMainLoadingVisible(false);
      } else {
        logout();
      }
    } catch (error) {
      console.log("ERROR1", error);
      setIsBudgetExist(false);
      setIsBudgetExpire(false);
      setMainLoadingVisible(false);
      // if (error?.response?.data?.data == null) {
        
        
      // }
    }
  }

  function isDateInFuture(date) {
    const currentDate = new Date();
    return date > currentDate;
  }

  const login = async (email, password) => {
    try {
      const result = await axios.post(`${config.BASE_URL}/api/v1/auth/login/`, {
        email,
        password,
      });

      //console.log(result?.data?.data);

      setAuth({ 
        user: result?.data?.data?._id,
        token: result?.data?.data?.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync("TOKEN_KEY", result?.data?.data?.token);
      await SecureStore.setItemAsync("USER_DETAILS", result?.data?.data?._id);
      checkBugetExist(result?.data?.data?._id);
    } catch (error) {
      console.log(`${e.message}:`, error);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("TOKEN_KEY");
    } catch (error) {
      console.log(`${e.message}:`, error);
    }

    axios.defaults.headers.common["Authorization"] = "";
    setAuth({
      token: null,
      authenticated: false,
    });

    setIsBudgetExist(false);
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    isBudgetExsist,
    auth,
    checkBugetExist,
    isBudgetExpire,
    mainLoadingVisible,
    isHealthy,
    setIsHealthy,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
