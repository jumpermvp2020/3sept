import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface StartButtonProps {
    onStart: () => void
}

export const StartButton = ({ onStart }: StartButtonProps) => {
    return (
        <motion.div
            className="fixed inset-0 flex flex-col z-30 bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
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
                </div>
            </motion.div>

            {/* Мемная нижняя панель */}
            <motion.div
                className="p-6 bg-gradient-to-t from-orange-200/90 to-red-100/80 backdrop-blur-sm border-t-4 border-orange-300"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                <motion.div
                    className="text-center mb-6"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <motion.h1
                        className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
                        animate={{
                            scale: [1, 1.05, 1],
                            textShadow: [
                                "0 0 0px rgba(255,165,0,0)",
                                "0 0 20px rgba(255,165,0,0.8)",
                                "0 0 0px rgba(255,165,0,0)"
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        Я календарь переверну! 🔥
                    </motion.h1>


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
                            className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 hover:from-orange-600 hover:via-red-600 hover:to-orange-600 text-white px-10 py-6 text-xl font-bold rounded-full shadow-2xl border-4 border-orange-300 relative overflow-hidden"
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

                        {/* Эффект частиц */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            animate={{
                                background: [
                                    "radial-gradient(circle, rgba(255,165,0,0.3) 0%, transparent 70%)",
                                    "radial-gradient(circle, rgba(255,69,0,0.5) 0%, transparent 70%)",
                                    "radial-gradient(circle, rgba(255,165,0,0.3) 0%, transparent 70%)"
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
