import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  children, 
  className, 
  variant = "default",
  ...props 
}, ref) => {
  const variants = {
    default: "bg-slate-100 text-slate-800",
    success: "stock-healthy",
    warning: "stock-low",
    error: "stock-critical",
    primary: "bg-primary-100 text-primary-800"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "stock-badge",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;