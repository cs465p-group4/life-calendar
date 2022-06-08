import React, {useState} from "react";
import {User} from "../services/UserService";
import {SubmissionStatus} from "./Components";

const initialUserState = {
  email: "",
  password: "",
};
export const CreateUser = () => {

  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);


  const handleInputChange = event => {
    const {
      name,
      value
    } = event.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const saveUser = () => {
    User.create(user)
      .then(res => {
        setSubmitted(true);
        setSubmitFailed(false);
        console.log(res.data);
      })
      .catch(e => {
        setSubmitFailed(true);
        console.log("Error creating new user", e);
      });
  };

  const resetUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div>
      <div>
        {submitted ? (
          <>     {/* If we've already submitted, show this piece*/}
            <h4>You submitted successfully!</h4>
            <button onClick={resetUser}>
              Reset
            </button>
          </>
        ) : (
          <>   {/* If we've NOT already submitted, show this piece*/}
            {submitFailed && //This will only render if our prior submit failed
              //we could add a div here and style this separately
              <h2>Email already exists!</h2>
            }
            <CreateUserForm handleInputChange={handleInputChange} saveUser={saveUser} user={user}/>
          </>
        )
        }
      </div>
    </div>
  );
};
export const CreateUserForm = ({
  handleInputChange,
  saveUser,
  user
}) => {

  const [submitted] = useState(SubmissionStatus.NotSubmitted);


  return (
    <div className={"form-control-sm max-w-2xs "}>
      {submitted === SubmissionStatus.SubmitFailed &&
        <h3>Submitting failed!</h3>
      }
      <br />
      <div>
        <label className="label" htmlFor="email">Email:</label>
        <input
          className={"input input-bordered max-w-2xs"}
          placeholder="Email..."
          type="text"
          id="email"
          required
          value={user.email}
          onChange={handleInputChange}
          name="email"
        />
      </div>
      <br />
      <div>
        <label className="label" htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder={"Password..."}
          id="password"
          required
          value={user.password}
          onChange={handleInputChange}
          name="password"
        />
      </div>
      <br />
      <div>
        <button onClick={saveUser} type="button">
          Create
        </button> 
      </div>
    </div>
  );
};
