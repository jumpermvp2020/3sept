'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useGameStore } from '@/lib/store'
import { useYandexMetrika } from '@/lib/yandexMetrika'
import { CalendarPage } from '@/components/CalendarPage'
import { GameProgress } from '@/components/GameProgress'
import { ResetButton } from '@/components/ResetButton'
import { RulesDialog } from '@/components/RulesDialog'
import { VictoryScreen } from '@/components/VictoryScreen'
import { StartButton } from '@/components/StartButton'
import { GameTimer } from '@/components/GameTimer'
import { BottomPanel } from '@/components/BottomPanel'

// Определение устройства и настройка скорости анимации
const isMobile = () => {
    if (typeof window === 'undefined') return false
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768
}

// Главный параметр для контроля всей системы анимации
const ANIMATION_MULTIPLIER = isMobile() ? 0.25 : 0.7 // Быстрее для мобильных, медленнее для ПК

// ID счетчика Яндекс.Метрики (замените на ваш)
const YANDEX_METRIKA_ID = 104007551

export default function Game() {
    const { isVictory, isGameStarted, startGame, clickedPages } = useGameStore()
    const [calendarPages, setCalendarPages] = useState<number[]>([])
    const [showFrog, setShowFrog] = useState(false)
    const [gameTime, setGameTime] = useState(0)
    const [showStartScreen, setShowStartScreen] = useState(true)
    const [gameStartTime, setGameStartTime] = useState<number | null>(null)

    // Инициализация Яндекс.Метрики
    const metrika = useYandexMetrika(YANDEX_METRIKA_ID)

    // Инициализация Яндекс.Метрики при загрузке компонента
    useEffect(() => {
        metrika.initMetrika({
            id: YANDEX_METRIKA_ID,
            defer: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true
        })
    }, [metrika])

    // Инициализация игры
    useEffect(() => {
        if (!isGameStarted && !showStartScreen) {
            const pages = Array.from({ length: 10 }, (_, i) => i)
            setCalendarPages(pages)
            startGame()
            setGameStartTime(Date.now())
            // Трекинг начала игры
            metrika.trackGameStart()
        }
    }, [isGameStarted, startGame, showStartScreen, metrika])

    // Обработка победы
    useEffect(() => {
        if (isVictory) {
            setShowFrog(true)
            // Трекинг победы
            metrika.trackGameVictory(gameTime, clickedPages)
        }
    }, [isVictory, gameTime, clickedPages, metrika])

    // Таймер игры
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isGameStarted && !isVictory) {
            interval = setInterval(() => {
                setGameTime(prev => prev + 1)
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isGameStarted, isVictory])

    const handleStartGame = useCallback(() => {
        setShowStartScreen(false)
        setGameTime(0)
        setGameStartTime(Date.now())
    }, [])

    const handleReset = useCallback(() => {
        setShowStartScreen(false)
        setGameTime(0)
        setCalendarPages(Array.from({ length: 10 }, (_, i) => i))
        setShowFrog(false)
        setGameStartTime(Date.now())
        // Сбрасываем состояние игры в store
        const { resetGame } = useGameStore.getState()
        resetGame()
        // Трекинг сброса игры
        metrika.trackGameReset()
    }, [metrika])

    const handleCollectPage = useCallback((id: number) => {
        setCalendarPages(prev => prev.filter(pageId => pageId !== id))
        // Трекинг клика по календарю
        if (gameStartTime) {
            const timeFromStart = Math.floor((Date.now() - gameStartTime) / 1000)
            metrika.trackCalendarClick(id, timeFromStart)
        }
    }, [metrika, gameStartTime])

    // Мемоизированные скорости для каждого из 10 листков (в секундах)
    const speeds = useMemo(() => [
        3 * ANIMATION_MULTIPLIER,  // Быстрый
        5 * ANIMATION_MULTIPLIER,  // Средний
        2 * ANIMATION_MULTIPLIER,  // Очень быстрый
        4 * ANIMATION_MULTIPLIER,  // Средний
        6 * ANIMATION_MULTIPLIER,  // Медленный
        2.5 * ANIMATION_MULTIPLIER, // Быстрый
        7 * ANIMATION_MULTIPLIER,  // Очень медленный
        3.5 * ANIMATION_MULTIPLIER, // Средний
        4.5 * ANIMATION_MULTIPLIER, // Средний
        5.5 * ANIMATION_MULTIPLIER  // Медленный
    ], [ANIMATION_MULTIPLIER])

    // Мемоизированные задержки для каждого листка (в секундах)
    const delays = useMemo(() => [
        0,
        0.5,
        1,
        1.5,
        2,
        2.5,
        3,
        3.5,
        4,
        4.5
    ], [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
            {/* Стартовый экран */}
            <AnimatePresence>
                {showStartScreen && (
                    <StartButton onStart={handleStartGame} />
                )}
            </AnimatePresence>

            {/* Основная игра */}
            {!showStartScreen && (
                <>
                    {/* Фон с Шафутинским */}
                    <div className="absolute inset-0 flex items-end justify-center z-0">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <Image
                                src="/shef.png"
                                alt="Шафутинский"
                                width={300}
                                height={300}
                                className="opacity-20"
                                priority
                            />
                        </motion.div>
                    </div>

                    {/* Заголовок */}
                    <motion.h1
                        className="absolute top-30 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-gray-800 z-10"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Кликай на календари!
                    </motion.h1>

                    {/* Календарные листки */}
                    <AnimatePresence>
                        {calendarPages.map((id) => (
                            <CalendarPage
                                key={id}
                                id={id}
                                speed={speeds[id]}
                                delay={delays[id]}
                                onCollect={() => handleCollectPage(id)}
                            />
                        ))}
                    </AnimatePresence>

                    {/* UI элементы */}
                    <GameProgress />
                    <BottomPanel
                        isGameStarted={isGameStarted}
                        isVictory={isVictory}
                        gameTime={gameTime}
                        onReset={handleReset}
                    />

                    {/* Финальный экран */}
                    <VictoryScreen
                        isVisible={isVictory}
                        gameTime={gameTime}
                        onPlayAgain={() => {
                            handleReset()
                            setShowStartScreen(true)
                        }}
                    />
                </>
            )}
        </div>
    )
}
