import { create } from 'zustand';

export const useQuizStore = create((set) => ({
  // State
  currentIndex: 0,
  answers: {}, // { Q1: 'A', Q2: 'B' ... }

  // Actions
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

  prevQuestion: () =>
    set((state) => ({
      currentIndex: Math.max(0, state.currentIndex - 1),
    })),

  resetQuiz: () =>
    set(() => ({
      currentIndex: 0,
      answers: {},
    })),
}));
