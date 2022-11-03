import axios from "axios";
let baseURL= 'http://localhost:8080/api';


const createUser = (userParam) => {
  let userToken = "";
  const user = JSON.parse(localStorage.getItem("user"));
  userToken = user.accessToken;
  return axios.post(`${baseURL}/admin/new`, userParam, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const editUser = (userParam) => {
  let userToken = "";
  const user = JSON.parse(localStorage.getItem("user"));
  userToken = user.accessToken;
  return axios.put(`${baseURL}/admin/users`, userParam, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};
const editUserProfil = async (userParam) => {
  let userToken = "";
  const user = JSON.parse(localStorage.getItem("user"));
  userToken = user.accessToken;
  return await axios.put(`${baseURL}/events/users`, userParam, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const editpassword = (userParam) => {
  let userToken = "";
  const user = JSON.parse(localStorage.getItem("user"));
  userToken = user.accessToken;
  return axios.put(
    `${baseURL}/events/users/password`,
    userParam,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
};

const deleteUser = (id) => {
  let userToken = "";
  const user = JSON.parse(localStorage.getItem("user"));
  userToken = user.accessToken;
  return axios.delete(`${baseURL}/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const getAllEvent = () => {
  let userToken = "";
  const user = JSON.parse(localStorage.getItem("user"));
  userToken = user.accessToken;
  return axios.get("${baseURL}/admin/users/all", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const getUserByEmail = (email, token) => {
  let userToken = "";
  const user = JSON.parse(localStorage.getItem("user"));
  userToken = user.accessToken;
  return axios
  .get(
    `${baseURL}/events/users/email/${email}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const getUserById = (id) => {
  let userToken = "";
  const user = JSON.parse(localStorage.getItem("user"));
  userToken = user.accessToken;
  return axios
  .get(`${baseURL}/events/${id}/users`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};
const UserService = {
  getAllEvent,
  getUserById,
  getUserByEmail,
  createUser,
  editUser,
  editUserProfil,
  editpassword,
  deleteUser,
};

export default UserService;
