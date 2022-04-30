import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  createTrainingSchedule,
  listTrainingSchedule,
} from "../../actions/trainingSchedule";
import "react-datepicker/dist/react-datepicker.css";
import { TRAINING_SCHEDULE_CREATE_RESET } from "../../constants/trainingScheduleConstant";
import Loader from "../../components/Loader";
import MessageBox from "../../components/MessageBox";
export default function AdminTrainingSchedule() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const trainingScheduleLists = useSelector(
    (state) => state.trainingScheduleList
  );
  const { loading, error, trainingScheduleList } = trainingScheduleLists;
  const trainingScheduleCreate = useSelector(
    (state) => state.trainingScheduleCreate
  );
  const {
    loading: loadingCreate,
    error: errorCreate,
    success,
  } = trainingScheduleCreate;

  const locales = { "en-uk": require("date-fns/locale/uk") };
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTrainingSchedule(title, startDate, endDate));
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  useEffect(() => {
    dispatch(listTrainingSchedule());

    if (success) {
      dispatch({ type: TRAINING_SCHEDULE_CREATE_RESET });
      setTitle("");
      setStartDate("");
      setEndDate("");
    }
  }, [success, dispatch]);

  return (
    <div
      className="adminTraining"
      data-aos="fade-left"
      data-aos-anchor="#example-anchor"
      data-aos-offset="500"
      data-aos-duration="500"
    >
      <div className="adminTraining__title">
        <h1>Training and Schedule</h1>
      </div>
      {loadingCreate && <Loader />}
      {errorCreate && (
        <MessageBox variant="danger" parag={errorCreate} heading="Error" />
      )}
      <form className="adminTraining__form" onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            placeholder="Enter Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <DatePicker
            placeholderText="Start Date"
            selected={startDate}
            onChange={(start) => setStartDate(start)}
          />
        </div>
        <div>
          <DatePicker
            placeholderText="End Date"
            selected={endDate}
            onChange={(end) => setEndDate(end)}
          />
        </div>
        <div className="adminTraining__form-submit">
          <button type="submit">Create Training</button>
        </div>
      </form>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          events={trainingScheduleList}
          style={{ height: 500, margin: "50px", background: "#fff" }}
        />
      )}
    </div>
  );
}
