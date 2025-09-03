import { motion } from 'framer-motion'
import Image from 'next/image'
import { useSoundManager } from '@/lib/soundManager'
import { useEffect, useState } from 'react'

interface FrogEasterEggProps {
    isVisible: boolean
}

export const FrogEasterEgg = ({ isVisible }: FrogEasterEggProps) => {
    const soundManager = useSoundManager()
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        if (isVisible) {
            soundManager?.playFrogSound()
        }
    }, [isVisible, soundManager])

    const handleClick = () => {
        soundManager?.playFrogSound()
    }

    if (!isVisible) return null

    return (
        <motion.div
            className="fixed bottom-24 left-4 z-50"
            initial={{
                x: -200,
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
                    src="/frog.png"
                    alt="Лягушка-пасхалка"
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
                        Нажми для звука! 🐸
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    )
}
