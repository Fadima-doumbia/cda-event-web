import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/styles.scss";
import AdminCardEvent from "../components/AdminCardEvent";

const AdminEventPage = () => {
  const [datas, setDatas] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  let userToken = "";

  useEffect(() => {
    getAllEvent();
    console.log("loading");
  }, []);

  // useEffect(() => {
  //   getAllEvent();
  //   setLoading(false)
  //   console.log("loading")
  // }, [!loading]);

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    userToken = user.accessToken;
    setToken(user.accessToken);
  };
  const afterEdit = () => {
    getAllEvent();
    console.log("after");
  };
  if (!datas) return <div>Loading...</div>;
  const getAllEvent = async () => {
    getToken();
    await axios
      .get("http://localhost:8080/api/events/all", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setDatas(res.data);
        console.log(res.data);
        console.log("test getAll")
      });
  };

  return (
    <div className="admin-container">      
      {datas.length > 0 ? (
        datas.map((data, i) => (
          <div key={i}>
            <AdminCardEvent
              data={data}
              setDatas={setDatas}
              datas={datas}
              getAllEvent={getAllEvent}
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
