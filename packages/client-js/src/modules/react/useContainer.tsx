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

export const useContainer = (
  trillyClient: TrillyClient,
  containerName: string,
  collectioName: string
) => {
  const [client] = useState(trillyClient);
  const [container, setContainer] = useState<{ data: Container } | undefined>();

  useEffect(() => {
    const fetchColls = async () => {
      const result = await client.fetchContainer(containerName, collectioName);
      setContainer(result.data);
    };

    client.on("context:set", fetchColls);
    fetchColls();

    () => {
      client.off("context:set", fetchColls);
    };
  }, [client]);

  return container;
};

export default useContainer;
