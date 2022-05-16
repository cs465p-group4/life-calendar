import random from "lodash.random";
import { State, lifeExpectancy } from "./types/StateTypes";


const initialState: State = {
  currentProfile: getLifeExpectancy(),
};

export default initialState;

export function getLifeExpectancy(): lifeExpectancy {
  const lifeExpectancy = random(0, 100, false);
  
  return {
    weeksLeft: lifeExpectancy,
  };
}