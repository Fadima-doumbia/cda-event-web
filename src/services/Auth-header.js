import axios from "axios";

export default function authHeader() {
  axios.interceptors.request.use(request => {
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = user?.accessToken;
    const isApiUrl = request.url.startsWith(process.env.REACT_APP_API_URL);

    if (isLoggedIn && isApiUrl) {
      console.log("first")
        request.headers.common.Authorization = `Bearer ${user.accessToken}`;
    }

    return request;
});
}