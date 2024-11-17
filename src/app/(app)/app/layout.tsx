"use client";

import { PropsWithChildren } from "react";

export default function AppLayout({children} : PropsWithChildren) {
  return (
    <main className="w-full min-h-screen h-full bg-primary-foreground gap-3 pt-2 pb-3 ps-2 pe-5">
      {children}
    </main>
  );
}
