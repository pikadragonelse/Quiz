import React from "react";
import { Button } from "../../button";
import { Link } from "react-router-dom";
import { DefaultLayout } from "../default-layout";
import "./index.scss";

export const HomePage = () => {
    return (
        <DefaultLayout className="home">
            <h1 className="heading-home">Welcome to the funny quiz</h1>
            <Link to={`/quiz/1`}>
                <Button>Start</Button>
            </Link>
        </DefaultLayout>
    );
};
