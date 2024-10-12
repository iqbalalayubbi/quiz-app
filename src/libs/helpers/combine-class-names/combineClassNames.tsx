import clsx, { type ClassValue } from "clsx";

const combineClassNames = (...classNames: ClassValue[]): string => {
  return clsx(...classNames);
};

export { combineClassNames };
