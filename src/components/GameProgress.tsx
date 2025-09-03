import { Progress } from '@/components/ui/progress'
import { useGameStore } from '@/lib/store'

export const GameProgress = () => {
    const { clickedPages } = useGameStore()
    const progress = (clickedPages / 10) * 100

    return (
        <div className="fixed top-4 left-4 right-4 z-20">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-gray-800">
                        Прогресс: {clickedPages}/10
                    </span>
                    <span className="text-sm text-gray-600">
                        Осталось: {10 - clickedPages}
                    </span>
                </div>
                <Progress value={progress} className="h-3" />
            </div>
        </div>
    )
}
