const CommonDetailTable = ({ item }: any) => {
  return (
    <table className="mx-auto w-[80%] h-full border-t border-solid border-[#444444] border-collapse">
      <thead>
        <tr>
          <th
            colSpan={2}
            className="p-[10px] text-center border-b border-solid border-[#444444]"
          >
            {item.infoname}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            dangerouslySetInnerHTML={{ __html: item.infotext }}
            className="p-[10px] text-center border-b border-solid border-[#444444]"
          ></td>
        </tr>
      </tbody>
    </table>
  );
};

export default CommonDetailTable;
