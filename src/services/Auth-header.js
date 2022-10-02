import axios from "axios";

export default function authHeader() {
  axios.interceptors.request.use(request => {
    // add auth header with jwt if account is logged in and request is to the api url
    const user = JSON.parse(localStorage.getItem('user'));
    // const account = accountService.accountValue;
    const isLoggedIn = user?.accessToken;
    const isApiUrl = request.url.startsWith(process.env.REACT_APP_API_URL);

    if (isLoggedIn && isApiUrl) {
      console.log("first")
        request.headers.common.Authorization = `Bearer ${user.accessToken}`;
        // `Bearer ${localStorage.getItem("access_token")}`
    }

    return request;
});
  // const user = JSON.parse(localStorage.getItem('user'));

  // if (user && user.accessToken) {
  //   return { Authorization: 'Bearer ' + user.accessToken };
  // } else {
  //   return {};
  // }
}