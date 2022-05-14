import React, { useEffect, useState } from 'react';
import initialState, { getLifeExpectancy } from "./initialState";
import { SubmitData, SetData, NotFound, Header} from "./Components";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  /*let [currentProfile, setCurrentProfile] = useState(initialState.currentProfile);

  let onSubmitButtonClick = () => {
    let getExpectancy = getLifeExpectancy();
  }*/
  useEffect(() => {
    console.log("-- App rerenders --");
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<SubmitData />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;