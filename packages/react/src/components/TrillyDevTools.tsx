"use client";

import { type TrillyClient } from "@trillyapp/vanilla";
import React, { FormEventHandler, useCallback, useState } from "react";
import "./style.css";
import { Logo } from "./Logo";
import { useWatchContextChanges } from "../hooks/utils";

type TrillyDevToolsProps = {
  client: TrillyClient;
};

export const TrillyDevTools = ({ client }: TrillyDevToolsProps) => {
  const [open, setOpen] = useState(false);
  const [context, setLocalContext] = useState(
    JSON.stringify(client.getContext()),
  );

  useWatchContextChanges(client, () => {
    setLocalContext(JSON.stringify(client.getContext()));
  });

  const toggleOpen = useCallback(() => setOpen((x) => !x), [setOpen]);

  const submitContext = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const { context } = Object.fromEntries(formData);
      client.setContext(JSON.parse(context as string));
    },
    [context, client],
  );

  return (
    <div className="_trilly-dev-tools_">
      <div className="trigger" onClick={toggleOpen}>
        <Logo />
      </div>

      {open && (
        <div className="popover">
          <header>
            <h1>Trilly Dev Tools</h1>
            <button onClick={toggleOpen}>Close</button>
          </header>
          <div className="content">
            <form onSubmit={submitContext}>
              <fieldset>
                <label htmlFor="context">Context</label>
                <textarea
                  name="context"
                  id="context"
                  value={context}
                  onChange={(e) => setLocalContext(e.target.value)}
                />
              </fieldset>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
