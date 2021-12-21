import React, { useState } from 'react'
import type { ChangeEventHandler } from 'react'
import { Image } from 'src/components/ui/Image'
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
        value={label}
        disabled={disabled}
        checked={label === selectedOption}
        {...otherProps}
      >
        {variant === 'size' && <span>{option.label}</span>}
        {variant === 'color' && (
          <div style={{ backgroundColor: value, height: 40, width: 40 }} />
        )}
      </RadioOption>
    )
  }

  if (variant === 'image' && 'src' in option) {
    const { label, src, alt, disabled }: ImageSkuProps = option

    return (
      <RadioOption
        label={label}
        value={label}
        disabled={disabled}
        checked={label === selectedOption}
        {...otherProps}
      >
        <Image src={src} alt={alt} variant="product.sku" />
      </RadioOption>
    )
  }

  return <div />
}

type DefaultSkuProps = {
  /**
   * Label to describe the SKU when selected.
   */
  label: string
  /**
   * Current value for this SKU.
   */
  value: string
  /**
   * Specifies that this option should be disabled.
   */
  disabled?: boolean
}

interface ImageSkuProps {
  /**
   * Alternative text description of the image.
   */
  alt: string
  /**
   * Image URL.
   */
  src: string
  /**
   * Label to describe the image when selected.
   */
  label: string
  /**
   * Specifies that this option should be disabled.
   */
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
  options: Array<Sku<Variant>>
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
  label,
  variant,
  options,
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
        {options.map((option, index) => {
          return (
            <Option
              data-sku-selector-option
              key={String(index)}
              option={option}
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
