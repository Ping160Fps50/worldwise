import { useContext } from "react";
import { CitiesContext } from "./ClientContext";

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("CitiesContext was used outside of its Provider");
  }
  return context;
}

export { useCities };
