import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/auth/";

const register = (user) => {
  return axios.post(API_URL + "register", user);
};

const login = (data) => {
  return axios
    .post(API_URL + "login", data)
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  // let navigate = useNavigate();
  localStorage.removeItem("user");
  // navigate("/login");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
