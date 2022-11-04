import axios from "axios";

let baseURL= 'http://eagle-event.fr:8080/api';

const postReservation = (reservation) => {
  let userToken = "";
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  userToken = user.accessToken;
  return axios.post(
    `${baseURL}/events/reservation`,
    reservation,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
};

const getAllReservation = () => {
  let userToken = "";
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  userToken = user.accessToken;
  return axios.get(`${baseURL}/events/allReservations`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const annulerReservation = (id) => {
  let userToken = "";
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  userToken = user.accessToken;
  return axios.delete(`${baseURL}/events/annuler/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const ReservationService = {
  postReservation,
  getAllReservation,
  annulerReservation,
};

export default ReservationService;
