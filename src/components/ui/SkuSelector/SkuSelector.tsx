import React, { useState } from 'react'
import type { ChangeEventHandler } from 'react'
import { Image } from 'src/components/ui/Image'
import { RadioGroup, RadioOption, Label } from '@faststore/ui'

import './sku-selector.scss'

interface DefaultSkuProps {
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

type Variant = 'color' | 'label' | 'image'

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

function SkuSelector({
  label,
  variant,
  options,
  onChange,
  defaultSku,
  testId = 'store-sku-selector',
}: SkuSelectorProps) {
  const [selectedSku, setSelectedSku] = useState<string>(defaultSku ?? '')

  return (
    <div data-store-sku-selector data-testid={testId} data-variant={variant}>
      {label && (
        <Label data-sku-selector-label>
          {label}: <strong>{selectedSku}</strong>
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
            <RadioOption
              key={String(index)}
              label={option.label}
              value={option.label}
              disabled={option.disabled}
              checked={option.label === selectedSku}
            >
              {variant === 'label' && <span>{option.label}</span>}
              {variant === 'color' && 'value' in option && (
                <span>
                  <div
                    data-sku-selector-color
                    style={{
                      backgroundColor: option.value,
                    }}
                  />
                </span>
              )}
              {variant === 'image' && 'src' in option && (
                <Image
                  baseUrl={option.src}
                  alt={option.alt}
                  sourceWidth={720}
                  aspectRatio={1}
                  width={40}
                  breakpoints={[20, 40, 80]}
                  layout="constrained"
                  backgroundColor="#f0f0f0"
                  options={{
                    fitIn: true,
                  }}
                />
              )}
            </RadioOption>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default SkuSelector
