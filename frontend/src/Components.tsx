import React, { useState, useCallback, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { publish } from "./services/CommentService";
import { useAuth } from "./services/AuthService";
import { useNavigate } from "react-router-dom";
import { commentClient } from "./services/HttpService";

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
  }

  const resetPage = () => {
    setSubmitted(false);
  }

  const weeks: string[] = []
  for (let i = 0; i < weeksLeft; i++) {
    weeks.push(" ");
  }

  var renderBoxes = weeks.map(item => <div className="boxes"> {item} </div>);

  return (
    <div>
      {/* If submitted show expected output*/}
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
      ) : (
        <>
          {/* Else, if no data has been sent, show form */}
          <SearchDataForm getExpectancy={getExpectancy} />
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


const initialCommentState = {
  name: "",
  message: "",
  date: "",
};

export function Comments() {

  const [comment, setComment] = useState(initialCommentState);
  const [comments, getComments] = useState('');

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = () => {
    commentClient.get("/comments")
      .then((response) => {
        const allComments = response.data;
        console.log(allComments);
        getComments(allComments);
      })
      .catch(error => console.error("Error", error));
  }

  const postComment = () => {
    publish(comment);
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  }

  return (
    <div>
      <>
        <CommentForm postComment={postComment} handleInputChange={handleInputChange} comment={comment} />
        <DisplayComments comments={comments} />
      </>
    </div>
  )
}

const DisplayComments = (props) => {
  const { comments } = props;

  return (
    comments.map((comment, index) => {
      return(
        <>
        <p>{comment.name}</p>
        <p>{comment.message}</p>
        <p>{comment.date}</p>
        </>
      )
    })
  )
}

export const CommentForm = ({ postComment, handleInputChange, comment }) => {
  return (
    <div>
      <div>
        <h2>Submit a Comment</h2>
        <form>
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
            Comment:
            <input
              type="text"
              id="comment"
              required
              onChange={handleInputChange}
              name="message"
              value={comment.message}
            />

          </p>
          {/*<p><input type="submit" value="Comment" /></p>*/}
          <button onClick={postComment}>Submit</button>
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
        <br />
        <Link to="/login">Login</Link>
        <br />
        <Link to="/comments">Comments</Link>
        <Outlet />
      </div>
    </div>
  );
}