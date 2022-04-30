import React from "react";
import Alert from "react-bootstrap/Alert";
export default function MessageBox(props) {
  return (
    <div>
      <Alert variant={props.variant}>
        <Alert.Heading>{props.heading}</Alert.Heading>
        <p>{props.parag}</p>
      </Alert>
    </div>
  );
}
