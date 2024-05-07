import { TrillyClient } from "@trillyapp/vanilla";
import { useEffect } from "react";

export const useWatchContextChanges = (
  client: TrillyClient,
  callback: () => void,
  { callOnInit } = { callOnInit: true },
) => {
  useEffect(() => {
    client.on("context:set", callback);
    if (callOnInit) callback();

    () => client.off("context:set", callback);
  }, [client]);
};
