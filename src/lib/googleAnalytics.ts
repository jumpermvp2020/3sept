import { useCallback } from 'react'

// Типы для Google Analytics
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

interface GAEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, unknown>
}

export const useGoogleAnalytics = () => {
  // Отправка события в Google Analytics
  const sendEvent = useCallback((event: GAEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.custom_parameters
      })
    }
  }, [])

  // Отправка пользовательского события
  const sendCustomEvent = useCallback((eventName: string, parameters?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters)
    }
  }, [])

  // Трекинг событий игры
  const trackGameStart = useCallback(() => {
    sendEvent({
      action: 'game_start',
      category: 'game',
      label: '3 сентября',
      custom_parameters: {
        timestamp: Date.now()
      }
    })
  }, [sendEvent])

  const trackCalendarClick = useCallback((calendarId: number, timeFromStart: number) => {
    sendEvent({
      action: 'calendar_click',
      category: 'game',
      label: `calendar_${calendarId}`,
      value: timeFromStart,
      custom_parameters: {
        calendar_id: calendarId,
        time_from_start: timeFromStart,
        timestamp: Date.now()
      }
    })
  }, [sendEvent])

  const trackGameVictory = useCallback((totalTime: number, totalClicks: number) => {
    sendEvent({
      action: 'game_victory',
      category: 'game',
      label: '3 сентября',
      value: totalTime,
      custom_parameters: {
        total_time: totalTime,
        total_clicks: totalClicks,
        timestamp: Date.now()
      }
    })
  }, [sendEvent])

  const trackGameReset = useCallback(() => {
    sendEvent({
      action: 'game_reset',
      category: 'game',
      label: '3 сентября',
      custom_parameters: {
        timestamp: Date.now()
      }
    })
  }, [sendEvent])

  const trackPageView = useCallback((pageTitle: string, pagePath: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-VMLREZF0K9', {
        page_title: pageTitle,
        page_path: pagePath
      })
    }
  }, [])

  return {
    sendEvent,
    sendCustomEvent,
    trackGameStart,
    trackCalendarClick,
    trackGameVictory,
    trackGameReset,
    trackPageView
  }
}
