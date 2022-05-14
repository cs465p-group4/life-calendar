import random from "lodash.random";
import { State, Profile } from "./types/StateTypes";


const initialState: State = {
  currentProfile: getLifeExpectancy(),
};

export default initialState;

export function getLifeExpectancy(): Profile {
  const age = random(0, 100, false);
  const lifeExpectancy = random(0, 1000000000, false);

  return {
    age: age,
    sex: "male",
    ethnicity: "white",
    lifeExpectancy: lifeExpectancy,
  }
}