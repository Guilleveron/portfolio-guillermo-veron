export const useCvPreview = () => {
  const open = useState<boolean>('cv-preview-open', () => false)
  return { open, show: () => (open.value = true), hide: () => (open.value = false) }
}
