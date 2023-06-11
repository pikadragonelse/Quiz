import React, { useEffect, useState } from "react";
import "./App.scss";
import { HomePage } from "./component/page/home-page";
import { Routes, Route } from "react-router-dom";
import { QuizPage } from "./component/page/quiz-page";
import { ResultPage } from "./component/page/result-page";
import { QuizResponse } from "./model/quiz-list";
import { Quiz } from "./model/quiz";

function App() {
    const [data, setData] = useState<Array<Quiz>>([]);
    const getData = () => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then((response) => response.json())
            .then((data: QuizResponse) => {
                data.results.forEach((item) => {
                    item.question = item.question.replace(
                        /[^\w\s]/gi,
                        ""
                    ) as any;

                    item.correct_answer = item.correct_answer.replace(
                        /[^\w\s]/gi,
                        ""
                    ) as any;
                    item.incorrect_answers.forEach(
                        (item: string) =>
                            (item = item.replace(/[^\w\s]/gi, "") as any)
                    );
                });
                localStorage.setItem("data", JSON.stringify(data.results));
                setData(data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz/:idQuiz/*" element={<QuizPage data={data} />} />
            <Route path="/result" element={<ResultPage />} />
        </Routes>
    );
}

export default App;
