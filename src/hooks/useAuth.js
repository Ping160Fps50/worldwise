import { useContext } from "react";
import { FakeAuthContext } from "../contexts/FakeAuthContext";

function useAuth() {
  const context = useContext(FakeAuthContext);
  if (context === undefined) {
    throw new Error("FakeAuthContext was used outside of its Provider");
  }
  return context;
}

export { useAuth };
