import axios, {
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  Axios,
} from "axios";

const tourismConfig: AxiosRequestConfig = {
  baseURL: "http://apis.data.go.kr/B551011/KorService/",
  params: {
    serviceKey: import.meta.env.VITE_TOUR_KEY,
    _type: "json",
    MobileOS: "WIN",
    MobileApp: "Tourism",
    numOfRows: "100",
    pageNo: "1",
  },
};

const tourism = axios.create(tourismConfig);

export interface ItemType {
  addr1: string;
  addr2: string;
  areacode: string;
  booktour: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  createdtime: string;
  benikia: string;
  goodstay: string;
  hanok: string;
  firstimage: string;
  firstimage2: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  readcount: string;
  sigungucode: string;
  tel: string;
  title: string;
}

export const searchStay = async (areaCode: string, sigunguCode: string) => {
  try {
    const {
      data: {
        response: {
          body: {
            items: { item },
          },
        },
      },
    } = await tourism.get("searchStay", {
      params: { areaCode, sigunguCode },
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

export const detailCommon = async (contentId: string) => {
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
