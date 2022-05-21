import {commentClient} from "./HttpService";

export const Comment = {
    async publish(comment) {
      return commentClient.post("/comments"
        , { name: comment.name, comment: comment.message, date: comment.date }
      )
    }  
  }