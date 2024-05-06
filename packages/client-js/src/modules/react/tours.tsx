import { useState, useCallback, useEffect } from "react";
import { ITourStep } from "../vanilla/tours";
import { TrillyClient } from "../..";
import { popoverWrapperId } from "./components/utils";

export const useSteps = (max: number) => {
  const [stepId, setStepId] = useState(0);

  const setStep = useCallback(
    (fn: (v: number) => number) =>
      setStepId((v) => {
        const newIdx = fn(v);
        if (newIdx < 0) return 0;
        if (newIdx >= max) return max - 1;
        return newIdx;
      }),
    [max]
  );

  return [stepId, setStep] as const;
};

export const useFixedScreen = (hide?: boolean) => {
  const setFixed = (fixed: boolean) =>
    (document.body.style.overflow = fixed ? "hidden" : "initial");

  useEffect(() => {
    setFixed(true);

    () => {
      setFixed(false);
    };
  }, []);

  useEffect(() => {
    setFixed(!hide);
  }, [hide]);

  return setFixed;
};

export const usePopoverNode = (step: ITourStep) => {
  const [node, setNode] = useState<Element | null>(null);

  useEffect(() => {
    if (step) {
      if (!step.querySelector) return setNode(null);

      const updateContainer = (): NodeJS.Timeout | void => {
        const n =
          step?.querySelector &&
          document.querySelector<HTMLElement>(step.querySelector);

        if (n) {
          const rect = n.getBoundingClientRect();

          if (rect.y < 0 || rect.y > window.innerHeight)
            n.scrollIntoView({ inline: "start", block: "nearest" });

          setNode(n);
        } else return setTimeout(updateContainer, 300);
      };

      const timeout = updateContainer();

      return () => timeout && clearTimeout(timeout);
    }
  }, [node, step]);

  return node;
};

export const useBrowserOnly = () => {
  const [initialized, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);

  return initialized;
};

export const useCreatePopoverWrapper = () => {
  const [node, setNode] = useState<Element>();

  useEffect(() => {
    const wrapper = window.document.createElement("div");
    wrapper.setAttribute("id", popoverWrapperId);
    window.document.body.appendChild(wrapper);

    setNode(wrapper);

    return () => {
      window.document.body.removeChild(wrapper);
    };
  }, []);

  return node;
};

export const useSyncUrl = (client: TrillyClient) => {
  const [, setUrl] = useState(client.getContext().url);
  const onUpdate = ([url]: [url: string]) => {
    console.log(url);
    setUrl(url);
  };

  useEffect(() => {
    client.on("updateUrl", onUpdate);

    () => client.off("updateUrl", onUpdate);
  }, [client]);
};
