import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const campingConfig: AxiosRequestConfig = {
  baseURL: "https://apis.data.go.kr/B551011/GoCamping/",
  params: {
    serviceKey: import.meta.env.VITE_TOUR_KEY,
    _type: "json",
    MobileOS: "WIN",
    MobileApp: "Tourism",
    numOfRows: "100",
    pageNo: "1",
  },
};

const camping = axios.create(campingConfig);

export const basedList = async () => {
  try {
    const {
      data: {
        response: { body },
      },
    } = await camping.get("basedList");
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

export const searchList = async (keyword: string) => {
  try {
    const {
      data: {
        response: { body },
      },
    } = await camping.get("searchList", {
      params: {
        keyword,
      },
    });
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
