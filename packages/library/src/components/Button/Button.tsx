import React from "react";

export interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  label: string;
  icon?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = React.forwardRef(({ label, ...rest }: ButtonProps, ref) => {
  return <button {...rest} ref={ref}>{label}</button>
});
