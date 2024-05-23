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

export const useCollection = (
  client: TrillyClient,
  collectionName: string,
  { returnObject } = { returnObject: false },
) => {
  const [collection, setCollection] = useState<
    { data: Container[] } | undefined
  >();

  const fetchCollections = async () => {
    const result = await client.fetchCollection(collectionName, {
      returnObject,
    });
    setCollection(result);
  };

  useWatchContextChanges(client, fetchCollections);

  return collection;
};
