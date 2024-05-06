import React, { useState } from "react";
import { createPortal } from "react-dom";
import { ITour } from "../../vanilla/tours";
import {
  useSteps,
  useFixedScreen,
  usePopoverNode,
  useCreatePopoverWrapper,
} from "../tours";
import { TourPopoverContent } from "./TourPopoverContent";
import { getVerticalOffset, getHorizontalOffset, getMaxWidth } from "./utils";

interface TourPopoverProps {
  tour: ITour;
}

export const TourPopover = ({ tour }: TourPopoverProps) => {
  const { steps } = tour;

  const [hidden, setHidden] = useState(false);
  const [stepId, setStep] = useSteps(steps.length);
  const step = steps[stepId];
  const node = usePopoverNode(step);
  const wrapper = useCreatePopoverWrapper();

  useFixedScreen(hidden);

  const onClose = () => setHidden(true);

  if (steps.length <= stepId) return <></>;
  if ((step.querySelector && !node) || !wrapper || hidden) return <></>;

  const popover = (
    <TourPopoverContent
      tour={tour}
      stepIdx={stepId}
      top={getVerticalOffset(node, step.alignVertical)}
      left={getHorizontalOffset(node, step.alignHorizontal)}
      maxWidth={getMaxWidth(node, step.alignHorizontal)}
      setStep={setStep}
      boundingRect={node?.getBoundingClientRect()}
      onClose={onClose}
    />
  );

  return createPortal(popover, wrapper);
};
