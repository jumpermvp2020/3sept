import { motion } from 'framer-motion'
import Image from 'next/image'
import { useSoundManager } from '@/lib/soundManager'
import { useState } from 'react'

interface CalendarEasterEggProps {
    isVisible: boolean
}

export const CalendarEasterEgg = ({ isVisible }: CalendarEasterEggProps) => {
    const soundManager = useSoundManager()
    const [isHovered, setIsHovered] = useState(false)

    const handleClick = () => {
        soundManager?.playMusic()
    }

    if (!isVisible) return null

    return (
        <motion.div
            className="fixed bottom-24 right-4 z-50"
            initial={{
                x: 200,
                y: 100,
                scale: 0
            }}
            animate={{
                x: 0,
                y: 0,
                scale: 1
            }}
            transition={{
                duration: 1,
                ease: "easeOut"
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <motion.div
                className="relative cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClick}
            >
                <Image
                    src="/1list.png"
                    alt="Календарь-пасхалка"
                    width={100}
                    height={100}
                    className="drop-shadow-2xl"
                />

                {/* Индикатор кликабельности */}
                {isHovered && (
                    <motion.div
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                    >
                        Нажми для музыки! 🎵
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    )
}
