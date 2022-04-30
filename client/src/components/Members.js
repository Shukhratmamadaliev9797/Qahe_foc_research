import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

// import required modules
import { Pagination, Autoplay } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { listColleagues } from "../actions/userActions";
import Loader from "../../node_modules/react-spinners/BarLoader";
import MessageBox from "./MessageBox";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const Members = (props) => {
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
  const userList = useSelector((state) => state.colleaguesList);
  const { loading, error, users } = userList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listColleagues());
  }, [dispatch]);
  return (
    <div className="swiper__container">
      <div className="title title-red">
        <h1 data-aos="fade-right">Our members</h1>
      </div>
      <Swiper
        slidesPerView={`${width < 1410 && width > 900 ? 3 : ""} ${
          width < 900 && width > 850 ? 2 : ""
        } ${width > 1410 ? 4 : ""} ${width < 850 ? 1 : ""}`}
        spaceBetween={30}
        centeredSlides={false}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          users
            .filter((user) => user.isAdmin === false)
            .map((user, i) => {
              return (
                <SwiperSlide
                  key={user._id}
                  data-aos="fade-down"
                  className="swiper__user"
                >
                  <div className="swiper__user-photo">
                    <img src={user.image} alt={user.firstName} />
                  </div>
                  <div className="swiper__user-name">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="swiper__user-about">
                    {user.aboutMe?.substring(1, 100)}
                  </div>
                  <ul className="swiper__user-social">
                    <li>
                      <a href={user.linkedinLink}>
                        <i className="swiper__user-social-icon fab fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href={user.facebookLink}>
                        <i className="swiper__user-social-icon fab fa-facebook-square"></i>
                      </a>
                    </li>
                    <li>
                      <a href={user.twitterLink}>
                        <i className="swiper__user-social-icon fab fa-twitter-square"></i>
                      </a>
                    </li>
                  </ul>
                  <div className="swiper__user-learnMore">
                    <Link to={`/profile/${user._id}`}>Learn more</Link>
                  </div>
                </SwiperSlide>
              );
            })
        )}
      </Swiper>
    </div>
  );
};

export default withRouter(Members);
