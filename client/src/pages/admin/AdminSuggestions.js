import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listSuggestion,
  updateSuggestion,
} from "../../actions/suggestionAction";
import Loader from "../../components/Loader";
import MessageBox from "../../components/MessageBox";
import SmallModal from "../../modals/SmallModal";

export default function AdminSuggestions() {
  const [suggestionId, setSuggestionId] = useState("");
  const [status, setStatus] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const dispatch = useDispatch();
  const suggestionLists = useSelector((state) => state.suggestionList);
  const {
    loading: loadingList,
    error: errorList,
    suggestionList,
  } = suggestionLists;

  const suggestionUpdate = useSelector((state) => state.suggestionUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = suggestionUpdate;
  useEffect(() => {
    dispatch(listSuggestion());
    if (successUpdate) {
      setShowUpdateModal(false);
    }
  }, [dispatch, successUpdate]);
  const suggestionUpdateHandler = (suggestionId) => {
    dispatch(updateSuggestion(suggestionId, status));
  };
  return (
    <>
      <SmallModal
        showModal={showUpdateModal}
        header="true"
        headingText="Update Status"
        body="true"
        bodyText="Are you sure you want to update status?"
        footer="true"
        buttonClose="true"
        buttonCloseText="Cancel"
        buttonAction="true"
        buttonActionText="Update"
        modalAction={() => suggestionUpdateHandler(suggestionId)}
        closeModal={() => setShowUpdateModal(false)}
      />
      <div
        className="adminSuggestion"
        data-aos="fade-left"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500"
      >
        <div className="adminDocuments__title">
          <h1>Suggestions</h1>
        </div>
        {loadingUpdate && <Loader />}
        {errorUpdate && (
          <MessageBox variant="danger" parag={errorUpdate} heading="Error" />
        )}
        {loadingList ? (
          <Loader />
        ) : errorList ? (
          <MessageBox variant="variant">{errorList}</MessageBox>
        ) : (
          <div className="staffSuggestions__suggests">
            {suggestionList.map((suggestion) => {
              return (
                <div className="staffSuggestions__suggestion">
                  <div className="staffSuggestions__suggestion-name">
                    <span>{suggestion.fullName}</span>
                    <form>
                      <select
                        className="staffSuggestions__suggestion-status"
                        value={suggestion.status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                          setSuggestionId(suggestion._id);
                          setShowUpdateModal(true);
                        }}
                      >
                        <option value="" disabled selected>
                          Update Status
                        </option>
                        <option value="submitted">Submitted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </form>
                  </div>
                  <div className="staffSuggestions__suggestion-message">
                    {suggestion.message}
                  </div>
                  <div className="staffSuggestions__suggestion-data">
                    {suggestion.createdAt.substring(0, 10)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
