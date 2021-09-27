import React from 'react'

interface BaseSlice {
  slice_type: string | null
}

interface Props<T> {
  slices: Array<Maybe<T>>
  blocks: Record<string, React.ComponentType<{ data: any }> | undefined>
}

export function PrismicRenderer<T extends BaseSlice>({
  slices,
  blocks,
}: Props<T>) {
  return (
    <>
      {slices.map((data, index) => {
        const { slice_type: sliceType, ...props } = data ?? {}
        const Component = blocks[sliceType ?? '']

        if (Component === undefined) {
          throw new Error(
            `No component for slice ${sliceType} found. Available components: ${Object.values(
              blocks
            )}`
          )
        }

        return <Component key={`slice-${index}`} data={props} />
      })}
    </>
  )
}
