"use client";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api",
});

export class APIClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async get<T>(params?: Record<string, unknown>): Promise<T> {
    const response = await axiosInstance.get<T>(this.endpoint, { params });
    return response.data;
  }

  async post<TResponse, TPayload = unknown>(payload: TPayload): Promise<TResponse> {
    const response = await axiosInstance.post<TResponse>(this.endpoint, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  }
}

export const createAPIClient = (endpoint: string) => new APIClient(endpoint);