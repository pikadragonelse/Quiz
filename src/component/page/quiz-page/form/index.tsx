import React, { useEffect, useState } from "react";
import { Button } from "../../../button";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { AnswerItem } from "./answer-item";

export let listAnswerUser: Array<Record<string, any>> = [];

const answerMap: Record<number, string> = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
};

export type FormAnswer = {
    listIncorrectAnswer: Array<string>;
    correctAnswer: string;
    idQuiz: string;
    timeSpend: number;
    setToggle: any;
};
export const FormAnswer = ({
    listIncorrectAnswer,
    correctAnswer,
    idQuiz,
    timeSpend,
    setToggle,
}: FormAnswer) => {
    const [listAnswerOfficial, setListAnswerOfficial] = useState<
        Array<Record<string, any>>
    >([]);
    const listAnswer: Array<Record<string, any>> = [];
    const [changeURL, setChangeURL] = useState<boolean>(false);

    const navigate = useNavigate();

    function getRandomIndexes(array: any) {
        var shuffledArray = array.slice(); // Tạo một bản sao của mảng ban đầu
        var currentIndex = shuffledArray.length;
        var temporaryValue, randomIndex;

        // Xáo trộn mảng bằng thuật toán Fisher-Yates
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // Hoán đổi giá trị
            temporaryValue = shuffledArray[currentIndex];
            shuffledArray[currentIndex] = shuffledArray[randomIndex];
            shuffledArray[randomIndex] = temporaryValue;
        }

        return shuffledArray;
    }

    useEffect(() => {
        if (idQuiz === "1") {
            listAnswerUser = [];
        }
    }, [idQuiz]);

    useEffect(() => {
        listIncorrectAnswer.forEach((item) => {
            listAnswer.push({ value: item, isTrue: false });
        });
        listAnswer.push({ value: correctAnswer, isTrue: true });
        setListAnswerOfficial(getRandomIndexes(listAnswer));
    }, [listIncorrectAnswer, correctAnswer]);

    const handleSubmit = (
        form: any,
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        const map = listAnswerOfficial.map((item: any) => {
            return item.isTrue === true;
        });

        if (form[answerMap[map.indexOf(true)]].checked === true) {
            listAnswerUser.push({
                idQuiz: idQuiz,
                isTrue: true,
                timeSpend: timeSpend,
            });
        } else {
            listAnswerUser.push({
                idQuiz: idQuiz,
                isTrue: false,
                timeSpend: timeSpend,
            });
        }
        if (
            form["A"].checked === true ||
            form["B"].checked === true ||
            form["C"].checked === true ||
            form["D"].checked === true
        ) {
            if (Number(idQuiz) < 5) {
                setToggle(Number(idQuiz) + 1);
                navigate(`/quiz/${Number(idQuiz) + 1}`);
            } else {
                navigate(`/result`);
                console.log(listAnswerUser);
            }
        }
    };

    return (
        <form
            className="form-answer"
            onSubmit={(event) => {
                const form = event.target;
                handleSubmit(form, event);
            }}
        >
            <ul className="answer-list">
                {listAnswerOfficial.map((item, index) => {
                    return (
                        <Link
                            key={answerMap[index]}
                            to={`/quiz/${idQuiz}/${answerMap[index]}`}
                        >
                            <AnswerItem
                                key={index}
                                content={item.value}
                                typeAnswer={item.isTrue}
                                index={answerMap[index]}
                            />
                        </Link>
                    );
                })}
            </ul>
            <Button type="submit" className="btn-quiz">
                Submit
            </Button>
        </form>
    );
};
