import { type Question } from "./question.type";

type ResponseQuizApi = {
  response_code: number;
  results: Question[];
};

export { type ResponseQuizApi };
