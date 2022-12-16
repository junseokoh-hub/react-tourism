import React from "react";
import { DocumentsType } from "../../hooks/useCollection";

type ReviewsListsProps = {
  doc: DocumentsType;
  createdTime: () => string | undefined;
  deleteMyReview: () => void;
};

const ReviewsLists = ({
  doc,
  createdTime,
  deleteMyReview,
}: ReviewsListsProps) => {
  return (
    <li
      className="px-3 py-2 space-y-3 min-h-20 flex flex-col justify-around border border-dashed border-blue-500 rounded-md dark:border-orange-500"
      key={doc.createdTime + doc.contentId}
    >
      <h3>{doc.title}</h3>
      <div className="space-y-3 flex flex-col">
        <p>내용 : {doc.overview}</p>
        <span>{createdTime()}</span>
        <button
          onClick={deleteMyReview}
          type="button"
          className="py-2 w-1/5 bg-transparent rounded-md cursor-pointer transition-colors border border-solid border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white dark:border-orange-500 dark:text-orange-500 dark:hover:bg-orange-500 dark:hover:text-white"
        >
          제거
        </button>
      </div>
    </li>
  );
};

export default React.memo(ReviewsLists);
