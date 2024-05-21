import { useState } from "react";
import "./App.css";
import { createTrillyClient, getField } from "@trillyapp/vanilla";
import { TrillyDevTools } from "@trillyapp/react/src/components/TrillyDevTools";

import "@trillyapp/react/src/style.css";
import { useContainer } from "@trillyapp/react";

function App() {
  const [client] = useState(
    createTrillyClient({
      apiKey: import.meta.env.VITE_TRILLY_API_KEY as string,
    })
  );

  const container = useContainer(client, "website", "examples");
  const hero = getField(container, "hero") as Map<string, any>;

  const setSanePerson = () => client.setContext({});
  const setCatLover = () =>
    client.setContext({
      preference: "cats",
    });

  return (
    <>
      <div className="actions">
        <span>I'm a:</span>
        <button onClick={setSanePerson}>Sane person</button>
        <button onClick={setCatLover}>Cat lover</button>
      </div>

      <main>
        <h1>{getField(hero, "title")}</h1>
        <p>{getField(hero, "subline")}</p>
        <div className="actions">
          <button>{getField(hero, "button-text")}</button>
          <button>{getField(hero, "secondary-button-text")}</button>
        </div>
      </main>

      <TrillyDevTools client={client} />
    </>
  );
}

export default App;
