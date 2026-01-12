export type ThemeMode = 'light' | 'dark' | 'system'

export const useDarkMode = () => {
  const colorMode = useState<ThemeMode>('color-mode', () => 'system')

  const updateTheme = (mode: ThemeMode) => {
    if (typeof window === 'undefined') return

    const root = document.documentElement

    // Guardar preferencia
    localStorage.setItem('theme-mode', mode)
    colorMode.value = mode

    // Determinar si aplicar dark mode
    let isDark = false
    if (mode === 'dark') {
      isDark = true
    } else if (mode === 'light') {
      isDark = false
    } else {
      // system
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    // Aplicar o remover clase dark
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  const initTheme = () => {
    if (typeof window === 'undefined') return

    // Obtener preferencia guardada
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode | null
    const mode = savedMode || 'system'

    updateTheme(mode)

    // Escuchar cambios en preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (colorMode.value === 'system') {
        updateTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        mediaQuery.removeEventListener('change', handleChange)
      })
    }
  }

  return {
    colorMode,
    updateTheme,
    initTheme
  }
}
