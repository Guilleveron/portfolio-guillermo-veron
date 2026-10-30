export const useBaseUrl = () => {
  const config = useRuntimeConfig()
  const baseURL = config.app.baseURL || '/'

  const withBase = (path: string) => {
    if (!path) return path
    if (path.startsWith('http') || path.startsWith(baseURL)) return path
    const cleanBase = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `${cleanBase}${cleanPath}`
  }

  return { withBase, baseURL }
}
