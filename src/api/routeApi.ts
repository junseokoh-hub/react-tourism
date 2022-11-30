import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const routeConfig: AxiosRequestConfig = {
  baseURL: "https://apis.data.go.kr/B551011/Durunubi/",
  params: {
    serviceKey: import.meta.env.VITE_TOUR_KEY,
    _type: "json",
    MobileOS: "WIN",
    MobileApp: "Tourism",
    numOfRows: "100",
    pageNo: "1",
  },
};

const route = axios.create(routeConfig);

export const routeList = async () => {
  try {
    const {
      data: {
        response: { body },
      },
    } = await route.get("routeList");
    return body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        (error.response as AxiosResponse<{ message: string }>).data.message,
      );
    }
    const errorResponse = (error as AxiosError<{ message: string }>).response;
    throw new Error(errorResponse as any);
  }
};

export const courseList = async () => {
  try {
    const {
      data: {
        response: { body },
      },
    } = await route.get("courseList");
    return body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        (error.response as AxiosResponse<{ message: string }>).data.message,
      );
    }
    const errorResponse = (error as AxiosError<{ message: string }>).response;
    throw new Error(errorResponse as any);
  }
};
