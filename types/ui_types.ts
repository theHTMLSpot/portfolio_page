import React from "react";

export type Title = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: React.ReactNode;
};

export type Paragraph = {
  className?: string;
  children: React.ReactNode;
};

export type Container = {
  className?: string;
  children?: React.ReactNode;
};

export type Link = {
  href: string;
  target?: string;
  className?: string;
  children: React.ReactNode;
};

export type button = {
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export type Input = {
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "color"
    | "date"
    | "datetime-local"
    | "time"
    | "week"
    | "month"
    | "file"
    | "textarea"
    | "checkbox"
    | "radio"
    | "dropdown"
    | "select";
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLElement>) => void;
};

export type Label = {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
};
