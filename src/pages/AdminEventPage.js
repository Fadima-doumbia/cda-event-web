import { useEffect, useState } from "react";
import "../styles/styles.scss";
import AdminCardEvent from "../components/AdminCardEvent";
import EventService from "../services/event.service";

const AdminEventPage = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getAllEvent();
  }, []);
  
  const getAllEvent = async () => {
      EventService.getAllEvent()
      .then((res) => {
        setDatas(res.data);
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
