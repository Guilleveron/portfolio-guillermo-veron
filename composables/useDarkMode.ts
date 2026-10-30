export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme-mode'

export const useDarkMode = () => {
  const colorMode = useState<ThemeMode>('color-mode', () => 'system')

  const apply = (mode: ThemeMode) => {
    if (typeof window === 'undefined') return
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = mode === 'dark' || (mode === 'system' && prefersDark)
    document.documentElement.classList.toggle('dark', isDark)
  }

  const updateTheme = (mode: ThemeMode) => {
    colorMode.value = mode
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {}
    apply(mode)
  }

  const initTheme = () => {
    if (typeof window === 'undefined') return
    let saved: ThemeMode | null = null
    try {
      saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
    } catch {}
    colorMode.value = saved || 'system'
    apply(colorMode.value)
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', () => {
      if (colorMode.value === 'system') apply('system')
    })
  }

  const cycle = () => {
    const order: ThemeMode[] = ['light', 'dark', 'system']
    const next = order[(order.indexOf(colorMode.value) + 1) % order.length]
    updateTheme(next)
  }

  return { colorMode, updateTheme, initTheme, cycle }
}
