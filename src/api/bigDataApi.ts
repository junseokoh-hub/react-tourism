import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export type MetVisitorType = {
  touNum: "string";
  baseYmd: "string";
  areaCode: "string";
  areaNm: "string";
  daywkDivCd: "string";
  daywkDivNm: "string";
  touDivCd: "string";
  touDivNm: "string";
};

const bigDataConfig: AxiosRequestConfig = {
  baseURL: "https://apis.data.go.kr/B551011/DataLabService/",
  params: {
    serviceKey: import.meta.env.VITE_TOUR_KEY,
    _type: "json",
    MobileOS: "WIN",
    MobileApp: "Tourism",
    numOfRows: "100",
    pageNo: "1",
  },
};

const bigData = axios.create(bigDataConfig);

export const metVistior = async (
  startYmd: string,
  endYmd: string,
): Promise<MetVisitorType[]> => {
  try {
    const {
      data: {
        response: {
          body: {
            items: { item },
          },
        },
      },
    } = await bigData.get("metcoRegnVisitrDDList", {
      params: {
        startYmd,
        endYmd,
      },
    });
    return item;
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
