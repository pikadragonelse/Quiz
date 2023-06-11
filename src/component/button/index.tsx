import React from "react";

import "./index.scss";
export type Button = {
    children: any;
    className?: string;
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: any;
};
export const Button = ({ children, className, type, onClick }: Button) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`btn-primary ${className}`}
        >
            {children}
        </button>
    );
};
