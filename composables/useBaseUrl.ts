export const useBaseUrl = () => {
  const config = useRuntimeConfig()
  const baseURL = config.app.baseURL || '/'

  const withBase = (path: string) => {
    if (!path) return path
    // Si la ruta ya tiene el baseURL o es una URL completa, retornarla tal cual
    if (path.startsWith('http') || path.startsWith(baseURL)) {
      return path
    }
    // Asegurar que no haya doble slash
    const cleanBase = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `${cleanBase}${cleanPath}`
  }

  return { withBase, baseURL }
}
