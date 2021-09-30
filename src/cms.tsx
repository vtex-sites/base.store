import React from 'react'
import Carousel from 'src/components/sections/Carousel'
import Shelf from 'src/components/sections/Shelf'
import type { ComponentType } from 'react'

interface Block {
  name: string
  props: any
}

interface Props {
  sections: Block[]
}

const components: Record<string, ComponentType<any>> = {
  Carousel,
  DynamicShelf: Shelf,
}

function Render({ sections }: Props) {
  return (
    <>
      {sections.map(({ name, props }, index) => {
        const Component = components[name]

        if (Component == null) {
          throw new Error(
            `Section ${name} does not have a component. Available components are: ${Object.keys(
              components
            )} `
          )
        }

        return <Component key={`render-section-${index}`} {...props} />
      })}
    </>
  )
}

export default Render
