"use client";
import { ShowPlanningResponse } from "@/types/responses/planning.responses";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface PlanningContext {
  planning?: ShowPlanningResponse;
  setPlanning: Dispatch<SetStateAction<ShowPlanningResponse | undefined>>;
}
export const PlanningContext = createContext({} as PlanningContext);

export default function PlanningContextProvider({
  children,
}: PropsWithChildren) {
  const [planning, setPlanning] = useState<ShowPlanningResponse>();

  return (
    <PlanningContext.Provider
      value={{
        planning,
        setPlanning,
      }}
    >
      {children}
    </PlanningContext.Provider>
  );
}

export const usePlannings = () => useContext(PlanningContext);
