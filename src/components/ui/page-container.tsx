"use client";

import { ReactNode } from "react";
import Loader from "./loader";

type PageProps = {
  data?: unknown;
  isLoading: boolean;
  children: ReactNode;
  blockingConditions: boolean;
};

export function PageContainer({ data, isLoading, children }: PageProps) {
  function LoadPage() {
    if (!data && isLoading) {
      return <Loader size={40} />;
    }
    if (!data && !isLoading) {
      return <div className="w-full h-full">Nenhum conteúdo encontrado</div>;
    } else {
      return children;
    }
  }
  return (
    <article className="w-full h-full p-5 bg-background shadow-lg  rounded-lg flex flex-col gap-3 ">
      <LoadPage />
    </article>
  );
}

type PageHeaderProps = {
  children: ReactNode;
};
export function PageHeader({ children }: PageHeaderProps) {
  return (
    <div className="text-left font-semibold text-lg flex flex-col items-center">
      {children}
    </div>
  );
}

type PageContentProps = {
  children: ReactNode;
};
export function PageContent({ children }: PageContentProps) {
  return (
    <div className="w-full min-h-80 rounded-lg p-2 bg-secondary">
      {children}
    </div>
  );
}
