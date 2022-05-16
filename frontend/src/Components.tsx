import React from "react";
import { Link, Outlet } from "react-router-dom";

export type ExpectancyProps = {
  weeksLeft: number,
  getSearchClick: () => void,
}

export function SearchData(props: ExpectancyProps) {
  let {weeksLeft, getSearchClick} = props;

  return (
    <div className="formContainer">
      <div className="form">
          <div>
            <label htmlFor="age">Age: </label> 
            <input
              type="text"
              id="age"
              required
              name="age"
              />
            <br />

            <label htmlFor="sex">Sex: </label>
            <select name="sex" id="sex">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <br />

            <label htmlFor="ethnicity">Ethnicity: </label>
            <select name="eth" id="eth">
              <option value="hispanic">Hispanic</option>
              <option value="amerInAlaska">Non-Hispanic American Indian or Alaska Native</option>
              <option value="asian">Non-Hispanic Asian</option>
              <option value="black">Non-Hispanic Black</option>
              <option value="white">Non-Hispanic White</option>
            </select>
            <br />
            <p>Weeks left is {weeksLeft}!</p>
            <button onClick={getSearchClick}> Search! </button>
        </div>
      </div> 
    </div>
  )
}

export const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

export const Header = () => {
  return (
  <div>
    <div className="header">
      <h1> Life Calendar </h1>
      <h3> How much longer do you have? </h3>
      <Link to="/">Dashboard</Link>
      <Outlet />
    </div>
  </div>
  );
}