import { useTrillyClient } from "@trillyapp/react";
import { type TrillyClient } from "@trillyapp/vanilla";

const setPosition = (client: TrillyClient, isLoggedIn: boolean) =>
  client.setContext({ isLoggedIn });

export function ActionBar() {
  const client = useTrillyClient();

  const setVisitor = () => setPosition(client, false);
  const setLoggedIn = () => setPosition(client, true);

  return (
    <div className="actions">
      <span>I'm a:</span>
      <button onClick={setVisitor}>Visitor</button>
      <button onClick={setLoggedIn}>User</button>
    </div>
  );
}
