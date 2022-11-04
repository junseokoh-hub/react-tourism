import {
  collection,
  FieldPath,
  onSnapshot,
  orderBy,
  query,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import {  useEffect, useState } from "react";
import { appFireStore } from "../lib/firebaseConfig";

export const useCollection = (transaction:any, myQuery: [string | FieldPath, WhereFilterOp, any]) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    let q;
    if (myQuery) {
      q = query(
        collection(appFireStore, transaction),
        where(...myQuery),
        orderBy("createdTime", "desc"),
      );
    }
    const unsubscribe = onSnapshot(
      myQuery ? q : collection(appFireStore, transaction),
      (snapshot:any) => {
        let result:any = [];
        snapshot.docs.forEach((doc:any) => {
          result.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(result);
        setError(null);
      },
      (error:any) => {
        setError(error.message);
      },
    );

    return unsubscribe;
  }, [collection, transaction]);

  return { documents, error };