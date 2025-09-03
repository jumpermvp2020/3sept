import { Howl } from 'howler'

// Создаем синглтон SoundManager
let soundManagerInstance: SoundManager | null = null

class SoundManager {
    private musicSound: Howl | null = null
    private frogSound: Howl | null = null
    private isMusicPlaying = false
    private isFrogPlaying = false

    constructor() {
        this.initSounds()
    }

    private initSounds() {
        this.musicSound = new Howl({
            src: ['/mus.mp3'],
            volume: 0.7,
            onend: () => {
                this.isMusicPlaying = false
            },
            onstop: () => {
                this.isMusicPlaying = false
            }
        })

        this.frogSound = new Howl({
            src: ['/final.mp3'],
            volume: 0.8,
            loop: true,
            onstop: () => {
                this.isFrogPlaying = false
            }
        })
    }

    playMusic() {
        // Останавливаем лягушку если играет
        if (this.isFrogPlaying) {
            this.stopFrogSound()
        }

        if (this.musicSound && !this.isMusicPlaying) {
            this.musicSound.play()
            this.isMusicPlaying = true
        }
    }

    playFrogSound() {
        // Останавливаем музыку если играет
        if (this.isMusicPlaying) {
            this.stopMusic()
        }

        if (this.frogSound && !this.isFrogPlaying) {
            this.frogSound.play()
            this.isFrogPlaying = true
        }
    }

    stopMusic() {
        if (this.musicSound) {
            this.musicSound.stop()
            this.isMusicPlaying = false
        }
    }

    stopFrogSound() {
        if (this.frogSound) {
            this.frogSound.stop()
            this.isFrogPlaying = false
        }
    }

    reset() {
        this.stopMusic()
        this.stopFrogSound()
        this.isMusicPlaying = false
        this.isFrogPlaying = false
    }
}

export const useSoundManager = () => {
    // Создаем синглтон только один раз
    if (!soundManagerInstance) {
        soundManagerInstance = new SoundManager()
    }

    return soundManagerInstance
}
