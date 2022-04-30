import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listArticles } from "../actions/articleActions";
import { detailsUser } from "../actions/userActions";
import Loader from "./Loader";
import MessageBox from "./MessageBox";

export default function ProfileContent(props) {
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }
  const { width } = useWindowDimensions();
  const userId = useParams();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const articleLists = useSelector((state) => state.articleList);
  const {
    loading: loadingArticles,
    error: errorArticles,
    articleList,
  } = articleLists;
  useEffect(() => {
    dispatch(detailsUser(userId.id));
    dispatch(listArticles({ writer: userId.id }));
  }, [userId.id, dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <MessageBox variant="danger" parag={error} heading="Error" />
  ) : (
    <div className="profile">
      {width > 800 ? (
        <div className="profile__header">
          <div className="profile__headerBox">
            <div className="profile__header-img">
              <img src={user.image} alt={user.firstName} />
            </div>
            <div className="profile__header-name">
              <span>Principal Professor</span>
              <h1>
                {user.firstName} {user.lastName}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="mobileProfile__headerBackground">
          <div className="mobileProfile__headerBox">
            <div className="mobileProfile__header-name">
              <span>Principal Professor</span>
              <h1>
                {user.firstName} {user.lastName}
              </h1>
            </div>
            <div className="mobileProfile__header-img">
              <img src={user.image} alt={user.firstName} />
            </div>
          </div>
        </div>
      )}

      <div className="profile__content">
        <div className="profile__contactInfo">
          <span>Contact Info</span>
          <ul>
            <li>
              <b>Email: </b> {user.email}
            </li>
            <li>
              <b>Phone: </b> {user.phoneNumber}
            </li>
            <li>
              <b>Location: </b> {user.address}
            </li>
          </ul>
          <ul className="profile__social">
            <li>
              <a href={user.linkedinLink}>
                <i class="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href={user.facebookLink}>
                <i class="fab fa-facebook-square"></i>
              </a>
            </li>
            <li>
              <a href={user.twitterLink}>
                <i class="fab fa-twitter-square"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="profile__main">
          <div className="profile__about">
            <h1>Biography</h1>
            <p>{user.aboutMe}</p>
          </div>
          <div className="profile__about">
            <h1>Research interests</h1>
            <p>{user.interests}</p>
          </div>
          <hr />
          <div className="profile__about">
            <div>
              <h1>Related Articles</h1>
            </div>
            {loadingArticles ? (
              <Loader />
            ) : errorArticles ? (
              <MessageBox variant="danger">{errorArticles}</MessageBox>
            ) : (
              <ul className="profile__articles">
                {articleList.map((article) => {
                  return (
                    <li key={article._id}>
                      <Link to={`/articles/${article._id}`}>
                        <h4>{article.title}</h4>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
