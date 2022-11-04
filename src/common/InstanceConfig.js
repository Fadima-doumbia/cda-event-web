import axios from "axios";

let userToken = "";
const user = JSON.parse(localStorage.getItem("user"));
userToken = user.accessToken;

const InstanceConfig = axios.create({
    baseURL: 'http://eagle-event.fr:8080/api',
    timeout: 1000,
    headers: {Authorization: `Bearer ${userToken}`}
    // headers: {'Bearer': userToken}
  });

export default InstanceConfig;