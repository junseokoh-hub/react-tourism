import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

type RouteListType = {
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  items: {
    item: {
      routeIdx: string;
      themeNm: string;
      linemsg: string;
      themedescs: string;
      brdDiv: string;
      createdtime: string;
      modifiedtime: string;
    }[];
  };
};

type CourseListType = {
  totalCount: number;
  numOfRows: number;
  pageNo: number;
  items: {
    item: {
      createdtime: string;
      modifiedtime: string;
      sigun: string;
      brdDiv: string;
      gpxpath: string;
      travelerinfo: string;
      crsTourInfo: string;
      crsSummary: string;
      routeIdx: string;
      crsIdx: string;
      crsKorNm: string;
      crsDstnc: string;
      crsTotlRqrmHour: string;
      crsLevel: string;
      crsCycle: string;
      crsContents: string;
    }[];
  };
};

const routeConfig: AxiosRequestConfig = {
  baseURL: "https://apis.data.go.kr/B551011/Durunubi/",
  params: {
    serviceKey: import.meta.env.VITE_TOUR_KEY,
    _type: "json",
    MobileOS: "WIN",
    MobileApp: "Tourism",
    numOfRows: 20,
  },
};

const route = axios.create(routeConfig);

export const routeList = async (page: number): Promise<RouteListType> => {
  try {
    const {
      data: {
        response: { body },
      },
    } = await route.get("routeList", {
      params: {
        pageNo: page,
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

export const courseList = async (routeIdx: string): Promise<CourseListType> => {
  try {
    const {
      data: {
        response: { body },
      },
    } = await route.get("courseList", {
      params: {
        routeIdx,
        pageNo: 1,
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
