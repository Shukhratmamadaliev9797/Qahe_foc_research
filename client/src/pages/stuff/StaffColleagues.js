import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listColleagues } from "../../actions/userActions";
import Loader from "../../components/Loader";
import MessageBox from "../../components/MessageBox";

export default function StaffColleagues() {
  const userList = useSelector((state) => state.colleaguesList);
  const { loading, error, users } = userList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listColleagues());
  }, [dispatch]);
  return (
    <div className="staffColleagues">
      <div className="staffColleagues__boxTitle">
        <h1 className="staffProfile__box-title">Colleagues</h1>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageBox variant="danger" heading="Error" parag={error} />
      ) : (
        <div className="staffColleagues__cardBox">
          <Link to="/staff" className="staffColleagues__back">
            <i class="fas fa-caret-square-left"></i>
          </Link>
          {users
            .filter((user) => user.isAdmin === false)
            .map((user) => {
              return (
                <Link
                  key={user._id}
                  to={`/profile/${user._id}`}
                  className="staffColleagues__card"
                >
                  <div className="staffColleagues__card-img">
                    <img
                      src={user.image ? user.image : "/images/default-user.png"}
                      alt={user.firstName}
                    />
                  </div>
                  <div className="staffColleagues__card-name">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="staffColleagues__card-about">
                    {user.aboutMe?.substring(1, 150)}...
                  </div>
                  <ul className="staffColleagues__card-social">
                    <li>
                      <a href={user.facebookLink}>
                        <i className="fab fa-facebook-square"></i>
                      </a>
                    </li>
                    <li>
                      <a href={user.twitterLink}>
                        <i className="fab fa-twitter-square"></i>
                      </a>
                    </li>
                    <li>
                      <a href={user.linkedinLink}>
                        <i className="fab fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href={user.linkedinLink}>
                        <i className="fab fa-google"></i>
                      </a>
                    </li>
                  </ul>
                  <div className="staffColleagues__card-chat">
                    <button>Chat now</button>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}
