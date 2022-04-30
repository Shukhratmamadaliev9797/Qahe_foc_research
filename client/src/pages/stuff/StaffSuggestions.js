import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listSuggestion } from "../../actions/suggestionAction";
import Loader from "../../components/Loader";
import MessageBox from "../../components/MessageBox";
import { SUGGESTION_WRITE_RESET } from "../../constants/suggestionConstant";
import StaffSuggestionModal from "../../modals/StaffSuggestionModal";

export default function StaffSuggestions() {
  const dispatch = useDispatch();
  const [suggestionModal, setSuggestionModal] = useState(false);
  const suggestionCreate = useSelector((state) => state.suggestionCreate);
  const { loading, error, success } = suggestionCreate;
  const openSuggestionModal = () => {
    setSuggestionModal(true);
  };
  const suggestionLists = useSelector((state) => state.suggestionList);
  const {
    loading: loadingList,
    error: errorList,
    suggestionList,
  } = suggestionLists;

  useEffect(() => {
    dispatch(listSuggestion());
    if (success) {
      dispatch({ type: SUGGESTION_WRITE_RESET });
      setSuggestionModal(false);
    }
  }, [dispatch, success]);
  return (
    <>
      <StaffSuggestionModal
        show={suggestionModal}
        close={() => setSuggestionModal(false)}
      />
      <div className="staffSuggestions">
        <Link to="/staff" className="staffSuggestions__back">
          <i class="fas fa-caret-square-left"></i>
        </Link>
        <div className="staffSuggestions__container">
          <div className="staffSuggestions__title">
            <h1>Suggestions</h1>
            <button onClick={() => openSuggestionModal()}>
              Create Suggestion
            </button>
          </div>
          {loading && <Loader />}
          {error && (
            <MessageBox variant="danger" parag={error} heading="Error" />
          )}
          {loadingList ? (
            <Loader />
          ) : errorList ? (
            <MessageBox variant="variant">{errorList}</MessageBox>
          ) : (
            <div className="staffSuggestions__suggests">
              {suggestionList.map((suggestion) => {
                return (
                  <div
                    key={suggestion._id}
                    className="staffSuggestions__suggestion"
                  >
                    <div className="staffSuggestions__suggestion-name">
                      <span>{suggestion.fullName}</span>
                      <span>{suggestion.status}</span>
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
      </div>
    </>
  );
}
