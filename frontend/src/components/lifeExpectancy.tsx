import React, { useState } from 'react';
import random from "lodash.random";
import { SearchDataForm } from './searchDataForm';

const initialExpectancy = {
    weeksLeft: 0
}

export function LifeExpectancy() {
    const [lifeExpectancy, setExpectancy] = useState(initialExpectancy);
    const [submitted, setSubmitted] = useState(false);

    const getRandomExpectancy = () => {
        const newExpectancy = lifeExpectancy;
        newExpectancy.weeksLeft = random(0,100);
        setExpectancy(newExpectancy);
        setSubmitted(true);
    }

    const resetPage = () => {
        setSubmitted(false);
    }

    const weeks: string[] = [];
    for (let i = 0; i < lifeExpectancy.weeksLeft; i++) {
        weeks.push(" ");
      }
    
      var renderBoxes = weeks.map(item => <div className="boxes"> {item} </div>);
    
      return (
        <div>
          {/* If submitted show expected output*/}
          {submitted ? (
            <>
              <p>Weeks left is: {lifeExpectancy.weeksLeft}</p>
              <p>Visual Representation:</p>
              <div className="display">
                <div className="boxContainer">
                  {renderBoxes}
                </div>
                <div className="button">
                  <button onClick={resetPage}>
                    Reset
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Else, if no data has been sent, show form */}
              <SearchDataForm getRandomExpectancy={getRandomExpectancy} />
            </>
          )}
        </div>
      ) 
}