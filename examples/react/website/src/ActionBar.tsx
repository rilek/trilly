import { useTrillyClient } from "@trillyapp/react/src";
import { type TrillyClient } from "@trillyapp/vanilla";

const setPosition = (client: TrillyClient, position: string) =>
  client.setContext({ position });

export function ActionBar() {
  const client = useTrillyClient();

  const setProjectManager = () => setPosition(client, "project-manager");
  const setDeveloper = () => setPosition(client, "project-manager");

  return (
    <div className="actions">
      <span>I'm a:</span>
      <button onClick={setProjectManager}>Project Manager</button>
      <button onClick={setDeveloper}>Developer</button>
    </div>
  );
}
