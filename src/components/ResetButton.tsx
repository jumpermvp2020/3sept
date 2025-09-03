import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/store'
import { useSoundManager } from '@/lib/soundManager'
import { RotateCcw } from 'lucide-react'

interface ResetButtonProps {
    onReset?: () => void
}

export const ResetButton = ({ onReset }: ResetButtonProps) => {
    const { resetGame } = useGameStore()
    const soundManager = useSoundManager()

    const handleReset = () => {
        soundManager?.reset()
        resetGame()
        onReset?.()
    }

    return (
        <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
        >
            <RotateCcw className="w-4 h-4 mr-2" />
            Сбросить
        </Button>
    )
}
