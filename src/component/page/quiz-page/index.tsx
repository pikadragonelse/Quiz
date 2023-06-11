import React, { useEffect, useRef, useState } from "react";
import { FormAnswer } from "./form";
import { DefaultLayout } from "../default-layout";
import "./index.scss";
import { QuizResponse } from "../../../model/quiz-list";
import { Quiz } from "../../../model/quiz";
import { useNavigate, useParams } from "react-router-dom";

export type QuizPage = { data: Array<Quiz> };
export const QuizPage = ({ data }: QuizPage) => {
    const defaultQuiz: Quiz = {
        category: "",
        type: "",
        difficulty: "",
        question: "",
        correct_answer: "",
        incorrect_answers: [],
    };

    const [dataShow, setDataShow] = useState<Quiz>(defaultQuiz);
    const [isNextQuestion, setIsNextQuestion] = useState<boolean>(false);
    const [idQuiz, setIdQuiz] = useState<any>(useParams().idQuiz);
    const [toggle, setToggle] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        const dataOFF = JSON.parse(localStorage.getItem("data") as any);
        if (dataOFF[idQuiz] != undefined) {
            setDataShow(dataOFF[idQuiz - 1]);
        } else {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        const dataOFF = JSON.parse(localStorage.getItem("data") as any);
        setDataShow(dataOFF[idQuiz - 1]);
    }, [idQuiz]);

    const [minute, setMinute] = useState(1);
    const [second, setSecond] = useState(30);
    let timeSpend = useRef<any>(0);

    useEffect(() => {
        const timer = setInterval(() => {
            timeSpend.current += 1;
            setSecond((prev) => (prev = prev - 1));
            if (second === 0 && minute === 1) {
                setMinute(0);
                setSecond(59);
            }
        }, 1000);

        if (second === 0 && minute === 0) {
            clearInterval(timer);
        }

        return () => {
            clearInterval(timer);
        };
    }, [second]);

    return (
        <DefaultLayout className="quiz">
            <div className="quiz-container">
                <div className="sub-inf">
                    <div className="timer">
                        <span>0{minute}</span>
                        <span>:</span>
                        <span>{second >= 10 ? second : `0${second}`}</span>
                    </div>
                    <div className="difficulty">
                        Difficulty: &nbsp;{dataShow.difficulty}
                    </div>
                </div>
                <div className="question">{dataShow.question}</div>
                <FormAnswer
                    listIncorrectAnswer={dataShow.incorrect_answers}
                    correctAnswer={dataShow.correct_answer}
                    idQuiz={idQuiz}
                    timeSpend={timeSpend.current}
                    setToggle={setIdQuiz}
                />
            </div>
        </DefaultLayout>
    );
};
