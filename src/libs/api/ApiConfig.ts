import axios, { AxiosInstance } from "axios";

class ApiConfig {
  protected axiosConfig: AxiosInstance;

  constructor() {
    this.axiosConfig = axios.create({
      baseURL: import.meta.env["VITE_APP_API_URL"],
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export { ApiConfig };
