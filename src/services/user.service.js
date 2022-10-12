import axios from "axios";
import authHeader from "./Auth-header";



const API_URL = "http://localhost:8080/api/test/";

const createUser = (userParam) => {
  let userToken = "";
const user = JSON.parse(localStorage.getItem("user"));
userToken = user.accessToken;
  return axios
  .post(`http://localhost:8080/api/admin/new`, userParam, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const editUser = (userParam) => {
  let userToken = "";
const user = JSON.parse(localStorage.getItem("user"));
userToken = user.accessToken;
  return axios
  .put(`http://localhost:8080/api/admin/users`, userParam, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
};

const deleteUser = (id) => {
  let userToken = "";
const user = JSON.parse(localStorage.getItem("user"));
userToken = user.accessToken;
  return axios
  .delete(`http://localhost:8080/api/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const getAllEvent = () => {
  let userToken = "";
const user = JSON.parse(localStorage.getItem("user"));
userToken = user.accessToken;
  return axios
  .get("http://localhost:8080/api/admin/users/all", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const UserService = {
  getAllEvent,
  createUser,
  editUser,
  deleteUser,
};

export default UserService;