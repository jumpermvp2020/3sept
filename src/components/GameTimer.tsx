import React from 'react'

interface GameTimerProps {
    isGameStarted: boolean
    gameTime: number
}

export const GameTimer = ({ isGameStarted, gameTime }: GameTimerProps) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    if (!isGameStarted) return null

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
            <span className="text-lg font-bold text-gray-800">
                ⏱️ {formatTime(gameTime)}
            </span>
        </div>
    )
}
