import React, { useState }from "react";
import { Link, Outlet } from "react-router-dom";
import { Comment } from "./services/CommentService";
import { commentClient } from "./services/HttpService";

export type ExpectancyProps = {
  weeksLeft: number,
  getSearchClick: () => void,
  weeks: string[],
}

export function Profile(props: ExpectancyProps) {
  let {weeksLeft, getSearchClick} = props;

  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState(initialCommentState);

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

  const handleInputChange = event => {
    const {name, value} = event.target;
    setComment( {...comment, [name]: value});
  }

  const postComment = () => {
    Comment.publish(comment)
    .then(res => {
      setSubmitted(true);
      setComment(initialCommentState);
    });
  }

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
        <CommentForm postComment={postComment} handleInputChange={handleInputChange} comment={comment}/> 
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

const initialCommentState = {
  name: "",
  message: "",
  date: "",
};

export const CommentForm = ({postComment, handleInputChange, comment}) => {
  return (
    <div>
      <div>
        <h2>Submit a Comment</h2>
          <p>
            Name: 
            <input 
            type="text"
            id="name"
            required
            onChange={handleInputChange} 
            name="name" />
            value={comment.name}
          </p>

          <p>
            Comment:
            <textarea 
            name="comment"
            id="comment"
            required
            onChange={handleInputChange}
            value={comment.message}>

            </textarea>
          </p>

        <button onClick={postComment}>Submit</button>
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