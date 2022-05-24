import React from "react";

const Button = ({
  className,
  bgColor,
  onClick,
  type = "button",
  children,
  full = false,
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      className={`capitalize text-lg font-medium px-6 py-3 rounded-xl mt-auto ${
        full ? "w-full" : ""
      } ${bgClassName} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
