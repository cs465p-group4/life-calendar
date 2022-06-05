import React from 'react';

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