import React from 'react'

interface GameTimerProps {
    isGameStarted: boolean
    gameTime: number
    gameTimeMs?: number
}

export const GameTimer = ({ isGameStarted, gameTime, gameTimeMs = 0 }: GameTimerProps) => {
    const formatTime = (seconds: number, milliseconds?: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        const ms = milliseconds ? Math.floor((milliseconds % 1000) / 10) : 0
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`
    }

    if (!isGameStarted) return null

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md">
            <span className="text-sm font-semibold text-gray-700">
                ⏱️ {formatTime(gameTime, gameTimeMs)}
            </span>
        </div>
    )
}
