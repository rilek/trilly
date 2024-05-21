import { useState } from "react";
import { createTrillyClient } from "@trillyapp/vanilla";
import { TrillyDevTools, TrillyProvider } from "@trillyapp/react";

import "./App.css";
import "@trillyapp/react/style.css";
import { ActionBar } from "./ActionBar";
import { Content } from "./Content";

const defaultContext = { position: "project-manager" };

const useClientState = () => {
  const [client] = useState(
    createTrillyClient({
      apiKey: import.meta.env.VITE_TRILLY_API_KEY as string,
      context: defaultContext,
    })
  );

  return client;
};

function App() {
  const client = useClientState();

  return (
    <>
      <TrillyProvider client={client}>
        <ActionBar />
        <main>
          <Content />
        </main>
      </TrillyProvider>

      <TrillyDevTools client={client} />
    </>
  );
}

export default App;
