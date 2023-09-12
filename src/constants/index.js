export const localhost = "http://localhost:4000";

export const stateTransitions = {
  ToDo: ["InProgress"],
  InProgress: ["Blocked", "InQA"],
  Blocked: ["ToDo"],
  InQA: ["ToDo", "Done"],
  Done: ["Deployed"],
};
