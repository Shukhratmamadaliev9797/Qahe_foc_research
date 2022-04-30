import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
export default function SmallModal({
  showModal,
  closeModal,
  header,
  headingText,
  body,
  bodyText,
  modalAction,
  footer,
  buttonClose,
  buttonCloseText,
  buttonAction,
  buttonActionText,
}) {
  return (
    <Modal show={showModal} onHide={closeModal}>
      {header ? (
        <Modal.Header closeButton>
          <Modal.Title>{headingText}</Modal.Title>
        </Modal.Header>
      ) : (
        ""
      )}

      {body ? <Modal.Body>{bodyText}</Modal.Body> : ""}
      {footer ? (
        <Modal.Footer>
          {buttonClose ? (
            <Button variant="secondary" onClick={closeModal}>
              {buttonCloseText}
            </Button>
          ) : (
            ""
          )}
          {buttonAction ? (
            <Button variant="primary" onClick={modalAction}>
              {buttonActionText}
            </Button>
          ) : (
            ""
          )}
        </Modal.Footer>
      ) : (
        ""
      )}
    </Modal>
  );
}
