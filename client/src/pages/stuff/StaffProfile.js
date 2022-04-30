import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../../../node_modules/axios/index";
import { detailsUser, updateUserProfile } from "../../actions/userActions";
import Loader from "../../components/Loader";
import Notification from "../../components/Notification";
import SmallLoader from "../../components/SmallLoader";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";

export default function StaffProfile() {
  const [profileImage, setProfileImage] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [interests, setInterests] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [successNotification, setSuccessNotification] = useState(false);
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || successUpdate) {
      dispatch(detailsUser(userInfo._id));
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    } else {
      setProfileImage(user.image ? user.image : "/images/default-user.png");
      setFirstName(user.firstName ? user.firstName : "not completed");
      setLastName(user.lastName ? user.lastName : "not completed");
      setAboutMe(user.aboutMe ? user.aboutMe : "not completed");
      setInterests(user.interests ? user.interests : "not completed");
      setPhoneNumber(user.phoneNumber ? user.phoneNumber : "not completed");
      setEmail(user.email ? user.email : "not completed");
      setAddress(user.address ? user.address : "not completed");
      setTwitterLink(user.twitterLink ? user.twitterLink : "not completed");
      setFacebookLink(user.facebookLink ? user.facebookLink : "not completed");
      setLinkedinLink(user.linkedinLink ? user.linkedinLink : "not completed");
    }

    if (successUpdate) {
      setSuccessNotification(true);
    }
  }, [dispatch, userInfo._id, user, successUpdate, userInfo]);

  setTimeout(() => {
    setSuccessNotification(false);
  }, 3000);
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        usId: user._id,
        profileImage,
        firstName,
        lastName,
        aboutMe,
        interests,
        phoneNumber,
        email,
        address,
        twitterLink,
        facebookLink,
        linkedinLink,
      })
    );
  };

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post("/api/uploads/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setProfileImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="staffProfile__container">
          <Link to="/staff" className="staffProfile__back">
            <i className="fas fa-caret-square-left"></i>
          </Link>
          <div className="staffProfile__box">
            <h1 className="staffProfile__box-title">
              My profile
              <span>
                <i className="fas fa-chevron-right staffProfile__box-icon"></i>{" "}
                Edit Profile
              </span>
            </h1>

            <form className="staffProfile__content" onSubmit={updateHandler}>
              {loadingUpdate && <Loader />}
              {errorUpdate && successNotification && (
                <Notification error="true" extraClass={`notification__error`}>
                  {errorUpdate}
                </Notification>
              )}
              {successUpdate && (
                <Notification
                  success="true"
                  extraClass={`notification__success`}
                >
                  Profile Updated
                </Notification>
              )}
              <div className="staffProfile__left">
                <div className="staffProfile__left-img">
                  {loadingUpload ? (
                    <SmallLoader />
                  ) : errorUpload ? (
                    errorUpload
                  ) : (
                    <img src={profileImage} alt={user.firstName} />
                  )}
                </div>
                <div className="staffProfile__left-button">
                  <button>Change picture</button>
                  <input
                    type="text"
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                  />
                  <input type="file" onChange={uploadImageHandler} />
                </div>
              </div>
              <div className="staffProfile__right">
                <div className="staffProfile__fullName">
                  <div>
                    <label>First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      placeholder="Enter your name..."
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      placeholder="Enter your surname..."
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="staffProfile__about">
                  <label>About me</label>
                  <textarea
                    value={aboutMe}
                    placeholder="Tell about yourself..."
                    onChange={(e) => setAboutMe(e.target.value)}
                  />
                </div>
                <div className="staffProfile__interests">
                  <label>Interests</label>
                  <textarea
                    value={interests}
                    placeholder="Tell about your interests..."
                    onChange={(e) => setInterests(e.target.value)}
                  />
                </div>
                <div className="staffProfile__contact">
                  <div>
                    <label>Phone number</label>
                    <input
                      type="text"
                      value={phoneNumber}
                      placeholder="Enter your number..."
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Email address</label>
                    <input
                      type="text"
                      value={email}
                      placeholder="Enter your email..."
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="staffProfile__address">
                  <label>Address</label>
                  <input
                    type="text"
                    value={address}
                    placeholder="Enter your address..."
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="staffProfile__social">
                  <div>
                    <label>Twitter</label>
                    <input
                      type="text"
                      value={twitterLink}
                      placeholder="Enter your twitter..."
                      onChange={(e) => setTwitterLink(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Facebook</label>
                    <input
                      type="text"
                      value={facebookLink}
                      placeholder="Enter your facebook..."
                      onChange={(e) => setFacebookLink(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Linkedin</label>
                    <input
                      type="text"
                      value={linkedinLink}
                      placeholder="Enter your linkedin..."
                      onChange={(e) => setLinkedinLink(e.target.value)}
                    />
                  </div>
                </div>
                <div className="staffProfile__saveButton">
                  <button type="submit">Save change</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
