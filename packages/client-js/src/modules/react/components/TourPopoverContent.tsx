import React from "react";
import { ITour } from "../../vanilla/tours";
import { nodeBorderClipPath } from "./utils";

interface BackdropProps {
  boundingRect?: DOMRect;
}

const Backdrop = ({ boundingRect }: BackdropProps) => {
  const styles = {
    clipPath: boundingRect ? nodeBorderClipPath(boundingRect) : undefined,
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 z-[999]"
      style={styles}
    />
  );
};

interface TourPopoverContentProps {
  tour: ITour;
  stepIdx: number;
  boundingRect?: DOMRect;
  top?: number;
  left?: number;
  maxWidth?: number;
  setStep: (fn: (v: number) => number) => void;
  onClose: () => void;
}

export const TourPopoverContent = ({
  tour,
  stepIdx,
  top,
  left,
  maxWidth = 384,
  boundingRect,
  setStep,
  onClose,
}: TourPopoverContentProps) => {
  const { title: tourTitle, steps } = tour;
  const { title, content, querySelector, alignHorizontal, alignVertical } =
    steps[stepIdx];

  const shouldAttachToNode = !!querySelector;

  return (
    <>
      <Backdrop boundingRect={boundingRect} />
      <div
        className={`absolute z-[1000] ${
          shouldAttachToNode
            ? `${alignVertical === "bottom" ? "-translate-y-full" : ""}`
            : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        } ${alignHorizontal === "left" ? "-ml-2 -translate-x-full" : "ml-2"}`}
        style={shouldAttachToNode ? { top, left } : undefined}
      >
        {shouldAttachToNode && (
          <div
            className={`absolute overflow-hidden w-1.5 ${
              alignVertical === "bottom" ? "bottom-1.5" : "top-1.5"
            } ${
              alignHorizontal === "left" ? "-right-1.5 rotate-180" : "-left-1.5"
            }`}
          >
            <div className={"rotate-45 w-3 h-3 ml-0.5 bg-white"} />
          </div>
        )}
        <div
          className="p-6 rounded-lg bg-white text-slate-700 w-full"
          style={{ boxShadow: "0 10px 50px rgb(0 0 0 / 25%)", maxWidth }}
        >
          <h1 className="text-slate-600 font-bold text-xs">{tourTitle}</h1>
          <h2 className="text-slate-800 font-bold text-lg">{title}</h2>
          <div
            className="mt-1 text-base [&>p]:py-1 [&_img]:max-w-full [&_img]:mx-auto"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="mt-2 border-0 border-t border-solid border-slate-200 -mx-6 px-6 py-3 rounded-b-lg bg-slate-100 -mb-6 flex justify-between items-center">
            <div>
              {steps.length > 1 && (
                <div className="flex">
                  {steps.map((_, i) => (
                    <div
                      onClick={() => setStep(() => i)}
                      className="p-0.5 cursor-pointer group"
                      key={i}
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-colors ${
                          stepIdx === i
                            ? "bg-slate-800"
                            : "bg-slate-400 group-hover:bg-slate-600"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="text-sm leading-4 font-medium flex gap-2 items-center">
              <div className="">
                <div
                  className="cursor-pointer inline-flex gap-1 hover:underline text-slate-700 hover:text-slate-800 transition-colors"
                  onClick={() => onClose()}
                >
                  Zakończ
                </div>
              </div>
              <div>
                {stepIdx < steps.length - 1 && (
                  <div
                    className="cursor-pointer inline-flex text-sky-700 hover:text-sky-800 transition-colors p-2 bg-sky-200 hover:bg-sky-300 rounded"
                    onClick={() => setStep((v) => v + 1)}
                  >
                    Następny
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
