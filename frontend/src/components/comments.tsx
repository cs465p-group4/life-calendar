import React, { useState, useEffect } from 'react'
import { commentClient } from '../services/HttpService';
import { publish } from '../services/CommentService';
import { DisplayComments } from "./displayComments";
import { CommentForm } from "./commentForm";

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
  