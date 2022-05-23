import {commentClient} from "./HttpService";

export const Comment = {
    async publish(comment) {
      return commentClient.post("/comment"
        , { name: comment.name, message: comment.message, date: comment.date }
      )
    },  

    async display() {
      let res = await commentClient.get("/comment");
      let data = await res.data;
      console.log(typeof(data))
      return data;
    }
  }