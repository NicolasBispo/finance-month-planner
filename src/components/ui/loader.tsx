"use client";
import { AiOutlineLoading } from "react-icons/ai";

export default function Loader({ size = 20 }: { size?: number }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <AiOutlineLoading className="animate-spin" size={size} />
    </div>
  );
}
