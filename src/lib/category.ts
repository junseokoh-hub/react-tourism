export type CategoriesType = {
  code: string;
  name: string;
  rnum: number;
  image: string;
};

export const categories: CategoriesType[] = [
  {
    code: "A01",
    name: "자연",
    rnum: 1,
    image: "./images/categories/nature.jpg",
  },
  {
    code: "A02",
    name: "인문(문화/예술/역사)",
    rnum: 2,
    image: "./images/categories/culture.jpg",
  },
  {
    code: "A03",
    name: "레포츠",
    rnum: 3,
    image: "./images/categories/leisure.jpg",
  },
  {
    code: "A04",
    name: "쇼핑",
    rnum: 4,
    image: "./images/categories/shopping.jpg",
  },
  {
    code: "A05",
    name: "음식",
    rnum: 5,
    image: "./images/categories/food.jpg",
  },
  {
    code: "B02",
    name: "숙박",
    rnum: 6,
    image: "./images/categories/accommodation.jpg",
  },
  {
    code: "C01",
    name: "추천코스",
    rnum: 7,
    image: "./images/categories/recommendation.jpg",
  },
];
