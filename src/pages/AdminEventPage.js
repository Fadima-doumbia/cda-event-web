// import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/styles.scss";
import AdminCardEvent from "../components/AdminCardEvent";
import EventService from "../services/event.service";

const AdminEventPage = () => {
  const [datas, setDatas] = useState([]);
  // let userToken = "";

  useEffect(() => {
    getAllEvent();
    // console.log("loading");
  }, []);

  // useEffect(() => {
  //   getAllEvent();
  //   setLoading(false)
  //   console.log("loading")
  // }, [!loading]);

  // const getToken = () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   userToken = user.accessToken;
  // };
  
  const getAllEvent = async () => {
    // getToken();
    // await axios
    //   .get("http://localhost:8080/api/events/all", {
    //     headers: {
    //       Authorization: `Bearer ${userToken}`,
    //     },
    //   })
      EventService.getAllEvent()
      .then((res) => {
        setDatas(res.data);
        // console.log(res.data);
        // console.log("test getAll")
      });
  };

  return (
    <div className="admin-container">      
      {datas.length > 0 ? (
        datas.map((data, i) => (
          <div key={i}>
            <AdminCardEvent
              data={data}
              setdatas={setDatas}
              datas={datas}
              getallEvent={getAllEvent}
            />
          </div>
        ))
      ) : (
        <h2>Aucun evènement a venir</h2>
      )}
    </div>
  );
};
export default AdminEventPage;
