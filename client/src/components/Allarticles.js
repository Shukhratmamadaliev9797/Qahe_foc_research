import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listArticles } from "../actions/articleActions";
import Loader from "./Loader";
import MessageBox from "./MessageBox";

export default function Allarticles() {
  const articleLists = useSelector((state) => state.articleList);
  const { loading, error, articleList } = articleLists;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listArticles({ writer: "" }));
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageBox variant="danger" parag={error} />
      ) : (
        <div className="Allarticles__container">
          {articleList.map((article, i) => {
            return (
              <Link
                to={`/articles/${article._id}`}
                className="articles__article"
                data-aos="fade-down"
                key={article._id}
              >
                <div className="articles__article-img">
                  <img src={article.image1} alt={article.title} />
                </div>
                <div className="articles__article-title">
                  <h1>{article.title.substring(0, 50)}...</h1>
                </div>
                <div>
                  <p>{article.paragraph1.substring(0, 250)}...</p>
                </div>
                <div className="articles__article-time">
                  <i className="far fa-clock"></i>{" "}
                  {article.createdAt.substring(0, 10)}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
