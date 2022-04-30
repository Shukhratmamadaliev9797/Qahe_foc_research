import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listArticles } from "../actions/articleActions";
import Loader from "./Loader";
import MessageBox from "./MessageBox";
import AOS from "aos";

export default function Articles() {
  const articleLists = useSelector((state) => state.articleList);
  const { loading, error, articleList } = articleLists;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listArticles({ writer: "" }));
    AOS.init({
      duration: 2500,
      offset: 100,
    });
  }, [dispatch]);

  return (
    <div className="container-80">
      <div className="title title-grey">
        <h1 data-aos="fade-right">The latest articles</h1>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageBox variant="danger" parag={error} />
      ) : (
        <div className="articles__container">
          {[...articleList]
            .reverse()
            .slice(0, 4)
            .map((article, i) => {
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
                    <h1>{article.title.substring(0, 70)}...</h1>
                  </div>
                  <div className="articles__article-parag">
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

      <div className="events__more">
        <span>Looking for more?</span>
        <Link to="/articles">View all articles</Link>
      </div>
    </div>
  );
}
