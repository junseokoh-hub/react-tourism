export type SnsType = {
  code: string;
  rnum: number;
  name: string;
  image: string;
  link?: string;
};

export const sns: SnsType[] = [
  {
    code: "1",
    rnum: 1,
    name: "facebook",
    image: "./images/sns/facebook.jpg",
    link: "https://www.facebook.com",
  },
  {
    code: "2",
    rnum: 2,
    name: "youtube",
    image: "./images/sns/youtube.jpg",
    link: "https://www.youtube.com",
  },
  {
    code: "3",
    rnum: 3,
    name: "instagram",
    image: "./images/sns/instagram.jpg",
    link: "https://www.instagram.com",
  },
  {
    code: "4",
    rnum: 4,
    name: "twitter",
    image: "./images/sns/twitter.jpg",
    link: "https://www.twitter.com",
  },
];
