import React from 'react';

export const DisplayComments = (props) => {
  const { comments } = props;

  if (comments.length > 0) {
    return (
      comments.map((comment, index) => {
        return(
          <>
          <div className="commentDisplay">
            <div className="commentContainer">
              <div className="nameDate">
                <p>Name: {comment.name}</p>
                <p>Date: {comment.date}</p>
              </div>
              <div className="commentBox">
                <p className="comment">{comment.message}</p>
              </div>
            </div>
          </div>
          </>
        )
      })
    )
  } else {
    return (<h3>No Comments Yet!</h3>)
  }
}