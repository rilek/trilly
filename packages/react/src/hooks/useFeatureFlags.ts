import { type TrillyClient } from "@trillyapp/vanilla";
import { type Container, useCollection } from "./useCollection";
import { useCallback } from "react";

interface UseFeatureFlagOpts {
  collectionName?: string;
}

const isFlagEnabled = (collection: Container[], flagName: string) => {
  return collection.some(({ key }) => key === flagName);
};

export const useFeatureFlags = (
  client: TrillyClient,
  { collectionName = "feature-flags" }: UseFeatureFlagOpts = {},
) => {
  const result = useCollection(client, collectionName, { returnObject: true });
  const flags = result?.data;

  const isEnabled = useCallback(
    (flagName: string) => (flags ? isFlagEnabled(flags, flagName) : false),
    [flags],
  );

  return { flags, isEnabled };
};
