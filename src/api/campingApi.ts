import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

type SearchedContentType = {
  addr1: string;
  addr2: string;
  allar: string;
  animalCmgCl: string;
  autoSiteCo: string;
  bizrno: string;
  brazierCl: string;
  caravAcmpnyAt: string;
  caravInnerFclty: string;
  caravSiteCo: string;
  clturEvent: string;
  clturEventAt: string;
  contentId: string;
  createdtime: string;
  direction: string;
  doNm: string;
  eqpmnLendCl: string;
  exprnProgrm: string;
  exprnProgrmAt: string;
  extshrCo: string;
  facltDivNm: string;
  facltNm: string;
  featureNm: string;
  fireSensorCo: string;
  firstImageUrl: string;
  frprvtSandCo: string;
  frprvtWrppCo: string;
  glampInnerFclty: string;
  glampSiteCo: string;
  gnrlSiteCo: string;
  homepage: string;
  hvofBgnde: string;
  hvofEnddle: string;
  induty: string;
  indvdlCaravSiteCo: string;
  insrncAt: string;
  intro: string;
  lctCl: string;
  lineIntro: string;
  manageNmpr: string;
  manageSttus: string;
  mangeDivNm: string;
  mapX: string;
  mapY: string;
  mgcDiv: string;
  modifiedtime: string;
  operDeCl: string;
  operPdCl: string;
  posblFcltyCl: string;
  posblFcltyEtc: string;
  prmisnDe: string;
  resveCl: string;
  resveUrl: string;
  sbrsCl: string;
  sbrsEtc: string;
  sigunguNm: string;
  siteBottomCl1: string;
  siteBottomCl2: string;
  siteBottomCl3: string;
  siteBottomCl4: string;
  siteBottomCl5: string;
  siteMg1Co: string;
  siteMg1Vrticl: string;
  siteMg1Width: string;
  siteMg2Co: string;
  siteMg2Vrticl: string;
  siteMg2Width: string;
  siteMg3Co: string;
  siteMg3Vrticl: string;
  siteMg3Width: string;
  sitedStnc: string;
  swrmCo: string;
  tel: string;
  themaEnvrnCl: string;
  toiletCo: string;
  tooltip: string;
  tourEraCl: string;
  trlerAcmpnyAt: string;
  trsagntNo: string;
  wtrplCo: string;
  zipcode: string;
};

type SearchListType = {
  items: {
    item: SearchedContentType[];
  };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
};

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

export const searchList = async (keyword: string): Promise<SearchListType> => {
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
