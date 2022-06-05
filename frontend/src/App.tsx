import React from 'react';
import { Login, NotFound, Header} from "./components/Components";
import { LifeExpectancy } from "./components/lifeExpectancy";
import { Comments } from "./components/comments"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  let login = <Login />

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<LifeExpectancy />} />
            <Route path="/login" element={login} />
            <Route path="/comments" element={<Comments />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;