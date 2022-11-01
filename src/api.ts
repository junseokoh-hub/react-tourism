import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

const tourismConfig: AxiosRequestConfig = {
  baseURL: "http://apis.data.go.kr/B551011/KorService/",
  timeout: 1000,
  params: {
    serviceKey: import.meta.env.VITE_API_KEY,
    _type: "json",
    MobileOS: "WIN",
    MobileApp: "Tourism",
    numOfRows: "10",
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

interface fetchDataType {
  data: {
    response: {
      body: {
        items: {
          item: ItemType[];
        };
      };
    };
  };
}

export const searchStay = async () => {
  try {
    const {
      data: {
        response: {
          body: {
            items: { item },
          },
        },
      },
    } = await tourism.get("searchStay");
    return item;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(
        (error.response as AxiosResponse<{ message: string }>).data.message,
      );
    }
    const errorResponse = (error as AxiosError<{ message: string }>).response;
    console.log(errorResponse);
  }
};
