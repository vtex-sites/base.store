import React from 'react'

interface Props {
  searchParams: {
    collection: string
    from: number
    to: number
    hideUnavailableItems: boolean
  }
  title: string
}

function Shelf(props: Props) {
  const { title } = props

  return (
    <div className="flex w-full items-center justify-center text-2xl font-bold">
      {title}
    </div>
  )
}

export default Shelf
