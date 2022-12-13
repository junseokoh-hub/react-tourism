import {
  collection,
  FieldPath,
  onSnapshot,
  orderBy,
  query,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { appFireStore } from "../lib/firebaseConfig";

export type DocumentsType = {
  createdTime: {
    nanoseconds: number;
    seconds: number;
  };
  id: string;
  overview: string;
  title: string;
  uid: string;
  addr: string;
  tel: string;
  image: string;
  contentType: string;
  contentId: string;
  contentTypeId: string;
  author?: string;
};

export const useCollection = (
  transaction: string,
  myFilt: string | null,
  myQuery: string | null,
) => {
  const [documents, setDocuments] = useState<DocumentsType[] | null>(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    let q: any;
    if (myQuery && myFilt) {
      q = query(
        collection(appFireStore, transaction),
        where(myFilt, "==", myQuery),
      );
    }
    const unsubscribe = onSnapshot(
      myQuery ? q : collection(appFireStore, transaction),
      (snapshot: any) => {
        let result: any = [];
        snapshot.docs.forEach((doc: any) => {
          result.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(result);
        setError(null);
      },
      (error: any) => {
        setError(error.message);
      },
    );

    return unsubscribe;
  }, [collection, transaction]);

  return { documents, error };
};
