import type { ButtonHTMLAttributes } from "react";
export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`min-h-11 rounded-lg bg-gray-900 px-4 text-white disabled:opacity-50 ${className}`} {...props} />;
}
