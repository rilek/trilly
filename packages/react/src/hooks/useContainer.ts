import { type TrillyClient } from "@trillyapp/vanilla";
import { useState } from "react";
import { useWatchContextChanges } from "./utils";

export type JSONValue = {
  [key: string]:
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;
};

export type Container = {
  id: string;
  key: string;
  data: JSONValue;
};

export const useContainer = (
  client: TrillyClient,
  containerName: string,
  collectionName: string,
) => {
  const [container, setContainer] = useState<{ data: Container } | undefined>();

  const fetchContainer = async () => {
    const result = await client.fetchContainer(containerName, collectionName);
    setContainer(result.data);
  };

  useWatchContextChanges(client, fetchContainer);

  return container;
};
