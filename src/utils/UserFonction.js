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
    if (str != "" || str>0) {
        response=true;
    }
   
    return response;
  };
