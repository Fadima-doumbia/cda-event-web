// import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ReservationTable from "../components/ReservationTable";
import ReservationService from "../services/reservation.service";

const ReservationPage = () => {
  const [datas, setDatas] = useState([]);
  let userToken = "";

  useEffect(() => {
    getToken();
    // axios
    //   .get("http://localhost:8080/api/events/allReservations", {
    //     headers: {
    //       Authorization: `Bearer ${userToken}`,
    //     },
    //   })
    ReservationService.getAllReservation()
      .then((res) => {
        setDatas(res.data);
        // console.log(res.data);
      });
  }, []);
  
  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    userToken = user.accessToken;
  };


  return (
    <div>
      <div style={{ width: "90%", margin: "auto", color: "#3C6DA6" }}>
        <ReservationTable datas={datas} setDatas={setDatas} />
      </div>
    </div>
  );
};

export default ReservationPage;
