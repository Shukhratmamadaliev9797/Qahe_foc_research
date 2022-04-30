import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listDocuments } from "../../actions/documentAction";
import Loader from "../../components/Loader";
import MessageBox from "../../components/MessageBox";

export default function StaffDocuments() {
  const dispatch = useDispatch();

  const documentLists = useSelector((state) => state.documentList);
  const { loading, error, documentList } = documentLists;

  useEffect(() => {
    dispatch(listDocuments());
  }, [dispatch]);

  return (
    <div className="stuffDocuments">
      <div className="stuffDocuments__container">
        <div>
          {loading ? (
            <Loader />
          ) : error ? (
            <MessageBox variant="danger" heading="Error" parag={error} />
          ) : (
            <ul className="adminDocuments__list">
              {documentList.map((document) => {
                return (
                  <li key={document._id} className="adminDocuments__document">
                    <a
                      href={document.fileLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fas fa-file-alt adminDocuments__document-icon"></i>
                      <span>{document.fileName}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
