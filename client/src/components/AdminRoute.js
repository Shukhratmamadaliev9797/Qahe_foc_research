import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

export default function AdminRoute({ component: Component, ...rest }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isAdmin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/private/login" />
        )
      }
    ></Route>
  );
}
