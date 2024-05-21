import { useState } from "react";
import { createTrillyClient } from "@trillyapp/vanilla";
import { TrillyDevTools, TrillyProvider } from "@trillyapp/react";
import { ActionBar } from "./ActionBar";
import { Content } from "./Content";

import "./App.css";
import "@trillyapp/react/style.css";

const defaultContext = { position: "project-manager" };

const useCachedClient = () => {
  const [client] = useState(
    createTrillyClient({
      apiKey: import.meta.env.VITE_TRILLY_API_KEY as string,
      context: defaultContext,
    })
  );

  return client;
};

function App() {
  const client = useCachedClient();

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
