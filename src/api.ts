import axios from "axios";

const tourism = axios.create({
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
});

export const searchStay = async () => {
  const { data } = await tourism.get("searchStay");
  return data;
};
