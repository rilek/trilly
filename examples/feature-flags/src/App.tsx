import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { TrillyClient, createTrillyClient } from "@trilly/client-js/src";
import { useFeatureFlags } from "@trilly/client-js/src/modules/react/useFeatureFlags";

const contexts = [
  { title: "Visitor", context: {} },
  {
    title: "User",
    context: {
      isLoggedIn: true,
    },
  },
];

const ContextPicker = ({ trilly }: { trilly: TrillyClient }) => {
  const contextIdx = contexts.findIndex(
    (c) => JSON.stringify(c.context) === JSON.stringify(trilly.getContext())
  );

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    trilly.setContext(contexts[parseInt(e.target.value, 10)].context!);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        right: 12,
      }}
    >
      Context:
      <select value={contextIdx} onChange={selectChangeHandler}>
        {contexts.map((c, i) => {
          return (
            <option key={i} value={i}>
              {c.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);
  const [trilly] = useState(
    createTrillyClient({
      accountId: import.meta.env["VITE_TRILLY_ACCOUNT_ID"],
      context: contexts[0].context,
    })
  );

  const flags = useFeatureFlags(trilly);
  const counterEnabled = flags.isEnabled("enable-counter");

  return (
    <div>
      <ContextPicker trilly={trilly} />

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
    </div>
  );
}

export default App;
