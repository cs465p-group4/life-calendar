import React from "react";
import { Link, Outlet } from "react-router-dom";

export enum SubmissionStatus {
  NotSubmitted,
  SubmitFailed,
  SubmitSucceeded
}

export const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

export const Header = ({token, setToken} ) => {
  return (
    <div>
      <div className="header">
        <h1> Life Calendar </h1>
        <h3> How much longer do you have? </h3>
        <Link to="/">Dashboard</Link>
        &nbsp; | &nbsp;
        <Link to="/login">Login</Link>
        &nbsp; | &nbsp;
        <Link to="/create-user">Create User</Link>
        &nbsp; | &nbsp;
        <Link to="/comments">Comments</Link>
        <Outlet />
      </div>
    </div>
  );
}