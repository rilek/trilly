import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { createTrillyClient } from "@trillyapp/vanilla";
import {
  TrillyProvider,
  TrillyDevTools,
  useFeatureFlags,
} from "@trillyapp/react";
import { ActionBar } from "./ActionBar";

import "./App.css";
import "@trillyapp/react/style.css";

const useCreateTrillyClient = () =>
  useState(
    createTrillyClient({
      apiKey: import.meta.env["VITE_TRILLY_API_KEY"],
      context: { isLoggedIn: false },
    })
  )[0];

function App() {
  const [count, setCount] = useState(0);
  const client = useCreateTrillyClient();

  const flags = useFeatureFlags(client);
  const counterEnabled = flags.isEnabled("enable-counter");

  return (
    <>
      <TrillyProvider client={client}>
        <ActionBar />

        <main>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            {counterEnabled && (
              <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </button>
            )}
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </main>
      </TrillyProvider>

      <TrillyDevTools client={client} />
    </>
  );
}

export default App;
