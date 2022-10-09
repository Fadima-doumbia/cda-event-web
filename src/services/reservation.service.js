import axios from "axios";

let userToken = "";
const user = JSON.parse(localStorage.getItem("user"));
userToken = user.accessToken;


const postReservation = (reservation) => {
    return axios.post(`http://localhost:8080/api/events/reservation`, reservation, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
  };

  const getAllReservation = () => {
    return axios
    .get("http://localhost:8080/api/events/allReservations", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  };

const annulerReservation = (id) => {
    return axios.delete(`http://localhost:8080/api/events/annuler/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  };

const ReservationService = {
    annulerReservation,
    getAllReservation,
    annulerReservation,
};

export default ReservationService;