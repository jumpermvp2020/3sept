import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { Button } from '@/components/ui/button'
import { Share2, Copy, Check, Play } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useSoundManager } from '@/lib/soundManager'
import { Howl } from 'howler'

interface VictoryScreenProps {
    isVisible: boolean
    gameTime?: number
    onPlayAgain?: () => void
}

export const VictoryScreen = ({ isVisible, gameTime = 0, onPlayAgain }: VictoryScreenProps) => {
    const { width, height } = useWindowSize()
    const [copied, setCopied] = useState(false)
    const soundManager = useSoundManager()
    const [activeTrack, setActiveTrack] = useState<'frog' | 'music' | null>('frog')

    // Отдельные звуки для VictoryScreen
    const frogSoundRef = useRef<Howl | null>(null)
    const musicSoundRef = useRef<Howl | null>(null)

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    // Инициализация звуков VictoryScreen
    useEffect(() => {
        if (!frogSoundRef.current) {
            frogSoundRef.current = new Howl({
                src: ['/final.mp3'],
                volume: 0.8,
                loop: true
            })
        }

        if (!musicSoundRef.current) {
            musicSoundRef.current = new Howl({
                src: ['/mus.mp3'],
                volume: 0.7,
                loop: true
            })
        }
    }, [])

    const handleFrogClick = () => {
        if (activeTrack === 'frog') {
            frogSoundRef.current?.stop()
            setActiveTrack(null)
        } else {
            // Останавливаем музыку если играет
            musicSoundRef.current?.stop()
            // Запускаем лягушку
            frogSoundRef.current?.play()
            setActiveTrack('frog')
        }
    }

    const handleCalendarClick = () => {
        if (activeTrack === 'music') {
            musicSoundRef.current?.stop()
            setActiveTrack(null)
        } else {
            // Останавливаем лягушку если играет
            frogSoundRef.current?.stop()
            // Запускаем музыку
            musicSoundRef.current?.play()
            setActiveTrack('music')
        }
    }

    const handleShare = async () => {
        const shareText = `🎉 Я прошел "3 сентября" за ${formatTime(gameTime)}! 🐸\n\nПопробуй сам: ${window.location.href}`
        const shareUrl = window.location.href

        if (navigator.share) {
            try {
                await navigator.share({
                    title: '3 сентября',
                    text: shareText,
                    url: shareUrl
                })
            } catch (error) {
                console.log('Ошибка при попытке поделиться:', error)
            }
        } else {
            // Fallback для браузеров без поддержки Web Share API
            handleCopyLink()
        }
    }

    const handleCopyLink = async () => {
        const shareText = `🎉 Я прошел "3 сентября" за ${formatTime(gameTime)}! 🐸\n\nПопробуй сам: ${window.location.href}`

        try {
            await navigator.clipboard.writeText(shareText)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (error) {
            console.log('Ошибка при копировании:', error)
        }
    }

    // Сброс активного трека при закрытии экрана
    useEffect(() => {
        if (!isVisible) {
            setActiveTrack(null)
            // Останавливаем все звуки при закрытии
            frogSoundRef.current?.stop()
            musicSoundRef.current?.stop()
        } else {
            // При открытии экрана - останавливаем все предыдущие звуки и запускаем лягушку
            soundManager?.stopMusic()
            soundManager?.stopFrogSound()
            setActiveTrack('frog')
            frogSoundRef.current?.play()
        }
    }, [isVisible, soundManager])

    if (!isVisible) return null

    return (
        <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <Confetti
                width={width}
                height={height}
                recycle={true}
                numberOfPieces={150}
                colors={['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FF8C42', '#FF69B4']}
                gravity={0.2}
                wind={0.02}
            />
            <motion.div
                className="bg-white/95 backdrop-blur-md rounded-3xl p-8 text-center shadow-xl max-w-lg mx-4 relative border border-gray-100"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.h1
                    className="text-3xl font-bold text-gray-700 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    🎉 Поздравляем! 🎉
                </motion.h1>

                <motion.p
                    className="text-lg text-gray-600 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    Отличная работа! My Dudes!
                </motion.p>

                {/* Интерактивные пасхалки */}
                <motion.div
                    className="flex justify-center items-center gap-6 mb-8"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    {/* Лягушка */}
                    <motion.div
                        className="relative cursor-pointer"
                        onClick={handleFrogClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={activeTrack === 'frog' ? {
                            scale: [1, 1.05, 1],
                            rotate: [0, 1, -1, 0]
                        } : {
                            rotate: [0, 0.5, -0.5, 0],
                            scale: 1
                        }}
                        transition={{
                            duration: activeTrack === 'frog' ? 0.6 : 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Image
                            src="/frog.png"
                            alt="Лягушка-пасхалка"
                            width={70}
                            height={70}
                            className={`drop-shadow-md transition-opacity duration-300 ${activeTrack !== 'frog' ? 'opacity-70' : ''}`}
                        />

                        {/* Мягкие волны от лягушки */}
                        {activeTrack === 'frog' && (
                            <>
                                <motion.div
                                    className="absolute inset-0 rounded-full border border-green-300/60"
                                    animate={{
                                        scale: [1, 1.8, 2.5],
                                        opacity: [0.4, 0.2, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeOut"
                                    }}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-full border border-green-200/40"
                                    animate={{
                                        scale: [1, 2, 3],
                                        opacity: [0.3, 0.1, 0]
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeOut",
                                        delay: 0.5
                                    }}
                                />
                            </>
                        )}

                        {/* Очень слабые волны для неактивного состояния */}
                        {activeTrack !== 'frog' && (
                            <motion.div
                                className="absolute inset-0 rounded-full border border-green-100/30"
                                animate={{
                                    scale: [1, 1.3, 1.6],
                                    opacity: [0.2, 0.1, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeOut"
                                }}
                            />
                        )}
                    </motion.div>

                    {/* Календарь */}
                    <motion.div
                        className="relative cursor-pointer"
                        onClick={handleCalendarClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={activeTrack === 'music' ? {
                            scale: [1, 1.05, 1],
                            rotate: [0, -1, 1, 0]
                        } : {
                            rotate: [0, -0.5, 0.5, 0],
                            scale: 1
                        }}
                        transition={{
                            duration: activeTrack === 'music' ? 0.6 : 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Image
                            src="/1list.png"
                            alt="3 сентября"
                            width={70}
                            height={70}
                            className={`drop-shadow-md transition-opacity duration-300 ${activeTrack !== 'music' ? 'opacity-70' : ''}`}
                        />

                        {/* Мягкие волны от календаря */}
                        {activeTrack === 'music' && (
                            <>
                                <motion.div
                                    className="absolute inset-0 rounded-full border border-blue-300/60"
                                    animate={{
                                        scale: [1, 1.8, 2.5],
                                        opacity: [0.4, 0.2, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeOut"
                                    }}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-full border border-blue-200/40"
                                    animate={{
                                        scale: [1, 2, 3],
                                        opacity: [0.3, 0.1, 0]
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeOut",
                                        delay: 0.5
                                    }}
                                />
                            </>
                        )}

                        {/* Очень слабые волны для неактивного состояния */}
                        {activeTrack !== 'music' && (
                            <motion.div
                                className="absolute inset-0 rounded-full border border-blue-100/30"
                                animate={{
                                    scale: [1, 1.3, 1.6],
                                    opacity: [0.2, 0.1, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeOut"
                                }}
                            />
                        )}
                    </motion.div>
                </motion.div>

                <motion.div
                    className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                >
                    <p className="text-base font-medium text-blue-700 mb-1">
                        Время прохождения:
                    </p>
                    <p className="text-xl font-bold text-blue-600">
                        {formatTime(gameTime)}
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-col gap-3"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                >
                    <div className="flex gap-3 justify-center">
                        <Button
                            onClick={handleShare}
                            className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
                        >
                            <Share2 className="w-4 h-4 mr-2" />
                            Поделиться
                        </Button>

                        <Button
                            onClick={handleCopyLink}
                            variant="outline"
                            className={`transition-all duration-200 ${copied ? "bg-green-50 border-green-400 text-green-600" : "border-gray-300 hover:border-gray-400"}`}
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Скопировано!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4 mr-2" />
                                    Скопировать
                                </>
                            )}
                        </Button>
                    </div>

                    <Button
                        onClick={() => {
                            // Останавливаем все звуки перед возвратом к игре
                            frogSoundRef.current?.stop()
                            musicSoundRef.current?.stop()
                            onPlayAgain?.()
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white mt-3 transition-colors duration-200"
                    >
                        <Play className="w-4 h-4 mr-2" />
                        Играть заново
                    </Button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
