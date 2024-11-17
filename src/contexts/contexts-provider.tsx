import React from "react";
import { ReactQueryProvider } from "./react-query-provider";
import PlanningContextProvider from "./planning-context";

const contexts = [ReactQueryProvider, PlanningContextProvider];

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return contexts.reduce((acc, Context) => {
    return <Context>{acc}</Context>;
  }, children);
}
