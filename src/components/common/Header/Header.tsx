import React from 'react'
import type { PropsWithChildren } from 'react'

const styles = {
  header: {
    backgroundColor: '#f0f0f0',
    height: '15vh',
    width: '100%',
  },
}

function Header({ children }: PropsWithChildren<unknown>) {
  return <header style={styles.header}>{children}</header>
}

export default Header
