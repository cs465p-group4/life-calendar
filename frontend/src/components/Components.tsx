import React, { useState, useCallback, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export function Login() {

  const context = useAuth();
  const navigation: any = useNavigate();

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

  const onCreateUser = () => {
    navigation("/create-user");
  }


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
            <button className={""} onClick={onCreateUser}>
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