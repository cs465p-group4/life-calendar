export type State = {
  currentProfile: lifeExpectancy
  currentComment: Array<Comment>
};

export type lifeExpectancy = {
  weeksLeft: number
}

export type Comment = {
  name: string,
  message: string,
  date: Date
}