import { type QuestionResponse } from "./question-response.type";

type ResponseQuizApi = {
  response_code: number;
  results: QuestionResponse[];
};

export { type ResponseQuizApi };
