const CommonDetailTable = ({ item }: any) => {
  return (
    <table className="table_layout">
      <thead>
        <tr>
          <th colSpan={2} className="th_layout">
            {item.infoname}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            dangerouslySetInnerHTML={{ __html: item.infotext }}
            className="td_layout"
          ></td>
        </tr>
      </tbody>
    </table>
  );
};

export default CommonDetailTable;
