import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/private/Login";
import AdminRoute from "./components/AdminRoute";
import AdminDashNav from "./components/AdminDashNav";
import { useSelector } from "react-redux";
import AdminHome from "./pages/admin/AdminHome";
import AdminTopbar from "./components/AdminTopbar";
import "./styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCreateUser from "./pages/admin/AdminCreateUser";
import StaffNav from "./components/StaffNav";
import StaffRoute from "./components/StaffRoute";
import StaffHome from "./pages/stuff/StaffHome";
import StaffProfile from "./pages/stuff/StaffProfile";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Profile from "./pages/public/Profile";
import StaffColleagues from "./pages/stuff/StaffColleagues";
import StaffArticles from "./pages/stuff/StaffArticles";
import StaffEditArticle from "./pages/stuff/StaffEditArticle";
import StaffDocuments from "./pages/stuff/StaffDocuments";
import StaffSuggestions from "./pages/stuff/StaffSuggestions";
import "aos/dist/aos.css";
import Article from "./pages/public/Article";
import StaffTrainingSchedules from "./pages/stuff/StaffTrainingSchedules";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminTrainingSchedule from "./pages/admin/AdminTrainingSchedule";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminSuggestions from "./pages/admin/AdminSuggestions";
import UpcomingEvents from "./pages/public/UpcomingEvents";
import AllArticles from "./pages/public/AllArticles";
import Contact from "./pages/public/Contact";
import AdminError from "./pages/admin/AdminError";
import AOS from "aos";
export default function App() {
  const [toggleNav, setToggleNav] = useState(false);
  const [pathName, setPathName] = useState("");
  const [pathStatus, setPathStatus] = useState(false);
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

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
    function updateStatus() {
      setPathName(window.location.pathname);
    }
    setTimeout(() => {
      updateStatus();
    }, [100]);
    useEffect(() => {
      if (!pathStatus) {
        setPathName(window.location.pathname);
        setPathStatus(true);
      }

      AOS.init({
        duration: 500,
        offset: 50,
      });

      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }
  const { width } = useWindowDimensions();

  return (
    <Router>
      <Switch>
        <div>
          {userInfo?.isAdmin && pathName.includes("/admin") && width > 1200 ? (
            <>
              <AdminDashNav toggleNav={toggleNav} />
              <AdminTopbar
                setToggle={() => setToggleNav((prevCheck) => !prevCheck)}
                toggleNavbar={toggleNav}
              />
            </>
          ) : userInfo?.isStaff && pathName.includes("/staff") ? (
            <>
              <StaffNav />
            </>
          ) : pathName.includes("login") ? (
            ""
          ) : !userInfo ||
            !pathName.includes("/staff") ||
            !pathName.includes("/admin") ? (
            <>
              <Route path="/" component={Home} exact />
              <Route path="/about-us" component={About} exact />
              <Route path="/profile/:id" exact component={Profile} />
              <Route path="/articles/:id" exact component={Article} />
              <Route path="/upcoming-events" exact component={UpcomingEvents} />
              <Route path="/articles" exact component={AllArticles} />
              <Route path="/contact" exact component={Contact} />
            </>
          ) : (
            ""
          )}
          {width < 1200 && userInfo?.isAdmin && pathName.includes("/admin") ? (
            <AdminError />
          ) : (
            <>
              <AdminRoute
                toggleNav={toggleNav}
                path="/admin"
                exact
                component={() => <AdminHome toggleNav={toggleNav} />}
              />
              <AdminRoute
                toggleNav={toggleNav}
                path="/admin/profile"
                exact
                component={() => <AdminProfile toggleNav={toggleNav} />}
              />
              <AdminRoute
                toggleNav={toggleNav}
                path="/admin/users"
                exact
                component={() => <AdminUsers toggleNav={toggleNav} />}
              />
              <AdminRoute
                toggleNav={toggleNav}
                path="/admin/users/create/user"
                exact
                component={() => <AdminCreateUser toggleNav={toggleNav} />}
              />
              <AdminRoute
                toggleNav={toggleNav}
                path="/admin/training-schedule"
                exact
                component={() => (
                  <AdminTrainingSchedule toggleNav={toggleNav} />
                )}
              />
              <AdminRoute
                toggleNav={toggleNav}
                path="/admin/documents"
                exact
                component={() => <AdminDocuments toggleNav={toggleNav} />}
              />
              <AdminRoute
                toggleNav={toggleNav}
                path="/admin/events"
                exact
                component={() => <AdminEvents toggleNav={toggleNav} />}
              />
              <AdminRoute
                toggleNav={toggleNav}
                path="/admin/suggestions"
                exact
                component={() => <AdminSuggestions toggleNav={toggleNav} />}
              />
            </>
          )}

          <StaffRoute path="/staff" exact component={() => <StaffHome />} />
          <StaffRoute
            path="/staff/profile"
            exact
            component={() => <StaffProfile />}
          />
          <StaffRoute
            path="/staff/colleagues"
            exact
            component={() => <StaffColleagues />}
          />
          <StaffRoute
            path="/staff/articles"
            exact
            component={() => <StaffArticles />}
          />
          <StaffRoute
            path="/staff/article/:id/edit"
            exact
            component={() => <StaffEditArticle />}
          />
          <StaffRoute
            path="/staff/documents"
            exact
            component={() => <StaffDocuments />}
          />
          <StaffRoute
            path="/staff/suggestions"
            exact
            component={() => <StaffSuggestions />}
          />
          <StaffRoute
            path="/staff/training-schedules"
            exact
            component={() => <StaffTrainingSchedules />}
          />
          <Route path="/private/login" component={Login} exact />
        </div>
      </Switch>
    </Router>
  );
}
