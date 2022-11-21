import React, { Dispatch, SetStateAction } from "react";

type PaginationProps = {
  total: number | undefined;
  limit: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const Pagination = ({ total, limit, page, setPage }: PaginationProps) => {
  const numPages = total !== undefined && Math.ceil(total / limit);

  return (
    <>
      <nav>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          ))}
        <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </button>
      </nav>
    </>
  );
};

export default React.memo(Pagination);
