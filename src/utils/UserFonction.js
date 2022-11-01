import AuthService from "../services/auth.service";

export const compareEmail = (email) => {
  let response = false;
  let user = AuthService.getCurrentUser();
  if (user.email === email) {
    response = true;
  }
  return response;
};

export const verifyType = (variableToVerify, type) => {
  let response = false;
  let typeParam = typeof variableToVerify;

  if (typeParam === type) {
    response = true;
  }
  return response;
};

export const verifyIfStringIsEmpty = (str) => {
  let response = false;
  if (str !== "" && typeof str === "string") {
    response = true;
  }
  if (str === 0 && typeof str === "number") {
    response = false;
  }
  if (str > 0) {
    response = true;
  }
  return response;
};

export const formDataVerifyPassword = (str) => {
  let response = false;
  if (
    str.match(/[0-9]/g) &&
    str.match(/[A-Z]/g) &&
    str.match(/[a-z]/g) &&
    str.match(/[^a-zA-Z\d]/g) &&
    str.length >= 8
  ) {
    response = true;
  }

  return response;
};

export const filtered = (array, check, value) => {
  let datas = []
  switch (check) {
    case "email":
      console.log("email");
      let filteredemail = array.filter((user) =>
        user.email.toUpperCase().includes(value.toUpperCase())
      );
      datas=filteredemail;
      break;
    case "role":
      console.log("role");
      let filteredrole = array.filter((user) =>
        user.role.name.toUpperCase().includes(value.toUpperCase())
      );
      datas=filteredrole;
      break;
    case "username":
      console.log("username");
      let filteredusername = array.filter((user) =>
        user.username.toUpperCase().includes(value.toUpperCase())
      );
      datas=filteredusername;
      break;
    default:
      console.log("lastname");
      let filtered = array.filter((user) =>
        user.lastName.toUpperCase().includes(value.toUpperCase())
      );
      datas=filtered;
      break;
  }
  if (value === "") {
    datas=array;
  }
  return datas;
};
