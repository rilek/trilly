"use client";

import { type TrillyClient } from "@trillyapp/vanilla";
import React, { useCallback, useState } from "react";
import { Logo } from "../Logo";
import { ContextForm } from "./ContextForm";

import "../../style.css";

type TrillyDevToolsProps = {
  client: TrillyClient;
};

export const TrillyDevTools = ({ client }: TrillyDevToolsProps) => {
  const [open, setOpen] = useState(false);
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
