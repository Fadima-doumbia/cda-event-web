import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const AlertInfo = (props) => {
  const [show, setShow] = useState(true);
  const submit = () => {
    setShow(false);
    props.setisShow(false)
  };
  return (
    <>
      <Alert show={show} variant="success">
        {/* <Alert.Heading>How's it going?!</Alert.Heading> */}
        <p>
          {props.text}
        </p>
          <Button onClick={submit} variant="outline-success">
            Ok
          </Button>
        {/* <div className="d-flex justify-content-end">
        </div> */}
      </Alert>

    </>
  );
}

export default AlertInfo;