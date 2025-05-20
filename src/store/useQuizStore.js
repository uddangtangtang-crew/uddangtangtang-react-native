import { create } from 'zustand';

export const useQuizStore = create((set) => ({
  currentIndex: 0,
  answers: {}, // { Q1: 'A', Q2: 'B' ... }

  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: answer,
      },
    })),

  nextQuestion: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
    })),

  resetQuiz: () =>
    set(() => ({
      currentIndex: 0,
      answers: {},
    })),
}));

