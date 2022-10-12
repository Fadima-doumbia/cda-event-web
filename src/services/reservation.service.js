import axios from "axios";



const postReservation = (reservation) => {
  let userToken = "";
const user = JSON.parse(localStorage.getItem("user"));
console.log(user)
userToken = user.accessToken;
    return axios.post(`http://localhost:8080/api/events/reservation`, reservation, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
  };

  const getAllReservation = () => {
    let userToken = "";
const user = JSON.parse(localStorage.getItem("user"));
console.log(user)
userToken = user.accessToken;
    return axios
    .get("http://localhost:8080/api/events/allReservations", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  };

const annulerReservation = (id) => {
  let userToken = "";
const user = JSON.parse(localStorage.getItem("user"));
console.log(user)
userToken = user.accessToken;
    return axios.delete(`http://localhost:8080/api/events/annuler/${id}`, {
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