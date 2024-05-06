import { TrillyClient } from "@/index";
import { useCollection } from "./useCollection";

export const useFeatureFlags = (trilly: TrillyClient) => {
  const { data: collection } = useCollection(trilly, "feature-flags");

  return {
    flags: collection,
    isEnabled: (flagName: string) => {
      return collection.some(({ key }) => key === flagName);
    },
  };
};

export default useFeatureFlags;
