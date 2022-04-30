import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listDocuments } from "../../actions/documentAction";
import Loader from "../../components/Loader";
import MessageBox from "../../components/MessageBox";
import { DOCUMENT_UPLOAD_RESET } from "../../constants/documentConstant";
import AdminUploadFileModal from "../../modals/AdminUploadFileModal";

export default function AdminDocuments() {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const documentLists = useSelector((state) => state.documentList);
  const { loading, error, documentList } = documentLists;

  const documentUpload = useSelector((state) => state.documentUpload);
  const {
    loading: loadingUpload,
    error: errorUpload,
    success,
  } = documentUpload;
  useEffect(() => {
    dispatch(listDocuments());
    if (success) {
      dispatch({ type: DOCUMENT_UPLOAD_RESET });
    }
  }, [dispatch, success]);

  return (
    <>
      <AdminUploadFileModal
        show={openModal}
        close={() => setOpenModal(false)}
      />
      <div
        className="adminDocuments"
        data-aos="fade-left"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500"
      >
        <div className="adminDocuments__title">
          <h1>Documents</h1>
          <button onClick={() => setOpenModal(true)}>Upload Documents</button>
        </div>
        {loadingUpload && <Loader />}
        {errorUpload && (
          <MessageBox variant="danger" heading="error" parag={errorUpload} />
        )}
        <div>
          {loading ? (
            <Loader />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <ul className="adminDocuments__list">
              {documentList.map((document) => {
                return (
                  <li className="adminDocuments__document">
                    <a
                      href={document.fileLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i class="fas fa-file-alt adminDocuments__document-icon"></i>
                      <span>{document.fileName}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
