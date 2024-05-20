"use client";

import { type TrillyClient } from "@trillyapp/vanilla";
import React, {
  FormEventHandler,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";
import "./style.css";
import { Logo } from "./Logo";
import { useWatchContextChanges } from "../hooks/utils";

type TrillyDevToolsProps = {
  client: TrillyClient;
};

const parseKv = (x: unknown): string =>
  typeof x === "string" ? `"${x}"` : (x as string);

const chunk = <T extends unknown>(arr: T[], size: number): T[][] => {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
};

const second = ([, x]: unknown[]) => x;

const ContextForm = ({ client }: TrillyDevToolsProps) => {
  const [context, setLocalContext] = useState(
    Object.entries(client.getContext()) as [unknown, unknown][],
  );
  const [submitted, setSubmitted] = useState(false);

  useWatchContextChanges(client, () => {
    setLocalContext(Object.entries(client.getContext()));
  });

  useEffect(() => {
    if (submitted) {
      setTimeout(() => setSubmitted(false), 3000);
    }
  }, [submitted]);

  const submitContext = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const entries = chunk([...formData.entries()].map(second), 2) as [
        string,
        string,
      ][];

      client.setContext(
        Object.fromEntries(
          entries.map(([k, v]) => [k, JSON.parse(v as string)]),
        ),
      );
      setSubmitted(true);
    },
    [context, client],
  );

  return (
    <form onSubmit={submitContext}>
      <fieldset>
        <span>
          <legend>Set context</legend>
        </span>
        <div className="fields">
          <span>Key</span>
          <span>Value</span>
          <span></span>
          {context.map(([key, value], i) => (
            <Fragment key={i}>
              <input
                type="text"
                name={`key-${i}`}
                defaultValue={key as string}
              />
              <input
                type="text"
                name={`value-${i}`}
                defaultValue={parseKv(value) as string}
              />
              <button
                className="remove-row"
                type="button"
                onClick={() =>
                  setLocalContext((data) => data.filter((_, j) => i !== j))
                }
              >
                <p>+</p>
              </button>
            </Fragment>
          ))}
          <button
            className="add-new-row"
            type="button"
            onClick={() => setLocalContext((data) => [...data, [null, null]])}
          >
            + Add new row
          </button>
        </div>
        <div className="suggestion">
          <span className="icon">!</span> Value should be a valid JSON, so i.e.
          if you want to pass a string, wrap it in double quotes.
        </div>
      </fieldset>
      <footer>
        {submitted && <span className="success">Context updated!</span>}
        <button type="submit">Save</button>
      </footer>
    </form>
  );
};

export const TrillyDevTools = ({ client }: TrillyDevToolsProps) => {
  const [open, setOpen] = useState(true);
  const toggleOpen = useCallback(() => setOpen((x) => !x), [setOpen]);

  return (
    <div className="_trilly-dev-tools_">
      <button className="trigger" onClick={toggleOpen}>
        <Logo />
      </button>

      {open && (
        <div className="popover grid">
          <header>
            <h1>Trilly dev tools</h1>
            <button onClick={toggleOpen}>Close</button>
          </header>

          <ContextForm client={client} />
        </div>
      )}
    </div>
  );
};
