import axios from "axios";
import { useEffect, useState } from "react";
import '../styles/styles.scss';
import AdminCardEvent from "../components/AdminCardEvent";

const AdminEventPage = () => {
    const [datas, setDatas] = useState([]);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    let userToken = "";
    useEffect(() => {
        getToken();
        axios.get("http://localhost:8080/api/events/all", {
            headers: {
              Authorization: `Bearer ${userToken}`,
            }}).then((res) => {
          setDatas(res.data);
          console.log(res.data)
        });
      }, []);

      const getToken = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        userToken = user.accessToken;
        setToken(user.accessToken);
      };
      
    return(
        <div className="admin-container">
            {datas.length>0?(
                datas.map((data, i)=>(
                    <div key={i}>
                    <AdminCardEvent data={data} setDatas={setDatas} />
                    </div>
                ))
            ):(
                <h2>Aucun evènement a venir</h2>
                )}
        </div>
    )
}
export default AdminEventPage;