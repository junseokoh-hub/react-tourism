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

type InitialStateType = {
  document: any;
  isLoading: boolean;
  error: any;
  isSuccess: boolean;
};

type ActionType =
  | { type: "isLoading" }
  | { type: "addDoc"; payload: any }
  | { type: "deleteDoc"; payload: any }
  | { type: "updateDoc"; payload: any }
  | { type: "error"; payload: any };
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
    async (doc: any) => {
      dispatch({ type: "isLoading" });
      try {
        const createdTime = timestamp.fromDate(new Date());
        const docRef = await addDoc(colRef, { ...doc, createdTime });
        console.log(docRef);
      } catch (error: any) {
        dispatch({ type: "error", payload: error.message });
      }
    },
    [colRef],
  );

  const setDocument = useCallback(
    async (title: any, info: any) => {
      dispatch({ type: "isLoading" });
      try {
        const createdTime = timestamp.fromDate(new Date());
        const docRef = await setDoc(doc(colRef, title), {
          ...info,
          createdTime,
        });

        dispatch({ type: "addDoc", payload: docRef });
      } catch (error: any) {
        dispatch({ type: "error", payload: error.message });
      }
    },
    [colRef],
  );

  // 컬렉션에서 문서를 업데이트 한다.

  const updateDocument = useCallback(
    async (id: any, options: any) => {
      dispatch({ type: "isLoading" });
      try {
        const docRef = await updateDoc(doc(colRef, id), options);
        dispatch({ type: "updateDoc", payload: docRef });
      } catch (error: any) {
        dispatch({ type: "error", payload: error.message });
      }
    },
    [colRef],
  );

  // 컬렉션에서 문서를 제거한다.
  const deleteDocument = useCallback(
    async (id: any) => {
      dispatch({ type: "isLoading" });
      try {
        const docRef = await deleteDoc(doc(colRef, id));
        dispatch({ type: "deleteDoc", payload: docRef });
      } catch (error: any) {
        dispatch({ type: "error", payload: error.message });
      }
    },
    [colRef],
  );

  return { addDocument, setDocument, updateDocument, deleteDocument, response };
};
