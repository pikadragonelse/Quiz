import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { useParams } from "react-router-dom";

export type AnswerItem = {
    content: string;
    typeAnswer: boolean;
    index: string;
    className?: string;
    onClick?: any;
};
export const AnswerItem = ({
    content,
    typeAnswer,
    index,
    className,
    onClick,
}: AnswerItem) => {
    const indexParam = useParams()["*"];

    return (
        <li
            className={`answer ${className} ${
                indexParam === index ? "active" : ""
            }`}
        >
            <span className="index">{index}.</span>
            <input
                type="radio"
                value={content}
                className="radio"
                id={index}
                checked={indexParam === index}
            />
            <span className="">{content}</span>
        </li>
    );
};
