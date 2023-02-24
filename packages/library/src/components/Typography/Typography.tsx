import classnames from "classnames";
import React from "react";

export interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * The tag used for the root node.
   * Either a string to use a HTML element or a component.
   */
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p",
  variant?: "heading1" | "heading2" | "heading3" | "heading4" | "heading5" | "heading6" | "body",
  children: React.ReactNode,
  className?: string
};

export const Typography: React.FC<TypographyProps> = ({ tag = "p", variant = "body", children, className }: TypographyProps) => {
  const Tag = ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement(tag, props, children)
  let classNames = classnames(
    "mylib--typography",
    {
      "mylib--typography_heading1": variant === "heading1",
      "mylib--typography_heading2": variant === "heading2",
      "mylib--typography_heading3": variant === "heading3",
      "mylib--typography_heading4": variant === "heading4",
      "mylib--typography_heading5": variant === "heading5",
      "mylib--typography_heading6": variant === "heading6",
      "mylib--typography_body": variant === "body",
    },
    className
  )

  return <Tag className={classNames}>{children}</Tag>
};
