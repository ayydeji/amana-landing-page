import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap text-[0.9375rem] font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
  {
    variants: {
      variant: {
        primary:
          "bg-lime text-bg hover:bg-lime-dim hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(196,232,68,0.2)] active:translate-y-0 active:shadow-none motion-reduce:hover:translate-y-0 rounded-full",
        ghost:
          "border border-border text-text-dim hover:border-lime hover:text-lime rounded-full",
        link: "text-lime underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-10 px-6",
        lg: "h-14 px-11 text-base font-bold",
        nav: "h-9 px-6 text-[13px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "nav",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
