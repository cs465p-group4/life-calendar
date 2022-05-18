import React, { useState }from "react";
import { Link, Outlet } from "react-router-dom";

export type ExpectancyProps = {
  weeksLeft: number,
  getSearchClick: () => void,
  weeks: string[],
}

export function Profile(props: ExpectancyProps) {
  let {weeksLeft, getSearchClick} = props;

  const [submitted, setSubmitted] = useState(false);

  const getExpectancy = () => {
    setSubmitted(true)
    getSearchClick();
  }

  const resetPage = () => {
    setSubmitted(false)
  }

  const weeks: string[] = []
  for (let i = 0; i< weeksLeft; i++) {
    weeks.push(" ")
  }

  var renderBoxes = weeks.map(item =>  <div className="boxes"> {item} </div>)

  return (
    <div>
      {/* If no data has been sent, show form */}
      {submitted ? (
          <>
          <p>Weeks left is: {weeksLeft}</p>
            <p>Visual Representation:</p>
            <div className="display">
              <div className="boxContainer">
                {renderBoxes}
              </div>
              <div className="button">
              <button onClick={resetPage}>
                Reset
              </button>
            </div>
          </div>
          </>
      ): (
        <>
        {/* Else, show expected output*/}
        <SearchDataForm getExpectancy={getExpectancy} />
        </>
      )
      }
    </div>
    
  )
}

export const SearchDataForm = ({getExpectancy}) => {
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
            <button onClick={getExpectancy}> Search! </button>
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