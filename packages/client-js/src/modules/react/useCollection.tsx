import { TrillyClient } from "@/index";
import { useEffect, useState } from "react";

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
  trillyClient: TrillyClient,
  collectioName: string
) => {
  const [client] = useState(trillyClient);
  const [collection, setCollection] = useState<{ data: Container[] }>({
    data: [],
  });

  useEffect(() => {
    const fetchColls = async () => {
      const result = await client.fetchCollection(collectioName);
      setCollection(result);
    };

    client.on("context:set", fetchColls);
    fetchColls();

    () => {
      client.off("context:set", fetchColls);
    };
  }, [client]);

  return collection;
};

export default useCollection;
