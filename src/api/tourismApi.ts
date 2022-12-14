import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { AreaBasedListType, DetailCommonType } from "../types/DetailType";
import { SearchKeywordType } from "../types/SearchKeywordType";

const tourismConfig: AxiosRequestConfig = {
  baseURL: "https://apis.data.go.kr/B551011/KorService/",
  params: {
    serviceKey: import.meta.env.VITE_TOUR_KEY,
    _type: "json",
    MobileOS: "WIN",
    MobileApp: "Tourism",
    numOfRows: 100,
    pageNo: 1,
  },
};

const tourism = axios.create(tourismConfig);

export const areaCode = async (code: string) => {
  try {
    const {
      data: {
        response: {
          body: {
            items: { item },
          },
        },
      },
    } = await tourism.get("areaCode", {
      params: { areaCode: code },
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

export const areaBasedList = async (
  areaCode: string,
  sigunguCode: string,
  contentTypeId: string,
): Promise<AreaBasedListType[]> => {
  try {
    const {
      data: {
        response: {
          body: { items: item },
        },
      },
    } = await tourism.get("areaBasedList", {
      params: {
        areaCode,
        sigunguCode,
        contentTypeId,
      },
    });
    return item.item;
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

export const searchKeyword = async (
  keyword: string,
): Promise<SearchKeywordType[]> => {
  try {
    const {
      data: {
        response: {
          body: { items: item },
        },
      },
    } = await tourism.get("searchKeyword", {
      params: {
        keyword,
      },
    });
    return item.item;
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

/** Details */

export const detailCommon = async (
  contentId: string,
): Promise<DetailCommonType> => {
  try {
    const {
      data: {
        response: {
          body: {
            items: { item },
          },
        },
      },
    } = await tourism.get("detailCommon", {
      params: {
        defaultYN: "Y",
        addrinfoYN: "Y",
        mapinfoYN: "Y",
        overviewYN: "Y",
        firstImageYN: "Y",
        areacodeYN: "Y",
        contentId,
      },
    });
    return item[0];
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

export const detailInfo = async (contentId: string, contentTypeId: string) => {
  try {
    const {
      data: {
        response: {
          body: {
            items: { item },
          },
        },
      },
    } = await tourism.get("detailInfo", {
      params: {
        contentId,
        contentTypeId,
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

export const detailIntro = async (contentId: string, contentTypeId: string) => {
  try {
    const {
      data: {
        response: {
          body: {
            items: { item },
          },
        },
      },
    } = await tourism.get("detailIntro", {
      params: {
        contentId,
        contentTypeId,
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
