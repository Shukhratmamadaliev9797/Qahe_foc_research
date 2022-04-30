import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listArticles } from "../../actions/articleActions";
import { listUsers } from "../../actions/userActions";
import SmallLoader from "../../components/SmallLoader";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

export default function AdminHome(props) {
  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const data1 = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const articleLists = useSelector((state) => state.articleList);
  const {
    loading: loadingArticle,
    error: errorArticle,
    articleList,
  } = articleLists;
  useEffect(() => {
    dispatch(listUsers());
    dispatch(listArticles({ writer: "" }));
  }, [dispatch]);

  return (
    <div
      className={
        !props.toggleNav ? "admin__home" : "admin__home admin__home-active"
      }
      data-aos="fade-left"
      data-aos-anchor="#example-anchor"
      data-aos-offset="500"
      data-aos-duration="500"
    >
      <div className="admin__home-cardBox">
        <div className="admin__home-card">
          <div>
            <div className="admin__home-card-numbers">1,594</div>
            <div className="admin__home-card-name">Daily views</div>
          </div>
          <div className="admin__home-card-iconBox">
            <i className="fas fa-eye"></i>
          </div>
        </div>
        <div className="admin__home-card">
          <div>
            <div className="admin__home-card-numbers">
              {loading ? <SmallLoader /> : error ? error : users.length}
            </div>
            <div className="admin__home-card-name">Total users</div>
          </div>
          <div className="admin__home-card-iconBox">
            <i className="fas fa-users"></i>
          </div>
        </div>
        <div className="admin__home-card">
          <div>
            <div className="admin__home-card-numbers">
              {" "}
              {loadingArticle ? (
                <SmallLoader />
              ) : errorArticle ? (
                error
              ) : (
                articleList.length
              )}
            </div>
            <div className="admin__home-card-name">Articles</div>
          </div>
          <div className="admin__home-card-iconBox">
            <i class="fas fa-calendar-alt "></i>
          </div>
        </div>
        <div className="admin__home-card">
          <div>
            <div className="admin__home-card-numbers">1,594</div>
            <div className="admin__home-card-name">Recommendations</div>
          </div>
          <div className="admin__home-card-iconBox">
            <i className="fas fa-lightbulb"></i>
          </div>
        </div>
      </div>
      <div className="admin__home-chartBox">
        <div className="admin__home-chart1">
          <PolarArea data={data} />
        </div>
        <div className="admin__home-chart1">
          <Doughnut data={data1} />
        </div>
      </div>
    </div>
  );
}
