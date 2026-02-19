"use client";

import * as React from "react";
import { cn } from "./utils";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn("text-sm font-semibold text-gray-900", className)}
      {...props}
    />
  );
}

