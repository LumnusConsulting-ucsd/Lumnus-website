import * as React from "react";
import { cn } from "./utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("bg-white text-black flex flex-col gap-6 rounded-xl border", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-1.5 px-6 pt-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <h4 className={cn("leading-none", className)} {...props} />;
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <p className={cn("text-gray-600", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6 [&:last-child]:pb-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center px-6 pb-6", className)} {...props} />;
}
