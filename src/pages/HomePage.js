import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CardEvent from "../components/CardEvent";
import InfoModal from "../components/InfoModal";

const HomePage = () => {
  const initialState = {
    address: "",
    name: "",
    city: "",
    date: "",
    description: "",
    child: false,
    places: 0,
    prix: 0,
    heureDebut: "",
    heureFin: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [datas, setDatas] = useState([]);
  const [dataSource, setDataSource] = useState([]); // <== here we use the useState to be able to show the data after we fetch it
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  let userToken = "";
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    userToken = user.accessToken;
    setToken(user.accessToken);
    if (user.roles[0] === "ROLE_USER") {
      setLoading(true);
    }
    getAllEvent();
  }, []);
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
      });
  };

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    userToken = user.accessToken;
    setToken(user.accessToken);
  };
  return (
    <div className="container-Card">
      {datas.length > 0 ? (
        datas.map((data, index) => (
          <div key={index}>
            <CardEvent formData={data} />
          </div>
        ))
      ) : (
        <div>Pas d'événement Pour le moment</div>
      )}
    </div>
  );
};
export default HomePage;