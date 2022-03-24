/**
 * When testing, cypress may run before react is interactive.
 * This may lead to events being missed and not causing the
 * expected side effects on the UI. We add this markup to the
 * document so we can wait for it before running our tests
 */
import React, { useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'

let renders = 0

function TestProvider({ children }: PropsWithChildren<unknown>) {
  const [id, setId] = useState('')

  useEffect(() => {
    renders++
    setId('react-hydrated')
  }, [])

  return (
    <div data-testid={id} data-render-count={renders}>
      {children}
    </div>
  )
}

export default TestProvider
