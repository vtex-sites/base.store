export const useMark = (mark: string) => {
  if (typeof window !== 'undefined') {
    performance.mark(mark)
  }
}
