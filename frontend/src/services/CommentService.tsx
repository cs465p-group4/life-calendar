import {commentClient} from "./HttpService";

export async function publish(comment) {
  return commentClient.post("/comments"
    , { name: comment.name, comment: comment.message, date: comment.date }
  )
}

export async function display() {
  let res = await commentClient.get("/comments")
  let data = await res.data;
  console.log("name: ", data[0].name);
  console.log("comment", data[0].comment)
  return data;
}
