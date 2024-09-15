/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from "react";

interface ApiFormErrorsContextProps<T> {
  errors: T;
}

const ApiFormErrorsContext = createContext<ApiFormErrorsContextProps<any>>(
  {} as ApiFormErrorsContextProps<any>,
);

export function useApiFormError() {
  return useContext(ApiFormErrorsContext);
}
