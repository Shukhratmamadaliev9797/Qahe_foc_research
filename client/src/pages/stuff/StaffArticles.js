import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteArticle,
  listArticles,
  writeArticle,
} from "../../actions/articleActions";
import Loader from "../../components/Loader";
import MessageBox from "../../components/MessageBox";
import {
  ARTICLE_DELETE_RESET,
  ARTICLE_WRITE_RESET,
} from "../../constants/articleConstants";
import { withRouter } from "react-router-dom";
import SmallModal from "../../modals/SmallModal";

const StaffArticles = (props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [article, setArticle] = useState();
  const writerMode = props.match.path.indexOf("/stuff") >= 0;
  const dispatch = useDispatch();
  const articleLists = useSelector((state) => state.articleList);
  const { loading, error, articleList } = articleLists;

  const articleWrite = useSelector((state) => state.articleWrite);
  const {
    loading: loadingArticle,
    error: errorArticle,
    success: successArticle,
    article: createdArticle,
  } = articleWrite;

  const articleDelete = useSelector((state) => state.articleDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = articleDelete;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  useEffect(() => {
    if (successArticle) {
      dispatch({ type: ARTICLE_WRITE_RESET });
      props.history.push(`/staff/article/${createdArticle._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: ARTICLE_DELETE_RESET });
      setShowDeleteModal(false);
    }
    dispatch(listArticles({ writer: writerMode ? userInfo._id : "" }));
  }, [
    dispatch,
    createdArticle,
    props.history,
    successArticle,
    userInfo._id,
    writerMode,
    successDelete,
  ]);

  const createHandler = () => {
    dispatch(writeArticle());
  };

  const deleteHandler = (article) => {
    dispatch(deleteArticle(article._id));
  };
  return (
    <>
      <SmallModal
        showModal={showDeleteModal}
        header="true"
        headingText="Delete Article"
        body="true"
        bodyText="Are you sure you want to delete this article?"
        footer="true"
        buttonClose="true"
        buttonCloseText="cancel"
        buttonAction="true"
        buttonActionText="delete"
        modalAction={() => deleteHandler(article)}
        closeModal={() => setShowDeleteModal(false)}
      />
      <div className="staffArticles">
        {loadingArticle && <Loader />}
        {errorArticle && (
          <MessageBox variant="danger" heading="Error" parag={errorArticle} />
        )}
        <Link to="/staff" className="staffColleagues__back">
          <i class="fas fa-caret-square-left"></i>
        </Link>

        <div className="staffArticles__title">
          <h1 className="staffProfile__box-title">My Articles</h1>
          <button type="button" onClick={createHandler}>
            Write article
          </button>
        </div>
        {loadingDelete && <Loader />}
        {errorDelete && (
          <MessageBox variant="danger" heading="Error" parag={errorDelete} />
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <MessageBox variant="danger" heading="Error" parag={error} />
        ) : (
          <div className="staffArticles__articles">
            {articleList.map((article) => {
              return (
                <div key={article._id} className="staffArticles__card">
                  <div className="staffArticles__card-img">
                    <img src={article.image1} alt={article.title} />
                  </div>
                  <div className="staffArticles__card-title">
                    <h1>{article.title.substring(0, 50)}...</h1>
                  </div>
                  <div className="staffArticles__card-paragraph">
                    <p>{article.paragraph1.substring(0, 150)}...</p>
                  </div>
                  <div className="staffArticles__card-action">
                    <button
                      onClick={() =>
                        props.history.push(`/staff/article/${article._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setArticle(article);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default withRouter(StaffArticles);
