import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Loader from "../../../node_modules/react-spinners/BarLoader";
import { writeArticle } from "../../actions/articleActions";
import { signout } from "../../actions/userActions";
import MessageBox from "../../components/MessageBox";
import { ARTICLE_WRITE_RESET } from "../../constants/articleConstants";

const StaffHome = (props) => {
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signout());
  };

  const articleWrite = useSelector((state) => state.articleWrite);
  const {
    loading: loadingArticle,
    error: errorArticle,
    success: successArticle,
    article: createdArticle,
  } = articleWrite;

  useEffect(() => {
    if (successArticle) {
      dispatch({ type: ARTICLE_WRITE_RESET });
      props.history.push(`/staff/article/${createdArticle._id}/edit`);
    }
  }, [dispatch, createdArticle, props.history, successArticle]);

  const createHandler = () => {
    dispatch(writeArticle());
  };
  return (
    <div className="staff__home">
      {errorArticle && (
        <MessageBox variant="danger" heading="Error" parag={errorArticle} />
      )}
      {loadingArticle && <Loader />}
      <div className="staff__home-container">
        <Link
          to="staff/profile"
          className="staff__home-menu staff__home-menu-1"
        >
          <i class="fas fa-user-circle staff__home-menu-icon staff__home-menu-1-icon"></i>
          <span>Profile</span>
        </Link>
        <Link
          to="staff/documents"
          className="staff__home-menu staff__home-menu-2"
        >
          <i class="fas fa-folder-open staff__home-menu-icon staff__home-menu-2-icon"></i>
          <span>Documents</span>
        </Link>
        <Link
          to="staff/colleagues"
          className="staff__home-menu staff__home-menu-3"
        >
          <i class="fas fa-users staff__home-menu-icon staff__home-menu-3-icon"></i>
          <span>Colleagues</span>
        </Link>
        <Link className="staff__home-menu staff__home-menu-4"></Link>
        <Link
          to="staff/articles"
          className="staff__home-menu staff__home-menu-5"
        >
          <i class="fas fa-calendar-alt staff__home-menu-icon staff__home-menu-5-icon"></i>
          <span>Articles</span>
        </Link>
        <Link
          to="staff/suggestions"
          className="staff__home-menu staff__home-menu-6"
        >
          <i class="fas fa-comment-dots staff__home-menu-icon staff__home-menu-6-icon"></i>
          <span>Suggestions</span>
        </Link>
        <Link className="staff__home-menu staff__home-menu-7"></Link>
        <Link
          to="staff/training-schedules"
          className="staff__home-menu staff__home-menu-8"
        >
          <i class="far fa-list-alt staff__home-menu-icon staff__home-menu-8-icon"></i>
          <span>Training and schedules</span>
        </Link>
        <div
          onClick={createHandler}
          className="staff__home-menu staff__home-menu-9"
        >
          <i class="fas fa-edit staff__home-menu-icon staff__home-menu-8-icon"></i>
          <span>Write Article</span>
        </div>
        <div className="staff__home-menu staff__home-menu-10"></div>

        <div
          onClick={signOutHandler}
          className="staff__home-menu staff__home-menu-11"
        >
          <i class="fas fa-sign-out-alt staff__home-menu-icon staff__home-menu-11-icon"></i>
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(StaffHome);
