import {
  TypedUseSelectorHook,
  useDispatch as useTypedDispatch,
  useSelector as useTypedSelector,
} from "react-redux";
import { store } from ".";
import { RootState } from "./rootReducer";

type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useTypedDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useTypedSelector;
