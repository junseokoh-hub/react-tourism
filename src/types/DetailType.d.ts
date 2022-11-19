export type AreaBasedListType = {
  readcount: "string";
  sigungucode: "string";
  tel: "string";
  title: "string";
  addr1: "string";
  addr2: "string";
  areacode: "string";
  booktour: "string";
  cat1: "string";
  cat2: "string";
  cat3: "string";
  contentid: "string";
  contenttypeid: "string";
  createdtime: "string";
  firstimage: "string";
  firstimage2: "string";
  mapx: "string";
  mapy: "string";
  mlevel: "string";
  modifiedtime: "string";
};

type DetailCommonType = {
  contenttypeid: "string";
  booktour: "string";
  createdtime: "string";
  homepage: "string";
  modifiedtime: "string";
  tel: "string";
  telname: "string";
  title: "string";
  firstimage: "string";
  firstimage2: "string";
  areacode: "string";
  sigungucode: "string";
  cat1: "string";
  cat2: "string";
  cat3: "string";
  addr1: "string";
  addr2: "string";
  zipcode: "string";
  mapx: "string";
  mapy: "string";
  mlevel: "string";
  overview: "string";
  contentid: "string";
};

export type DetailProps = {
  contentType: "accommodation" | "festival" | "restaurant" | "shopping";
};

export type ShoppingDetailInfoType = {
  contentid: string;
  contenttypeid: string;
  serialnum: string;
  infoname: string;
  infotext: string;
  fldgubun: string;
};

export type ShoppingDetailIntroType = {
  contentid: string;
  contenttypeid: string;
  saleitem: string;
  saleitemcost: string;
  fairday: string;
  opendateshopping: string;
  shopguide: string;
  culturecenter: string;
  restroom: string;
  infocentershopping: string;
  scaleshopping: string;
  restdateshopping: string;
  parkingshopping: string;
  chkbabycarriageshopping: string;
  chkpetshopping: string;
  chkcreditcardshopping: string;
  opentime: string;
};
