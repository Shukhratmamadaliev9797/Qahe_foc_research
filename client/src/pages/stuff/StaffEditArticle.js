import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { detailsArticle, updateArticle } from "../../actions/articleActions";
import Loader from "../../components/Loader";
import MessageBox from "../../components/MessageBox";
import { ARTICLE_UPDATE_RESET } from "../../constants/articleConstants";

const NewsEditScreen = (props) => {
  const articleId = props.match.params.id;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image1, setImage1] = useState("");
  const [paragraph1, setParagraph1] = useState("");
  const [image2, setImage2] = useState("");
  const [paragraph2, setParagraph2] = useState("");

  const articleDetails = useSelector((state) => state.articleDetails);
  const { loading, error, article } = articleDetails;

  const articleUpdate = useSelector((state) => state.articleUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = articleUpdate;
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/staff/articles");
    }
    if (!article || article._id !== articleId || successUpdate) {
      dispatch({ type: ARTICLE_UPDATE_RESET });
      dispatch(detailsArticle(articleId));
    } else {
      setTitle(article.title);
      setCategory(article.category);
      setImage1(article.image1);
      setParagraph1(article.paragraph1);
      setImage2(article.image2);
      setParagraph2(article.paragraph2);
    }
  }, [dispatch, article, articleId, props.history, successUpdate]);

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const uploadImageHandler1 = async (e) => {
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
      setImage1(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateArticle({
        _id: articleId,
        title,
        category,
        image1,
        paragraph1,
        image2,
        paragraph2,
      })
    );
  };
  const uploadImageHandler2 = async (e) => {
    const file = e.target.files[0];
    const bodyFormatData = new FormData();
    bodyFormatData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post("/api/uploads/s3", bodyFormatData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage2(data);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  return (
    <div className="articleEdit">
      <Link to="/staff" className="articleEdit__back">
        <i class="fas fa-caret-square-left"></i>
      </Link>
      {loadingUpdate && <Loader />}
      {errorUpdate && (
        <MessageBox variant="danger" heading="Error" parag={errorUpdate} />
      )}
      <div className="articleEdit__newsform__inputBox"></div>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageBox variant="danger" heading="Error" parag={error} />
      ) : (
        <form className="articleEdit__articleForm" onSubmit={submitHandler}>
          <div className="articleEdit__articleForm__title">
            <h1>Update Article</h1>
          </div>
          <div className="articleEdit__articleForm__inputBox">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="articleEdit__articleForm__inputBox">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled selected>
                Select category
              </option>
              <option value="business">Business</option>
              <option value="cars">Cars</option>
              <option value="entertainment">Entertainment</option>
              <option value="family">Family</option>
              <option value="health">Health</option>
              <option value="Politics">Politics</option>
              <option value="religion">Religion</option>
              <option value="science">Science</option>
              <option value="sports">Sports</option>
              <option value="technology">Technology</option>
              <option value="travel">Travel</option>
              <option value="world">World</option>
              <option value="nature">Nature</option>
              <option value="animals">Animals</option>
              <option value="crime">Crime</option>
              <option value="famous">Famous</option>
            </select>
          </div>

          <div className="articleEdit__articleForm__inputBox">
            <label htmlFor="image1">Image 1</label>
            <input
              id="image1"
              type="text"
              placeholder="Image 1"
              value={image1}
              onChange={(e) => setImage1(e.target.value)}
              required
            />
          </div>
          <div className="articleEdit__articleForm__inputBox">
            <label htmlFor="imageFile1">Image file 1</label>
            <input id="imageFile1" type="file" onChange={uploadImageHandler1} />
          </div>
          <div className="articleEdit__articleForm__inputBox">
            {loadingUpload && "Image Uploading"}
            {errorUpload && (
              <MessageBox className="error">{errorUpload}</MessageBox>
            )}
          </div>
          <div className="articleEdit__articleForm__inputBox">
            <label htmlFor="paragraph1">Paragraph 1</label>
            <textarea
              id="paragraph1"
              type="text"
              placeholder="Paragraph 1"
              value={paragraph1}
              onChange={(e) => setParagraph1(e.target.value)}
              required
            />
          </div>
          <div className="articleEdit__articleForm__inputBox">
            <label htmlFor="imageFile2">Image file 2 (optional)</label>
            <input id="imageFile2" type="file" onChange={uploadImageHandler2} />
          </div>
          <div className="articleEdit__articleForm__inputBox">
            <label htmlFor="image2">Image 2 (optional)</label>
            <input
              id="image2"
              type="text"
              placeholder="Image 2"
              value={image2}
              onChange={(e) => setImage2(e.target.value)}
            />
          </div>
          <div className="articleEdit__articleForm__inputBox">
            <label htmlFor="paragraph2">Paragraph 2 (optional)</label>
            <textarea
              id="paragraph2"
              type="text"
              placeholder="Paragraph 2"
              value={paragraph2}
              onChange={(e) => setParagraph2(e.target.value)}
            />
          </div>
          <div className="articleEdit__articleForm__inputBox">
            <button type="submit">Update</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default withRouter(NewsEditScreen);
