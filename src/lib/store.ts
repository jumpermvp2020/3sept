import { create } from 'zustand'

interface GameState {
    clickedPages: number
    isVictory: boolean
    isGameStarted: boolean
    incrementClickedPages: () => void
    resetGame: () => void
    startGame: () => void
    setVictory: () => void
}

export const useGameStore = create<GameState>((set) => ({
    clickedPages: 0,
    isVictory: false,
    isGameStarted: false,

    incrementClickedPages: () => set((state) => {
        const newCount = state.clickedPages + 1
        const isVictory = newCount >= 10

        return {
            clickedPages: newCount,
            isVictory: isVictory
        }
    }),

    resetGame: () => set({
        clickedPages: 0,
        isVictory: false,
        isGameStarted: false
    }),

    startGame: () => set({
        isGameStarted: true
    }),

    setVictory: () => set({
        isVictory: true
    })
}))
