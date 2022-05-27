import {commentClient} from "./HttpService";

export async function publish(comment) {
  return commentClient.post("/comments"
    , { name: comment.name, comment: comment.message, date: comment.date }
  )
}