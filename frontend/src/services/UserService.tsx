import axios from "./HttpService";

export const User = {
  async create(user) {
    return axios.post("/users"
      , { age: user.age, sex: user.sex, ethnicity: user.ethnicity }
    )
  }  
}