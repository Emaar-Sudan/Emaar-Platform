// components/ui/badge.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset transition-colors focus:outline-none focus:ring-2",
  {
    variants: {
      variant: {
        default:
          "bg-gray-50 text-gray-600 ring-gray-500/10 hover:bg-gray-100",
        primary:
          "bg-primary-50 text-primary-700 ring-primary-700/10 hover:bg-primary-100",
        secondary:
          "bg-secondary-50 text-secondary-700 ring-secondary-700/10 hover:bg-secondary-100",
        success:
          "bg-green-50 text-green-700 ring-green-600/10 hover:bg-green-100",
        warning:
          "bg-yellow-50 text-yellow-800 ring-yellow-600/20 hover:bg-yellow-100",
        error:
          "bg-red-50 text-red-700 ring-red-600/10 hover:bg-red-100",
        info:
          "bg-blue-50 text-blue-700 ring-blue-700/10 hover:bg-blue-100",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-sm",
        lg: "px-3 py-1.5 text-base",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  withDot?: boolean;
}

const Badge = ({
  className,
  variant,
  size,
  rounded,
  withDot,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(badgeVariants({ variant, size, rounded }), className)}
      {...props}
    >
      {withDot && (
        <span 
          className={cn(
            "mr-1.5 h-1.5 w-1.5 rounded-full", 
            {
              "bg-gray-400": variant === "default",
              "bg-primary-400": variant === "primary",
              "bg-secondary-400": variant === "secondary",
              "bg-green-400": variant === "success",
              "bg-yellow-400": variant === "warning",
              "bg-red-400": variant === "error",
              "bg-blue-400": variant === "info",
            }
          )}
        />
      )}
      {children}
    </span>
  );
};

export { Badge, badgeVariants };
