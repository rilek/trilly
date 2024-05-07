import { FC, PropsWithChildren, createContext, useContext } from "react";
import { type TrillyClient } from "@trillyapp/vanilla";

interface ITrillyContext {
  client: TrillyClient;
}

export const TrillyContext = createContext<ITrillyContext>(
  {} as ITrillyContext,
);

type TrillyProviderType = FC<
  PropsWithChildren<{
    client: TrillyClient;
  }>
>;

export const TrillyProvider: TrillyProviderType = ({ children, client }) => {
  if (!client) console.error("Trelly client instance is required");

  return children;
};

export const useTrillyClient = () => {
  const { client } = useContext(TrillyContext);

  return client;
};
