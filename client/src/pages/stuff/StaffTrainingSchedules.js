import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import MessageBox from "../../components/MessageBox";
import { listTrainingSchedule } from "../../actions/trainingSchedule";

export default function StaffTrainingSchedules() {
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
  const locales = { "en-uk": require("date-fns/locale/uk") };
  const dispatch = useDispatch();
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const trainingScheduleLists = useSelector(
    (state) => state.trainingScheduleList
  );
  const { loading, error, trainingScheduleList } = trainingScheduleLists;

  useEffect(() => {
    dispatch(listTrainingSchedule());
  }, [dispatch]);
  return (
    <div className="staffTraining">
      <Link to="/staff" className="staffTraining__back">
        <i class="fas fa-caret-square-left"></i>
      </Link>
      <div className="staffTraining__title">
        <h1>Training Schedules</h1>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageBox variant="danger" parag={error} />
      ) : (
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          events={trainingScheduleList}
          style={{
            height: width < 600 ? 300 : 500,
            margin: `${width < 1200 ? "10px" : "50px"}`,
            background: "#fff",
          }}
        />
      )}
    </div>
  );
}
