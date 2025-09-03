import { motion } from 'framer-motion'
import Image from 'next/image'
import { useGameStore } from '@/lib/store'
import { useSoundManager } from '@/lib/soundManager'
import { useEffect, useState, useCallback, useMemo } from 'react'

interface CalendarPageProps {
    id: number
    onCollect: () => void
    speed: number
    delay: number
}

export const CalendarPage = ({ id, onCollect, speed, delay }: CalendarPageProps) => {
    const soundManager = useSoundManager()
    const { incrementClickedPages } = useGameStore()
    const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })

    // Отслеживаем размер окна для адаптивности с дебаунсом
    useEffect(() => {
        const updateSize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        updateSize()

        let timeoutId: NodeJS.Timeout
        const debouncedUpdateSize = () => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(updateSize, 100)
        }

        window.addEventListener('resize', debouncedUpdateSize)
        return () => {
            window.removeEventListener('resize', debouncedUpdateSize)
            clearTimeout(timeoutId)
        }
    }, [])

    const handleClick = useCallback(() => {
        // Получаем текущее количество кликнутых страниц ДО увеличения
        const currentClickedPages = useGameStore.getState().clickedPages

        // Если это последний календарь (9-й, так как индексация с 0)
        if (currentClickedPages === 9) {
            // Принудительно останавливаем mus.mp3 перед финальным экраном
            soundManager?.stopMusic()
        } else {
            // Для всех остальных календарей играем mus.mp3
            soundManager?.playMusic()
        }

        incrementClickedPages()
        onCollect()
    }, [soundManager, incrementClickedPages, onCollect])

    // Функция для создания безопасных координат (в пределах экрана)
    const getSafeCoordinates = useCallback((percentX: number, percentY: number) => {
        const maxX = windowSize.width - 100 // Оставляем 100px от края
        const maxY = windowSize.height - 100
        const minX = 50
        const minY = 50

        return {
            x: Math.min(Math.max(percentX, minX), maxX),
            y: Math.min(Math.max(percentY, minY), maxY)
        }
    }, [windowSize])

    // Уникальные траектории для каждого из 10 листков (в процентах от экрана)
    const trajectory = useMemo(() => {
        const trajectories = [
            // Листок 0: Круговая траектория в левом верхнем углу (максимально расширенная)
            {
                x: [8, 30, 22, 8].map(p => getSafeCoordinates(p * windowSize.width / 100, 10 * windowSize.height / 100).x),
                y: [10, 10, 28, 10].map(p => getSafeCoordinates(8 * windowSize.width / 100, p * windowSize.height / 100).y)
            },
            // Листок 1: Восьмерка в правом верхнем углу (максимально расширенная)
            {
                x: [50, 80, 65, 50, 80, 65, 50].map(p => getSafeCoordinates(p * windowSize.width / 100, 10 * windowSize.height / 100).x),
                y: [10, 20, 30, 20, 10, 20, 10].map(p => getSafeCoordinates(50 * windowSize.width / 100, p * windowSize.height / 100).y)
            },
            // Листок 2: Зигзаг в центре (максимально расширенный)
            {
                x: [20, 50, 35, 65, 50, 20].map(p => getSafeCoordinates(p * windowSize.width / 100, 25 * windowSize.height / 100).x),
                y: [25, 35, 42, 35, 25, 25].map(p => getSafeCoordinates(20 * windowSize.width / 100, p * windowSize.height / 100).y)
            },
            // Листок 3: Спираль в левом нижнем углу (максимально расширенная)
            {
                x: [10, 30, 22, 35, 30, 10].map(p => getSafeCoordinates(p * windowSize.width / 100, 60 * windowSize.height / 100).x),
                y: [60, 70, 78, 70, 60, 60].map(p => getSafeCoordinates(10 * windowSize.width / 100, p * windowSize.height / 100).y)
            },
            // Листок 4: Волна в правом нижнем углу (максимально расширенная)
            {
                x: [40, 60, 75, 90, 75, 60, 40].map(p => getSafeCoordinates(p * windowSize.width / 100, 55 * windowSize.height / 100).x),
                y: [55, 70, 55, 70, 55, 70, 55].map(p => getSafeCoordinates(40 * windowSize.width / 100, p * windowSize.height / 100).y)
            },
            // Листок 5: Треугольник в центре (максимально расширенный)
            {
                x: [15, 45, 30, 15].map(p => getSafeCoordinates(p * windowSize.width / 100, 20 * windowSize.height / 100).x),
                y: [20, 20, 40, 20].map(p => getSafeCoordinates(15 * windowSize.width / 100, p * windowSize.height / 100).y)
            },
            // Листок 6: Квадрат в правом верхнем углу (максимально расширенный)
            {
                x: [35, 70, 70, 35, 35].map(p => getSafeCoordinates(p * windowSize.width / 100, 5 * windowSize.height / 100).x),
                y: [5, 5, 25, 25, 5].map(p => getSafeCoordinates(35 * windowSize.width / 100, p * windowSize.height / 100).y)
            },
            // Листок 7: Ромб в левом центре (максимально расширенный)
            {
                x: [3, 25, 40, 25, 3].map(p => getSafeCoordinates(p * windowSize.width / 100, 25 * windowSize.height / 100).x),
                y: [25, 15, 25, 35, 25].map(p => getSafeCoordinates(3 * windowSize.width / 100, p * windowSize.height / 100).y)
            },
            // Листок 8: Змейка в правом центре (максимально расширенная)
            {
                x: [30, 55, 75, 95, 75, 55, 30].map(p => getSafeCoordinates(p * windowSize.width / 100, 25 * windowSize.height / 100).x),
                y: [25, 40, 25, 40, 25, 40, 25].map(p => getSafeCoordinates(30 * windowSize.width / 100, p * windowSize.height / 100).y)
            },
            // Листок 9: Случайная траектория в центре (максимально расширенная)
            {
                x: [10, 40, 25, 55, 40, 10].map(p => getSafeCoordinates(p * windowSize.width / 100, 40 * windowSize.height / 100).x),
                y: [40, 50, 60, 50, 40, 40].map(p => getSafeCoordinates(10 * windowSize.width / 100, p * windowSize.height / 100).y)
            }
        ]

        return trajectories[id] || trajectories[0]
    }, [id, getSafeCoordinates, windowSize])

    return (
        <motion.div
            className="absolute cursor-pointer z-10 select-none"
            initial={{
                x: trajectory.x[0],
                y: trajectory.y[0],
                opacity: 0,
                rotate: 0
            }}
            animate={{
                x: trajectory.x,
                y: trajectory.y,
                opacity: 1,
                rotate: [0, 360, -180, 180, 0]
            }}
            transition={{
                duration: speed,
                delay: delay,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            whileHover={{
                scale: 1.1,
                rotate: 0
            }}
            whileTap={{
                scale: 0.9
            }}
            exit={{
                scale: 0,
                opacity: 0,
                transition: { duration: 0.3 }
            }}
            onClick={handleClick}
            onMouseDown={(e) => e.preventDefault()}
            onTouchStart={(e) => e.preventDefault()}
        >
            <Image
                src="/calendar.png"
                alt="3 сентября"
                width={80}
                height={80}
                className="drop-shadow-lg"
                priority={id < 3} // Приоритетная загрузка для первых 3 календарей
            />
        </motion.div>
    )
}
