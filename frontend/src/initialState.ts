import random from "lodash.random";
import { State, LifeExpectancy } from "./types/StateTypes";


const initialState: State = {
  currentProfile: getLifeExpectancy(),
};

export default initialState;

export function getLifeExpectancy(): LifeExpectancy {
  const lifeExpectancy = random(0, 100, false);
  
  return {
    weeksLeft: lifeExpectancy,
  };
}