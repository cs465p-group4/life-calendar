import React, { useEffect, useState  } from 'react';
import { SearchData, NotFound, Header} from "./Components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import initialState, { getLifeExpectancy } from './initialState';

function App() {
  let [currentProfile, setCurrentProfile] = useState(initialState.currentProfile);

  useEffect(() => {
    console.log("-- App rerenders --");
  });
  
  let getSearchClick = () => {
    currentProfile = getLifeExpectancy();
    setCurrentProfile(currentProfile)
  };

  let profile = <SearchData {...currentProfile} 
    getSearchClick={getSearchClick} />

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={profile} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;