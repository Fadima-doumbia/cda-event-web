import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const AlertInfo = (props) => {
  const [show, setShow] = useState(true);
  const submit = () => {
    setShow(false);
    props.setisShow(false)
  };
  console.log(props.typeVariant)
  return (
    <>
      <Alert className='alert-display' show={show} variant={props.typeVariant} >
          <p>{props.text}</p>
          
          <Button onClick={submit} variant={"outline-"+props.typeVariant} >
            Ok
          </Button>
      </Alert>

    </>
  );
}

export default AlertInfo;