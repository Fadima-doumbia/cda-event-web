import Table from "react-bootstrap/Table";
import ConfirmModal from "./ConfirmModal";
import ReservationService from "../services/reservation.service";

const ReservationTable = (props) => {
  // const [show, setShow] = useState(false);
  // const [target, setTarget] = useState(null);
  // const ref = useRef(null);
  // let userToken = "";

  // useEffect(() => {
  //   getToken();
    
  // }, []);
  // const getToken = () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   userToken = user.accessToken;
  // };
  // const handleClick = (event) => {
  //   setShow(!show);
  //   setTarget(event.target);
  // };

  const annuler = (id) => {
    // getToken();
    // axios.delete(`http://eagle-event.fr:8080/api/events/annuler/${id}`, {
    //   headers: {
    //     Authorization: `Bearer ${userToken}`,
    //   },
    // });
    ReservationService.annulerReservation(id);
    let filter = props.datas.filter(function (e) {
      return e.id !== id;
    });
    // console.log(id);
    props.setDatas(filter);
  };

  return (
    <Table striped bordered hover variant="ligth" className="mt-3" responsive>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Date</th>
          <th>Adresse</th>
          <th>Heure</th>
          <th>Pour enfant</th>
          <th>Prix</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.datas.length > 0 ? (
          props.datas.map((data, index) => (
            <tr key={index}>
              <th>
                {data.event.name}
                {/* <p>{data.name}</p> */}
              </th>
              <th>
                {data.event.desription}
                {/* <div ref={ref}>
                  <Button variant="outline-secondary" onClick={handleClick}>Voir la description</Button>
                  <Overlay
                    show={show}
                    target={target}
                    placement="bottom"
                    container={ref}
                    containerPadding={20}
                    style={{backgroundColor:"#3C6DA6"}}
                  >
                    <Popover id="popover-contained">
                      <Popover.Header as="h3" style={{backgroundColor:"#3C6DA6"}}>Popover bottom</Popover.Header>
                      <Popover.Body style={{backgroundColor:"#3C6DA6"}}>                        
                      </Popover.Body>
                    </Popover>
                  </Overlay>
                </div> */}
              </th>
              <th>
                {data.event.date}
                {/* <p>{data.date}</p> */}
              </th>
              <th>
                {data.event.address}
                {/* <p>{data.address}</p> */}
              </th>
              <th>
                {/* <p> */}
                {data.event.heureDebut} - {data.event.heureFin}
                {/* </p> */}
              </th>
              <th>
                {/* <p> */}
                {data.event.child ? "OUI" : "NON"}
                {/* </p> */}
              </th>
              <th>
                {/* <p> */}
                {data.event.prix}
                {/* </p> */}
              </th>
              <th>
                <ConfirmModal
                  title={"Annulation De Reservation"}
                  body={"Voulez-vous annuler la reservation ?"}
                  buttonName={"Oui"}
                  method={() => annuler(data.id)}
                />
              </th>
            </tr>
          ))
        ) : null}
      </tbody>
    </Table>
  );
};

export default ReservationTable;
