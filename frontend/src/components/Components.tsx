import React, { useState, useCallback } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../services/AuthService";
//import { useNavigate } from "react-router-dom";
import {User} from "../services/UserService";

export enum SubmissionStatus {
  NotSubmitted,
  SubmitFailed,
  SubmitSucceeded
}

const initialUserState = {
  email: "",
  password: "",
};

export function Login() {

  const context = useAuth();
  //const navigation: any = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitFailed, setSubmitFailed] = useState(false);

  const onSubmitLogin = useCallback(
    async () => {
      if (context) {
        console.log("OnSubmitLogin :", email, password);
        let loginSuccess = await context.handleLogin(email, password);
        if (!loginSuccess) {
          console.log("Setting submit failed");
          setSubmitFailed(true);
        }
      }
      else {
        console.log("Context is null");
      }
    }
    , [email, password, context, setSubmitFailed]);






  const OnCreateUser = () => {
    // Post user info to create user account
    // Don't navigate anywhere else
    // Dispaly message on success/failure
    
    let result = 0;

    if (!result) {
      // @TODO Display Error Message
    }
    else {
      // display account created
    }

    const [user, setUser] = useState(initialUserState);
    const [submitted, setSubmitted] = useState(false);
    const [submitFailed, setSubmitFailed] = useState(false);
  


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



   // Returns HTML
  return (
    <div>
      <div className="doggrcenter doggr-section-text">Create user</div>
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
            
          </>
        )
        }
      </div>
    </div>
  );
  }
  // END OF CREATE USER


  return (
    <div>
      <div>
        <form>
          <p>
            {submitFailed ? (
              <div className="login-warning">SUBMIT FAILED!</div>
            )
              : null}
          </p>
          <p>
            Email:
            <input
              type="text"
              id="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              name="email"
            />
          </p>

          <p>
            Password:
            <input
              type="text"
              id="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              name="password"
            />
          </p>

            <button className={""} onClick={onSubmitLogin}>
              Submit
            </button>
            <button className={""} onClick={OnCreateUser}>
              CreateUser
            </button>
        </form>
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
        &nbsp; | &nbsp;
        <Link to="/login">Login</Link>
        &nbsp; | &nbsp;
        <Link to="/comments">Comments</Link>
        <Outlet />
      </div>
    </div>
  );
}