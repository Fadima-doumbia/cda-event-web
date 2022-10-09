import axios from "axios";

let userToken = "";
const user = JSON.parse(localStorage.getItem("user"));
userToken = user.accessToken;

const getAllEvent = () => {
  return axios.get("http://localhost:8080/api/events/all", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const createEvent = (formData) => {
  return axios.post(`http://localhost:8080/api/admin/events`, formData, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const editEvent = (id, formData) => {
  return axios.put(`http://localhost:8080/api/admin/events/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    }});
};

const deleteEvent = (id) => {
    return axios.delete(`http://localhost:8080/api/admin/events/${id}`,{
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
