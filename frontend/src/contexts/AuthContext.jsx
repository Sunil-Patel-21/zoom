import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: "http://localhost:4000/api/v1/users",
});

export const AuthProvider = ({ children }) => {
  const router = useNavigate();
  const [userData, setUserData] = useState({});

  const handleRegister = async (name, username, password) => {
    try {
      const request = await client.post("/register", { name, username, password });

      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      }
    } catch (error) {
      throw error.response?.data?.message || "Registration failed";
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const request = await client.post("/login", { username, password });

      if (request.status === httpStatus.OK) {
        localStorage.setItem("token", request.data.token);
        router("/home");
      }
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  };

  const value = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
