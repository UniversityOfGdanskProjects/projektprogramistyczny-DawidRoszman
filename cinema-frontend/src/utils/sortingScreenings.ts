import { Screening } from "../../types/types";

export const screeningsComparator = (a: Screening, b: Screening) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);

  if (dateA < dateB) {
    return -1;
  }
  if (dateA > dateB) {
    return 1;
  }
  const timeA = parseInt(a.time.replace(":", ""));
  const timeB = parseInt(b.time.replace(":", ""));
  // If dates are equal, compare time
  if (timeA < timeB) {
    return -1;
  }
  if (timeA > timeB) {
    return 1;
  }

  return 0;
};
