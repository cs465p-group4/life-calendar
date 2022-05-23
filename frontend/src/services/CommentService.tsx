import {commentClient} from "./HttpService";

export const Comment = {
    async publish(comment) {
      return commentClient.post("/comment"
        , { name: comment.name, message: comment.message, date: comment.date }
      )
    }  
  }