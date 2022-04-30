import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  detailsArticle,
  notRelatedArticles,
  relatedArticles,
  listArticles,
} from "../actions/articleActions";
import Loader from "./Loader";
import MessageBox from "./MessageBox";

export default function ArticleContent() {
  const articleId = useParams();
  const dispatch = useDispatch();

  const articleDetails = useSelector((state) => state.articleDetails);
  const { loading, error, article } = articleDetails;

  const articleLists = useSelector((state) => state.articleList);
  const {
    loading: loadingLatest,
    error: errorLatest,
    articleList,
  } = articleLists;

  const articleRelated = useSelector((state) => state.articleRelated);
  const {
    loading: loadingRelated,
    error: errorRelated,
    topicRelated,
  } = articleRelated;

  const articleNotRelated = useSelector((state) => state.articleNotRelated);
  const {
    loading: loadingNotRelated,
    error: errorNotRelated,
    notTopicRelated,
  } = articleNotRelated;

  useEffect(() => {
    dispatch(listArticles({ writer: "" }));
    dispatch(detailsArticle(articleId.id));
    dispatch(relatedArticles(articleId.id));
    dispatch(notRelatedArticles(articleId.id));
  }, [dispatch, articleId.id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="blogScreen">
          <div className="blogScreen__container">
            <div className="blogScreen__article">
              <div className="blogScreen__article-title">
                <h1>{article.title}</h1>
              </div>
              <div className="blogScreen__article-category">
                {article.category} - {article.createdAt.substring(0, 10)}
              </div>
              <hr />
              <div className="blogScreen__article-img">
                <img src={article.image1} alt={article.title} />
              </div>

              <div className="blogScreen__article-paragraph">
                <p>{article.paragraph1}</p>
              </div>
              <br />
              <br />
              <br />
              {article.image2 && (
                <div className="blogScreen__article-img">
                  <img src={article.image2} alt={article.title} />
                </div>
              )}
              {article.paragraph2 && (
                <div className="blogScreen__article-paragraph">
                  <p>{article.paragraph2}</p>
                </div>
              )}
              <br />
            </div>
          </div>
          <div className="blogScreen__topics">
            <hr />
            <div className="blogScreen__topics-latest">
              <h1>Top stories</h1>
              {loadingLatest ? (
                <Loader />
              ) : errorLatest ? (
                <MessageBox variant="danger" parag={errorLatest} />
              ) : (
                <ul>
                  {[...articleList]
                    .reverse()
                    .slice(0, 4)
                    .map((topic) => {
                      return (
                        <li key={topic._id}>
                          <Link to={`/articles/${topic._id}`}>
                            <h2>{topic.title}</h2>
                            <p>
                              {topic.paragraph1.substring(0, 100)}
                              ...
                            </p>
                            <span>
                              <i className="far fa-clock"></i>{" "}
                              {topic.createdAt.substring(0, 10)}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
            <hr />
            <div className="blogScreen__topics-latest">
              <h1>Features</h1>
              {loadingRelated ? (
                <Loader />
              ) : errorRelated ? (
                <MessageBox variant="danger" parag={errorRelated} />
              ) : (
                <ul>
                  {topicRelated?.map((topic) => {
                    return (
                      <li key={topic._id}>
                        <Link to={`/articles/${topic._id}`}>
                          <img src={topic.image1} alt={topic.title} />
                          <h2>{topic.title}</h2>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <hr />
            <div className="blogScreen__topics-latest">
              <h1>Others</h1>
              {loadingNotRelated ? (
                <Loader />
              ) : errorNotRelated ? (
                <MessageBox variant="danger" parag={errorNotRelated} />
              ) : (
                <ul>
                  {notTopicRelated.slice(0, 3).map((topic) => {
                    return (
                      <li key={topic._id}>
                        <Link to={`/articles/${topic._id}`}>
                          <img src={topic.image1} alt={topic.title} />
                          <h2>{topic.title}</h2>
                          <p>
                            {topic.paragraph1.substring(0, 100)}
                            ...
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <hr />
          </div>
        </div>
      )}
    </>
  );
}
