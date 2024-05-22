"use client";

import { type TrillyClient } from "@trillyapp/vanilla";
import React, {
  FormEventHandler,
  Fragment,
  useCallback,
  useState,
} from "react";
import {
  useAutoVersioning,
  useTimedToggle,
  useWatchContextChanges,
} from "../../hooks/utils";
import { chunk, parseKv, second } from "../../utilts";

import "../../style.css";

type Entries = [string, string][];

type SubmitForm = {
  (
    client: TrillyClient,
    onSuccess: () => void,
  ): FormEventHandler<HTMLFormElement>;
};

const submitForm: SubmitForm = (client, onSuccess) => (e) => {
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement);
  const entries = chunk([...formData.entries()].map(second), 2) as Entries;

  client.setContext(
    Object.fromEntries(entries.map(([k, v]) => [k, JSON.parse(v as string)])),
  );
  onSuccess;
};

interface ContextFormProps {
  client: TrillyClient;
}

export const ContextForm = ({ client }: ContextFormProps) => {
  const [submitted, setSubmitted] = useTimedToggle(3000);
  const [context, setLocalContext] = useState(
    Object.entries(client.getContext()) as [unknown, unknown][],
  );
  const version = useAutoVersioning([context]);

  useWatchContextChanges(client, () => {
    setLocalContext(Object.entries(client.getContext()));
  });

  const submitContext = useCallback<FormEventHandler<HTMLFormElement>>(
    submitForm(client, setSubmitted),
    [client],
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
            <Fragment key={`${version}:${i}`}>
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
                <span>+</span>
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
