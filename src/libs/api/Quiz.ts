import { type ResponseQuizApi } from "~/libs/types/types";
import { ApiConfig } from "./ApiConfig";
import { AxiosError } from "axios";

class Quiz extends ApiConfig {
  constructor() {
    super();
  }

  async getQuizData(): Promise<ResponseQuizApi> {
    try {
      const API_URL = import.meta.env["VITE_APP_API_URL"];
      const response = await this.axiosConfig.get(API_URL);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw new Error(err.response?.statusText);
    }
  }
}

export { Quiz };
