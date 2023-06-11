import React, { useEffect, useState } from "react";
import { Button } from "../../button";
import { DefaultLayout } from "../default-layout";
import { listAnswerUser } from "../quiz-page/form";

import "./index.scss";
import { useNavigate } from "react-router-dom";

export const ResultPage = () => {
    const [data, setData] = useState<any>();

    const navigate = useNavigate();

    useEffect(() => {
        const dataOFF = JSON.parse(localStorage.getItem("data") as any);
        setData(dataOFF);
    }, []);

    const CalculatorScore = () => {
        let numCorrect = 0;
        let numIncorrect = 0;
        listAnswerUser.forEach((item) => {
            item.isTrue ? numCorrect++ : numIncorrect++;
        });

        return {
            totalQuestion: listAnswerUser.length,
            numCorrect,
            numIncorrect,
        };
    };

    const { totalQuestion, numCorrect, numIncorrect } = CalculatorScore();

    return (
        <DefaultLayout className="result">
            <div className="result-container">
                <div className="result-section">
                    <div className="general">
                        <span>Total Question: {totalQuestion}</span>
                        <span>Answer Correct: {numCorrect}</span>
                        <span>Answer Incorrect: {numIncorrect}</span>
                    </div>
                    <table className="detail">
                        <tr>
                            <th>ID Quiz</th>
                            <th>Result</th>
                            <th>Time Spend(s)</th>
                        </tr>

                        {listAnswerUser.map((item) => (
                            <tr>
                                <th className="item-table">{item["idQuiz"]}</th>
                                <th className="item-table">
                                    {item["isTrue"] === true
                                        ? "Correct"
                                        : "InCorrect"}
                                </th>
                                <th className="item-table">
                                    {item["timeSpend"]}
                                </th>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className="control-btn-container">
                    <Button onClick={() => navigate("/quiz/1")}>
                        Quiz Again
                    </Button>
                    <Button onClick={() => navigate("/")}>Back to home</Button>
                </div>
            </div>
        </DefaultLayout>
    );
};
