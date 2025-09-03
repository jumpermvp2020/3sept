import { ResetButton } from '@/components/ResetButton'
import { RulesDialog } from '@/components/RulesDialog'
import { GameTimer } from '@/components/GameTimer'

interface BottomPanelProps {
    isGameStarted: boolean
    isVictory: boolean
    gameTime: number
    onReset?: () => void
}

export const BottomPanel = ({ isGameStarted, isVictory, gameTime, onReset }: BottomPanelProps) => {
    return (
        <div className="fixed bottom-4 left-0 right-0 z-20 flex items-center justify-between px-4">
            {/* Левая часть - Правила */}
            <div className="flex-1 flex justify-start">
                <RulesDialog />
            </div>

            {/* Центральная часть - Таймер */}
            <div className="flex-1 flex justify-center">
                <GameTimer isGameStarted={isGameStarted} isVictory={isVictory} gameTime={gameTime} />
            </div>

            {/* Правая часть - Сброс */}
            <div className="flex-1 flex justify-end">
                <ResetButton onReset={onReset} />
            </div>
        </div>
    )
}
