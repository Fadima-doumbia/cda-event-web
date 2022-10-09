import axios from "axios";
import authHeader from "./Auth-header";

let userToken = "";
const user = JSON.parse(localStorage.getItem("user"));
userToken = user.accessToken;

const API_URL = "http://localhost:8080/api/test/";

const createUser = (user) => {
  return axios
  .post(`http://localhost:8080/api/admin/new`, user, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const editUser = (user) => {
  return axios
  .put(`http://localhost:8080/api/admin/users`, user, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
};

const deleteUser = (id) => {
  return axios
  .delete(`http://localhost:8080/api/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const getAllEvent = () => {
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