import type { PropsWithChildren } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'

export type ChasterEvent = {
  type: 'chaster'
  event: 'partner_configuration_save'
}
type WindowEventListener = (data: ChasterEvent) => Promise<void>
type WindowEventsContextValue = {
  addListener: (listener: WindowEventListener) => void
  removeListener: (listener: WindowEventListener) => void
}

export const WindowEventsContext = createContext<WindowEventsContextValue>(
  {} as WindowEventsContextValue,
)

export const WindowEventsProvider = ({ children }: PropsWithChildren) => {
  const listeners = useRef<WindowEventListener[]>([])

  const sendEvent = useCallback((data: unknown) => {
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data) as ChasterEvent
        if (parsed.type === 'chaster') {
          Promise.all(listeners.current.map((fn) => fn(parsed))).catch(
            (error) => console.error(error),
          )
        }
      } catch (err) {
        // do nothing
      }
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    const windowAny = window as any
    if (!windowAny) return

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const eventMethod = windowAny.addEventListener
      ? 'addEventListener'
      : 'attachEvent'
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const removeEventMethod = windowAny.addEventListener
      ? 'removeEventListener'
      : 'detachEvent'
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const eventer = windowAny[eventMethod]
    const messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callback = (e: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const key = e.message ? 'message' : 'data'
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const data = e[key]
      sendEvent(data)
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    eventer(messageEvent, callback, false)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return () => windowAny[removeEventMethod](messageEvent, callback)
  }, [sendEvent])

  const addListener = useCallback((listener: WindowEventListener) => {
    listeners.current.push(listener)
  }, [])

  const removeListener = useCallback((listener: WindowEventListener) => {
    const index = listeners.current.indexOf(listener)
    if (index !== -1) listeners.current.splice(index, 1)
  }, [])

  return (
    <WindowEventsContext.Provider
      value={{
        addListener,
        removeListener,
      }}
    >
      {children}
    </WindowEventsContext.Provider>
  )
}

export const useWindowEvents = () => useContext(WindowEventsContext)
