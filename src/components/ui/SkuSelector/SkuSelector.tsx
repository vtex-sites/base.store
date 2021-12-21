import React, { useState } from 'react'
import type { ChangeEventHandler } from 'react'
import { RadioGroup, RadioOption, Label } from '@faststore/ui'

interface OptionProps {
  variant: string
  selectedOption: string | number
  option: DefaultSkuProps | ImageSkuProps
}

function Option({
  option,
  variant,
  selectedOption,
  ...otherProps
}: OptionProps): JSX.Element {
  if (variant !== 'image' && 'value' in option) {
    const { label, value, disabled }: DefaultSkuProps = option

    return (
      <RadioOption
        label={label}
        value={value}
        disabled={disabled}
        checked={value === selectedOption}
        {...otherProps}
      >
        {variant === 'size' && <span>{option.value}</span>}
        {variant === 'color' && (
          <div style={{ backgroundColor: value, height: 40, width: 40 }} />
        )}
      </RadioOption>
    )
  }

  if (variant === 'image' && 'src' in option) {
    const { id, src, alt, disabled }: ImageSkuProps = option

    return (
      <RadioOption
        value={id}
        label={alt}
        disabled={disabled}
        checked={id === selectedOption}
        {...otherProps}
      >
        <img src={src} alt={alt} width={40} height={40} />
      </RadioOption>
    )
  }

  return <div />
}

type DefaultSkuProps = {
  label: string
  value: string
  disabled?: boolean
}

interface ImageSkuProps {
  alt: string
  src: string
  id: string | number
  disabled?: boolean
}

type ImageVariant = 'image'

type Sku<V> = V extends ImageVariant ? ImageSkuProps : DefaultSkuProps

type Variant = 'color' | 'size' | 'image'

export interface SkuSelectorProps {
  /**
   * ID to find this component in testing tools (e.g.: cypress,
   * testing-library, and jest).
   */
  testId?: string
  /**
   * Specify which variant the component should handle.
   */
  variant: Variant
  /**
   * SKU options that should be rendered.
   */
  skus: Array<Sku<Variant>>
  /**
   * Default SKU option.
   */
  defaultSku?: string
  /**
   * Section label for the SKU selector.
   */
  label?: string
  /**
   * Function to be triggered when SKU option change.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const SkuSelector = ({
  skus,
  label,
  variant,
  onChange,
  defaultSku,
  testId = 'store-sku-selector',
}: SkuSelectorProps) => {
  const [selectedSku, setSelectedSku] = useState<string>(defaultSku ?? '')

  return (
    <div data-store-sku-selector data-testid={testId} data-variant={variant}>
      {label && (
        <Label data-sku-selector-label>
          {label}: {selectedSku}
        </Label>
      )}
      <RadioGroup
        selectedValue={selectedSku}
        name={`sku-selector-${variant}`}
        onChange={(e) => {
          onChange?.(e)
          setSelectedSku(e.currentTarget.value)
        }}
      >
        {skus.map((sku, index) => {
          return (
            <Option
              data-sku-selector-option
              key={String(index)}
              option={sku}
              variant={variant}
              selectedOption={selectedSku}
            />
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default SkuSelector
