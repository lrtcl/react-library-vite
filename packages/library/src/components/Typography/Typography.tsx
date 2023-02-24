import React from "react";

export interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * The tag used for the root node.
   * Either a string to use a HTML element or a component.
   */
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p",
  children: React.ReactNode
};

export const Typography: React.FC<TypographyProps> = ({ tag = "p", children }: TypographyProps) => {
  const Tag = ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement(tag, props, children)

  return <Tag>{children}</Tag>
};
