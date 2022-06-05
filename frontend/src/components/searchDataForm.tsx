import React from 'react'

export const SearchDataForm = ({ getRandomExpectancy }) => {
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
          <button onClick={getRandomExpectancy}> Search! </button>
        </div>
      </div>
    </div>
  )
}