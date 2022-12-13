const AccommodationDetailTable = ({ item }: any) => {
  return (
    <table className="mx-auto w-[80%] h-full border-t border-solid border-[#444444] border-collapse">
      <thead>
        <tr>
          <th
            colSpan={2}
            className="p-[10px] text-center border-b border-solid border-[#444444]"
          >
            정보
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-[10px] text-center border-b border-solid border-[#444444]">
            목차
          </td>
          <td className="p-[10px] text-center border-b border-solid border-[#444444]">
            내용
          </td>
        </tr>
        <tr>
          <td className="p-[10px] text-center border-b border-solid border-[#444444]">
            객실 이름
          </td>
          <td className="p-[10px] text-center border-b border-solid border-[#444444]">
            {item.roomtitle}
          </td>
        </tr>
        <tr>
          <td className="p-[10px] text-center border-b border-solid border-[#444444]">
            객실 크기
          </td>
          <td className="p-[10px] text-center border-b border-solid border-[#444444]">
            {item.size1}평
          </td>
        </tr>
        <tr>
          <td className="p-[10px] text-center border-b border-solid border-[#444444]">
            목욕 시설 여부
          </td>
          <td className="p-[10px] text-center border-b border-solid border-[#444444]">
            {item.roombathfacility}
          </td>
        </tr>
        <tr>
          <td className="p-[10px] text-center border-b border-solid border-[#444444]">
            욕조 여부
          </td>
          <td className="p-[10px] text-center border-b border-solid border-[#444444]">
            {item.roombath}
          </td>
        </tr>
        <tr>
          <td className="p-[10px] text-center border-b border-solid border-[#444444]">
            세면 도구 여부
          </td>
          <td className="p-[10px] text-center border-b border-solid border-[#444444]">
            {item.roomtoiletries}
          </td>
        </tr>
        <tr>
          <td className="p-[10px] text-center border-b border-solid border-[#444444]">
            인터넷 여부
          </td>
          <td className="p-[10px] text-center border-b border-solid border-[#444444]">
            {item.roominternet}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AccommodationDetailTable;
