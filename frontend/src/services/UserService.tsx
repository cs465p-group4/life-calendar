import {httpClient} from "./HttpService";

export const User = {
  async create(user) {
    return httpClient.post("/users"
      , { age: user.age, sex: user.sex, ethnicity: user.ethnicity }
    )
  }  
}