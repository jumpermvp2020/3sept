import { useCallback } from 'react'

// Типы для Яндекс.Метрики
declare global {
  interface Window {
    ym: (counterId: number, method: string, ...args: unknown[]) => void
    Ya: {
      Metrika2: new (config: MetrikaConfig) => unknown
    }
  }
}

interface MetrikaConfig {
  id: number
  defer?: boolean
  clickmap?: boolean
  trackLinks?: boolean
  accurateTrackBounce?: boolean
  webvisor?: boolean
}

interface GameEvent {
  name: string
  params?: Record<string, unknown>
}

export const useYandexMetrika = (counterId: number) => {
  // Инициализация Яндекс.Метрики
  const initMetrika = useCallback((config: MetrikaConfig) => {
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(counterId, 'init', config)
    }
  }, [counterId])

  // Отправка события достижения цели
  const reachGoal = useCallback((goalName: string, params?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(counterId, 'reachGoal', goalName, params)
    }
  }, [counterId])

  // Отправка параметров визита
  const setParams = useCallback((params: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(counterId, 'params', params)
    }
  }, [counterId])

  // Отправка пользовательских параметров
  const setUserParams = useCallback((params: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.ym) {
      window.ym(counterId, 'userParams', params)
    }
  }, [counterId])

  // Отправка события игры
  const trackGameEvent = useCallback((event: GameEvent) => {
    reachGoal(event.name, event.params)
  }, [reachGoal])

  // Трекинг событий игры
  const trackGameStart = useCallback(() => {
    trackGameEvent({
      name: 'game_start',
      params: {
        timestamp: Date.now()
      }
    })
  }, [trackGameEvent])

  const trackCalendarClick = useCallback((calendarId: number, timeFromStart: number) => {
    trackGameEvent({
      name: 'calendar_click',
      params: {
        calendar_id: calendarId,
        time_from_start: timeFromStart,
        timestamp: Date.now()
      }
    })
  }, [trackGameEvent])

  const trackGameVictory = useCallback((totalTime: number, totalClicks: number) => {
    trackGameEvent({
      name: 'game_victory',
      params: {
        total_time: totalTime,
        total_clicks: totalClicks,
        timestamp: Date.now()
      }
    })
  }, [trackGameEvent])

  const trackGameReset = useCallback(() => {
    trackGameEvent({
      name: 'game_reset',
      params: {
        timestamp: Date.now()
      }
    })
  }, [trackGameEvent])

  return {
    initMetrika,
    reachGoal,
    setParams,
    setUserParams,
    trackGameEvent,
    trackGameStart,
    trackCalendarClick,
    trackGameVictory,
    trackGameReset
  }
}
