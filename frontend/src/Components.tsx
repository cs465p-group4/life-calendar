import React, { useEffect, useState} from "react";
import { Profile as ProfileType } from "./types/StateTypes";
import { Link, Outlet } from "react-router-dom";
import { User } from "./services/UserService";
import initialState from "./initialState";

export const SubmitData = () => {

  const [user, setUser] = useState(initialState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveData = () => {
    User.create(user)
  }

  return (
    <div>
      <SetData handleInputChange={handleInputChange} saveData={saveData} user={user} />

    </div>
  )
}
export function SetData( { handleInputChange, saveData, user}) {

  useEffect(() => {
    console.log("Profile rerendered");
  });

  return (
      <div className="formContainer">
        <div className="form">
          <div>
            <form action={saveData}>
              <label htmlFor="age">Age: </label> 
              <input
                type="text"
                id="age"
                required
                value={user.age}
                onChange={handleInputChange}
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
              <input type="submit" value="Submit"></input>
            </form>
          </div>
        </div>
      </div>
  );
}

type FilterBarProps = {
  onApply: (filterString: string) => void,
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