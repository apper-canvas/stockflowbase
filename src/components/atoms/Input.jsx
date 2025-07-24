import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "form-input",
        error && "border-error-500 focus:ring-error-500",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;