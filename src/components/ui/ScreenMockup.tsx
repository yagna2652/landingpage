import { ReactNode } from "react";

interface ScreenMockupProps {
  children?: ReactNode;
  title?: string;
  aspectRatio?: "16/10" | "4/3";
  className?: string;
}

export function ScreenMockup({
  children,
  title = "memory.store",
  aspectRatio = "16/10",
  className = "",
}: ScreenMockupProps) {
  const aspectClasses = {
    "16/10": "aspect-[16/10]",
    "4/3": "aspect-[4/3]",
  };

  return (
    <div className={`overflow-hidden rounded-xl bg-white shadow-2xl ${className}`}>
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-100 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-gray-300" />
          <div className="h-3 w-3 rounded-full bg-gray-300" />
          <div className="h-3 w-3 rounded-full bg-gray-300" />
        </div>
        <span className="ml-4 text-sm text-gray-500">{title}</span>
      </div>
      {/* Screen content */}
      <div className={`${aspectClasses[aspectRatio]} bg-gray-50 p-6`}>
        {children || (
          <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200">
            <span className="text-sm text-gray-400">Your UI screenshot here</span>
          </div>
        )}
      </div>
    </div>
  );
}






