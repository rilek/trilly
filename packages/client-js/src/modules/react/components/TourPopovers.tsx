import { TrillyClient } from "../../..";
import { ITour } from "../../vanilla/tours";
import React from "react";
import { useBrowserOnly, useSyncUrl, useCreatePopoverWrapper } from "../tours";
import { TourPopover } from "./TourPopover";

type TourPopoversProps = {
  tour?: ITour;
  client: TrillyClient;
};

export const TourPopovers = ({ tour, client }: TourPopoversProps) => {
  const isInitialized = useBrowserOnly();

  useSyncUrl(client);

  if (!tour || !isInitialized) return <></>;

  return <TourPopover tour={tour} />;
};
