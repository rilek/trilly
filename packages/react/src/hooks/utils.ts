import { TrillyClient } from "@trillyapp/vanilla";
import { useEffect } from "react";

let i = 0;

export const useWatchContextChanges = (
  client: TrillyClient,
  callback: () => void,
  { callOnInit } = { callOnInit: true },
) => {
  useEffect(() => {
    client.on("context:set", callback);
    console.log("MOUNTING", i);
    if (callOnInit) callback();

    i = i++;

    () => {
      console.log("UMOUNTING", i);
      client.off("context:set", callback);
    };
  }, [client]);
};
