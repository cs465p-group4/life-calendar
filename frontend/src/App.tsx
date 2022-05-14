import React, { useEffect  } from 'react';
import { SubmitData, NotFound, Header} from "./Components";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

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