import { TrillyClient } from "./TrillyClient";
import { IConfig } from "./types";

export function createTrillyClient(props: IConfig) {
  return new TrillyClient(props);
}
