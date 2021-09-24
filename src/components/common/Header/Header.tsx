import React from 'react'
import { SearchInput } from '@vtex/store-ui'

import Navbar from '../Navbar'

const styles = {
  header: {
    backgroundColor: '#f0f0f0',
    height: '8vh',
    width: '100%',
  },
}

function Header() {
  return (
    <header style={styles.header}>
      <Navbar />
      <SearchInput onSubmit={() => ''} />
    </header>
  )
}

export default Header
