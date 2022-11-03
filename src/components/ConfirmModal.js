import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TrashFill } from "react-bootstrap-icons";

const ConfirmModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-danger" onClick={handleShow}>
        <TrashFill />
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Non
          </Button>
          <Button variant="primary" onClick={props.method}>
            {props.buttonName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ConfirmModal;
