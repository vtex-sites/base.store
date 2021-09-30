import React from 'react'
import type { ComponentType } from 'react'

interface Block {
  name: string
  props: any
}

interface Props {
  sections: Block[]
  components: Record<string, ComponentType<any> | undefined>
}

function Render({ sections, components }: Props) {
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
