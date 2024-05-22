import { type TrillyClient } from "@trillyapp/vanilla";
import { useCallback, useState } from "react";
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
  { returnObject } = { returnObject: false },
) => {
  const [container, setContainer] = useState<Map<string, any> | undefined>();

  const fetchContainer = useCallback(async () => {
    const result = await client.fetchContainer(containerName, collectionName, {
      returnObject,
    });
    setContainer(result.data);
  }, [client]);

  useWatchContextChanges(client, fetchContainer);

  return container;
};
