import { useTrillyClient, useContainer } from "@trillyapp/react/src";
import { getField } from "@trillyapp/vanilla/src";
import { Hero, HeroProps } from "./Hero";

export function Content() {
  const client = useTrillyClient();
  const container = useContainer(client, "website", "examples");

  if (!container) return null;

  const hero = getField(container, "hero", { returnObject: true }) as
    | HeroProps
    | undefined;

  if (!hero) return <></>;

  return <Hero {...hero} />;
}
