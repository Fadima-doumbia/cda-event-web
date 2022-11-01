import axios from "axios";


const createUser = (userParam) => {
  let userToken = "";
  const user = JSON.parse(localStorage.getItem("user"));
  userToken = user.accessToken;
  return axios.post(`http://localhost:8080/api/admin/new`, userParam, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const editUser = (userParam) => {
  let userToken = "";
  const user = JSON.parse(localStorage.getItem("user"));
  userToken = user.accessToken;
  return axios.put(`http://localhost:8080/api/admin/users`, userParam, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};
const editUserProfil = async (userParam) => {
  let userToken = "";
  const user = JSON.parse(localStorage.getItem("user"));
  userToken = user.accessToken;
  return await axios.put(`http://localhost:8080/api/events/users`, userParam, {
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
    `http://localhost:8080/api/events/users/password`,
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
  return axios.delete(`http://localhost:8080/api/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const getAllEvent = () => {
  let userToken = "";
  const user = JSON.parse(localStorage.getItem("user"));
  userToken = user.accessToken;
  return axios.get("http://localhost:8080/api/admin/users/all", {
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
    `http://localhost:8080/api/events/users/email/${email}`, {
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
  .get(`http://localhost:8080/api/events/${id}/users`, {
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
