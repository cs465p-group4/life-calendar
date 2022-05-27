import React, { useState  } from 'react';
import { Login, Profile as ProfileType, Comment as CommentType, NotFound, Header} from "./Components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import initialState, { getLifeExpectancy } from './initialState';

function App() {
  let [currentProfile, setCurrentProfile] = useState(initialState.currentProfile);

  let getSearchClick = () => {
    currentProfile = getLifeExpectancy();
    setCurrentProfile(currentProfile);
  }

  let profile = <ProfileType {...currentProfile}
    getSearchClick={getSearchClick} 
  />

  let login = <Login />
  let comment = <CommentType/>

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={profile} />
            <Route path="/login" element={login} />
            <Route path="/comments" element={comment} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;