import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../node_modules/axios/index";
import { uploadDocument } from "../actions/documentAction";
import Loader from "../components/Loader";
import MessageBox from "../components/MessageBox";

export default function AdminUploadFileModal(props) {
  const [fileName, setFileName] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const documentUpload = useSelector((state) => state.documentUpload);
  const { loading, error, success } = documentUpload;

  const dispatch = useDispatch();
  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("doc", file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post("/api/uploadsFile/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setFileLink(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  useEffect(() => {
    if (success) {
      setFileName("");
      setFileLink("");
    }
  }, [success]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(uploadDocument(fileName, fileLink));
  };
  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {loading && <Loader />}
      {error && <MessageBox variant="danger" parag={error} heading="Error" />}
      {loadingUpload && <Loader />}
      {errorUpload && (
        <MessageBox variant="danger" parag={errorUpload} heading="Error" />
      )}
      <Modal.Header onHide={props.close} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1>Upload File</h1>
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={submitHandler}>
        <Modal.Body>
          <div className="inputBox">
            <label>File Name</label>
            <input
              type="text"
              value={fileName}
              placeholder="Enter File Name"
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <label>Choose File</label>
            <input type="file" onChange={uploadHandler} />
          </div>
          <div className="inputBox">
            <label>File Link</label>
            <input
              type="text"
              value={fileLink}
              placeholder="File Link"
              onChange={(e) => setFileLink(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="inputBox-rightSubmit">
            <button onClick={props.close}>Submit</button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
