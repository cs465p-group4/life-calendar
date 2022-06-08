import React from 'react';
import { NotFound, Header} from "./components/Components";
import { Login } from "./components/Login";
import { LifeExpectancy } from "./components/lifeExpectancy";
import { Comments } from "./components/comments"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateUser } from "./components/CreateUser";

function Page({token, setToken}) {
  return (
    <div>
      <Header token={token} setToken={setToken} />
    </div>
  )
}

function App() {

  const [token, setToken] = React.useState<string | null>(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Page token={token} setToken={setToken}/>}>
            <Route path="/" element={<LifeExpectancy />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/comments" element={<Comments />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;