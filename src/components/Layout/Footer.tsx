import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SNSLinks from "./SNSLinks.js";

const Footer = () => {
  const navigate = useNavigate();

  const moveToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="space-y-4 p-4 w-full relative min-h-[350px] bg-[lightgray] dark:bg-slate-900 dark:text-white md:min-h-[300px]">
      <span
        className="font-extrabold text-2xl italic text-gray-600 cursor-pointer transition-colors dark:hover:text-orange-500"
        onClick={() => navigate("/")}
      >
        Tourism
      </span>
      <ul className="space-x-3 flex divide-x divide-y-0 divide-solid divide-black text-sm md:text-base dark:divide-white">
        <li>이용약관</li>
        <li className="pl-3">개인정보처리방침</li>
        <li className="pl-3">고객센터</li>
        <li className="pl-3">제휴문의</li>
      </ul>
      <ul className="space-y-3 flex text-sm flex-col md:space-x-3 md:space-y-0 md:flex-row md:text-base">
        <li>고객센터 : 0000-0000 (오전 9시 - 오후 9시)</li>
        <li>사업자 등록번호 : 000-00-0000</li>
      </ul>
      <ul className="space-y-3 flex flex-col md:space-x-3 md:space-y-0 md:flex-row md:divide-solid md:divide-x md:divide-y-0">
        <li>주소 : 서울특별시 강남구 테헤란로</li>
        <li className="md:pl-3">메일 : help@tourism.com</li>
      </ul>
      <SNSLinks />
      <div
        onClick={moveToTop}
        className="w-12 h-12 flex justify-center items-center absolute bottom-20 right-10 text-2xl rounded-full bg-blue-500 text-white shadow-md cursor-pointer transition-colors md:right-20 dark:bg-orange-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
          />
        </svg>
      </div>
    </section>
  );
};

export default Footer;
