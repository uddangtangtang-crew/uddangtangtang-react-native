import { create } from 'zustand';

export const useQuizStore = create((set) => ({
  // State
  currentIndex: 0,
  answers: {}, // { Q1: 'A', Q2: 'B' ... }
  partnerType: null, // 공유된 결과에서 온 경우 A의 유형
  isFromSharedResult: false, // 공유 결과에서 온 경우인지 여부

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

  setPartnerType: (type) =>
    set(() => ({
      partnerType: type,
    })),

  setIsFromSharedResult: (isFromShared) =>
    set(() => ({
      isFromSharedResult: isFromShared,
    })),

  resetQuiz: () =>
    set(() => ({
      currentIndex: 0,
      answers: {},
      partnerType: null,
      isFromSharedResult: false,
    })),
}));
