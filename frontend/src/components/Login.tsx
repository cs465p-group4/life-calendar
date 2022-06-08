import { useState } from "react";
import { getLoginToken } from "../services/AuthService";
import React from "react";

export type LoginProps = {
  setToken: (token: string) => void,
}

export function Login({ setToken }: LoginProps) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmitLogin() {
    console.log("In submit login about to fetch login token");
    let token = await getLoginToken(email, password);
    console.log("Got token: ", token);
    setToken(token);
  }

  return (
    <div>
      <br />
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          placeholder="Email..."
          id="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
        />
      </div>
      <br />
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder={"Password..."}
          id="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          name="password"
        />
      </div>
      <br />
      <button onClick={onSubmitLogin}>
        Submit
      </button> &nbsp;
    </div>
  )
}
