import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface StartButtonProps {
    onStart: () => void
}

export const StartButton = ({ onStart }: StartButtonProps) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <motion.div
            className="fixed inset-0 flex flex-col z-30 bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Анимированный фон с частицами - только на клиенте */}
            {mounted && (
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-3 h-3 bg-orange-400/40 rounded-full"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                            }}
                            animate={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                                scale: [1, 1.3, 1],
                            }}
                            transition={{
                                duration: 15 + Math.random() * 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 5,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Мемный заголовок */}
            <motion.div
                className="flex-1 flex items-center justify-center p-4 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                        src="/start.png"
                        alt="Стартовый экран"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />

                    {/* Плавающие мемные элементы */}
                    <motion.div
                        className="absolute top-10 left-10 text-4xl"
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        🗓️
                    </motion.div>

                    <motion.div
                        className="absolute bottom-10 right-10 text-4xl"
                        animate={{
                            rotate: [0, -360],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2,
                        }}
                    >
                        🐸
                    </motion.div>
                </div>
            </motion.div>

            {/* Мемная нижняя панель */}
            <motion.div
                className="p-6 bg-gradient-to-t from-orange-200/90 to-red-100/80 backdrop-blur-sm border-t-4 border-orange-300 relative"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                {/* Анимированные полоски */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400"
                    animate={{
                        scaleX: [0, 1, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="text-center mb-6"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <motion.h1
                        className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 relative"
                        animate={{
                            scale: [1, 1.02, 1],
                            textShadow: [
                                "0 0 0px rgba(255,165,0,0)",
                                "0 0 20px rgba(255,165,0,0.8)",
                                "0 0 0px rgba(255,165,0,0)"
                            ]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <motion.span
                            animate={{
                                color: ["#1f2937", "#dc2626", "#1f2937"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            Я календарь переверну! 🔥
                        </motion.span>
                    </motion.h1>

                    {/* Призыв включить звук */}
                    <motion.div
                        className="mt-4 p-4 bg-gradient-to-r from-orange-200/90 via-red-200/80 to-yellow-200/90 rounded-xl border-3 border-orange-400 shadow-2xl backdrop-blur-sm"
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8, type: "spring", stiffness: 100 }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(255, 165, 0, 0.3)"
                        }}
                    >
                        <motion.div
                            className="flex items-center justify-center gap-3 text-orange-800 font-bold"
                            animate={{
                                scale: [1, 1.02, 1],
                                textShadow: [
                                    "0 0 0px rgba(255,165,0,0)",
                                    "0 0 12px rgba(255,165,0,0.8)",
                                    "0 0 0px rgba(255,165,0,0)"
                                ]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <motion.div
                                className="text-2xl"
                                animate={{
                                    rotate: [0, 15, -15, 0],
                                    scale: [1, 1.2, 1],
                                    filter: [
                                        "brightness(1)",
                                        "brightness(1.3) drop-shadow(0 0 10px rgba(255,165,0,0.8))",
                                        "brightness(1)"
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                🔊
                            </motion.div>
                            <span className="text-sm md:text-lg">
                                Включи звук для полного погружения!
                            </span>
                            <motion.div
                                className="text-2xl"
                                animate={{
                                    rotate: [0, -15, 15, 0],
                                    scale: [1, 1.2, 1],
                                    filter: [
                                        "brightness(1)",
                                        "brightness(1.3) drop-shadow(0 0 10px rgba(255,69,0,0.8))",
                                        "brightness(1)"
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.8
                                }}
                            >
                                🎵
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                className="flex justify-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
            >
                <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Button
                        onClick={onStart}
                        size="lg"
                        className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 hover:from-orange-600 hover:via-red-600 hover:to-orange-600 text-white px-12 py-8 text-2xl font-bold rounded-full shadow-2xl border-4 border-orange-300 relative overflow-hidden"
                    >
                        <motion.span
                            className="relative z-10"
                            animate={{
                                textShadow: [
                                    "0 0 0px rgba(255,255,255,0)",
                                    "0 0 10px rgba(255,255,255,0.8)",
                                    "0 0 0px rgba(255,255,255,0)"
                                ]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            🔥 ПЕРЕВЕРНУТЬ! 🔥
                        </motion.span>
                    </Button>

                    {/* Улучшенный эффект частиц */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                            background: [
                                "radial-gradient(circle, rgba(255,165,0,0.3) 0%, transparent 70%)",
                                "radial-gradient(circle, rgba(255,69,0,0.5) 0%, transparent 70%)",
                                "radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)",
                                "radial-gradient(circle, rgba(255,165,0,0.3) 0%, transparent 70%)"
                            ]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Дополнительные эффекты */}
                    <motion.div
                        className="absolute -inset-4 rounded-full bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 opacity-20 blur-xl"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* Мемная подпись внизу */}
            <motion.div
                className="mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <motion.p
                    className="text-sm text-orange-700 font-medium"
                    animate={{
                        scale: [1, 1.02, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    🎯 я календарь переверну и стану легендой! 🎯
                </motion.p>
            </motion.div>
        </motion.div>
    )
}
