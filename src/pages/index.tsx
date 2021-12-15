import React from 'react'

import storeConfig from '../../store.config'

const {
  site: { title },
} = storeConfig

function Page() {
  return (
    <>
      {/*
        Sections: Components imported from '../components/sections' only.
        Do not import or render components from any other folder in here.
      */}
      <h1>{title}</h1>
    </>
  )
}

export default Page
