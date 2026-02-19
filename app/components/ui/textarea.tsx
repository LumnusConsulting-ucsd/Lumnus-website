"use client";

import * as React from "react";
import { cn } from "./utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full rounded-2xl bg-gray-100 px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-900/30",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
