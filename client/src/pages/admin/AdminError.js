import React from "react";
import Alert from "react-bootstrap/Alert";
export default function AdminError() {
  return (
    <Alert variant="danger">
      <Alert.Heading>{Error}</Alert.Heading>
      <p>
        Mobile version in the development. Please use computer for dashboard
      </p>
    </Alert>
  );
}
