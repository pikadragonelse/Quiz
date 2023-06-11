import React from "react";
import "./index.scss";

export type DefaultLayout = { children: any; className?: string };
export const DefaultLayout = ({ children, className }: DefaultLayout) => {
    return <div className={`default-container ${className}`}>{children}</div>;
};
