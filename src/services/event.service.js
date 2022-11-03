import axios from "axios";

let baseURL= 'http://localhost:8080/api';


const getAllEvent = () => {
  let userToken = "";
const user = JSON.parse(localStorage.getItem("user"));
userToken = user.accessToken;
  return axios.get(`${baseURL}/events/all`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const createEvent = (formData) => {
  let userToken = "";
const user = JSON.parse(localStorage.getItem("user"));
userToken = user.accessToken;
  return axios.post(`${baseURL}/admin/events`, formData, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const editEvent = (id, formData) => {
  let userToken = "";
const user = JSON.parse(localStorage.getItem("user"));
userToken = user.accessToken;
  return axios.put(`${baseURL}/admin/events/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    }});
};

const deleteEvent = (id) => {
  let userToken = "";
const user = JSON.parse(localStorage.getItem("user"));
userToken = user.accessToken;
    return axios.delete(`${baseURL}/admin/events/${id}`,{
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
  };


const EventService = {
  getAllEvent,
  createEvent,
  editEvent,
  deleteEvent
};

export default EventService;
