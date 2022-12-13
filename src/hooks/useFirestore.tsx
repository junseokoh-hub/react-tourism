import { useCallback, useReducer } from "react";
import {
  addDoc,
  deleteDoc,
  doc,
  collection,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { appFireStore, timestamp } from "../lib/firebaseConfig";

type DocType = {
  uid: string;
  title?: string;
  image?: string;
  overview?: string;
  addr?: string;
  tel?: string;
  contentType?: string;
  contentId: string | undefined;
  contentTypeId?: string | undefined;
  author?: string | null;
};

type InitialStateType = {
  document: any;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
};

type ActionType =
  | { type: "isLoading" }
  | { type: "addDoc"; payload: any }
  | { type: "deleteDoc"; payload: any }
  | { type: "updateDoc"; payload: any }
  | { type: "error"; payload: string };

const initialState: InitialStateType = {
  document: null,
  isLoading: false,
  error: null,
  isSuccess: false,
};

const storeReducer = (state: InitialStateType, action: ActionType) => {
  switch (action.type) {
    case "isLoading":
      return { ...state, isLoading: true };
    case "addDoc":
      return { ...state, document: action.payload, isSuccess: true };
    case "deleteDoc":
      return { ...state, document: action.payload, isSuccess: true };
    case "updateDoc":
      return {
        ...state,
        error: null,
        isLoading: false,
        document: { ...action.payload },
        isSuccess: true,
      };
    case "error":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const useFirestore = (transaction: string) => {
  const [response, dispatch] = useReducer(storeReducer, initialState);

  const colRef = collection(appFireStore, transaction);

  const addDocument = useCallback(
    async (doc: DocType) => {
      dispatch({ type: "isLoading" });
      try {
        const createdTime = timestamp.fromDate(new Date());
        const docRef = await addDoc(colRef, { ...doc, createdTime });
        console.log(docRef);
        dispatch({ type: "addDoc", payload: docRef });
      } catch (error: any) {
        if (error instanceof Error) {
          dispatch({ type: "error", payload: error.message });
        }
      }
    },
    [colRef],
  );

  const setDocument = useCallback(
    async (title: string, info: any) => {
      dispatch({ type: "isLoading" });
      try {
        const createdTime = timestamp.fromDate(new Date());
        const docRef = await setDoc(doc(colRef, title), {
          ...info,
          createdTime,
        });

        dispatch({ type: "addDoc", payload: docRef });
      } catch (error) {
        if (error instanceof Error) {
          dispatch({ type: "error", payload: error.message });
        }
      }
    },
    [colRef],
  );

  // 컬렉션에서 문서를 업데이트 한다.

  const updateDocument = useCallback(
    async (id: string, options: any) => {
      dispatch({ type: "isLoading" });
      try {
        const docRef = await updateDoc(doc(colRef, id), options);
        dispatch({ type: "updateDoc", payload: docRef });
      } catch (error) {
        if (error instanceof Error) {
          dispatch({ type: "error", payload: error.message });
        }
      }
    },
    [colRef],
  );

  // 컬렉션에서 문서를 제거한다.
  const deleteDocument = useCallback(
    async (id: string) => {
      dispatch({ type: "isLoading" });
      try {
        const docRef = await deleteDoc(doc(colRef, id));
        dispatch({ type: "deleteDoc", payload: docRef });
      } catch (error) {
        if (error instanceof Error) {
          dispatch({ type: "error", payload: error.message });
        }
      }
    },
    [colRef],
  );

  return { addDocument, setDocument, updateDocument, deleteDocument, response };
};
