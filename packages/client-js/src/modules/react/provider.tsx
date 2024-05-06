import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TrillyClient } from "../..";
import { first } from "lodash";
import { IToggle } from "../vanilla/toggles";
import { ITour } from "../vanilla/tours";
import { TourPopovers } from "./components/TourPopovers";

interface ITrillyContext {
  client: TrillyClient;
  toggles: IToggle[];
  tours: ITour[];
}

const useData = (client: TrillyClient) => {
  // const [toggles, setToggles] = useState(client.getToggles());
  // const [tours, setTours] = useState(client.getTours());

  useEffect(() => {
    if (!client.isInitialized && !client.isInitializing) client.start();
  }, [client]);

  useEffect(() => {
    // const onUpdateToggles = () => setToggles(client.getToggles());

    // if (!client.isInitialized && !client.isInitializing) client.start();

    // client.on("updateToggles", onUpdateToggles);

    // return () => {
    //   client.off("updateToggles", onUpdateToggles);
    // };
  }, [client]);

  useEffect(() => {
    const onUpdateTours = () => {
      // setTours(client.getTours());
    };

    client.on("updateTours", onUpdateTours);

    return () => {
      client.off("updateTours", onUpdateTours);
    };
  }, [client]);

  // return { toggles, tours };
};

export const TrillyContext = createContext<ITrillyContext>(
  {} as ITrillyContext
);

type TrillyProviderType = FC<
  PropsWithChildren<{
    client: TrillyClient;
    listenUrlChange?: boolean;
  }>
>;

export const TrillyProvider: TrillyProviderType = ({ children, client }) => {
  if (!client) console.error("Trelly client instance is required");

  // const { toggles, tours } = useData(client);

  return (<></>
    // <TrillyContext.Provider value={{ client, toggles, tours }}>
    //   <>
    //     {children}
    //     <TourPopovers tour={first(tours)} client={client} />
    //   </>
    // </TrillyContext.Provider>
  );
};

export const useTrillyClient = () => {
  const { client } = useContext(TrillyContext);

  return client;
};
