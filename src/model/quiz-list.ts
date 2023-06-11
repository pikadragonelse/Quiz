import { Quiz } from "./quiz";

export type QuizResponse = {
    response_code: number,
    results: Array<Quiz>,
}