import { useNavigate } from "react-router-dom";
import SNSLinks from "./SNSLinks";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <section className="space-y-4 p-4 w-full min-h-[350px] bg-[lightgray] dark:bg-slate-900 dark:text-white md:min-h-[300px]">
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
    </section>
  );
};

export default Footer;
