import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  rounded?: "full" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  rounded = "full",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors";

  const variants = {
    primary: "bg-[#0e0e0e] text-white hover:bg-[#1a1a1a]",
    secondary: "bg-[#4a4a48] text-white hover:bg-[#5a5a58]",
    ghost: "text-[#0e0e0e] hover:text-gray-700",
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4",
  };

  const roundedStyles = {
    full: "rounded-full",
    lg: "rounded-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${roundedStyles[rounded]} ${className}`}
    >
      {children}
    </button>
  );
}

// Shared styles for Link buttons (use with Next.js Link component)
export const buttonStyles = {
  primary: "inline-flex items-center justify-center font-medium transition-colors bg-[#0e0e0e] text-white hover:bg-[#1a1a1a]",
  sizes: {
    sm: "px-5 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4",
  },
  rounded: {
    full: "rounded-full",
    lg: "rounded-lg",
  },
};


