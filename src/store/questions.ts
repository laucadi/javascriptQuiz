import { create } from "zustand";
import { Question } from "../assets/types";
import confetti from "canvas-confetti";
import { persist, devtools } from "zustand/middleware";

interface State {
  questions: Question[];
  currentQuestion: number;
  fecthQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  getNextQuestion: () => void;
  getPreviousQuestion: () => void;
  reset: () => void;
}
export const useQuestionStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          questions: [],
          currentQuestion: 0,

          fecthQuestions: async (limit: number) => {
            const res = await fetch("http://127.0.0.1:5173/data.json");
            const json = await res.json();
            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit);
            set({ questions });
          },
          selectAnswer: (questionId: number, answerIndex: number) => {
            //usar el structuredClone, clonar objetos de manera profunda
            const { questions } = get();
            const newQuestions = structuredClone(questions);
            //questionIndex?
            const questionIndex = newQuestions.findIndex(
              (q) => q.id === questionId
            );
            const questionInfo = newQuestions[questionIndex];
            const isCorrectUserAnswer =
              questionInfo.correctAnswer === answerIndex;
            if (isCorrectUserAnswer) confetti();
            //cambiar esta info en la copia de la pregunta
            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer,
              userSelectedAnswer: answerIndex,
            };
            //actualizamos e estado
            set({ questions: newQuestions });
          },
          getNextQuestion: () => {
            const { currentQuestion, questions } = get();
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
              set({ currentQuestion: nextQuestion });
            }
          },
          getPreviousQuestion: () => {
            const { currentQuestion } = get();
            const previousQuestion = currentQuestion - 1;
            if (previousQuestion >= 0) {
              set({ currentQuestion: previousQuestion });
            }
          },
          reset: () => {
            set({ currentQuestion: 0, questions: [] });
          },
        };
      },
      {
        name: "questions",
      }
    )
  )
);
