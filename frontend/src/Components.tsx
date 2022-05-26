import React, { useState, useCallback } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { publish, display } from "./services/CommentService"
import { useAuth } from "./services/AuthService";

export type ExpectancyProps = {
  weeksLeft: number,
  getSearchClick: () => void,
}

export function Profile(props: ExpectancyProps) {

  let { weeksLeft, getSearchClick } = props;

  const [submitted, setSubmitted] = useState(false);

  const getExpectancy = () => {
    setSubmitted(true);
    getSearchClick();
    console.log("WeeksLeft", weeksLeft);
  }

  const resetPage = () => {
    setSubmitted(false);
  }

  const weeks: string[] = [];
  for(let i = 0; i < weeksLeft; i++) {
    weeks.push(" ");
  }

  var renderBoxes = weeks.map(item => <div className="boxes"> {item} </div>);

  return (
    <div>
      {/* If submitted, show expected weeks left*/}
      {submitted ? (
        <>
        <p>Weeks Left: {weeksLeft}</p>
        <p>Visual Representation: </p>
        <div className="display">
          <div className="boxContainer">
            {renderBoxes}
          </div>
          <div className="button">
            <button onClick={resetPage}>Reset</button>
          </div>
        </div>
        </>
      ):(
      <>
        <SearchDataForm getExpectancy={getExpectancy}/>
      </>
      )}
    </div>
  )
}

export const SearchDataForm = ({ getExpectancy }) => {
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

export type CommentProps = {
  name: string,
  message: string,
  date: Date,
}

const initialComment = {
  name: "",
  message: "",
  date: "",
}

export function Comment() {

  const [comment, setComment] = useState(initialComment); 
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]:value });
  }

  var allTheComments: Array<Comment> = [];

  const submitComments = () => {
    console.log("name: ", comment.name, "comment:", comment.message);
    publish(comment);
    setSubmitted(true);
    display()
      .then(res => {
        allTheComments = res[0].name;
        console.log("res result:", res);
        console.log("Name:", res[0].name, "Comment:", res[0].comment, "Date:", res[0].date);
      });
  }

  return (
    <div>
      <>
        <CommentForm handleInputChange={handleInputChange} submitComments={submitComments} comment={comment} />
      </>
      {submitted ? (
        <>
          <p>Submitted Comments:</p>
          {allTheComments}
        </>
      ) : (
        <>
        </>
      )}
    </div>
  )
}

export const CommentForm = ({ handleInputChange, submitComments, comment }) => {
  return (
    <div>
      <h2> Submit a Comment </h2>
        <p> 
          Name:
          <input
          type="text"
          id="name"
          required
          onChange={handleInputChange}
          name="name"
          value={comment.name}
          />
        </p>
        <p> 
          Message:
          <input
          type="text"
          id="message"
          required
          onChange={handleInputChange}
          name="message"
          value={comment.message}
          />
          </p>
        <button onClick={submitComments}>Submit</button>
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
        <br />
        <Link to="/login">Login</Link>
        <br />
        <Link to="/comments">Comments</Link>
        <Outlet />
      </div>
    </div>
  );
}