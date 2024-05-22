import { TrillyClient } from "@trillyapp/vanilla";
import { useEffect, useState } from "react";

export const useWatchContextChanges = (
  client: TrillyClient,
  callback: () => void,
  { callOnInit } = { callOnInit: true },
) => {
  useEffect(() => {
    client.on("context:set", callback);

    if (callOnInit) callback();

    return () => {
      client.off("context:set", callback);
    };
  }, [client]);
};

export const useAutoVersioning = (deps: unknown[]) => {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    setVersion((v) => v + 1);
  }, deps);

  return version;
};

export const useTimedToggle = (ms: number) => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (value) {
      timeout = setTimeout(() => setValue(false), ms);
    }
    return () => clearTimeout(timeout);
  }, [value]);

  const setTrue = () => setValue(true);

  return [value, setTrue] as const;
};
