import { useContext } from "react";
import { TrillyContext } from "./provider";

export const useIsEnabled = (flagName: string) => {
  const { toggles } = useContext(TrillyContext);

  return !!toggles.find(({ id }) => id === flagName);
};
